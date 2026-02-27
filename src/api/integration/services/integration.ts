import { factories } from '@strapi/strapi';
import crypto from 'node:crypto';

type DonationInput = {
  amount: number;
  currency?: string;
  frequency?: 'one_time' | 'monthly';
  provider?: 'stripe' | 'mpesa';
  phone?: string;
  email?: string;
};

type WebhookInput = {
  provider: 'stripe' | 'mpesa' | 'crm';
  eventId: string;
  eventType: string;
  payload: Record<string, unknown>;
  status?: 'received' | 'processed' | 'failed' | 'dead_letter';
  processedAt?: string;
  errorMessage?: string;
};

const MPESA_PHONE_RE = /^254\d{9}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asText(value: unknown) {
  if (typeof value === 'string') {
    const trimmed = value.trim();
    return trimmed.length ? trimmed : undefined;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  return undefined;
}

function asNumber(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
  }

  return undefined;
}

function parseMpesaTimestamp(value: unknown) {
  const raw = asText(value);
  if (!raw || !/^\d{14}$/.test(raw)) {
    return undefined;
  }

  const year = Number(raw.slice(0, 4));
  const month = Number(raw.slice(4, 6));
  const day = Number(raw.slice(6, 8));
  const hour = Number(raw.slice(8, 10));
  const minute = Number(raw.slice(10, 12));
  const second = Number(raw.slice(12, 14));

  const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function payloadHash(payload: Record<string, unknown>) {
  return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex').slice(0, 24);
}

function normalizeWebhook(
  provider: WebhookInput['provider'],
  payload: Record<string, unknown>
): WebhookInput {
  if (provider !== 'mpesa') {
    const eventId = asText(payload.eventId) || asText(payload.id);
    const eventType = asText(payload.eventType) || asText(payload.type) || 'unknown';

    if (!eventId) {
      throw new Error('eventId is required');
    }

    return {
      provider,
      eventId,
      eventType,
      payload,
      status: 'received',
    };
  }

  const body = isRecord(payload.Body) ? payload.Body : undefined;
  const callback = body && isRecord(body.stkCallback) ? body.stkCallback : undefined;

  if (!callback) {
    const eventId = asText(payload.eventId) || asText(payload.id);
    const eventType = asText(payload.eventType) || asText(payload.type) || 'mpesa.webhook';

    if (!eventId) {
      throw new Error('M-Pesa callback is missing Body.stkCallback and eventId');
    }

    return {
      provider,
      eventId,
      eventType,
      payload,
      status: 'received',
    };
  }

  const checkoutRequestId = asText(callback.CheckoutRequestID);
  const merchantRequestId = asText(callback.MerchantRequestID);
  const resultCode = asNumber(callback.ResultCode);
  const resultDesc = asText(callback.ResultDesc);

  let metadata: Record<string, unknown> = {};
  const callbackMetadata = isRecord(callback.CallbackMetadata) ? callback.CallbackMetadata : undefined;
  const items = callbackMetadata && Array.isArray(callbackMetadata.Item) ? callbackMetadata.Item : [];

  for (const item of items) {
    if (!isRecord(item)) continue;
    const key = asText(item.Name);
    if (!key) continue;
    metadata[key] = item.Value;
  }

  const amount = asNumber(metadata.Amount);
  const receiptNumber = asText(metadata.MpesaReceiptNumber);
  const transactionDate = asText(metadata.TransactionDate);
  const phone = asText(metadata.PhoneNumber);

  const eventId = checkoutRequestId || merchantRequestId || `mpesa-${payloadHash(payload)}`;
  const success = resultCode === 0;

  const normalizedPayload: Record<string, unknown> = {
    merchantRequestId,
    checkoutRequestId,
    resultCode,
    resultDescription: resultDesc,
    amount,
    receiptNumber,
    transactionDate,
    transactionDateIso: parseMpesaTimestamp(transactionDate),
    phoneNumber: phone,
    accountReference: asText(metadata.AccountReference),
    callbackMetadata: metadata,
    raw: payload,
  };

  return {
    provider,
    eventId,
    eventType: success ? 'mpesa.stk.success' : 'mpesa.stk.failed',
    payload: normalizedPayload,
    status: success ? 'processed' : 'failed',
    processedAt: new Date().toISOString(),
    errorMessage: success ? undefined : resultDesc || 'M-Pesa callback returned a failure result',
  };
}

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function toMinorUnits(amount: number, currency: string) {
  const zeroDecimal = new Set(['BIF', 'CLP', 'DJF', 'GNF', 'JPY', 'KMF', 'KRW', 'MGA', 'PYG', 'RWF', 'UGX', 'VND', 'VUV', 'XAF', 'XOF', 'XPF']);
  if (zeroDecimal.has(currency.toUpperCase())) {
    return Math.round(amount);
  }

  return Math.round(amount * 100);
}

function normalizeMpesaPhone(phone: string) {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('0') && digits.length === 10) {
    return `254${digits.slice(1)}`;
  }
  if (digits.startsWith('254') && digits.length === 12) {
    return digits;
  }
  throw new Error('phone must be a valid Kenyan mobile number (e.g. 07XXXXXXXX or 2547XXXXXXXX)');
}

export default factories.createCoreService('api::lead-event.lead-event', ({ strapi }) => ({
  normalizeWebhookPayload(provider: WebhookInput['provider'], payload: Record<string, unknown>) {
    return normalizeWebhook(provider, payload);
  },

  verifyWebhookSignature(
    provider: WebhookInput['provider'],
    payload: Record<string, unknown>,
    signatureHeader?: string
  ) {
    const strict = process.env.WEBHOOK_VERIFY_STRICT === 'true';
    const secretByProvider: Record<WebhookInput['provider'], string | undefined> = {
      stripe: process.env.STRIPE_WEBHOOK_SECRET,
      mpesa: process.env.MPESA_WEBHOOK_SECRET,
      crm: process.env.CRM_WEBHOOK_SECRET,
    };

    const secret = secretByProvider[provider];

    if (!secret) {
      if (strict) {
        throw new Error(`Missing webhook secret for provider: ${provider}`);
      }

      return { verified: false, reason: 'missing_secret' as const };
    }

    if (!signatureHeader) {
      if (strict) {
        throw new Error('Missing webhook signature header');
      }

      return { verified: false, reason: 'missing_signature' as const };
    }

    const digest = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex');

    const provided = Buffer.from(signatureHeader);
    const expected = Buffer.from(digest);
    const valid = provided.length === expected.length && crypto.timingSafeEqual(provided, expected);

    if (!valid && strict) {
      throw new Error('Invalid webhook signature');
    }

    return { verified: valid, reason: valid ? undefined : ('invalid_signature' as const) };
  },

  async createDonationIntent(input: DonationInput) {
    if (!input.amount || input.amount <= 0) {
      throw new Error('amount must be greater than 0');
    }

    const provider = input.provider ?? 'stripe';
    const currency = (input.currency ?? 'KES').toUpperCase();
    const frequency = input.frequency ?? 'one_time';

    if (provider === 'stripe') {
      const stripeKey = getRequiredEnv('STRIPE_SECRET_KEY');
      const stripeApiBase = process.env.STRIPE_API_BASE ?? 'https://api.stripe.com';
      const successUrl = process.env.STRIPE_SUCCESS_URL ?? 'http://localhost:3000/get-involved?status=success';
      const cancelUrl = process.env.STRIPE_CANCEL_URL ?? 'http://localhost:3000/get-involved?status=cancelled';
      const amountMinor = toMinorUnits(input.amount, currency);

      if (frequency === 'monthly' || frequency === 'one_time') {
        const body = new URLSearchParams({
          success_url: successUrl,
          cancel_url: cancelUrl,
          'line_items[0][quantity]': '1',
        });

        if (frequency === 'monthly') {
          const monthlyPriceId = getRequiredEnv('STRIPE_PRICE_MONTHLY_SUPPORTER');
          body.set('mode', 'subscription');
          body.set('line_items[0][price]', monthlyPriceId);
        } else {
          body.set('mode', 'payment');
          body.set('line_items[0][price_data][currency]', currency.toLowerCase());
          body.set('line_items[0][price_data][unit_amount]', String(amountMinor));
          body.set('line_items[0][price_data][product_data][name]', 'Kagwiria Donation');
        }

        if (input.email?.trim()) {
          body.set('customer_email', input.email.trim().toLowerCase());
        }

        const response = await fetch(`${stripeApiBase}/v1/checkout/sessions`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${stripeKey}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        });

        const payload = (await response.json()) as Record<string, unknown>;

        if (!response.ok) {
          const message = String((payload.error as Record<string, unknown> | undefined)?.message ?? 'Stripe checkout session failed');
          throw new Error(message);
        }

        return {
          provider,
          frequency,
          currency,
          amount: input.amount,
          status: 'requires_action',
          type: 'stripe_checkout_session',
          reference: String(payload.id),
          checkoutUrl: payload.url,
        };
      }

      const body = new URLSearchParams({
        amount: String(amountMinor),
        currency: currency.toLowerCase(),
        automatic_payment_methods: 'enabled',
      });

      if (input.email) {
        body.set('receipt_email', input.email.trim().toLowerCase());
      }

      const response = await fetch(`${stripeApiBase}/v1/payment_intents`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${stripeKey}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body,
      });

      const payload = (await response.json()) as Record<string, unknown>;

      if (!response.ok) {
        const message = String((payload.error as Record<string, unknown> | undefined)?.message ?? 'Stripe payment intent failed');
        throw new Error(message);
      }

      return {
        provider,
        frequency,
        currency,
        amount: input.amount,
        status: String(payload.status ?? 'requires_payment_method'),
        type: 'stripe_payment_intent',
        reference: String(payload.id),
        clientSecret: payload.client_secret,
      };
    }

    const rawPhone = input.phone?.trim();
    if (!rawPhone) {
      throw new Error('phone is required for mpesa donations');
    }

    const phone = normalizeMpesaPhone(rawPhone);
    if (!MPESA_PHONE_RE.test(phone)) {
      throw new Error('phone must be a valid Kenyan mobile number');
    }

    const consumerKey = getRequiredEnv('MPESA_CONSUMER_KEY');
    const consumerSecret = getRequiredEnv('MPESA_CONSUMER_SECRET');
    const passkey = getRequiredEnv('MPESA_PASSKEY');
    const shortcode = getRequiredEnv('MPESA_SHORTCODE');
    const callbackUrl = getRequiredEnv('MPESA_CALLBACK_URL');
    const mpesaApiBase = process.env.MPESA_API_BASE ?? 'https://sandbox.safaricom.co.ke';

    const authResponse = await fetch(`${mpesaApiBase}/oauth/v1/generate?grant_type=client_credentials`, {
      method: 'GET',
      headers: {
        Authorization: `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
      },
    });

    const authPayload = (await authResponse.json()) as Record<string, unknown>;
    if (!authResponse.ok || !authPayload.access_token) {
      throw new Error('Failed to obtain M-Pesa access token');
    }

    const timestamp = new Date().toISOString().replace(/[-:TZ.]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const stkResponse = await fetch(`${mpesaApiBase}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${String(authPayload.access_token)}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(input.amount),
        PartyA: phone,
        PartyB: shortcode,
        PhoneNumber: phone,
        CallBackURL: callbackUrl,
        AccountReference: 'KagwiriaPlatform',
        TransactionDesc: 'Kagwiria donation',
      }),
    });

    const stkPayload = (await stkResponse.json()) as Record<string, unknown>;

    if (!stkResponse.ok) {
      throw new Error(String(stkPayload.errorMessage ?? 'M-Pesa STK push failed'));
    }

    return {
      provider,
      frequency,
      currency: 'KES',
      amount: input.amount,
      status: 'pending_user_confirmation',
      type: 'mpesa_stk_push',
      reference: String(stkPayload.CheckoutRequestID ?? ''),
      merchantRequestId: stkPayload.MerchantRequestID,
      checkoutRequestId: stkPayload.CheckoutRequestID,
      responseCode: stkPayload.ResponseCode,
      responseDescription: stkPayload.ResponseDescription,
      customerMessage: stkPayload.CustomerMessage,
    };
  },

  async recordWebhook(input: WebhookInput) {
    const existing = await strapi.entityService.findMany('api::webhook-event.webhook-event', {
      filters: { eventId: input.eventId },
      limit: 1,
    });

    if (existing.length > 0) {
      return { duplicate: true, event: existing[0] };
    }

    const event = await strapi.entityService.create('api::webhook-event.webhook-event', {
      data: {
        provider: input.provider,
        eventId: input.eventId,
        eventType: input.eventType,
        payload: input.payload as any,
        status: input.status ?? 'received',
        processedAt: input.processedAt,
        errorMessage: input.errorMessage,
      },
    });

    return { duplicate: false, event };
  },
}));

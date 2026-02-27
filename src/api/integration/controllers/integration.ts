import { factories } from '@strapi/strapi';

const PROVIDERS = ['stripe', 'mpesa', 'crm'] as const;

type Provider = (typeof PROVIDERS)[number];

function isProvider(value: string): value is Provider {
  return PROVIDERS.includes(value as Provider);
}

export default factories.createCoreController('api::lead-event.lead-event', ({ strapi }) => ({
  async createDonationIntent(ctx) {
    try {
      const body = (ctx.request.body ?? {}) as Record<string, unknown>;
      const data = (body.data ?? body) as Record<string, unknown>;

      const result = await strapi.service('api::integration.integration').createDonationIntent({
        amount: Number(data.amount),
        currency: (data.currency as string | undefined) ?? 'KES',
        frequency: data.frequency as 'one_time' | 'monthly' | undefined,
        provider: data.provider as 'stripe' | 'mpesa' | undefined,
        phone: data.phone as string | undefined,
        email: data.email as string | undefined,
      });

      ctx.send({ data: result }, 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to create donation intent';
      ctx.badRequest(message);
    }
  },

  async receiveWebhook(ctx) {
    const providerParam = String(ctx.params.provider || '').toLowerCase();

    if (!isProvider(providerParam)) {
      return ctx.badRequest('Unsupported provider');
    }

    try {
      const body = (ctx.request.body ?? {}) as Record<string, unknown>;
      const data = (body.data ?? body) as Record<string, unknown>;
      const normalized = strapi
        .service('api::integration.integration')
        .normalizeWebhookPayload(providerParam, data);

      const signatureHeaderNames: Record<Provider, string> = {
        stripe: 'stripe-signature',
        mpesa: 'x-mpesa-signature',
        crm: 'x-crm-signature',
      };
      const signatureHeader = String(ctx.request.headers[signatureHeaderNames[providerParam]] ?? '').trim() || undefined;

      const signatureResult = strapi
        .service('api::integration.integration')
        .verifyWebhookSignature(providerParam, data, signatureHeader);

      const result = await strapi
        .service('api::integration.integration')
        .recordWebhook(normalized);

      ctx.send({
        data: {
          duplicate: result.duplicate,
          id: result.event.id,
          provider: result.event.provider,
          eventId: result.event.eventId,
          status: result.event.status,
          signature: signatureResult,
        },
      }, result.duplicate ? 200 : 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to process webhook';
      ctx.badRequest(message);
    }
  },
}));

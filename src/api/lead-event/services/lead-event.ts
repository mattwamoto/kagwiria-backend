import { factories } from '@strapi/strapi';

type LeadSource = 'sponsor' | 'donor' | 'newsletter' | 'contact' | 'speaker_invite';

type LeadPayload = {
  source: LeadSource;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  message?: string;
  payload?: Record<string, unknown>;
};

type NewsletterSubscribeInput = {
  email: string;
  fullName?: string;
  location?: string;
  payload?: Record<string, unknown>;
};

type NewsletterCampaignInput = {
  subject?: string;
  html?: string;
  text?: string;
  templateReferenceId?: number | string;
  onlyEmails?: string[];
  limit?: number;
  dryRun?: boolean;
};

const ALLOWED_SOURCES: LeadSource[] = ['sponsor', 'donor', 'newsletter', 'contact', 'speaker_invite'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
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

function asStringArray(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === 'string' ? item.trim().toLowerCase() : ''))
    .filter((item) => item.length > 0);
}

function getEnvText(key: string, fallback?: string) {
  const value = process.env[key];
  if (typeof value !== 'string') {
    return fallback;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : fallback;
}

function getEnvBool(key: string, fallback: boolean) {
  const value = getEnvText(key);
  if (!value) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
}

export default factories.createCoreService('api::lead-event.lead-event', ({ strapi }) => ({
  validateLead(input: Partial<LeadPayload>) {
    if (!input.fullName?.trim()) {
      throw new Error('fullName is required');
    }

    if (!input.email?.trim()) {
      throw new Error('email is required');
    }
    if (!EMAIL_RE.test(input.email.trim().toLowerCase())) {
      throw new Error('email must be valid');
    }

    if (!input.source || !ALLOWED_SOURCES.includes(input.source as LeadSource)) {
      throw new Error('source must be one of sponsor, donor, newsletter, contact, speaker_invite');
    }
  },

  async submitLead(input: LeadPayload) {
    this.validateLead(input);

    const entry = await strapi.entityService.create('api::lead-event.lead-event', {
      data: {
        source: input.source,
        fullName: input.fullName.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone?.trim(),
        organization: input.organization?.trim(),
        message: input.message?.trim(),
        payload: (input.payload ?? {}) as any,
        syncStatus: 'pending',
      },
    });

    if (entry.source === 'contact' && getEnvBool('CONTACT_AUTOREPLY_ENABLED', true)) {
      try {
        await this.sendContactAutoReply(entry.email, entry.fullName, entry.message ?? undefined);
      } catch (error) {
        const reason = error instanceof Error ? error.message : 'send failed';
        strapi.log.warn(`[contact] auto-reply failed for ${entry.email}: ${reason}`);
      }
    }

    return entry;
  },

  async sendContactAutoReply(email: string, fullName: string, message?: string) {
    const subject = getEnvText('CONTACT_AUTOREPLY_SUBJECT', 'We received your message')!;
    const templateReferenceId = asNumber(getEnvText('CONTACT_AUTOREPLY_TEMPLATE_ID'));

    const data = {
      fullName,
      email,
      message: message || '',
      year: new Date().getUTCFullYear(),
    };

    if (templateReferenceId) {
      try {
        await strapi
          .plugin('email-designer-5')
          .service('email')
          .sendTemplatedEmail(
            { to: email },
            { templateReferenceId, subject },
            data
          );

        return { delivered: true, channel: 'email-designer-5', templateReferenceId };
      } catch (error) {
        strapi.log.warn(
          `[contact] email-designer-5 send failed for ${email}: ${
            error instanceof Error ? error.message : 'unknown error'
          }`
        );
      }
    }

    const text =
      `Hello ${fullName},\n\n` +
      `Thank you for contacting Kagwiria. We have received your message and our team will get back to you shortly.\n\n` +
      `- Kagwiria Team`;

    const html =
      `<p>Hello ${fullName},</p>` +
      `<p>Thank you for contacting Kagwiria.</p>` +
      `<p>We have received your message and our team will get back to you shortly.</p>` +
      `<p>- Kagwiria Team</p>`;

    await strapi.plugin('email').service('email').send({
      to: email,
      subject,
      text,
      html,
    });

    return { delivered: true, channel: 'email' };
  },

  async sendNewsletterEmail(
    email: string,
    fullName: string,
    mode: 'welcome' | 'campaign',
    options?: { subject?: string; templateReferenceId?: number | string; html?: string; text?: string; data?: Record<string, unknown> }
  ) {
    const templateEnvKey =
      mode === 'welcome'
        ? 'NEWSLETTER_WELCOME_TEMPLATE_ID'
        : 'NEWSLETTER_BROADCAST_TEMPLATE_ID';
    const templateFromEnv = asNumber(getEnvText(templateEnvKey, ''));
    const templateFromInput = asNumber(options?.templateReferenceId);
    const templateReferenceId = templateFromInput ?? templateFromEnv;

    const subject =
      options?.subject?.trim() ||
      getEnvText(
        mode === 'welcome' ? 'NEWSLETTER_WELCOME_SUBJECT' : 'NEWSLETTER_BROADCAST_SUBJECT',
        mode === 'welcome'
          ? 'Welcome to Kagwiria updates'
          : 'Kagwiria mission update'
      )!;

    const baseData = {
      fullName,
      email,
      year: new Date().getUTCFullYear(),
      ...(options?.data ?? {}),
    };

    if (templateReferenceId) {
      try {
        await strapi
          .plugin('email-designer-5')
          .service('email')
          .sendTemplatedEmail(
            {
              to: email,
            },
            {
              templateReferenceId,
              subject,
            },
            baseData
          );

        return { delivered: true, channel: 'email-designer-5', templateReferenceId };
      } catch (error) {
        strapi.log.warn(
          `[newsletter] email-designer-5 send failed for ${email}: ${
            error instanceof Error ? error.message : 'unknown error'
          }`
        );
      }
    }

    const fallbackText =
      options?.text ||
      `Hello ${fullName},\n\n` +
        `Thank you for subscribing to Kagwiria mission updates. ` +
        `You will receive field stories, impact progress, and partner opportunities.\n\n` +
        `- Kagwiria Team`;

    const fallbackHtml =
      options?.html ||
      `<p>Hello ${fullName},</p>` +
        `<p>Thank you for subscribing to Kagwiria mission updates.</p>` +
        `<p>You will receive field stories, impact progress, and partner opportunities.</p>` +
        `<p>- Kagwiria Team</p>`;

    await strapi.plugin('email').service('email').send({
      to: email,
      subject,
      text: fallbackText,
      html: fallbackHtml,
    });

    return { delivered: true, channel: 'email' };
  },

  async subscribeNewsletter(input: NewsletterSubscribeInput) {
    const rawEmail = input.email?.trim();
    if (!rawEmail) {
      throw new Error('email is required');
    }

    const email = normalizeEmail(rawEmail);
    if (!EMAIL_RE.test(email)) {
      throw new Error('email must be valid');
    }

    const fullName = input.fullName?.trim() || 'Newsletter Subscriber';

    const existing = await strapi.entityService.findMany('api::lead-event.lead-event', {
      filters: { source: 'newsletter', email },
      sort: { createdAt: 'desc' },
      limit: 1,
    });

    const existingEntry = existing[0];
    if (existingEntry) {
      return {
        duplicate: true,
        id: existingEntry.id,
        email,
        fullName: existingEntry.fullName,
        createdAt: existingEntry.createdAt,
      };
    }

    const entry = await strapi.entityService.create('api::lead-event.lead-event', {
      data: {
        source: 'newsletter',
        fullName,
        email,
        payload: {
          location: input.location || 'unknown',
          subscribedAt: new Date().toISOString(),
          ...(input.payload ?? {}),
        } as any,
        syncStatus: 'pending',
      },
    });

    let delivery: Record<string, unknown> = { delivered: false };
    try {
      delivery = await this.sendNewsletterEmail(email, fullName, 'welcome');
    } catch (error) {
      const reason = error instanceof Error ? error.message : 'send failed';
      strapi.log.warn(`[newsletter] welcome email failed for ${email}: ${reason}`);
      delivery = { delivered: false, reason };
    }

    return {
      duplicate: false,
      id: entry.id,
      email: entry.email,
      fullName: entry.fullName,
      createdAt: entry.createdAt,
      delivery,
    };
  },

  async sendNewsletterCampaign(input: NewsletterCampaignInput) {
    const requestedLimit = asNumber(input.limit) ?? 500;
    const limit = Math.max(1, Math.min(2000, requestedLimit));

    const allSubscribers = await strapi.entityService.findMany('api::lead-event.lead-event', {
      filters: { source: 'newsletter' },
      fields: ['id', 'email', 'fullName', 'createdAt'],
      sort: { createdAt: 'desc' },
      limit,
    });

    const onlyEmails = new Set(asStringArray(input.onlyEmails));
    const deduped = new Map<string, { fullName: string }>();

    for (const item of allSubscribers) {
      const email = normalizeEmail(String(item.email || ''));
      if (!email || !EMAIL_RE.test(email)) continue;
      if (onlyEmails.size > 0 && !onlyEmails.has(email)) continue;
      if (!deduped.has(email)) {
        deduped.set(email, { fullName: String(item.fullName || 'Subscriber') });
      }
    }

    const recipients = Array.from(deduped.entries()).map(([email, meta]) => ({
      email,
      fullName: meta.fullName,
    }));

    if (recipients.length === 0) {
      return {
        total: 0,
        sent: 0,
        failed: 0,
        dryRun: Boolean(input.dryRun),
        failures: [] as Array<{ email: string; reason: string }>,
      };
    }

    if (input.dryRun) {
      return {
        total: recipients.length,
        sent: 0,
        failed: 0,
        dryRun: true,
        sample: recipients.slice(0, 5).map((item) => item.email),
      };
    }

    const failures: Array<{ email: string; reason: string }> = [];
    let sent = 0;

    for (const recipient of recipients) {
      try {
        await this.sendNewsletterEmail(recipient.email, recipient.fullName, 'campaign', {
          subject: input.subject,
          html: input.html,
          text: input.text,
          templateReferenceId: input.templateReferenceId,
          data: {
            campaign: 'newsletter',
            recipientEmail: recipient.email,
          },
        });
        sent += 1;
      } catch (error) {
        failures.push({
          email: recipient.email,
          reason: error instanceof Error ? error.message : 'send failed',
        });
      }
    }

    return {
      total: recipients.length,
      sent,
      failed: failures.length,
      dryRun: false,
      failures,
    };
  },
}));

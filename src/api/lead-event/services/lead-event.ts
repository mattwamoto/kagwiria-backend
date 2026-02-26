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

const ALLOWED_SOURCES: LeadSource[] = ['sponsor', 'donor', 'newsletter', 'contact', 'speaker_invite'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

    return entry;
  },
}));

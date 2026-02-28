import { factories } from '@strapi/strapi';

function readNewsletterToken(ctx: any) {
  const authHeader = String(ctx.request.headers.authorization || '').trim();
  if (authHeader.toLowerCase().startsWith('bearer ')) {
    return authHeader.slice(7).trim();
  }

  return String(ctx.request.headers['x-newsletter-token'] || '').trim();
}

export default factories.createCoreController('api::lead-event.lead-event', ({ strapi }) => ({
  async submit(ctx) {
    try {
      const body = (ctx.request.body ?? {}) as Record<string, unknown>;
      const data = (body.data ?? body) as Record<string, unknown>;

      const entry = await strapi
        .service('api::lead-event.lead-event')
        .submitLead(data as never);

      ctx.send({
        data: {
          id: entry.id,
          source: entry.source,
          email: entry.email,
          syncStatus: entry.syncStatus,
          createdAt: entry.createdAt,
        },
      }, 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to submit lead';
      ctx.badRequest(message);
    }
  },

  async subscribeNewsletter(ctx) {
    try {
      const body = (ctx.request.body ?? {}) as Record<string, unknown>;
      const data = (body.data ?? body) as Record<string, unknown>;

      const result = await strapi.service('api::lead-event.lead-event').subscribeNewsletter({
        email: String(data.email || ''),
        fullName: typeof data.fullName === 'string' ? data.fullName : undefined,
        location: typeof data.location === 'string' ? data.location : undefined,
        payload: typeof data.payload === 'object' && data.payload !== null ? (data.payload as Record<string, unknown>) : undefined,
      });

      ctx.send({ data: result }, result.duplicate ? 200 : 201);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to subscribe';
      ctx.badRequest(message);
    }
  },

  async sendNewsletter(ctx) {
    const expectedToken = process.env.NEWSLETTER_API_TOKEN?.trim();
    if (!expectedToken) {
      return ctx.internalServerError('NEWSLETTER_API_TOKEN is not configured');
    }

    const providedToken = readNewsletterToken(ctx);
    if (!providedToken || providedToken !== expectedToken) {
      return ctx.unauthorized('Invalid newsletter token');
    }

    try {
      const body = (ctx.request.body ?? {}) as Record<string, unknown>;
      const data = (body.data ?? body) as Record<string, unknown>;

      const result = await strapi.service('api::lead-event.lead-event').sendNewsletterCampaign({
        subject: typeof data.subject === 'string' ? data.subject : undefined,
        html: typeof data.html === 'string' ? data.html : undefined,
        text: typeof data.text === 'string' ? data.text : undefined,
        templateReferenceId: data.templateReferenceId as number | string | undefined,
        onlyEmails: Array.isArray(data.onlyEmails) ? (data.onlyEmails as string[]) : undefined,
        limit: typeof data.limit === 'number' || typeof data.limit === 'string' ? Number(data.limit) : undefined,
        dryRun: Boolean(data.dryRun),
      });

      ctx.send({ data: result }, 200);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Unable to send newsletter';
      ctx.badRequest(message);
    }
  },
}));

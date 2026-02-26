import { factories } from '@strapi/strapi';

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
}));

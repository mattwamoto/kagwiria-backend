import type { Core } from '@strapi/strapi';

type Permission = {
  action: string;
  subject: string | null;
};

const PUBLIC_PERMISSIONS: Permission[] = [
  { action: 'api::blog-post.blog-post.find', subject: 'api::blog-post.blog-post' },
  { action: 'api::blog-post.blog-post.findOne', subject: 'api::blog-post.blog-post' },
  { action: 'api::vlog.vlog.find', subject: 'api::vlog.vlog' },
  { action: 'api::vlog.vlog.findOne', subject: 'api::vlog.vlog' },
  { action: 'api::documentary.documentary.find', subject: 'api::documentary.documentary' },
  { action: 'api::documentary.documentary.findOne', subject: 'api::documentary.documentary' },
];

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const roleService = strapi.plugin('users-permissions').service('role');
  const permissionService = strapi.plugin('users-permissions').service('permission');
  const publicRole = await roleService.findOne({ type: 'public' });

  if (!publicRole) {
    return;
  }

  const existing = await permissionService.findMany({
    filters: { role: publicRole.id },
    populate: ['role'],
  });

  const existingSet = new Set(existing.map((perm: { action: string }) => perm.action));
  const toCreate = PUBLIC_PERMISSIONS.filter((perm) => !existingSet.has(perm.action));

  if (toCreate.length === 0) {
    return;
  }

  await Promise.all(
    toCreate.map((perm) =>
      permissionService.create({
        data: {
          action: perm.action,
          subject: perm.subject,
          role: publicRole.id,
        },
      })
    )
  );
}

async function seedIfMissing(strapi: Core.Strapi) {
  const [existingDoc] = await strapi.entityService.findMany('api::documentary.documentary', {
    filters: { slug: 'africa-ride-documentary' },
    limit: 1,
  });

  if (!existingDoc) {
    await strapi.entityService.create('api::documentary.documentary', {
      data: {
        title: 'Africa Ride Documentary',
        slug: 'africa-ride-documentary',
        status: 'in_development',
        logline: 'A journey across Africa where each kilometer funds education access.',
        synopsis: 'A long-form documentary following Kagwiria Murungi as she rides across Africa to build rural education infrastructure.',
      },
    });
  }

  const [existingVlog] = await strapi.entityService.findMany('api::vlog.vlog', {
    filters: { slug: 'ride-log-episode-1' },
    limit: 1,
  });

  if (!existingVlog) {
    await strapi.entityService.create('api::vlog.vlog', {
      data: {
        title: 'Ride Log Episode 1',
        slug: 'ride-log-episode-1',
        summary: 'First leg of the ride and the communities reached.',
        youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        publishedOn: new Date().toISOString().slice(0, 10),
      },
    });
  }

  const [existingBlog] = await strapi.entityService.findMany('api::blog-post.blog-post', {
    filters: { slug: 'why-the-ride-matters' },
    limit: 1,
  });

  if (!existingBlog) {
    await strapi.entityService.create('api::blog-post.blog-post', {
      data: {
        title: 'Why the Ride Matters',
        slug: 'why-the-ride-matters',
        excerpt: 'The ride is a funding engine for rural education access.',
        content: 'This journey turns visibility into funding and funding into infrastructure.',
        publishedOn: new Date().toISOString().slice(0, 10),
        authorName: 'Kagwiria Murungi',
        tags: ['impact', 'education', 'ride'],
      },
    });
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
    await seedIfMissing(strapi);
  },
};

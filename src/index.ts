import type { Core } from '@strapi/strapi';

type Permission = {
  action: string;
  subject: string | null;
};

const PUBLIC_PERMISSIONS: Permission[] = [
  { action: 'api::home-page.home-page.find', subject: 'api::home-page.home-page' },
  { action: 'api::rider-profile.rider-profile.find', subject: 'api::rider-profile.rider-profile' },
  { action: 'api::africa-ride-plan.africa-ride-plan.find', subject: 'api::africa-ride-plan.africa-ride-plan' },
  { action: 'api::governance-record.governance-record.find', subject: 'api::governance-record.governance-record' },
  { action: 'api::impact-metric.impact-metric.find', subject: 'api::impact-metric.impact-metric' },
  { action: 'api::impact-metric.impact-metric.findOne', subject: 'api::impact-metric.impact-metric' },
  { action: 'api::project.project.find', subject: 'api::project.project' },
  { action: 'api::project.project.findOne', subject: 'api::project.project' },
  { action: 'api::sponsor-tier.sponsor-tier.find', subject: 'api::sponsor-tier.sponsor-tier' },
  { action: 'api::sponsor-tier.sponsor-tier.findOne', subject: 'api::sponsor-tier.sponsor-tier' },
  { action: 'api::media-mention.media-mention.find', subject: 'api::media-mention.media-mention' },
  { action: 'api::media-mention.media-mention.findOne', subject: 'api::media-mention.media-mention' },
  { action: 'api::award.award.find', subject: 'api::award.award' },
  { action: 'api::award.award.findOne', subject: 'api::award.award' },
  { action: 'api::financial-summary.financial-summary.find', subject: 'api::financial-summary.financial-summary' },
  { action: 'api::financial-summary.financial-summary.findOne', subject: 'api::financial-summary.financial-summary' },
  { action: 'api::partner-logo.partner-logo.find', subject: 'api::partner-logo.partner-logo' },
  { action: 'api::partner-logo.partner-logo.findOne', subject: 'api::partner-logo.partner-logo' },
  { action: 'api::download-asset.download-asset.find', subject: 'api::download-asset.download-asset' },
  { action: 'api::download-asset.download-asset.findOne', subject: 'api::download-asset.download-asset' },
  { action: 'api::cta-config.cta-config.find', subject: 'api::cta-config.cta-config' },
  { action: 'api::cta-config.cta-config.findOne', subject: 'api::cta-config.cta-config' },
  { action: 'api::blog-post.blog-post.find', subject: 'api::blog-post.blog-post' },
  { action: 'api::blog-post.blog-post.findOne', subject: 'api::blog-post.blog-post' },
  { action: 'api::vlog.vlog.find', subject: 'api::vlog.vlog' },
  { action: 'api::vlog.vlog.findOne', subject: 'api::vlog.vlog' },
  { action: 'api::documentary.documentary.find', subject: 'api::documentary.documentary' },
  { action: 'api::documentary.documentary.findOne', subject: 'api::documentary.documentary' },
];

async function ensurePublicPermissions(strapi: Core.Strapi) {
  const [publicRole] = await strapi.entityService.findMany('plugin::users-permissions.role', {
    filters: { type: 'public' },
    limit: 1,
  });

  if (!publicRole) {
    return;
  }

  const existing = await strapi.entityService.findMany('plugin::users-permissions.permission', {
    filters: { role: { id: publicRole.id } },
    limit: 1000,
  });

  const existingSet = new Set(
    existing
      .map((perm: { action?: string }) => perm.action)
      .filter((action): action is string => typeof action === 'string' && action.length > 0)
  );
  const toCreate = PUBLIC_PERMISSIONS.filter((perm) => !existingSet.has(perm.action));

  if (toCreate.length === 0) {
    return;
  }

  await Promise.all(
    toCreate.map((perm) =>
      strapi.entityService.create('plugin::users-permissions.permission', {
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
        publishedAt: new Date().toISOString(),
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
        publishedAt: new Date().toISOString(),
      },
    });
  }

  const reelUrl = 'https://www.facebook.com/reel/2078515732931698/?mibextid=rS40aB7S9Ucbxw6v';
  const samplePosts = [
    {
      slug: 'books-for-my-other-children',
      title: 'Books for My Other Children',
      excerpt: 'A field reflection on learners in remote areas who ask for one thing first: books that stay with them.',
      content:
        `Sample notes inspired by the shared reel.\n\n` +
        `Listen to the video line that asks for books to continue reaching \"other children\". ` +
        `This post maps that voice to operations: stock planning, route scheduling, and sponsor-backed replenishment.\n\n` +
        `Source reel: ${reelUrl}`,
    },
    {
      slug: 'birth-giver-to-many-classrooms',
      title: 'From Birth Giver to Mother of Many Classrooms',
      excerpt: 'The road expands family: every school stop adds new children we are accountable to, not in words but in delivery.',
      content:
        `Sample notes inspired by the shared reel.\n\n` +
        `The phrase about being called \"birth giver\" reframes the mission from identity to responsibility. ` +
        `This entry documents how visibility becomes structured support for remote classrooms.\n\n` +
        `Source reel: ${reelUrl}`,
    },
    {
      slug: 'when-the-books-run-out',
      title: 'When the Books Run Out',
      excerpt: 'A practical look at replenishment: inventory gaps, transport constraints, and how sponsorship closes the loop.',
      content:
        `Sample notes inspired by the shared reel.\n\n` +
        `\"Please continue giving me those books\" is a supply-chain problem as much as it is an emotional moment. ` +
        `This post outlines replenishment cadence, field verification, and partner reporting.\n\n` +
        `Source reel: ${reelUrl}`,
    },
    {
      slug: 'hawa-wangu-tumeishanwo',
      title: 'Hawa Wangu Tumeishanwo: Why Supply Continuity Matters',
      excerpt: 'A story from the field on demand pressure and the operational discipline needed to keep access alive.',
      content:
        `Sample notes inspired by the shared reel.\n\n` +
        `Demand in underserved areas outpaces one-off donations. ` +
        `This article explains why continuity contracts and predictable funding are critical for literacy infrastructure.\n\n` +
        `Source reel: ${reelUrl}`,
    },
  ];

  for (const post of samplePosts) {
    const [existingBlog] = await strapi.entityService.findMany('api::blog-post.blog-post', {
      filters: { slug: post.slug },
      limit: 1,
    });

    if (!existingBlog) {
      await strapi.entityService.create('api::blog-post.blog-post', {
        data: {
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          publishedOn: new Date().toISOString().slice(0, 10),
          authorName: 'Kagwiria Murungi',
          tags: ['impact', 'education', 'ride', 'field-notes'],
          publishedAt: new Date().toISOString(),
        },
      });
    }
  }
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicPermissions(strapi);
    await seedIfMissing(strapi);
  },
};

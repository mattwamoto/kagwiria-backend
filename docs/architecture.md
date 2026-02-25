# Kagwiria Platform Architecture

## 1. Context and Goals

### Mission Context
Kagwiria's platform is a movement website centered on adventure riding as the engine for education access across arid regions. The product must present institutional credibility for sponsors, donors, media, and partners.

### Primary Goal
- Secure corporate sponsors and funding partners for the Africa Ride and education projects.

### Secondary Goals
- Attract donors.
- Build institutional credibility.
- Host impact reports and governance proof.
- Capture media interest.
- Build and segment an email list.

### Non-Goals
- This platform is not a personal travel blog.
- Content and UX must avoid hobby-blog layout patterns and charity/victim framing.

## 2. System Overview

### C4-Style Level 1 (System Context)
- **Users**: Corporate sponsors, international donors/foundations, media, adventure audience, internal content/admin team.
- **Kagwiria Platform**: Public site plus content and operational backend.
- **External Systems**: Stripe, M-Pesa provider, CRM/newsletter provider, analytics/error tracking tools, object storage.

### C4-Style Level 2 (Container View)
- **Next.js Web App**
  - Serves public pages, SEO metadata, forms, donation checkout UX, and sponsor CTAs.
  - Handles API routes for lead capture, payment intent creation, and webhook ingress where needed.
- **Strapi CMS/API**
  - Owns structured content, media metadata, governance records, impact metrics, CTA configs.
  - Provides role-based admin for editorial and trust/governance updates.
- **Postgres Database**
  - Stores CMS content, operational records (lead references, donation references, webhook processing state).
- **Object Storage + CDN**
  - Stores image assets and downloadable files (sponsorship deck, reports).
- **Payment Integrations**
  - Stripe for cards + recurring support.
  - Kenya-compatible M-Pesa provider for mobile money flows.
- **CRM/Newsletter Sync Service**
  - Receives normalized lead/donor events and manages segmentation.
- **Analytics and Observability**
  - Product analytics, uptime checks, logs, and error tracking.

## 3. Target Repository/Workspace Topology (Future Monorepo)

### Target Structure
- `apps/web` - Next.js application (public website).
- `apps/cms` - Strapi application (current codebase lands here during migration).
- `packages/ui` - Shared design tokens and reusable UI primitives.
- `packages/config` - Shared linting, TypeScript, and environment schema contracts.
- `packages/types` - Shared API/content contract types used by web and CMS integration layers.

### Current-to-Target Migration Path
1. Keep current repo operating as Strapi backend while docs and schema are stabilized.
2. Introduce Next.js app in either a temporary separate repo or `apps/web` in-place when workspace tooling is added.
3. Extract shared contracts into `packages/types` once endpoint/content shapes are fixed.
4. Move shared standards (env schema, lint rules) to `packages/config`.
5. Consolidate deploy automation to monorepo pipeline after both apps are production-ready.

## 4. Domain Model and Content Architecture

### Core Content Types from Briefing
- `HomePage`
- `RiderProfile`
- `ImpactMetric`
- `Project`
- `AfricaRidePlan`
- `SponsorTier`
- `MediaMention`
- `Award`
- `GovernanceRecord`
- `FinancialSummary`
- `PartnerLogo`
- `DownloadAsset`
- `CTAConfig`
- `SEOPageMeta`

### Required Fields and Relations
- `HomePage`
  - Required: `heroHeadline`, `heroSubline`, `primaryCta`, `secondaryCta`, `bioSnapshot`, `featuredProjectIds[]`, `impactMetricIds[]`, `sponsorshipSection`, `emailCapture`, `seoMetaId`.
  - Relations: references `Project`, `ImpactMetric`, `CTAConfig`, `SEOPageMeta`.
- `RiderProfile`
  - Required: `journeySince`, `countiesCompleted`, `philosophy`, `ridingToAccessNarrative`, `portraitAssetIds[]`, `seoMetaId`.
- `ImpactMetric`
  - Required: `key`, `label`, `value`, `asOfDate`, `evidenceAssetId?`, `sortOrder`.
- `Project`
  - Required: `slug`, `title`, `summary`, `status`, `bodyRichText`, `heroAssetId`, `galleryAssetIds[]`, `ctaId`, `seoMetaId`.
- `AfricaRidePlan`
  - Required: `overview`, `projectedCountries[]`, `budgetSummary`, `sponsorTierIds[]`, `mediaStrategy`, `proposalAssetId`, `ctaId`.
- `SponsorTier`
  - Required: `name`, `priceRange`, `benefits[]`, `brandExposure[]`, `availabilityStatus`.
- `MediaMention`
  - Required: `title`, `publisher`, `publishedAt`, `url`, `logoAssetId?`, `type`.
- `Award`
  - Required: `title`, `awardingBody`, `awardedAt`, `description`.
- `GovernanceRecord`
  - Required: `cboRegistrationNumber`, `boardOverview`, `accountabilityStatement`, `supportingAssetIds[]`.
- `FinancialSummary`
  - Required: `period`, `incomeSummary`, `expenseSummary`, `narrative`, `reportAssetId?`.
- `PartnerLogo`
  - Required: `name`, `logoAssetId`, `url?`, `category`.
- `DownloadAsset`
  - Required: `title`, `assetId`, `type`, `accessPolicy`, `version`, `publishedAt`.
- `CTAConfig`
  - Required: `label`, `destinationType`, `destination`, `trackingEventName`, `placement`.
- `SEOPageMeta`
  - Required: `title`, `description`, `canonicalUrl`, `ogImageAssetId?`, `keywords[]`.

### Publish Workflow and Draft Policy
- Use Strapi draft/publish for all public content types.
- Enforce two-step workflow for governance/financial content: editor drafts -> reviewer publishes.
- Require scheduled publish for time-sensitive announcements and reports.

### Localization Strategy
- English-first initial release.
- Data model must keep locale support enabled where practical for future Swahili/regional expansion.

### Slug and URL Governance
- Slugs are immutable once published unless migration redirect is defined.
- Page URL ownership:
  - Static routes for core sections.
  - Dynamic slugs for projects/media/resources.
- Keep lowercase, hyphen-separated slugs; reserve path segments for nav roots.

## 5. Frontend Information Architecture

### Route Map
- `/` - Home
- `/the-rider`
- `/the-impact`
- `/desert-pages`
- `/africa-ride`
- `/partners-media`
- `/get-involved`
- `/contact`

### Per-Page Data Dependencies and Rendering Strategy
- `/` (ISR): `HomePage`, top `ImpactMetric`, featured `Project`, key `Award`, selected `MediaMention`, `CTAConfig`.
- `/the-rider` (SSG/ISR): `RiderProfile`, timeline assets, SEO metadata.
- `/the-impact` (ISR): grouped `Project` entries for impact programs, `ImpactMetric`, `FinancialSummary`, `GovernanceRecord` excerpt.
- `/desert-pages` (ISR): `Project` filtered by Desert Pages program + caravan cost/pricing content.
- `/africa-ride` (ISR with short revalidate): `AfricaRidePlan`, `SponsorTier[]`, `DownloadAsset` for proposal.
- `/partners-media` (ISR): `PartnerLogo[]`, `MediaMention[]`, `Award[]`.
- `/get-involved` (SSR): donation options, payment config state, `CTAConfig`, lead form config.
- `/contact` (SSR): contact form config, speaking invite pathways, organizational contact metadata.

### SEO Metadata Strategy
- Use per-page `SEOPageMeta` with canonical URLs and OG fields.
- Ensure strategic keywords appear in titles/descriptions/content blocks:
  - Female adventure rider Africa
  - Motorcycle travel Kenya
  - Rural education Kenya
  - Mobile libraries Africa
  - Turkana literacy
- Generate structured data for organization, article/project, and downloadable reports where relevant.

## 6. Integration Architecture

### Payment Integration
- Stripe handles card payments and recurring subscriptions.
- M-Pesa flow handled through a Kenya-compatible provider adapter.
- Next.js server routes create payment intent/session and return normalized checkout payload.

### Newsletter/CRM Integration Flow
1. User submits sponsor/donor/newsletter form.
2. Next.js route validates payload and writes lead event.
3. Lead is persisted in Strapi operational collection.
4. Lead is forwarded to CRM/newsletter provider.
5. Sync status and external IDs are stored for retries/audit.

### Asset Delivery and Access Policy
- Public assets (images, approved reports) served via object storage + CDN.
- Sensitive assets (latest sponsorship deck versions) controlled via signed URLs or gated form workflows.
- `DownloadAsset` tracks versioning and publish state.

### Webhooks and Retry Strategy
- Endpoints: `POST /api/webhooks/stripe`, `POST /api/webhooks/mpesa`, `POST /api/webhooks/crm` (optional provider callback).
- Verify signatures before processing.
- Store idempotency key/event ID and processing status.
- Retry transient failures with exponential backoff; dead-letter unresolved events for manual handling.

## 7. Security, Trust, and Compliance
- Use Strapi RBAC roles: `ContentEditor`, `Reviewer`, `AdminOps`.
- Separate secrets per environment; never store in source control.
- Apply least-privilege API tokens between web app and CMS.
- Treat donor/supporter contact details as PII; mask in logs and restrict exports.
- Maintain publication controls for governance and financial trust content.
- Enable admin audit trails for sensitive content edits.

## 8. Scalability and Reliability

### Baseline: Single VPS
- Host Next.js and Strapi behind reverse proxy on one VPS for initial launch.
- Use managed Postgres where feasible; otherwise isolate DB with strict backup policy.

### Scale-Up Path
- Split web and CMS workloads onto separate compute services.
- Move media to dedicated object storage/CDN.
- Add queue worker service for webhook and CRM sync processing.

### Caching and CDN
- Cache static/ISR pages at edge.
- Use tag/path-based revalidation on Strapi publish events.

### Backup and Recovery Targets
- DB backup frequency: daily full + point-in-time or incremental logs.
- RPO target: <= 24 hours initial baseline; RTO target: <= 4 hours.
- Test restoration process on a scheduled cadence.

### Job Queue Needs
- Outbound emails.
- Webhook retries.
- CRM sync retries.
- Scheduled report publication tasks.

## 9. Observability
- Centralized structured logs for web and CMS.
- Uptime checks for public routes and core APIs.
- Error tracking for server and client exceptions.
- Metrics dashboard with funnel KPIs:
  - sponsor inquiries
  - donation conversion
  - newsletter growth
  - deck downloads
- Alerting thresholds for payment webhook failures and form submission drops.

## 10. Architecture Decisions (ADRs)

### ADR-001: Next.js + Strapi
- **Decision**: Use Next.js for public delivery and Strapi for content/operations backend.
- **Rationale**: SEO and performance needs plus strong editorial workflow and structured content control.
- **Consequence**: Requires explicit API contracts and integration reliability patterns.

### ADR-002: Single VPS Baseline
- **Decision**: Initial deployment on a single VPS with reverse proxy.
- **Rationale**: Faster launch and lower early operating cost.
- **Consequence**: Tighter capacity limits; must define scale-out triggers and migration path.

### ADR-003: Stripe + M-Pesa Split-Payments
- **Decision**: Stripe for cards/recurring and dedicated M-Pesa provider for mobile money.
- **Rationale**: Best fit for international + Kenyan payment realities.
- **Consequence**: Requires a provider adapter layer and normalized payment/webhook schema.

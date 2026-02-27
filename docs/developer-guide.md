# Developer Guide

## 1. Purpose and Audience
This guide is for engineers onboarding to build and operate the Kagwiria platform across CMS, frontend, integrations, and deployment.

## 2. Current State vs Target State

### Current State
- This repository is a Strapi v5 backend scaffold.
- Default SQLite setup exists for local development.
- No production-ready content model or public Next.js app is committed yet.

### Target State
- Next.js web application + Strapi CMS/API under a future monorepo model.
- Shared contracts for types, environment variables, and integration schemas.
- Production-grade payment, CRM/newsletter, and observability pipelines.

### Phased Convergence
1. Stabilize Strapi content model and editorial workflow.
2. Build Next.js website against stable CMS contracts.
3. Introduce shared type/config packages.
4. Consolidate CI/CD and operations standards.

## 3. Local Development Prerequisites

### Runtime and Tooling
- Node.js: `>=20 <=24.x`
- npm: `>=6`
- Git and bash-compatible shell

### Environment Management
- Copy `.env.example` to `.env` for CMS local run.
- Do not commit secrets.
- Use per-service prefixes for new variables (`WEB_`, `CMS_`, `DB_`, etc.).

### Service Accounts (Target)
- Stripe test account.
- M-Pesa sandbox provider credentials.
- CRM/newsletter sandbox account.
- Optional object storage sandbox bucket.

### Local Services
- Current default: SQLite (already wired).
- Recommended near-term: local Postgres for contract parity with production.
- Optional: object storage emulator (for signed URL and upload testing).

## 4. Environment Variables Contract

### `web` (Next.js)
- `WEB_BASE_URL` (required)
- `WEB_CMS_API_URL` (required)
- `WEB_CMS_API_TOKEN` (required, server-only)
- `WEB_REVALIDATE_SECRET` (required)

### `cms` (Strapi)
- `HOST` (required)
- `PORT` (required)
- `APP_KEYS` (required)
- `API_TOKEN_SALT` (required)
- `ADMIN_JWT_SECRET` (required)
- `TRANSFER_TOKEN_SALT` (required)
- `JWT_SECRET` (required)
- `ENCRYPTION_KEY` (required)

### `db`
- `DB_CLIENT` (required for non-default DB)
- `DB_HOST` (required for Postgres)
- `DB_PORT` (required for Postgres)
- `DB_NAME` (required for Postgres)
- `DB_USER` (required for Postgres)
- `DB_PASSWORD` (required for Postgres)
- `DB_SSL` (optional)

### `storage`
- `STORAGE_PROVIDER` (required when not local)
- `STORAGE_BUCKET` (required)
- `STORAGE_REGION` (optional by provider)
- `STORAGE_ACCESS_KEY` (required)
- `STORAGE_SECRET_KEY` (required)

### `stripe`
- `STRIPE_SECRET_KEY` (required)
- `STRIPE_WEBHOOK_SECRET` (required)
- `STRIPE_PRICE_MONTHLY_SUPPORTER` (optional)

### `mpesa`
- `MPESA_CONSUMER_KEY` (required)
- `MPESA_CONSUMER_SECRET` (required)
- `MPESA_PASSKEY` (required)
- `MPESA_SHORTCODE` (required)
- `MPESA_CALLBACK_URL` (required; set to public callback route, e.g. `http://localhost:3000/api/webhooks/mpesa` for local proxy)
- `MPESA_API_BASE` (optional; defaults to Safaricom sandbox base URL)
- `MPESA_WEBHOOK_SECRET` (optional; only when provider supports signature headers)

### `crm`
- `CRM_PROVIDER` (required)
- `CRM_API_KEY` (required)
- `CRM_LIST_SPONSORS` (optional)
- `CRM_LIST_DONORS` (optional)
- `CRM_LIST_NEWSLETTER` (optional)

### `analytics`
- `ANALYTICS_PROVIDER` (required)
- `ANALYTICS_WRITE_KEY` (required)
- `SENTRY_DSN` (optional but recommended)

## 5. Runbook: Local Startup

### Backend Startup (Current)
1. Install dependencies: `npm install`
2. Ensure `.env` exists and secrets are populated.
3. Start Strapi dev server: `npm run develop`
4. Open admin at `http://localhost:1337/admin`

### Frontend Startup (Target)
1. Start Next.js app in `apps/web` (`npm run dev` or workspace equivalent).
2. Ensure web app can reach CMS API URL and token.
3. Validate homepage content fetch and fallback rendering.

### Seed Strategy and Sample Content
- Maintain a minimal seed set for required nav pages and CTA blocks.
- Use deterministic fixture names for content validation tests.
- Include sample `DownloadAsset` for sponsorship deck flow.

## 6. Strapi Modeling Standards
- Use singular API IDs with clear collection naming.
- Prefer components for reusable blocks (`CTA`, `SEO`, metrics cards).
- Enforce explicit relation ownership and avoid circular dependency unless intentional.
- Enable draft/publish for all public content types.
- Require reviewer role for governance and financial entries before publish.
- Create scoped API tokens for web read-only access.
- Avoid embedding operational secrets in content fields.

## 7. Frontend Data Access Standards
- Use typed API client wrappers; avoid direct fetch calls in page components.
- Normalize CMS responses into view models close to server boundary.
- Revalidation policy:
  - ISR for content pages.
  - SSR for payment/transaction-sensitive pages.
- Missing content behavior:
  - Render controlled fallback sections.
  - Emit structured logs and alert when required content is absent.
  - Do not hard-fail entire page for optional modules.

## 8. Integration Implementation Notes

### Payment Orchestration
- `POST /api/donation/create-intent`
  - Accepts amount/currency/frequency/provider choice.
  - Returns provider-specific checkout details from normalized backend contract.
- Stripe handles one-time and recurring intents/subscriptions.
- M-Pesa adapter handles STK push/callback lifecycle.

### Webhooks, Verification, Idempotency
- `POST /api/webhooks/stripe`
- `POST /api/webhooks/mpesa`
- `POST /api/webhooks/{provider}`
- In local/dev topology, expose callback via Next.js route and proxy to Strapi:
  - `apps/web/pages/api/webhooks/[provider].js` -> `http://localhost:1337/api/webhooks/:provider`
- Verify signatures before parse/processing.
- Persist event IDs and idempotency keys.
- Mark events as `received`, `processed`, `failed`, `dead_letter`.

### CRM/Newsletter Sync
- `POST /api/lead` validates and normalizes submissions.
- Write lead event to operational store before external sync.
- Retry transient CRM failures; preserve failure reason and retry count.

## 9. Testing Strategy

### Unit Tests
- Validation logic for lead and donation payloads.
- Payment adapter normalizers.
- SEO metadata composers.

### Integration Tests
- Next.js API routes to provider stubs.
- Strapi content contract shape tests.
- Webhook signature and idempotency behavior.

### Smoke Checks
- Core routes render with seeded content.
- Forms submit and produce expected operational records.
- Deck download CTA links resolve and track.

### Documentation Quality Checks
- Traceability: each briefing requirement maps to architecture or dev guide section.
- Route coverage: all required navigation routes have data and rendering strategies.
- Integration completeness: payment, CRM/newsletter, and PDF flows include failure handling.
- Operational readiness: backup, monitoring, rollback basics are documented.
- Onboarding test: fresh engineer can run backend using README + this guide.

## 10. Deployment and Operations (Single VPS Baseline)

### Build and Release
1. Build Strapi admin: `npm run build`
2. Start production server: `npm run start`
3. Deploy web app and CMS behind reverse proxy (`nginx`/equivalent).

### Process Management and Reverse Proxy
- Use process supervisor (`systemd`/pm2) for restart policy.
- Route `/` to Next.js and `/cms` or internal hostname to Strapi admin/API.
- Terminate TLS at proxy and forward secure headers.

### Backup, Restore, Incident-First Checks
- Daily DB backup with retention policy.
- Weekly restore drill to non-production environment.
- Incident-first checklist:
  - verify app health
  - verify DB connectivity
  - verify webhook backlog
  - verify payment callback processing

## 11. Definition of Done (Feature-Level)
- Code implemented with tests.
- Documentation updated (`architecture.md` and/or this guide as needed).
- Analytics events instrumented.
- SEO metadata configured.
- Accessibility checks completed for user-facing changes.
- Operational implications noted (alerts, backups, retries).

## 12. Troubleshooting

### CMS Auth Misconfiguration
- Symptoms: 401/403 from CMS API.
- Checks: token scope, role permissions, env variable mismatches.

### Webhook Signature Failures
- Symptoms: rejected events and no donation status update.
- Checks: raw body handling, webhook secret, provider mode mismatch (test/live).

### Payment Callback Mismatch
- Symptoms: payment succeeded on provider but internal state stays pending.
- Checks: idempotency key mapping, callback endpoint URL, event normalization logic.

### Stale Cache After Publish
- Symptoms: CMS shows published content but site unchanged.
- Checks: ISR revalidate config, publish webhook trigger, CDN cache invalidation.

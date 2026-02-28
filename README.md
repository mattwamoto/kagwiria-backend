# Kagwiria Platform Backend (Strapi)

This repository is the CMS/backend foundation for the Kagwiria Murungi official platform, designed to convert ride-led storytelling into sponsor partnerships, donations, and measurable education impact.

## Project Purpose
The platform supports a mission cycle:
1. Ride generates story.
2. Story generates visibility.
3. Visibility generates funding.
4. Funding builds infrastructure.
5. Infrastructure builds legacy.

Primary product objective is to secure corporate sponsors and funding partners for the Africa Ride and education initiatives.

## Architecture At A Glance

### Current State
- Strapi v5 backend scaffold in this repo.
- Local development defaults to SQLite.
- Content model and integration contracts are being formalized.

### Target State (Future Monorepo)
- `apps/web` - Next.js public website.
- `apps/cms` - Strapi CMS (this codebase).
- `packages/types` - shared content/API contracts.
- `packages/config` - shared lint and env schemas.
- `packages/ui` - shared design primitives.

Deployment baseline is a single VPS with reverse proxy, with a defined path to split services as traffic and operational load grow.

## Quick Start (Current Backend)
1. Install dependencies:

```bash
npm install
```

2. Create local environment file:

```bash
cp .env.example .env
```

3. Update required secrets in `.env` (`APP_KEYS`, `JWT_SECRET`, etc.).

4. Run Strapi in development mode:

```bash
npm run develop
```

5. Open admin panel:
- `http://localhost:1337/admin`

## Installed Strapi Plugins
- `strapi-plugin-oembed` (YouTube and other embed providers)
- `@strapi/plugin-seo`
- `strapi-google-analytics-dashboard`
- `strapi-plugin-publisher` (scheduled publish/unpublish)
- `strapi-plugin-email-designer-5`
- `@strapi/provider-email-nodemailer`
- `@strapi/provider-upload-cloudinary`
- `@strapi-community/strapi-provider-upload-google-cloud-storage`

The active upload provider is controlled by `UPLOAD_PROVIDER` in `.env`:
- `local` (default)
- `cloudinary`
- `gcs`

## Newsletter Flow
- Public subscribe endpoint: `POST /api/newsletter/subscribe`
- Protected campaign endpoint: `POST /api/newsletter/send` with `Authorization: Bearer <NEWSLETTER_API_TOKEN>`
- Homepage email capture now uses `/api/newsletter/subscribe`.

Recommended setup:
1. Configure SMTP env vars (`SMTP_*`) in `.env`.
2. In Strapi Admin, create Email Designer templates and set:
   - `NEWSLETTER_WELCOME_TEMPLATE_ID`
   - `NEWSLETTER_BROADCAST_TEMPLATE_ID`
3. Restart Strapi and test:
   - subscribe from homepage
   - campaign send via API (use `dryRun: true` first)

## Contact Auto-Reply
- Contact form submissions (`source: contact`) trigger an automatic reply email.
- Delivery order:
  1. `email-designer-5` template (`CONTACT_AUTOREPLY_TEMPLATE_ID`) if configured
  2. fallback plain HTML/text via Strapi `email` plugin (nodemailer provider)
- Control flags:
  - `CONTACT_AUTOREPLY_ENABLED=true|false`
  - `CONTACT_AUTOREPLY_TEMPLATE_ID=<template-id>`
  - `CONTACT_AUTOREPLY_SUBJECT=...`

## Docker Quick Start (Backend + Frontend + External Postgres)
1. Create env file for Docker:

```bash
cp .env.docker.example .env
```

2. Set your external Postgres credentials in `.env`:
- `DATABASE_HOST`
- `DATABASE_PORT`
- `DATABASE_NAME`
- `DATABASE_USERNAME`
- `DATABASE_PASSWORD`
- optional `DATABASE_URL`

3. Start services:

```bash
docker compose up --build
```

4. Open apps:
- Frontend: `http://localhost:3000`
- Strapi Admin: `http://localhost:1337/admin`

Notes:
- `docker-compose.yml` expects an external Postgres database and runs Strapi with `DATABASE_CLIENT=postgres`.
- Next.js uses `CMS_API_URL=http://cms:1337` (server-side) and `NEXT_PUBLIC_CMS_URL=http://localhost:1337` (browser-side).
- Stop containers with `docker compose down` (add `-v` to also remove named volumes).

## Documentation Index
- [Architecture](docs/architecture.md)
- [Developer Guide](docs/developer-guide.md)
- [Content API](docs/api-content.md)
- [Admin Content Guide](docs/admin-content.md)

## Next.js Reader Stub
There is a minimal Next.js app in `apps/web` that reads blog, vlog, and documentary content from Strapi.
It is intended as a quick verification client, not production UI.

## Contribution Expectations
- Keep changes scoped and documented.
- Update docs when adding or changing content models, interfaces, or integrations.
- Prefer small PRs with clear rollback strategy.

## Branch and PR Note
- Use short-lived feature branches.
- PRs should include:
  - purpose and scope
  - test evidence (or reason tests were skipped)
  - operational impact (env vars, deploy steps, migration notes)

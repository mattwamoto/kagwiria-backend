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

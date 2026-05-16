# Sherwood's Gallery

Houston fine art gallery website built on **Next.js 15 + Payload CMS 3 + Postgres**.

- **Public site:** `https://sherwoodsgallery.com` (production) · `http://localhost:3000` (dev)
- **Admin:** `https://sherwoodsgallery.com/admin` · `http://localhost:3000/admin`
- **Hosting:** xCloud (Node + Postgres)
- **Built by:** [WebWize](https://webwize.com)

---

## Local development

### Prerequisites

- **Node 22 LTS** (via [fnm](https://github.com/Schniz/fnm) recommended)
- **pnpm 10 or 11**
- A Postgres connection string (Neon free tier or local Docker — see below)

### Setup

```bash
# 1. Clone & install
git clone https://github.com/bwpaint/SherwoodREACT.git sherwoods-gallery
cd sherwoods-gallery
pnpm install

# 2. Configure environment
cp .env.example .env
# Edit .env and fill in DATABASE_URI + PAYLOAD_SECRET (see .env.example for instructions)

# 3. Start dev server
# Currently use the direct binary to bypass a pnpm 11 deps-check issue:
node_modules/.bin/next dev
# (Or once that's resolved: pnpm dev)

# 4. Open admin
# http://localhost:3000/admin → create your first user
```

### Database options

**Neon (recommended, free):** sign up at [neon.tech](https://neon.tech), create a project, copy the pooled connection string into `DATABASE_URI`.

**Local Docker:** if you have Docker Desktop running, `docker compose up -d` will start Postgres on `localhost:5432` using the credentials in `docker-compose.yml`. Then set `DATABASE_URI=postgresql://sherwoods:sherwoods_dev_pw@localhost:5432/sherwoods_gallery`.

---

## Project structure

```
src/
├── app/
│   ├── (frontend)/    ← Public site routes
│   └── (payload)/     ← Admin UI + API routes
├── collections/        ← Payload collections (data model)
└── payload.config.ts   ← CMS configuration
```

---

## Scripts

| Command | Purpose |
|---|---|
| `pnpm install` | Install dependencies |
| `node_modules/.bin/next dev` | Run dev server |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm generate:types` | Regenerate `payload-types.ts` from collections |
| `pnpm lint` | ESLint |

---

## Deployment

See `tasks/plan.md` for the full deployment plan to xCloud.

---

## Documentation

- Project plan: [tasks/plan.md](../../tasks/plan.md)
- Task list: [tasks/todo.md](../../tasks/todo.md)
- Design handoff: [sherwoodsgallery_handoff.pdf](../../sherwoodsgallery_handoff.pdf)

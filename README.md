# Sherwood's Gallery

Houston fine art gallery website — **Next.js 15 + Payload CMS 3 + Postgres**.

- 🎨 **Public site:** `https://sherwoodsgallery.com` (production) · `http://localhost:3000` (dev)
- 🛠 **Admin:** `https://sherwoodsgallery.com/admin`
- 🚀 **Hosting:** xCloud (single VPS running Node + Postgres)
- 🏷 **Built by:** [WebWize](https://webwize.com)

---

## Features

- Editorial design system (Playfair/Lato/Cormorant, turquoise/ivory/gold palette per handoff)
- CMS-driven content: pages, artists, galleries, paintings, posts, site settings
- Relational data model: Painting → Artist (M:1), Painting → Galleries (M:N), `isRecentAcquisition` flag
- Block-based pages (hero, text, blockquote, timeline, image-break, CTA-band)
- Contact form with Mailgun email + Cloudflare Turnstile spam protection + IP rate limit
- Newsletter signup with admin CSV export
- Blog with draft/published states and rich text
- Dynamic sitemap + JSON-LD ArtGallery schema + GA4 ready
- Lighthouse-ready (target ≥90 on all four categories)

---

## Local development

### Prerequisites

- **Node 22 LTS** (via [fnm](https://github.com/Schniz/fnm) recommended)
- **pnpm 10 or 11**
- A Postgres connection string (Neon free tier easiest — see [neon.tech](https://neon.tech))

### Setup

```bash
# 1. Clone & install
git clone https://github.com/bwpaint/SherwoodREACT.git sherwoods-gallery
cd sherwoods-gallery
pnpm install

# 2. Configure environment
cp .env.example .env
# Edit .env: DATABASE_URI + PAYLOAD_SECRET at minimum

# 3. Start dev server (bypass pnpm wrapper due to pnpm 11 quirk)
node_modules/.bin/next dev

# 4. First-time setup
# Visit http://localhost:3000/admin → create your first user
# Then optionally: pnpm seed   (loads 4 artists, 5 galleries, 3 pages)
```

---

## Project structure

```
src/
├── app/
│   ├── (frontend)/    ← Public site routes
│   │   ├── page.tsx                    Home
│   │   ├── galleries/page.tsx          Art Galleries (anchor sections)
│   │   ├── artists/page.tsx            Artists (with bios + sample works)
│   │   ├── history/page.tsx            History (timeline)
│   │   ├── contact/page.tsx            Contact form + map
│   │   ├── blog/page.tsx               Blog index
│   │   ├── blog/[slug]/page.tsx        Blog post detail
│   │   ├── styleguide/page.tsx         Internal design reference
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── (payload)/    ← Payload admin (auto-generated)
│   ├── actions/       ← Server actions (contact, newsletter)
│   ├── robots.ts      ← /robots.txt
│   └── sitemap.ts     ← /sitemap.xml
├── collections/        ← Payload collections (data model)
│   ├── Users.ts        Artists.ts        Galleries.ts
│   ├── Media.ts        Paintings.ts      Pages.ts
│   ├── Posts.ts        FormSubmissions.ts
│   └── NewsletterSubscribers.ts
├── globals/
│   └── SiteSettings.ts    Contact info, hours, social
├── components/
│   ├── site/          ← Public site components
│   │   ├── Navigation.tsx        Footer.tsx
│   │   ├── HeroSection.tsx       WelcomeBand.tsx
│   │   ├── GalleryCard.tsx       PaintingCard.tsx
│   │   ├── ArtistCard.tsx        ArtistSection.tsx
│   │   ├── GallerySection.tsx    GalleryPills.tsx
│   │   ├── ContactForm.tsx       NewsletterSignup.tsx
│   │   ├── VisitCTABand.tsx      PostCard.tsx
│   │   ├── Blocks.tsx            ← block dispatcher
│   │   ├── Analytics.tsx         JsonLd.tsx
│   │   └── blocks/               ← block components
│   └── ui/            ← Generic primitives
│       ├── Button.tsx            Container.tsx
│       ├── EyebrowHeading.tsx    GoldRule.tsx
│       ├── RevealSection.tsx     RichText.tsx
│       └── cn.ts
├── lib/
│   ├── payload.ts        Typed Payload local-API helpers
│   ├── seo.ts            generateMetadata helper
│   ├── access.ts         Access-control helpers
│   ├── slug.ts           Slug auto-generation hooks
│   ├── rate-limit.ts     In-memory IP rate limiter
│   ├── mailgun.ts        Mailgun sender
│   ├── turnstile.ts      Cloudflare Turnstile verifier
│   └── contact-options.ts
└── payload.config.ts
```

---

## Scripts

| Command | Purpose |
|---|---|
| `pnpm install` | Install dependencies |
| `node_modules/.bin/next dev` | Run dev server (3000) |
| `pnpm build` | Production build |
| `pnpm start` | Run production server |
| `pnpm seed` | Seed DB with baseline artists/galleries/pages |
| `pnpm seed:reset` | Reset + reseed (destructive) |
| `pnpm generate:types` | Regenerate `payload-types.ts` from collections |
| `pnpm lint` | ESLint |

---

## Deployment

See [DEPLOY.md](./DEPLOY.md) for the full xCloud production deploy guide. The repo includes:

- `ecosystem.config.cjs` — PM2 process manager
- `deploy/nginx/sherwoodsgallery.conf` — nginx reverse proxy
- `deploy/backup.sh` — nightly pg_dump + media rsync (14-day retention)
- `.github/workflows/deploy.yml` — auto-deploy on push to main via SSH

---

## Client guide

See [CLIENT_GUIDE.md](./CLIENT_GUIDE.md) for the editor-facing walkthrough.

---

## Documentation

- [DEPLOY.md](./DEPLOY.md) — Production deployment to xCloud
- [CLIENT_GUIDE.md](./CLIENT_GUIDE.md) — Editor/admin reference for the client
- Plan: `../../tasks/plan.md` (outside this repo)
- Original design handoff: `../../sherwoodsgallery_handoff.pdf`

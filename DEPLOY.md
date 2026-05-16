# Deployment Guide — Sherwood's Gallery on xCloud

This guide walks through deploying the production site to a single xCloud VPS running both Next.js (port 3001 internally) and Payload, with Postgres (Neon recommended; xCloud-managed also works), nginx reverse proxy, PM2 process manager, and Let's Encrypt SSL.

---

## Prerequisites (on the xCloud server)

```bash
# Node 22 LTS via fnm
curl -fsSL https://fnm.vercel.app/install | bash
source ~/.bashrc
fnm install 22 && fnm default 22

# pnpm
npm install -g pnpm@latest

# Other tools
sudo apt update && sudo apt install -y nginx git certbot python3-certbot-nginx
npm install -g pm2

# (Optional) Postgres locally if not using Neon
sudo apt install -y postgresql postgresql-contrib
```

---

## 1. Clone the repository

```bash
mkdir -p /var/www
cd /var/www
git clone https://github.com/bwpaint/SherwoodREACT.git sherwoods-gallery
cd sherwoods-gallery
pnpm install
```

---

## 2. Configure environment

```bash
cp .env.example .env
nano .env
```

Required values:

| Variable | Notes |
|---|---|
| `DATABASE_URI` | Neon connection string (recommended) or local Postgres URI |
| `PAYLOAD_SECRET` | Generate with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` — **rotate** the dev value |
| `NEXT_PUBLIC_SITE_URL` | `https://sherwoodsgallery.com` |
| `MAILGUN_API_KEY` | from Mailgun dashboard |
| `MAILGUN_DOMAIN` | e.g. `mg.sherwoodsgallery.com` |
| `MAILGUN_FROM_EMAIL` | e.g. `no-reply@mg.sherwoodsgallery.com` |
| `MAILGUN_NOTIFY_TO` | `art@sherwoodsgallery.com` |
| `TURNSTILE_SITE_KEY` | Cloudflare Turnstile public key |
| `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile secret |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Same as `TURNSTILE_SITE_KEY` (exposed to client) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` |

---

## 3. Build for production

```bash
pnpm build
```

This compiles Next.js + Payload into `.next/`. Should complete in 2-5 min on a 2-vCPU box.

---

## 4. Configure PM2

A starter `ecosystem.config.cjs` is in the repo root. Adjust paths if needed, then:

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd        # outputs a command — run it as instructed
```

PM2 will auto-start the app on reboot.

---

## 5. Configure nginx

Copy the sample config and edit the domain + paths:

```bash
sudo cp deploy/nginx/sherwoodsgallery.conf /etc/nginx/sites-available/sherwoodsgallery
sudo ln -s /etc/nginx/sites-available/sherwoodsgallery /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

---

## 6. SSL with Let's Encrypt

```bash
sudo certbot --nginx -d sherwoodsgallery.com -d www.sherwoodsgallery.com
```

Certbot will rewrite the nginx config to listen on 443 and auto-renew.

---

## 7. Backup cron

Copy `deploy/backup.sh` to `/usr/local/bin/sherwoods-backup.sh`, then:

```bash
sudo chmod +x /usr/local/bin/sherwoods-backup.sh
sudo crontab -e
# Add this line for nightly 3am backups:
0 3 * * * /usr/local/bin/sherwoods-backup.sh >> /var/log/sherwoods-backup.log 2>&1
```

---

## 8. Auto-deploy on push to main

xCloud's git hooks make this trivial. Alternatively, GitHub Actions:

`.github/workflows/deploy.yml` (already in repo) — runs `ssh deploy@xcloud "cd /var/www/sherwoods-gallery && git pull && pnpm install && pnpm build && pm2 reload sherwoods"` on every push to `main`.

You'll need to add SSH key + host as GitHub secrets:
- `XCLOUD_HOST` — server IP or hostname
- `XCLOUD_USER` — deploy user
- `XCLOUD_SSH_KEY` — private key contents

---

## 9. Initial admin user

```bash
# Once the app is running, visit https://sherwoodsgallery.com/admin
# Payload will show "Create your first user" form. Use the client's email.
```

---

## DNS cutover

1. Lower TTL on existing DNS A record to 300 seconds, 24 hours before cutover
2. Point A record to xCloud server's public IP
3. Wait for propagation (5-30 min after TTL expires)
4. Verify https://sherwoodsgallery.com loads and SSL is valid
5. Raise TTL back to 3600 seconds

---

## Smoke checklist post-deploy

- [ ] Home page loads at https://sherwoodsgallery.com
- [ ] All 6 routes return 200 (/, /galleries, /artists, /history, /contact, /blog)
- [ ] /admin loads admin login
- [ ] Sitemap at /sitemap.xml lists all routes
- [ ] /robots.txt blocks /admin
- [ ] Contact form submits successfully (check inbox + admin)
- [ ] Newsletter signup persists (check admin)
- [ ] SSL grade A (test at ssllabs.com)
- [ ] Lighthouse desktop + mobile both ≥90 on Performance/SEO/A11y/Best Practices
- [ ] Backup ran overnight; `~/backups/` has yesterday's snapshot

---

## Troubleshooting

**`pm2 reload` shows app as errored:**
```bash
pm2 logs sherwoods --lines 100
```

**Postgres connection errors:**
- Neon: connection string includes `?sslmode=require&channel_binding=require`
- Local: check `pg_hba.conf` allows `localhost` connections

**Tailwind not applying styles:**
- Make sure both `tailwind.config.cjs` and `postcss.config.cjs` use absolute paths (they reference `__dirname`)
- `pnpm build` regenerates the CSS; restart PM2 after build

**Build OOM on small box:**
- The `build` script already sets `NODE_OPTIONS=--max-old-space-size=8000`. If still OOMing, upgrade to 4GB RAM or use `pnpm build --no-mangle`.

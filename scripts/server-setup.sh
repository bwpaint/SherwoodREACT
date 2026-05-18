#!/usr/bin/env bash
# =============================================================
# One-time server setup — Sherwood's Gallery on xCloud Ubuntu
# Run as root (or prefix each command with sudo)
# =============================================================
# BEFORE YOU START:
#   1. SSH into your xCloud server
#   2. Have your GitHub repo URL handy
#   3. Have your Neon DATABASE_URI and PAYLOAD_SECRET ready
# =============================================================

set -euo pipefail

APP_DIR="/var/www/sherwoods-gallery"
LOG_DIR="/var/log/sherwoods"
DOMAIN="sherwoodsgallery.com"

echo ""
echo "=== Step 1: Install Node.js 22 ==="
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt-get install -y nodejs
node --version   # should print v22.x.x

echo ""
echo "=== Step 2: Install pnpm ==="
npm install -g pnpm@latest
pnpm --version

echo ""
echo "=== Step 3: Install PM2 ==="
npm install -g pm2
pm2 --version

echo ""
echo "=== Step 4: Create directories ==="
mkdir -p "${APP_DIR}"
mkdir -p "${LOG_DIR}"

echo ""
echo "=== Step 5: Clone the repo ==="
# The server needs read access to your GitHub repo.
# Option A (recommended): add server's public SSH key as a GitHub Deploy Key
#   - Run: ssh-keygen -t ed25519 -C "xcloud-sherwoods" -f ~/.ssh/id_sherwoods
#   - Add ~/.ssh/id_sherwoods.pub as a Deploy Key in GitHub → Repo Settings → Deploy Keys
# Option B: use HTTPS with a personal access token (less secure)
#
# Then clone:
# git clone git@github.com:YOUR_ORG/sherwoods-gallery.git "${APP_DIR}"
# cd "${APP_DIR}"

echo ""
echo "=== Step 6: Create production .env ==="
# Edit the values below before running this block
cat > "${APP_DIR}/.env" << 'ENVEOF'
# --- Database (Neon) ---
DATABASE_URI=postgresql://neondb_owner:CHANGE_ME@ep-CHANGE_ME.neon.tech/neondb?sslmode=require

# --- Payload ---
PAYLOAD_SECRET=CHANGE_ME_LONG_RANDOM_STRING_HERE

# --- Public URL ---
NEXT_PUBLIC_SITE_URL=https://sherwoodsgallery.com

# --- Node ---
NODE_ENV=production
ENVEOF
echo "  → Edit ${APP_DIR}/.env with real values before continuing"

echo ""
echo "=== Step 7: Install dependencies and build ==="
# cd "${APP_DIR}"
# pnpm install --frozen-lockfile
# pnpm build

echo ""
echo "=== Step 8: Start app with PM2 ==="
# cd "${APP_DIR}"
# pm2 start ecosystem.config.cjs
# pm2 save
# pm2 startup systemd   # follow the printed command to register as system service

echo ""
echo "=== Step 9: Nginx site config ==="
# cp "${APP_DIR}/deploy/nginx/sherwoodsgallery.conf" /etc/nginx/sites-available/sherwoodsgallery
# ln -s /etc/nginx/sites-available/sherwoodsgallery /etc/nginx/sites-enabled/sherwoodsgallery
# nginx -t && systemctl reload nginx

echo ""
echo "=== Step 10: SSL certificate ==="
# apt-get install -y certbot python3-certbot-nginx
# certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}
# (certbot will edit the nginx config and reload automatically)

echo ""
echo "=== Step 11: Copy media files from your local machine ==="
# Run this FROM YOUR LOCAL MACHINE (not the server):
#   rsync -avz --progress media/ root@YOUR_SERVER_IP:${APP_DIR}/media/
echo "  → Run rsync from your local machine after SSH is confirmed working"

echo ""
echo "=== Step 12: GitHub Actions secrets ==="
echo "  Add these secrets to your GitHub repo → Settings → Secrets → Actions:"
echo "    XCLOUD_HOST   — your server IP address"
echo "    XCLOUD_USER   — SSH username (usually root)"
echo "    XCLOUD_SSH_KEY — contents of your local ~/.ssh/id_rsa (or id_ed25519)"
echo ""
echo "  To print your public key to add to the server's authorized_keys:"
echo "    cat ~/.ssh/id_ed25519.pub"
echo "  To add your GitHub Actions key to the server:"
echo "    echo 'PASTE_PUBLIC_KEY_HERE' >> ~/.ssh/authorized_keys"
echo ""
echo "Setup script complete. Work through the steps above in order."

#!/usr/bin/env bash
# Nightly backup for Sherwood's Gallery.
# Run via cron:  0 3 * * * /usr/local/bin/sherwoods-backup.sh
#
# Backs up:
#   - Postgres database via pg_dump
#   - Media uploads via rsync
# Retention: 14 days

set -euo pipefail

BACKUP_DIR="${HOME}/backups/sherwoods"
TIMESTAMP=$(date +%F-%H%M)
KEEP_DAYS=14

mkdir -p "${BACKUP_DIR}/db" "${BACKUP_DIR}/media"

# --- Database ---
# Reads DATABASE_URI from the app's .env file
APP_DIR="/var/www/sherwoods-gallery"
DB_URI=$(grep -E '^DATABASE_URI=' "${APP_DIR}/.env" | head -1 | cut -d= -f2- | tr -d '"' | tr -d "'")
if [ -z "${DB_URI}" ]; then
  echo "[backup] DATABASE_URI not found in ${APP_DIR}/.env" >&2
  exit 1
fi

DB_OUT="${BACKUP_DIR}/db/sherwoods-${TIMESTAMP}.sql.gz"
pg_dump "${DB_URI}" | gzip -9 > "${DB_OUT}"
echo "[backup] DB → ${DB_OUT} ($(du -h "${DB_OUT}" | cut -f1))"

# --- Media ---
rsync -aH --delete "${APP_DIR}/media/" "${BACKUP_DIR}/media/current/"
# Snapshot via hardlinks (cheap if disk supports it)
if command -v cp >/dev/null && cp --help 2>&1 | grep -q -- '-rl'; then
  cp -rl "${BACKUP_DIR}/media/current/" "${BACKUP_DIR}/media/snap-${TIMESTAMP}/" 2>/dev/null || true
fi
echo "[backup] Media synced to ${BACKUP_DIR}/media/current/"

# --- Retention ---
find "${BACKUP_DIR}/db" -name '*.sql.gz' -mtime "+${KEEP_DAYS}" -delete
find "${BACKUP_DIR}/media" -maxdepth 1 -name 'snap-*' -type d -mtime "+${KEEP_DAYS}" -exec rm -rf {} +
echo "[backup] Pruned items older than ${KEEP_DAYS} days"

echo "[backup] Done at $(date)"

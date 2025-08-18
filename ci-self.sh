#!/bin/sh

# Absolute path to your project directory
cd /DATA/Storage/MyProject/webhook-api || exit 1
LOGFILE="/DATA/Storage/MyProject/webhook-api/deploy-self.log"

echo "===================" >> "$LOGFILE"
echo "[INFO] $(date)" >> "$LOGFILE"

echo "[INFO] Pulling latest code..." | tee -a "$LOGFILE"
git pull origin main >> "$LOGFILE" 2>&1

echo "[INFO] Installing dependencies..." | tee -a "$LOGFILE"
npm ci --only=production >> "$LOGFILE" 2>&1

echo "[INFO] Reloading pm2 process 'webhook-api'..." | tee -a "$LOGFILE"
pm2 reload webhook-api >> "$LOGFILE" 2>&1

echo "[INFO] Project reloaded successfully ✅" | tee -a "$LOGFILE"

echo "===================" >> "$LOGFILE"

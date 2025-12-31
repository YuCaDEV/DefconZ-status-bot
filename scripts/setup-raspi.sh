#!/usr/bin/env bash
set -euo pipefail

# Run this on Raspberry Pi OS (Debian-based) to prepare the environment for the Discord bot.

if [[ "${EUID}" -ne 0 ]]; then
  echo "Please run this script with sudo." >&2
  exit 1
fi

apt update
apt full-upgrade -y

apt install -y git curl ufw

if ! command -v node >/dev/null 2>&1 || ! node -v | grep -q "v20"; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

ufw allow 22/tcp
ufw --force enable

if [[ ! -d /opt/dayz-status-bot ]]; then
  git clone https://github.com/<TU_USUARIO>/dayz-status-bot.git /opt/dayz-status-bot
  chown -R "$SUDO_USER":"$SUDO_USER" /opt/dayz-status-bot
fi

printf "\nInstalacion base completa. Recuerda crear /opt/dayz-status-bot/.env antes de iniciar el servicio.\n"

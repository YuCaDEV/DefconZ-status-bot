# Despliegue en Raspberry Pi

Sigue estas instrucciones desde una Raspberry Pi con Raspberry Pi OS Lite reciente.

1. Copia el repo al equipo: `git clone https://github.com/<TU_USUARIO>/dayz-status-bot.git`
2. Ejecuta el script de preparación con privilegios de administrador: `cd dayz-status-bot && sudo bash scripts/setup-raspi.sh`
3. Edita `/opt/dayz-status-bot/.env` con tus credenciales:

```
DISCORD_TOKEN=tu_token
CHANNEL_ID=canal
MESSAGE_ID=
BATTLEMETRICS_SERVER_ID=server
```

4. Instala dependencias dentro del directorio de trabajo: `cd /opt/dayz-status-bot && npm install`
5. Copia el servicio a systemd y habilítalo:
   ```
   sudo cp systemd/dayz-status-bot.service /etc/systemd/system/
   sudo systemctl daemon-reload
   sudo systemctl enable dayz-status-bot.service
   sudo systemctl start dayz-status-bot.service
   ```
6. Revisa el estado con `sudo systemctl status dayz-status-bot.service` y los logs con `journalctl -u dayz-status-bot.service -f`.
7. Mantén el sistema actualizado regularmente: `sudo apt update && sudo apt full-upgrade -y`.

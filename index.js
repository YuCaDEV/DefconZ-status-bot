import 'dotenv/config';
import { Client, GatewayIntentBits, EmbedBuilder } from 'discord.js';

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const API_URL = `https://api.battlemetrics.com/servers/${process.env.BATTLEMETRICS_SERVER_ID}`;

async function getServerData() {
  const res = await fetch(API_URL);
  const data = await res.json();
  const a = data.data.attributes;

  return {
    name: a.name,
    players: a.players,
    max: a.maxPlayers,
    ip: a.ip,
    port: a.port,
    status: a.status
  };
}

async function updateMessage() {
  const channel = await client.channels.fetch(process.env.CHANNEL_ID);
  const server = await getServerData();

  const embed = new EmbedBuilder()
    .setColor(server.status === 'online' ? 0x2ecc71 : 0xe74c3c)
    .setTitle('Estado del Server')
    .setDescription(`🌐 **${server.name}**`)
    .addFields(
      { name: '📌 IP', value: `${server.ip}:${server.port}`, inline: true },
      { name: '👥 Players conectados', value: `${server.players}/${server.max}`, inline: true },
      { name: '🟢 Estado server', value: server.status.toUpperCase(), inline: true }
    )
    .setFooter({
      text: `Actualizado • ${new Date().toLocaleTimeString('es-CL', {
        hour: '2-digit',
        minute: '2-digit'
      })}`
    });

  if (process.env.MESSAGE_ID) {
    const msg = await channel.messages.fetch(process.env.MESSAGE_ID);
    await msg.edit({ embeds: [embed] });
  } else {
    const msg = await channel.send({ embeds: [embed] });
    console.log('MESSAGE_ID=', msg.id);
  }
}

client.once('ready', () => {
  console.log('Bot conectado');
  updateMessage();
  setInterval(updateMessage, 30 * 60 * 1000);
});

console.log('TOKEN:', process.env.DISCORD_TOKEN);
client.login(process.env.DISCORD_TOKEN);

import { Client, Events, GatewayIntentBits } from 'discord.js';
import { loadCommands } from './discordjs/load.commands';
import { loadJobs } from './discordjs/load.jobs';

require('dotenv').config();

(async function bootstrap() {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  console.info(new Date(), 'Starting to load application commands');
  await loadCommands(client);
  console.info(new Date(), 'Application commands loaded sucessfully');

  console.info(new Date(), 'Starting to load application jobs');
  await loadJobs(client);
  console.info(new Date(), 'Application jobs loaded sucessfully');

  client.on(Events.GuildCreate, async (guild) => {
    console.log('nova guild');
  });

  client.once(Events.ClientReady, (client) => {
    console.info(new Date(), `Logged in as ${client.user?.tag}!`);
  });

  client.login();
})();

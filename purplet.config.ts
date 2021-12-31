import 'dotenv/config';
import { defineConfig } from 'purplet';

export default defineConfig({
  discord: {
    clientOptions: {
      intents: ['GUILD_MESSAGES'],
    },
    commandGuilds: process.env.PURPLET_COMMAND_GUILDS
      ? process.env.PURPLET_COMMAND_GUILDS.split(',')
      : [],
  },
});

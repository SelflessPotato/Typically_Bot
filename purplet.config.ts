import { defineConfig } from 'purplet';

export default defineConfig({
  discord: {
    clientOptions: {
      intents: ['GUILD_MESSAGES'],
    },
    commandGuilds: ['741460884307837041'],
  },
});

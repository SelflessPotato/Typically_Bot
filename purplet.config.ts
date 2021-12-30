import { ChatCommandHandler, defineConfig, OnEventHandler, TextCommandHandler } from 'purplet';

export default defineConfig({
  discord: {
    clientOptions: {
      intents: ['GUILD_MESSAGES'],
    },
  },
  handlers: [
    new OnEventHandler(),
    new ChatCommandHandler(),
    new TextCommandHandler({
      prefix: '.',
    }),
  ],
});

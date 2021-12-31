import Saying from '$lib/db/models/Saying';
import { ChatCommand, OptionBuilder } from 'purplet';

export default ChatCommand({
  name: 'addsaying',
  description: 'Create a new saying about myth mentions',
  options: new OptionBuilder().string('message', 'The saying to add', true),
  handle(options) {
    Saying.create({ message: options.message })
      .then(() => {
        console.log(`Added new saying: "${options.message}"`);
        this.reply(`Successfully added saying: "${options.message}"`);
      })
      .catch(() => {
        console.error(`Problem adding saying: "$${options.message}"`);
        this.reply(`Problem adding saying: "$${options.message}"`);
      });
  },
});

import Saying from '$lib/db/models/Saying';
import { ChatCommand, OptionBuilder } from 'purplet';

export default ChatCommand({
  name: 'addsaying',
  description: 'Create a new saying about myth mentions',
  options: new OptionBuilder().string('message', 'The saying to add', true),
  handle(options) {
    if (!this.member.roles.cache.has(process.env.ADMIN_PING_ROLE)) {
      this.reply({ephemeral: true, content: 'Sorry, you don\'t have permission to add a saying!'});
    } else {
      Saying.create({ message: options.message })
          .then(() => {
            console.log(`Added new saying: "${options.message}"`);
            this.reply(`Successfully added saying: "${options.message}"`);
          })
          .catch(() => {
            console.error(`Problem adding saying: "$${options.message}"`);
            this.reply(`Problem adding saying: "$${options.message}"`);
          });
    }
  },
});

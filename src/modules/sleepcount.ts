import { getUser } from '$lib/db/db-utils';
import { ChatCommand, OptionBuilder } from 'purplet';

export default ChatCommand({
  name: 'sleep count',
  description: 'Get the number of times a user has mentioned the myth',
  options: new OptionBuilder().user('user', 'Get the myth count for this user.'),
  handle(options) {
    const user = options.user || this.user;
    const uid = user.id;
    getUser(uid).then((dbuser) => {
      if (!dbuser) {
        console.log('Error getting user from database!');
        return;
      }
      const count = dbuser.sleepcount;
      this.reply(`${user.username} has mentioned the myth ${count} time${count === 1 ? '' : 's'}!`);
    });
  },
});

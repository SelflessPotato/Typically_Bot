import { OnEvent } from 'purplet';
import sequelize from "$lib/db/db";
import Saying from "$lib/db/models/Saying";
import {getGuild, getUser} from "$lib/db/db-utils";

export default OnEvent('messageCreate', async (msg) => {
  if (msg.author.bot || !msg.guildId) return;

  if (msg.content.includes('sleep')) {

    const guild = await getGuild(msg.guildId);
    if (!guild) {
      console.log('Error getting guild from database!');
      return;
    }

    // 20% chance of sending a message
    const sendMessage = Math.random() < 0.2 && !process.env.BLACKLIST_CHANNELS.split(',').includes(msg.channelId);
    if (sendMessage) {
      setTimeout(() => {
        // Send a response message
        Saying.findOne({order: sequelize.random()}).then(saying => {
          if (saying && saying.message) {
            msg.reply(saying.message);
          }
        });
      }, 1000);
    }

    // Increment the user's sleep count
    getUser(msg.author.id).then(user => {
      if (!user) {
        console.error('Error getting user from database!');
        return;
      }
      user.incrementSleepCount();
      user.save();
    });

    // Update the last time sleep was said for the current guild
    guild.updateLastSleep();
    guild.save();
  }
});

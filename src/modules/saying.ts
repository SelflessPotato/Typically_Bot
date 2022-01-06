import sequelize from '$lib/db/db';
import Saying from '$lib/db/models/Saying';
import { ChatCommand, ChatCommandGroup, OptionBuilder } from 'purplet';

export const add = ChatCommand({
  name: 'saying add',
  description: 'Create a new saying about myth mentions.',
  options: new OptionBuilder().string('message', 'The saying to add', true),
  // guilds: process.env.ADMIN_GUILD
  async handle({ message }) {
    if (!this.member) {
      return this.reply({
        content: 'This command cannot be used in DMs.',
        ephemeral: true,
      });
    }

    const roles = Array.isArray(this.member.roles)
      ? this.member.roles
      : [...this.member.roles.cache.mapValues((x) => x.id).values()];

    if (!roles.includes(process.env.ADMIN_PING_ROLE)) {
      return this.reply({
        content: "Sorry, you don't have permission to add a saying!",
        ephemeral: true,
      });
    }

    try {
      const existing = await Saying.findOne({
        where: {
          message: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('message')),
            '=',
            message.toLowerCase()
          ),
        },
      });

      if (existing) {
        return this.reply({
          content: 'That saying already exists!',
          ephemeral: true,
        });
      }

      const saying = await Saying.create({ message });
      this.reply({ content: `Added new saying: "${saying.getDataValue('message')}"` });
    } catch (error) {
      console.error(error);
      this.reply({
        content: 'There was an error adding the saying. Try again later.',
        ephemeral: true,
      });
    }
  },
});

export const remove = ChatCommand({
  name: 'saying remove',
  description: 'Remove a saying about myth mentions.',
  options: new OptionBuilder()
    .string('message', 'The saying to remove', true)
    .autocomplete('message', async ({ message }) => {
      const q = await Saying.findAll({
        where: {
          message: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('message')),
            'LIKE',
            '%' + message?.toLowerCase() + '%'
          ),
        },
      });
      console.log(q);
      return q.map((x) => ({
        name: x.getDataValue('message'),
        value: x.getDataValue('message'),
      }));
    }),
  // guilds: process.env.ADMIN_GUILD
  async handle({ message }) {
    try {
      const existing = await Saying.findOne({
        where: {
          message: sequelize.where(
            sequelize.fn('LOWER', sequelize.col('message')),
            '=',
            message.toLowerCase()
          ),
        },
      });

      if (!existing) {
        return this.reply({
          content: 'That saying does not exist!',
          ephemeral: true,
        });
      }

      await existing.destroy();
      this.reply({ content: `Removed saying: "${message}"` });
    } catch (error) {}
  },
});

export const group = ChatCommandGroup({
  name: 'saying',
  description: 'Manage myth saying.',
  // guilds: process.env.ADMIN_GUILD
});

import sequelize from '$lib/db/db';
import Logger from '$lib/logger/logger';
import { OnEvent } from 'purplet';

export default OnEvent('ready', async (client) => {
  sequelize
    .authenticate()
    .then(async () => {
      sequelize.sync();
      console.log('Successfully connected to SQL database!');
    })
    .catch(() => {
      console.error('Failed to connect to SQL database!');
      process.exit(1);
    });
  const logger = new Logger(client, process.env.ADMIN_CHANNEL || '');
  logger.replaceConsole();
});

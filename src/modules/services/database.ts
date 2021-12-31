import sequelize from '$lib/db/db';
import { Service } from 'purplet';

export default Service({
  name: 'Database',
  async init() {
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
  },
  cleanup() {
    sequelize.close();
  },
});

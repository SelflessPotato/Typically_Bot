import Logger from '$lib/logger/logger';
import { Service } from 'purplet';

let logger: Logger;

export default Service({
  name: 'Logging',
  async init() {
    logger = new Logger(this.client, process.env.ADMIN_CHANNEL);
    logger.init();
  },
  cleanup() {
    logger.cleanup();
  },
});

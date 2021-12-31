export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SQLSTORE: string;
      ADMIN_CHANNEL: string;
      ADMIN_PING_ROLE: string;
      BLACKLIST_CHANNELS: string;
    }
  }
}

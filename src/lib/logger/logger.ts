import { Snowflake } from 'discord-api-types';
import { Client, TextChannel } from 'discord.js';
import stripAnsi from 'strip-ansi';

enum LogLevel {
  Log = 'LOG',
  Error = 'ERROR',
  Debug = 'DEBUG',
}

export default class Logger {
  private oldLog?: typeof console.log;
  private oldError?: typeof console.error;
  private oldDebug?: typeof console.debug;

  private client: Client;
  private channel?: Snowflake;

  constructor(client: Client, channelId?: Snowflake) {
    this.client = client;
    this.channel = channelId;
    this.log = this.log.bind(this);
    this.error = this.error.bind(this);
    this.debug = this.debug.bind(this);
  }

  init() {
    // refuse to replace console if it's already been replaced
    if (!console.log.toString().endsWith('{ [native code] }')) {
      throw new Error('Another logger has already replaced the console.');
    }

    this.oldLog = console.log;
    this.oldError = console.error;
    this.oldDebug = console.debug;

    console.log = this.log;
    console.error = this.error;
    console.debug = this.debug;
  }

  cleanup() {
    if (!this.oldLog) {
      return;
    }

    console.log = this.oldLog;
    // These two have non-null assertions because theyre always set with .oldLog
    console.error = this.oldError!;
    console.debug = this.oldDebug!;
  }

  log(text: string) {
    this.send(Logger.formatText(text, LogLevel.Log));
  }

  error(text: string) {
    this.send(Logger.formatText(text, LogLevel.Error, process.env.ADMIN_PING_ROLE));
  }

  debug(text: string) {
    this.send(Logger.formatText(text, LogLevel.Debug));
  }

  send(text: string) {
    if (!this.channel) return;

    (this.client.channels.cache.get(this.channel) as TextChannel).send(text);
  }

  private static formatText(text: string, level: LogLevel, rolePing?: Snowflake): string {
    const date = new Date().toISOString();
    return `${rolePing ? `<@&${rolePing}>\n` : ''}**[${date}]** ${level}: ${stripAnsi(text)}`;
  }
}

import { Snowflake } from 'discord-api-types';
import { Client, TextChannel } from 'discord.js';
import stripAnsi from 'strip-ansi';

const _log = console.log;
const _error = console.error;
const _debug = console.debug;

enum LogLevel {
  Log = 'LOG',
  Error = 'ERROR',
  Debug = 'DEBUG',
}

export default class Logger {
  private client: Client;
  private channel: Snowflake;

  constructor(client: Client, channelId: Snowflake) {
    this.client = client;
    this.channel = channelId;
    this.log = this.log.bind(this);
    this.error = this.error.bind(this);
    this.debug = this.debug.bind(this);
  }

  replaceConsole() {
    if (console.log !== _log) {
      throw new Error('Another logger has already replaced the console.');
    }

    console.log = this.log;
    console.error = this.error;
    console.debug = this.debug;
  }

  cleanup() {
    console.log = _log;
    console.error = _error;
    console.debug = _debug;
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
    (this.client.channels.cache.get(this.channel) as TextChannel).send(text);
  }

  private static formatText(text: string, level: LogLevel, rolePing?: Snowflake): string {
    const date = new Date().toISOString();
    return `${rolePing ? `<@&${rolePing}>\n` : ''}**[${date}]** ${level}: ${stripAnsi(text)}`;
  }
}

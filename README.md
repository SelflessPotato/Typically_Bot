# Typically_Bot

Hello friendos! This repo contains the code to the Typically_Bot Discord bot,
used on the [CommuniTree Discord server][1]. If you have any suggestions,
feel free to either create an issue here or message SelflessPotato#0102 on Discord!

## Development Setup

To use the bot in a development environment, you will need to have set up a bot
through the Discord Developer Portal. It should be created with the following permissions:

- Send Messages
- Read Message History

You will also need a Discord server to test your bot in. Instructions on creating
a bot on the portal and inviting it to your test server should be easily found
on Google, and, as such, are not replicated here. Be sure to note your bot's token, as
you will need it when setting up your .env file.

Once you have created your bot within Discord and invited it to your server, you can
then set up and run the bot itself:

1. Install node.js
2. Clone the Typically_Bot repository
3. Install bot dependencies by running `npm install` from a command prompt
   within the bot directory.
4. Create your .env file by running `cp .env.ex .env`.
5. Edit your .env file with the bot's token, found in the Discord Developer Portal.
6. Run the bot with `npm start`.

[1]:https://discord.gg/cxBrH93Jtb
require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();

const messages = [
    'Shshshshsh friendo!! You have mentioned the myth!!!!',
    'You dared to mention the myth?!?',
    'What is that thing you just mentioned? I don\'t know what that is.',
    'I think you meant "long nap"...'
]

client.on('message', message => {
    if (message.content.toLowerCase().includes('.sleep')) {
        const msg = messages[Math.floor(Math.random() * messages.length)]
        setTimeout(() => message.channel.sendMessage(msg), 1000);
    }
});

client.login(process.env.BOT_TOKEN);
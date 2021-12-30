import { OnEvent } from 'purplet';

const messages = [
  'Shshshshsh friendo!! You have mentioned the myth!!!!',
  'You dared to mention the myth?!?',
  "What is that thing you just mentioned? I don't know what that is.",
  'I think you meant "long nap"...',
];

export default OnEvent('messageCreate', (msg) => {
  if (msg.author.bot) return;

  if (msg.content.includes('.sleep')) {
    setTimeout(() => {
      msg.channel.send(messages[Math.floor(Math.random() * messages.length)]);
    }, 1000);
  }
});

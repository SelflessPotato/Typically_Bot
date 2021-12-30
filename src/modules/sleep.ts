import { ChatCommand, OnEvent } from 'purplet';

const messages = [
  'Shshshshsh friendo!! You have mentioned the myth!!!!',
  'You dared to mention the myth?!?',
  "What is that thing you just mentioned? I don't know what that is.",
  'I think you meant "long nap"...',
];

export default ChatCommand({
  name: 'sleep',
  description: "huh, what's that?",
  async handle() {
    const msg = messages[Math.floor(Math.random() * messages.length)];
    this.reply(msg);
  },
});

export const onmessage = OnEvent('messageCreate', (msg) => {
  if (msg.author.bot) return;

  if (msg.content.includes('sleep')) {
    msg.channel.send('aaa! sleep.');
  }
});

module.exports = (client, Discord) => {
  client.on('message', (message) => {
    if (message.author.bot) return;
    const msg = message.content.toLowerCase().split(" ");
    const greet = ['hello', 'hi', 'hey'];
    for (i = 0; i < greet.length; i++) {
      if (msg.includes(greet[i])) {
        message.channel.send(greet[i])
      }
    }
  })

}

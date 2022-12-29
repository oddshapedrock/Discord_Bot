module.exports = {
  command: ['speak'],
  aliases: ['say', 'talk', 'repeat'],
  minArgs: 1,
  description: "!speak repeats the message withwout !speak",
	help: "!speak expects a message. Example !speak Hello server. \nYou can use the aliases !say, !talk, and !repeat for the same result",
  callback: (message, args, content) => {

    message.delete();
    message.channel.send(content);
  }
}

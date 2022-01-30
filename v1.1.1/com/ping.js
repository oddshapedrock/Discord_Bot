module.exports = {
  commands: ['ping'],
  expectedArgs: '',
  permissionError: 'You need more permissions',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {

    const Discord = require('discord.js');

    message.channel.send("Pinging...").then(m => {
      var ping = m.createdTimestamp - message.createdTimestamp;
      var embed = new Discord.MessageEmbed()
        .setAuthor(`Pong`)
        .setDescription('🏓 `' + ping + ' ms`')
        .setColor('GREEN')

      m.edit(embed)
    }).catch()

  },
}

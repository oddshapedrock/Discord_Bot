module.exports = {
  commands: ['commands', 'help'],
  expectedArgs: '',
  permissionError: 'You need more permissions',
  minArgs: 0,
  maxArgs: 0,
  callback: (message, arguments, text) => {

    const Discord = require('discord.js');
    var embed = new Discord.MessageEmbed()
      .setAuthor(`Commands`)
      .setDescription('!ping \n!purge \n!rolemsg \n!createnewgame \n!kick \n!ban \n!warning \n!speak \n!rps \n!osrbot')
      .setColor('RED')
    message.channel.send(embed)
  },
  permissions: [],
  requiredRoles: []
}

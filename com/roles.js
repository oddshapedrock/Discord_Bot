const messageSchema = require('../schemas/message')

module.exports = (client) = {
  commands: ['rolemsg', 'rrmsg', 'reactionrolemessage'],
  expectedArgs: '<title> <message>',
  permissionError: 'You need more permissions',
  minArgs: 2,
  callback: (message, arguments, text) => {

    const {
      guild,
      mentions
    } = message
    const {
      channels
    } = mentions
    const targetChannel = channels.first() || message.channel

    if (channels.first()) {
      arguments.shift()
    }

    const title = arguments[0]
    arguments.shift()
    const desc = arguments.join(' ')
    async function box() {
      const Discord = require('discord.js');
      let embed = new Discord.MessageEmbed()
        .setTitle(title)
        .setDescription(desc)
        .setColor('BLUE')
      const msgEmbed = await targetChannel.send(embed)
      module.exports.embeded = msgEmbed
      const embeded = msgEmbed.id
      new messageSchema({
          guildId: guild.id,
          channelId: targetChannel.id,
          messageId: msgEmbed.id,
        })
        .save()
        .catch(() => {
          message
            .reply('Failed to save to the database, please report this!')
            .then((message) => {
              message.delete({
                timeout: 1000 * 10,
              })
            })
        })
    }
    box();

    if (guild.me.hasPermission('MANAGE_MESSAGES')) {
      message.delete()
    }

  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

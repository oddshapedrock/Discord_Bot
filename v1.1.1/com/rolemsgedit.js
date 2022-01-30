const messageSchema = require('../schemas/message')

module.exports = {
  commands: ['rolemsgedit', 'rrmsge', 'reactionrolemessageedit'],
  expectedArgs: '<message ID> <new title> <message>',
  permissionError: 'You need more permissions',
  minArgs: 3,
  callback: (message, arguments, text) => {

    const {
      guild,
      mentions
    } = message
    const {
      channels
    } = mentions

    message.channel.messages.fetch({
      limit: 1
    }).then(messages => {

      let lastMessage = ""

      if (arguments[0] == undefined) {
        lastMessage = messages.first().id
      }
      else {
        lastMessage = arguments[0]
      }

      const title = arguments[1]
      arguments.shift()
      arguments.shift()
      const desc = arguments.join(' ')

      if (guild.me.hasPermission('MANAGE_MESSAGES')) {
        message.delete()
      }

      async function box() {
        const Discord = require('discord.js');
        const client = new Discord.Client({
          partials: ["MESSAGE", "CHANNEL", "REACTION"]
        });
        let embed = new Discord.MessageEmbed()
          .setTitle(title)
          .setDescription(desc)
          .setColor('BLUE')
        const msg = await messageSchema.find({
          messageId: lastMessage
        });
        if (msg.length !== 0) {
          try {
            await message.channel.messages.fetch(lastMessage).then(async m => {
              const msgEmbed = await m.edit(embed)

            })
          }
          catch (e) {
            message.channel.send("Make sure the message is from this channel!")
          }
        }
        else {
          message.channel.send("Make sure the message is from this Bot!")
        }
      }
      box();

    })
  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

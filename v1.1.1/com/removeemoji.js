const messageSchema = require('../schemas/message')

module.exports = {
  commands: ['removeemoji', 'emojiremove', 'rolereactionremove', 'rrremove', 'rre'],
  expectedArgs: '<emoji>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  callback: async (message, arguments, text) => {

    let emoji = arguments[0]
    if (emoji.includes(':')) {
      let emojiName = emoji.split(':')[0]
      emoji = message.guild.emojis.cache.find((e) => {
        return e.name === emojiName
      })
    }

    var bean = message.guild.emojis.cache.find(emoji => emoji.name == emoji);
    if (!bean) {

      const results = await messageSchema.find()

      await message.delete()

      message.channel.messages.fetch({
          limit: 1
        })
        .then(async messages => {

          let lastMessage = ""

          if (arguments[1] == undefined) {
            lastMessage = messages.first().id
          }
          else {
            lastMessage = arguments[1]
          }

          const lastMessage2 = await message.channel.messages.fetch(lastMessage)
          try {
            lastMessage2.reactions.removeAll()
          }
          catch {
            (console.log("Error bad Error"))
            return
          }


          for (const result of results) {
            const {
              guildId,
              channelId,
              messageId,
              roles
            } = result


            const obj = {
              guildId: message.guild.id,
              channelId: message.channel.id,
              messageId: lastMessage
            }

            await messageSchema.findOneAndUpdate(
              obj, {
                ...obj,
                $pull: {
                  roles: {
                    emoji,
                  },
                },
              }, {
                returnOriginal: false,
                upsert: true,
              }
            )
          }
        })

      message.channel.messages.fetch({
          limit: 1
        })
        .then(async messages => {

          let lastMessage = ""

          if (arguments[1] == undefined) {
            lastMessage = messages.first().id
          }
          else {
            lastMessage = arguments[1]
          }
          const lastMessage2 = await message.channel.messages.fetch(lastMessage)
          const results2 = await messageSchema.find({
            messageId: lastMessage
          })
          for (const result of results2) {
            const {
              guildId,
              channelId,
              messageId,
              roles
            } = result
            for (i = 0; i < roles.length; i++) {
              lastMessage2.react(roles[i].emoji)
            }
          }
        })

    }
  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

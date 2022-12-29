const messageSchema = require('../schemas/message')
const embeded = require('../com/roles')

module.exports = (client) = {
  commands: ['rolereaction', 'rreaction', 'reactionrolereaction', 'rr'],
  expectedArgs: '<emoji> <role>',
  permissionError: 'You need more permissions',
  minArgs: 2,
  callback: async (message, arguments, text) => {

    let emoji = arguments[0]
    if (emoji.includes(':')) {
      let emojiName = emoji.split(':')[1]
      emoji = message.guild.emojis.cache.find((e) => {
        return e.name === emojiName
      })
    }

    var bean = message.guild.emojis.cache.find(emoji => emoji.name == emoji);
    if (!bean) {}

    let role = arguments[1]
    if (role.startsWith('<@&')) {
      role = role.substring(3, role.length - 1)
    }

    const newRole =
      message.guild.roles.cache.find((r) => {
        return r.name === role || r.id === role
      }) || null

    if (!newRole) {
      message.delete()
      message.channel.send(`Could not find a role for "${role}"`)
      return
    }

    role = newRole

    module.exports.rrole = role

    await message.delete()


    message.channel.messages.fetch({
      limit: 1
    }).then(messages => {

      let lastMessage = ""

      if (arguments[2] == undefined) {
        lastMessage = messages.first().id
      }
      else {
        lastMessage = arguments[2]
      }

      async function box() {
        const query = {
          messageId: lastMessage
        }

        const ID = await messageSchema.find({
          messageId: query.messageId
        });

        if (ID.length !== 0) {
          try {
            await message.channel.messages.fetch(lastMessage).then(m => {
              m.react(emoji).catch()
            });
          }
          catch (e) {
            if (arguments[2] == undefined) {
              message.channel.send("Please make sure the specified message is in the channel!")
              return
            }
            else {
              message.channel.send("Please make sure the specified message is in the channel!")
              return
            }
          }
        }
        else {
          console.log('nope')
          return
        }


        const obj = {
          guildId: message.guild.id,
          channelId: message.channel.id,
          messageId: lastMessage
        }

        await messageSchema.findOneAndUpdate(
          obj, {
            ...obj,
            $addToSet: {
              roles: {
                emoji,
                roleId: role,
              },
            },
          }, {
            returnOriginal: false,
            upsert: true,
          }
        )
      }
      box()
    })


  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

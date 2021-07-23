const {prefix} = require('../config.json')
const profileSchema = require('../schemas/profileSchema')

const validatePermissions = (permissions) => {
  const validPermissions = [
    'CREATE_INSTANT_INVITE',
    'KICK_MEMBERS',
    'BAN_MEMBERS',
    'ADMINISTRATOR',
    'MANAGE_CHANNELS',
    'MANAGE_GUILD',
    'ADD_REACTIONS',
    'VIEW_AUDIT_LOG',
    'PRIORITY_SPEAKER',
    'STREAM',
    'VIEW_CHANNEL',
    'SEND_MESSAGES',
    'SEND_TTS_MESSAGES',
    'MANAGE_MESSAGES',
    'EMBED_LINKS',
    'ATTACH_FILES',
    'READ_MESSAGE_HISTORY',
    'MENTION_EVERYONE',
    'USE_EXTERNAL_EMOJIS',
    'VIEW_GUILD_INSIGHTS',
    'CONNECT',
    'SPEAK',
    'MUTE_MEMBERS',
    'DEAFEN_MEMBERS',
    'MOVE_MEMBERS',
    'USE_VAD',
    'CHANGE_NICKNAME',
    'MANAGE_NICKNAMES',
    'MANAGE_ROLES',
    'MANAGE_WEBHOOKS',
    'MANAGE_EMOJIS',
  ]

  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

module.exports = (client, commandFunctions) => {
  client.on('message', async message => {

    if (message.content.startsWith(prefix))
      if (!message.author.bot) {

        let profileData
        try {
          profileData = await profileSchema.findOne({
            userID: message.author.id
          })
          if (!profileData) {
            new profileSchema({
                userID: message.author.id,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0
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
        }
        catch (e) {
          console.log(e)
        }

        for (i = 0; i < commandFunctions.length; i++) {
          commandFunction = commandFunctions[i]
          let {
            commands,
            expectedArgs = '',
            permissionError = 'You need more permissions',
            minArgs = 0,
            maxArgs = null,
            permissions = [],
            requiredRoles = [],
            callback
          } = commandFunction

          //turns command and aliases to an array
          if (typeof command === 'string') {
            commands = [commands]
          }

          //turns permissions to an array + are valid
          if (permissions.length) {
            if (typeof permissions === 'string') {
              permissions = [permissions]
            }

            validatePermissions(permissions)
          }

          const {
            member,
            content,
            guild
          } = message

          for (const alias of commands) {
            const command = `${prefix}${alias}`
            if (content.toLowerCase().startsWith(`${command} `) || content.toLowerCase() === command) {
              //command initiation

              //required permissions
              for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                  message.reply(permissionError)
                  return
                }
              }
              //required roles
              for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find((role) =>
                  role.name === requiredRole)

                if (!role || !member.roles.cache.has(role.id)) {
                  message.reply(`You need the "${requiredRole}" role to use this command`)
                  return
                }
              }

              //split arrary
              const arguments = content.split(/[ ]+/)
              arguments.shift()

              if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                message.delete()
                message.reply(`Please use ${prefix}${alias} ${expectedArgs}`)
                return
              }

              //run code
              callback(message, arguments, arguments.join(' '), client, profileData)

              return
            }
          }
        }
      }
  })
}

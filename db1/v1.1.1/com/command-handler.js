const {prefix} = require('../config.json')
const profileSchema = require('../schemas/profileSchema')

//function that checks permissions against a list.
const validatePermissions = (permissions) => {
  //a list of all the "current" permissions in discord.
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
    'MANAGE_EMOJIS_AND_STICKERS',
    'USE_APPLICATION_COMMANDS',
    'REQUEST_TO_SPEAK',
    'MANAGE_THREADS',
    'USE_PUBLIC_THREADS',
    'USE_PRIVATE_THREADS',
    'USE_EXTERNAL_STICKERS'
  ];
//checks if permission needed is on the list of discord permissions
  for (const permission of permissions) {
    if (!validPermissions.includes(permission)) {
      throw new Error(`Unknown permission node "${permission}"`)
    }
  }
}

//the actual command handler that runs from command-handler-initiation
module.exports = (client, commandFunctions, Discord) => {
  //runs everytime a message is sent
  client.on('message', async message => {
//checks if message starts with prefix
    if (message.content.startsWith(prefix))
    //makes sure the bot did not write the message (prevents infinate loops)
      if (!message.author.bot) {

//a bit of code that adds profile data to the user account if it does not exist
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
        //loops through every command file
        for (i = 0; i < commandFunctions.length; i++) {
          commandFunction = commandFunctions[i]
          //deconstructs the command file to its parts
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
          //turns commands and aliases to an array
          if (typeof commands === 'string') {
            commands = [commands]
          }
          //turns permissions to an array + makes sure they are valid are valid
          if (permissions.length) {
            if (typeof permissions === 'string') {
              permissions = [permissions]
            }
            validatePermissions(permissions)
          }
          //deconstructs the message that was sent
          const {
            member,
            content,
            guild
          } = message
          //for every command makes checks if message.content starts with the command or is the command
          for (const alias of commands) {
            const command = `${prefix}${alias}`
            if (content.toLowerCase().startsWith(`${command} `) || content.toLowerCase() === command) {
              //checks mesage senders permissions for required permissions for the command
              for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                  message.reply(permissionError)
                  return
                }
              }
              //checks if member has the required roles
              for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find((role) =>
                  role.name === requiredRole)
                if (!role || !member.roles.cache.has(role.id)) {
                  message.reply(`You need the "${requiredRole}" role to use this command`)
                  return
                }
              }
              //splits the message at each space and makes it an array and removes the command
              const arguments = content.split(/[ ]+/)
              arguments.shift()
              //checks argument length if < than or > than specified
              if (arguments.length < minArgs || (maxArgs !== null && arguments.length > maxArgs)) {
                message.delete()
                message.reply(`Please use ${prefix}${alias} ${expectedArgs}`)
                return
              }
              //run code in the callback part assuming all other information is true
              callback(message, arguments, arguments.join(' '), client, profileData, Discord)
              //returns so that it stops looping through the commands (optional (You may want multiple commands with same prefix))
              return
            }
          }
        }
      }
  })
}

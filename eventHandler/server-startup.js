const mongo = require('../mongo')

const mongoPath = 'mongodb://localhost:27017/discordbot';

const messageSchema = require('../schemas/message')

module.exports = (client) => {

  client.once('ready', async () => {
    //???
    await mongo().then((mongoose) => {
      try {
        console.log('connected to mongo!')
      }
      catch (error) {
        console.log(error)
      }
    })

    let clears = 8.64e+7 / (24)
    //resetting MessageSchema
    resetAtNoon()

    function resetAtNoon() {
      var now = new Date()
      var min = 60 - now.getSeconds()
      if (min == 60) {
        var set = (clears)
      }
      else {
        var set = (((min * 1000)) + clears)
      }

      setTimeout(function() {
        resetMessageSchema()
        resetAtNoon()
      }, set);
    }

    resetMessageSchema()
    async function resetMessageSchema() {
      console.log('\x1b[34m' + "Deleting Data from MessageSchema...." + '\x1b[0m')
      console.log("Time until next: " + clears / 3.6e+6 + " hour(s)")
      let cache = {}
      let results = await messageSchema.find()

      for (let result of results) {
        let {
          guildId,
          channelId,
          messageId,
          roles
        } = result

        let guild = await client.guilds.cache.get(guildId)

        if (!guild) {
          console.log(`Removing guild ID "${guildId}" from the database`)
          await messageSchema.deleteMany({
            guildId
          })
          return
        }

        let channel = await guild.channels.cache.get(channelId)

        if (!channel) {
          console.log(`Removing channel ID "${channelId}" from the database`)
          await messageSchema.deleteMany({
            channelId
          })
          return
        }

        try {
          let cacheMessage = true
          let skipCache = true
          let fetchedMessage = await channel.messages.fetch(
            messageId,
            cacheMessage,
            skipCache
          )

          if (fetchedMessage) {
            let newRoles = {}

            for (let role of roles) {
              let {
                emoji,
                roleId
              } = role
              newRoles[emoji] = roleId
            }

            cache[guildId] = [fetchedMessage, newRoles]
          }

        }
        catch (e) {
          if (e.code !== 10008) {
            console.log('\x1b[31m' + "Failed to Connect to Discord!" + '\x1b[0m')
          }
          else {
            console.log('\x1b[32m' + `Removing message ID "${messageId}" from the database` + '\x1b[0m')
            await messageSchema.deleteOne({
              messageId
            })
          }
        }
      }
    }
  })
}

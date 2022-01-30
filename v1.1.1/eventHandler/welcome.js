const mongo = require('../mongo')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const command = require('../command')
const welcomeSchema = require('../schemas/welcome-schema')

var db;

module.exports = (client) => {


  mongoose.set('useFindAndModify', false);

  const cache = {}

  command(client, 'setwelcome', async (message) => {
    const {
      member,
      channel,
      content,
      guild
    } = message

    if (!member.hasPermission('ADMINISTRATOR')) {
      channel.send('You do not have permission to run this command.')
      return
    }

    let text = content

    message.delete();

    const split = text.split(' ')

    if (split.length < 2) {
      channel.send('Please enter a welcome message')
      return
    }

    split.shift()
    text = split.join(' ')


    cache[guild.id] = [channel.id, text]


    try {
      await welcomeSchema.findOneAndUpdate({
        _id: guild.id
      }, {
        _id: guild.id,
        channelId: channel.id,
        text,
      }, {
        upsert: true
      })
    }
    catch (e) {
      console.log(e)
    }
  })

  const onJoin = async (member) => {
    const {
      guild
    } = member

    let data = cache[guild.id]
    if (!data) {


      try {
        const result = await welcomeSchema.findOne({
          _id: guild.id
        })
        cache[guild.id] = data = [result.channelId, result.text]
      }
      catch (e) {
        console.log("No Message")
      }

    }
    if (data) {
      var channelId = data[0]
      var text = data[1]
    }
    if (!data) {
      var channelId = 1
      var text = 1
    }
    if (data) {
      const channel = guild.channels.cache.get(channelId)
      let message = await channel.send(text.replace(/<@>/g, `<@${member.id}>`))
      message.delete({
        timeout: 1000 * 120,
      })
    }
  }


  command(client, 'simjoin', message => {
    onJoin(message.member)
    message.delete();
  })

  client.on('guildMemberAdd', member => {
    onJoin(member)
  })

}

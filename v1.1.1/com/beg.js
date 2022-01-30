const profileSchema = require('../schemas/profileSchema')
module.exports = {
  commands: ['beg'],
  expectedArgs: '',
  permissionError: 'You need more permissions',
  minArgs: 0,
  maxArgs: 0,
  callback: async (message, arguments, text, client, profileData) => {

    message.delete()
    let result
    const randomNumber = Math.floor(Math.random() * 300) - 100;
    if (profileData.coins + randomNumber > 0) {
      send = `You begged and recieved ${randomNumber} coins.`
      result = {
        $inc: {
          coins: randomNumber,
        },
      }
    }
    else {
      send = `You recieved ${randomNumber} putting you at 0!`
      result = {
        $set: {
          coins: 0,
        },
      }
    }
    await profileSchema.findOneAndUpdate({
        userID: message.author.id,
      },
      result
    )
    const Discord = require('discord.js');
    profileData = await profileSchema.findOne({
      userID: message.author.id
    })
    const embed = new Discord.MessageEmbed()
      .setColor('#FFD700')
      .setTitle(message.author.username)
      .setDescription(`🪙 Coins: ${profileData.coins} \n🏦 bank: ${profileData.bank}`)
      .addField('Results:', send, true)
      .setThumbnail(message.author.avatarURL())
    return message.channel.send(embed)
  },
}

const profileSchema = require('../schemas/profileSchema')
module.exports = {
  commands: ['deposit', 'dep'],
  expectedArgs: '<amount>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, arguments, text, client, profileData) => {
    const amount = arguments[0];
    message.delete()
    if (amount % 1 != 0 || amount <= 0) return message.channel.send(`Deposit must be a whole number`)
    try {
      if (amount > profileData.coins) return message.channel.send(`You dont have that amount of coins!`)
      await profileSchema.findOneAndUpdate({
        userID: message.author.id
      }, {
        $inc: {
          coins: -amount,
          bank: amount,
        },
      })
      const Discord = require('discord.js');
      profileData = await profileSchema.findOne({
        userID: message.author.id
      })
      const embed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle(message.author.username)
        .setDescription(`🪙 Coins: ${profileData.coins} \n🏦 bank: ${profileData.bank}`)
        .addField('Results:', `Sucessfully deposited ${amount} coins!`, true)
        .setThumbnail(message.author.avatarURL())
      return message.channel.send(embed)
    }
    catch (e) {
      console.log(e)
    }
  },
}

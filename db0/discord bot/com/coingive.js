const profileSchema = require('../schemas/profileSchema')
module.exports = {
	commands: ['givecoin', 'baladd'],
	expectedArgs: '<player> <amount>',
	permissionError: 'You need more permissions',
	minArgs: 2,
	maxArgs: 2,
	callback: async(message, arguments, text) => {
		
		const amount = arguments[1];
		const target = message.mentions.users.first();
		if (!target) return message.channel.send(`${target} not found!`);
		message.delete()
		
		if (amount % 1 != 0 || amount <= 0) return message.channel.send("amount must eb a whole number")
		
		try{
			const targetData = await profileSchema.findOne({ userID: target.id })
			if(!targetData) return message.channel.send(`${target} user does not exist in the db`)
			
			await profileSchema.findOneAndUpdate(
				{
					userID: target.id,
					}, {
					$inc: {
						coins: amount,
					},
				}
			)
			const Discord = require('discord.js');
			const targetData2 = await profileSchema.findOne({ userID: target.id })
			const embed = new Discord.MessageEmbed()
			.setColor('#FFD700')
			.setTitle(target.username)
			.setDescription(`🪙 Coins: ${targetData2.coins} \n🏦 bank: ${targetData2.bank}`)
			.addField('Results:', `Gave ${target} ${amount} coins!` , true)
			.setThumbnail(target.avatarURL())
			return message.channel.send(embed)
			
			} catch(e) {
			console.log(e)
		}
		
	},
	permissions: ['ADMINISTRATOR'],
	requiredRoles: []
}
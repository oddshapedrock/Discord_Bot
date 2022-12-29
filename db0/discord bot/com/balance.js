module.exports = {
	commands: ['balance', 'bal'],
	expectedArgs: '',
	permissionError: 'You need more permissions',
	minArgs: 0,
	maxArgs: 0,
	callback: (message, arguments, text, client, profileData) => {
		
		message.delete()
		const Discord = require('discord.js');
		const embed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle(message.author.username)
        .setDescription(`🪙 Coins: ${profileData.coins} \n🏦 bank: ${profileData.bank}`)
        .setThumbnail(message.author.avatarURL())
        message.channel.send(embed)
		
	},
}
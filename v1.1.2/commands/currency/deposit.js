const db = require('../../db/db.js');
const data = require('../../db/collections/profileData.js');
const { createProfile } = require('../../db/schemas/profileDataSchema.js')

module.exports = {
	command: ['deposit'],
	aliases: ['dep'],
	minArgs: 1,
	maxArgs: 1,
	description: "!deposit depostis your coins into the bank.",
	help: "!deposit expects an amount of coins Ex: !deposit 100. If the command is not working contact the developer. \nYou can use the alias !dep for the same result",
	callback: (message, args, content, command, Discord) => {

		amount = parseInt(args[0], 10);
		message.delete();

		if (amount % 1 != 0 || amount < 0) return message.channel.send("Amount must be a positive whole number.");

		let targetData;

		const getData = () => {
			targetData = db.find(data, { guild: message.guildId, user: message.author.id });
		}
		getData();

		if (targetData === undefined) {
			return message.channel.send(`Could not find an account for ${message.author.username}`)
		}

		getData();

		if (amount > parseInt(targetData[0].coins, 10)) {
			return message.channel.send("You do not have that amount of coins. Please enter a smaller amount.");
		}

		db.edit(data, '/collections/profileData.js', { guild: message.guildId, user: message.author.id }, { coins: (parseInt(targetData[0].coins, 10) - amount), bank: (targetData[0].bank + amount) });

		getData();

		var embed = new Discord.MessageEmbed()
			.setColor('#FFD700')
			.setTitle(message.author.username)
			.setDescription(`🪙 Coins: ${targetData[0].coins} \n🏦 bank: ${targetData[0].bank}`)
			.setThumbnail(message.author.avatarURL());
		message.channel.send({ embeds: [embed] });

	}
}

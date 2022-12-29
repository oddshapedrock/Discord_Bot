const db = require('../../db/db.js');
const data = require('../../db/collections/profileData.js');
const { createProfile } = require('../../db/schemas/profileDataSchema.js')

module.exports = {
	command: ['balance'],
	aliases: ['bal'],
	minArgs: 0,
	maxArgs: 0,
	description: "!balance retuns your in server balance.",
	help: "!balance expects no arguments, if the command is not working contact the developer. \nYou can use the alias !bal for the same result",
	callback: (message, args, content, command, Discord) => {

    let found;

		const search = () => {
			found = db.find(data, { guild: message.guildId, user: message.author.id });
		}
		search();

		const msg = () => {
			var embed = new Discord.MessageEmbed()
				.setColor('#FFD700')
				.setTitle(message.author.username)
				.setDescription(`🪙 Coins: ${found[0].coins} \n🏦 bank: ${found[0].bank}`)
				.setThumbnail(message.author.avatarURL());
			message.channel.send({ embeds: [embed] });
		}

		if (found === undefined) {
			createProfile({
				guild: message.guildId,
				user: message.author.id
			});
			search();
			msg();
		} else {
			msg();
		}

	}
}

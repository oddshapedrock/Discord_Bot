module.exports = {
	command: ['createProfile'],
	aliases: ['newProfile'],
	minArgs: 2,
	maxArgs: 2,
	description: "creates a new user profile.",
	help: "!createProfile is development only, and should not exist in the final release.",
	callback: (message, args, data, Discord) => {

		 message.delete();

		const {db, collection, schema} = data;
		const { createProfile } = schema('profileSchema.js');

		let found;

		const search = () => {
			found = db.find(collection('profileData.json'), { guild: message.guildId, user: args[0] });
		}
		search();

		const msg = () => {
			var embed = new Discord.MessageEmbed()
				.setColor('#FFD700')
				.setTitle(args[0])
				.setDescription(`🪙 Coins: ${found[0].coins.toString()}`);
			message.channel.send({ embeds: [embed] });
		}

		if (found === undefined) {
			createProfile({
				guild: message.guildId,
				user: args[0],
				coins: Number(args[1]) || 0
			}, data);
			search();
			msg();
		} else {
			message.channel.send({content: `Profile for ${args[0]} already exists in this guild.`})
		}

	}
}

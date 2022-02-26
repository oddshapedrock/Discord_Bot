module.exports = {
	command: ['ping'],
	aliases: ['speed', 'test'],
	minArgs: 0,
	maxArgs: 0,
	requiredPerms: [],
	requiredRoles: [],
	description: "returns the connection speed of the bot in ms.",
	help: "!ping expects no arguments, if the command is not working contact the developer. \nYou can use the aliases !speed and !test for the same result",
	callback: (message, args, data, Discord, client, command) => {

		message.channel.send("Pinging...").then(msg => {
			let ping = msg.createdTimestamp - message.createdTimestamp;
			let embed = new Discord.MessageEmbed()
				.setAuthor({ name: `Pong` })
				.setDescription('🏓 `' + ping + ' ms`')
				.setColor('GREEN')

			msg.edit({
				embeds: [embed]
			})
		}).catch();
	},
	slashBack: (interaction, options, Discord, client, command) => {

		interaction.reply({ content: "Pong" }).then(msg => {
			let embed = new Discord.MessageEmbed()
				.setAuthor({ name: 'Notice' })
				.setDescription('Unfortunately /command features are limited.\n Please use !ping if you want to display the ping.')
				.setColor('RED')
			interaction.editReply({
				embeds: [embed]
			})
		}).catch();

	}
}

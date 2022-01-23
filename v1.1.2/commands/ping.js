module.exports = {
	command: ['ping'],
	aliases: ['speed', 'test'],
	minArgs: 0,
	maxArgs: 0,
	requiredPerms: [],
	requiredRoles: [],
	description: "!ping returns the connection speed of the bot in ms.",
	help: "!ping expects no arguments, if the command is not working contact the developer. \nYou can use the aliases !speed and !test for the same result",
	callback: (message, args, content, command, Discord, client) => {

		message.channel.send("Pinging...").then(msg => {
			var ping = msg.createdTimestamp - message.createdTimestamp;
			var embed = new Discord.MessageEmbed()
				.setAuthor(`Pong`)
				.setDescription('🏓 `' + ping + ' ms`')
				.setColor('GREEN')

			msg.edit({
				embeds: [embed]
			})
		}).catch()
	}
}

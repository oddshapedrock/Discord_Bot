const system = require('../../sharedFunctions/system.js');

module.exports = {
	command: ['systemTime'],
	aliases: ['time', 'upTime'],
	minArgs: 0,
	maxArgs: 0,
	requiredPerms: [],
	requiredRoles: [],
	description: "returns the run time of the bot.",
	help: "!systemTime expects no arguments, if the command is not working contact the developer. \nYou can use the aliases !time and !upTime for the same result",
	callback: (message, args, data, Discord) => {

		let string = (JSON.stringify(system.runTime()).replace(/,/g, ', — ')).split(/[{}"":,]/g);

		for (let i = string.length - 1; i >= 0; i--) {
			if (string[i].length == 1 ) {
				string[i] = `(0${string[i]})`;
			} else if (string[i].length == 0) {
				string.splice(i, 1);
			} else if (string[i].length == 2) {
				string[i] = `(${string[i]})`
			}
		}

		let embed = new Discord.MessageEmbed()
		.setAuthor({ name: 'System Time' })
		.setDescription(string.join(' '))
		.setColor('PURPLE');

		message.channel.send({ embeds: [embed] });

	}
}

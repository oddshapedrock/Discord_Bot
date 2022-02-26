const system = require('../system.js')

module.exports = {
	command: ['time'],
	aliases: [],
	minArgs: 0,
	maxArgs: 0,
	requiredPerms: [],
	requiredRoles: [],
	description: "!time returns time",
	help: "retruns time, if the command is not working contact the developer. \nYou can use the aliases !speed and !test for the same result",
	callback: (message) => {
		message.channel.send({ content: (JSON.stringify(system.runTime())) });
	}
}

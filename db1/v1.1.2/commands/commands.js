module.exports = {
	command: ['commands'],
	aliases: ['comms', 'com'],
	maxArgs: 0,
	description: '!commands provides a list of all the commands available to non-dev users.\nTHIS DOES NOT INCLUDE ALIASES TO GET AN ALIASES USE "!(command) help"',
	help: '!commands expects no arguments, if the command is not working contact the developer. \nYou can use the aliases !comms and !com for the same result',
	callback: (message, args, content, command, Discord) => {

		let list = [
      'ping',
      'commands',
      'kick'
    ];

		list = list.sort().toString().replace(/,/g, '\n')

		var embed = new Discord.MessageEmbed()
			.setAuthor(`Commands`)
			.setDescription(list)
			.setColor('RED')
		message.channel.send({ embeds: [embed] });

	}
}

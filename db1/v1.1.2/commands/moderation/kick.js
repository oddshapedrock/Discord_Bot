module.exports = {
	command: ['kick'],
	aliases: ['boot'],
	minArgs: 1,
	maxArgs: -1,
	permissions: ['ADMINISTRATOR'],
	description: "!kick removes a user from the server. That user can join back.",
	help: "!kick expects a user to be declared. Also has an optional reason to declare. Example !kick @user1234 trolling. \nYou can use the alias !boot for the same result",
	callback: (message, args, content, command, Discord, client) => {

		const target = message.mentions.users.first();
		const memberTarget = message.guild.members.cache.get(target.id);

		if (!target) {
			message.delete();
			message.reply('No user mentioned to kick');
		}

		let reason;
		if (args[1] != undefined) {
			args.shift();
			reason = args.join(' ');
		} else {
			reason = "unspecified";
		}

		if (memberTarget.kickable) {
			message.delete();
			memberTarget.kick(reason);
			message.channel.send(`${target.tag} was kicked from the server for "${reason}"`);
		} else {
			message.delete();
			message.channel.send(`I can not kick ${target.tag}. Make sure I have the proper permissions.`);
		}

	},
}

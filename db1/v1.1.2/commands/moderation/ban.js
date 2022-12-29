module.exports = {
	command: ['ban'],
	minArgs: 1,
	maxArgs: -1,
	permissions: ['ADMINISTRATOR'],
	description: "!ban removes a user from the server. That user can not join back.",
	help: "!ban expects a user. !ban also has an optional reason, and an amount of days worth of messages to delete (0-7). Example !ban @user1234 7 trolling.",
	callback: (message, args, text) => {

		const target = message.mentions.users.first();
		const memberTarget = message.guild.members.cache.get(target.id);

		if (!target) {
			message.delete();
			message.reply('No user mentioned to ban');
		}

		let time = args[1];
		if (time > 7 || time < 0 || time === undefined || time.typeof !== 'number') {
			time = 0;
		}

		let reason;
		if (args[2] != undefined) {
			args.shift();
			args.shift();
			reason = args.join(' ');
		} else {
			reason = "unspecified";
		}

		if (memberTarget.bannable) {
			message.delete();
			memberTarget.ban({
				days: time,
				reason: reason
			});
			message.channel.send(`${target.tag} was banned from the server for "${reason}"`);
		} else {
			message.delete();
			message.channel.send(`I can not ban ${target.tag}. Make sure I have the proper permissions.`);
		}

	}
}

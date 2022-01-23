module.exports = {
	command: ['warning'],
	aliases: ['warn'],
	permissionError: 'You need more permissions',
	minArgs: 1,
	maxArgs: 1,
	permissions: ['ADMINISTRATOR'],
	description: "!warning warns a member that they are doing something aginst the rules.",
	help: "!warning expects a user. Example !warning @user1234 \nYou can use the alias !warn for the same result.",
	callback: (message, arguments, text) => {

		const user = message.mentions.users.first();

		if (!user) {
			message.delete();
			message.reply('No user mentioned to warn');
		}

		const member = message.guild.members.cache.get(user.id);
		if (member) {
			message.delete();
			message.channel.send(`${user} This is your last and final warning. Read the rules and stop what you are doing!`);
		}
	}
}

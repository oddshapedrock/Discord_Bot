module.exports = {
	commands: ['kick'],
	expectedArgs: '<user>',
	permissionError: 'You need more permissions',
	minArgs: 1,
	maxArgs: 1,
	callback: (message, arguments, text) => {
		
	const user = message.mentions.users.first();
	
		if(!user){
			message.delete();
			message.reply('No user mentioned to kick');	
		}
		
		const member = message.guild.member(user)
		if (member) {
			member.kick("For nunya"). then (() => {
				message.delete();
				message.channel.send(`${user.tag} was kicked from the server by Intern Bot`);
			});			
		}
		
	},
	permissions: ['ADMINISTRATOR'],
	requiredRoles: []
}
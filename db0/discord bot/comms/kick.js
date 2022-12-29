module.exports ={
	name: 'kick',
	description: "this is a kick comand",
	execute(message, args){
		const prefix = '!';
		const user = message.mentions.users.first();
		
		if (!message.member.hasPermission('ADMINISTRATOR')) {
		console.log("" + message.member + " tried to kick " + user + "")
		message.delete();
		message.channel.send('You do not have permission to run this command.')
		return
		}
		
	
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
	}
}
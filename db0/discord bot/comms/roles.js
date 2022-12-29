module.exports ={
	name: 'roles',
	description: "this is a test comand",
	execute(message, args){
		
		const Discord = require('discord.js');
		const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});
		const prefix = '!';
		let messageArray = message.content.split(" ");
		let cmd = messageArray[0];
		let arg = message.content.substring(message.content.indexOf(' ')+1);
		
		async function roles() {
		
				let embed = new Discord.MessageEmbed()
				.setTitle('Reaction Roles')
				.setDescription('React to obtain the roles')
				.setColor('GREEN')
				let messageEmbed = await message.channel.send(embed).then(function(sentMessage) {
				sentMessage.react("🎵")
				});
		
				}
			roles();
			
	}
	
}
		
		
		
	

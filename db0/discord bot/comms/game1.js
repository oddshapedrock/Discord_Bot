module.exports ={
	name: 'game1',
	description: "this is a test comand",
	execute(message, args){
		
const guild = message.guild;
			message.delete();
			message.reply(`This command is currently not working but is in development ${guild.owner} has now been messaged so he knows to work faster.`)
		
	}
}
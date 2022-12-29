const Discord = require('discord.js');

const WOKCommands = require('wokcommands')

require('dotenv').config()

const client = new Discord.Client({partials: ["MESSAGE", "CHANNEL", "REACTION"]});

const prefix = '!';

const mongo = require('./mongo')

const mongoPath = 'mongodb://localhost:27017/discordbot';


const fs = require('fs');



client.comms = new Discord.Collection();

const commandFiles = fs.readdirSync('./comms/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
	const command = require(`./comms/${file}`);
	
	client.comms.set(command.name, command);
}

client.once('ready', async () => {
	await mongo().then((mongoose) => {
		try{
			console.log('connected to mongo!')
		} catch(error){
			console.log(error)
		}
	})
	new WOKCommands(client, {
    commandsDir: 'commands',
    featureDir: 'features',
    showWarns: false,
  }).setMongoPath(mongoPath)
	console.log('Oddshapedrock manager is online');
});

client.on('ready', () => {
	
})

client.on('guildMemberAdd', member =>{
	
});



client.on("messageReactionAdd", reaction => {
	async function box() {
		
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	}
	box();
				if (reaction.message.channel.id === "774704167989411936") {
				if(reaction.emoji.name === "🎵") {
				const filter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id;
				const collector = message.createReactionCollector(filter, { time: 10000 });
				
				collector.on('collect', (reaction, user) => {
					console.log(`${user.tag} reacted with ${reaction.emoji.name}.`);
				});
					}
					
				}
})

client.on('message', message =>{
	if(message.author.bot) return;
	const msg = message.content.toLowerCase().split(" ");
    const greet = ['hello', 'hi', 'hey'];
		if(msg.some(x => greet.includes(x))) {
		message.channel.send('Hello')
		}
});


client.on('message', message =>{
	if(!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.slice(prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();
	
	if(command === 'ping'){
		client.comms.get('ping').execute(message, args);
	}
	if(command === 'ppcreate'){
		client.comms.get('ppcreate').execute(message, args);
	}
	if(command === 'kick'){
		client.comms.get('kick').execute(message, args);
	}
	if(command === 'purge'){
		client.comms.get('purge').execute(message, args);
	}
	if(command === 'warning'){
		client.comms.get('warning').execute(message, args);
	}
	if(command === 'roles'){
		client.comms.get('roles').execute(message, args);
	}
	if(command === 'ranks'){
		client.comms.get('ranks').execute(message, args);
	}
	if(command === 'createnewgame'){
		client.comms.get('game1').execute(message, args);
	}
	if(command === 'commands'){
		client.comms.get('commands').execute(message, args);
	}
	if(command === 'speak'){
		client.comms.get('speak').execute(message, args);
	}
	if(command === 'game1'){
		client.comms.get('game1').execute(message, args);
	}
});


client.login(process.env.TOKEN);
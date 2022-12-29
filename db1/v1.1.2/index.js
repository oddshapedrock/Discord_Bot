const Discord = require("discord.js");
const { intent } = require("./data.js");

const client = new Discord.Client({
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	intents: intent
});

const fs = require("fs");
client.events = new Discord.Collection();
const event_files = fs.readdirSync(`./events`).filter(file => file.endsWith(".js"));
for (const file of event_files) {
	require(`./events/${file}`)(client, Discord);
}

require("dotenv").config();
client.login(process.env.TOKEN);

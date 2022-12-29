const Discord = require("discord.js");
const { intent } = require("./data.js");

const client = new Discord.Client({
	partials: ["MESSAGE", "CHANNEL", "REACTION"],
	intents: intent
});

const fs = require("fs");
const files = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
try {
	for (const file of files) {
		require(`./events/${file}`)(client, Discord);
	}
} catch (err) {
	console.error(err);
}

require("dotenv").config();
client.login(process.env.TOKEN);

const Discord = require("discord.js");
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

const fs = require("fs");

require("dotenv").config();

client.events = new Discord.Collection();
const event_files = fs.readdirSync(`./eventHandler`).filter(file => file.endsWith(".js"));
for (const file of event_files) {
  require(`./eventHandler/${file}`)(client, Discord);
}

client.login(process.env.TOKEN);

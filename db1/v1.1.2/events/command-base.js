const fs = require("fs");
const path = require("path");
const { validPermissions } = require("../data.js");
const { prefix } = require("../config.json");

//gets the files
module.exports = (client, Discord) => {
	const fileList = [];

	const getAllFiles = dir => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			if (fs.statSync(path.join(__dirname, dir, file)).isDirectory()) {
				getAllFiles(path.join(dir, file));
			} else {
				fileList.push(require(path.join(__dirname, dir, file)));
			}
		}
		return fileList;
	};
	getAllFiles("../commands");

	//checks required permissions against Discord permission list
	const checkPermissions = permissions => {
		for (const permission of permissions) {
			if (!validPermissions.includes(permission)) {
				throw new Error(`Unknown permission node "${permission}"`);
			}
		}
	};
	//runs commands on a message
	client.on("messageCreate", message => {
		let temp = 0;
let time1 = performance.now();
		//TODO add a check to see what prefix the guild uses + ?can return other information such as permissions and roles needed for commands, and if the command is enabled?
		if (message.content.startsWith(prefix) && !message.author.bot) {
			for (i = 0; i < fileList.length; i++) {
				//deconstructs
				let {
					command,
					aliases = [],
					minArgs = 0,
					maxArgs = -1,
					requiredPerms = [],
					requiredRoles = [],
					description = "No description has been set for this command.",
					help = "Sorry this command currently has no help section.",
					callback
				} = fileList[i];

				const { member, content, guild } = message;

				//to string and put together
				if (typeof aliases !== "object") {
					aliases = [aliases];
				}
				if (typeof command !== "object") {
					command = [command];
				}
				let commands = command.concat(aliases);

				//checks permissions
				if (typeof requiredPerms !== "object") {
					requiredPerms = [requiredPerms];
				}
				checkPermissions(requiredPerms);

				for (let command of commands) {
					command = command.toLowerCase();
					let com = `${prefix}${command}`;
					if (content.toLowerCase().startsWith(`${com} `) || content.toLowerCase() === com) {
						for (const permission of requiredPerms) {
							if (!member.permissions.has(permission)) {
								return message.reply(`You need the ${permission} to use ${com}`);
							}
						}

						for (const requiredRole of requiredRoles) {
							const role = guild.roles.cache.find(
								role => role.name === requiredRole
							);
							if (role) {
								if (!member.roles.cache.has(role.id)) {
									return message.reply(`You need the "${requiredRole}" role to use ${com}`);
								}
							}
						}

						const args = content.split(/[ ]+/);
						args.shift();

						if (args[0] !== undefined) {
							switch (args[0].toLowerCase()) {
								case "help":
									message.delete();
									return message.channel.send(help);
								case "desc":
								case "descript":
								case "description":
									message.delete();
									return message.channel.send(description);
							}
						}

						if (args.length < minArgs || (maxArgs >= 0 && args.length > maxArgs)) {
							if (minArgs == maxArgs) {
								return message.reply(`${com} expects ${minArgs} argument(s)`);
							} else if (maxArgs == -1) {
								return message.reply(`${com} expects between ${minArgs} and ∞ arguments`);
							} else {
								return message.reply(`${com} expects between ${minArgs} and ${maxArgs} arguments`);
							}
						}
						let time2 = performance.now();
						console.log(com);
						temp += (time2 - time1);
						console.log(temp / 1)
						return callback(message, args, args.join(" "), command, Discord, client);
					}
				}
			}
		}

		//TODO add a command that checks a database for messages waiting for a response
	});
};

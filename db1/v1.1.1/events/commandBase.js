const fs = require('fs');
const path = require('path');
const { validPermissions } = require("../data.js");
const { prefix } = require("../config.json");

const db = require('../db/db.js')

const collection = (file) => {
	try {
		return require(path.join(__dirname, '../db/collections', file));
 } catch (err) {
	 console.error(`Collection not found. File: ${file} could not be found and may not exist.`);
 }
}

const schema = (file) => {
	try {
		return require(path.join(__dirname, '../db/schemas', file));
 } catch (err) {
	 console.error(`Schema not found. File: ${file} could not be found and may not exist.`);
 }
}

const data = {db, collection, schema};

module.exports = (client, Discord) => {
	const commandList = [];
	const getFiles = (dir) => {
		const files = fs.readdirSync(path.join(__dirname, dir));
		for (const file of files) {
			if (fs.statSync(path.join(__dirname, dir, file)).isDirectory()) {
				getFiles(path.join(dir, file));
			} else {
				commandList.push(require(path.join(__dirname, dir, file)));
			}
		}
	};
	getFiles("../commands");

	const checkPerms = (permList) => {
		for (const perm of permList) {
			if (validPermissions.includes(perm)) {
				return;
			} else {
				throw new Error(`Unknown permission ${perm}`)
			}
		}
	};

  const toObj = (x) => {
    if (typeof x != "object") {
      return [x];
    } else {
			return x;
		}
  }

	client.on('messageCreate', (message) => {
		if (message.content.startsWith(prefix) && !message.author.bot) {
			const regex = new RegExp(prefix, 'g');
			const newstr = message.content.replace(regex, '').split(' ');
			let com;
			for (i = 0; i < commandList.length; i++) {
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
				} = commandList[i];

				let commands = toObj(command).concat(toObj(aliases));

				for (item of commands) {
					if (item.toLowerCase() == newstr[0].toLowerCase()) {
						com = item;

						requiredPerms = toObj(requiredPerms);
						checkPerms(requiredPerms);

						const { content, member, guild } = message;

						for (const permission of requiredPerms) {
							if (!member.permissions.has(permission)) {
								return message.reply(`You need the \`${permission.toLowerCase()}\` permission to use ${com}.`);
							}
						}

						for (const requiredRole of requiredRoles) {
							const role = guild.roles.cache.find(
								role => role.name === requiredRole
							);
							if (role) {
								if (!member.roles.cache.has(role.id)) {
									return message.reply(`You need the \`${requiredRole.toLowerCase()}\` role to use ${com}.`)
								}
							}
						}

						const args = content.split(' ');
						args.shift();

						if (args[0] !== undefined) {
							switch (args[0].toLowerCase()) {
								case "help":
									message.delete();
									return message.channel.send(help);
								case "desc":
								case "description":
								case "info":
									message.delete();
									return message.channel.send(`!${com} ${description}`);
							}
						}

						if (args.length < minArgs || (maxArgs >= 0 && args.length > maxArgs)) {
							if (minArgs == maxArgs) {
								return message.reply(`${com} expects ${minArgs} arguments.`);
							} else if (maxArgs == -1) {
								return message.reply(`${com} expects between ${minArgs} and ∞ arguments`);
							} else {
								return message.reply(`${com} expects between ${minArgs} and ${maxArgs}`);
							}
						}

						return callback(message, args, data, Discord, client, com);

					}
				}
			}
		}
	})

  client.on('interactionCreate', (interaction) => {
    if (!interaction.isCommand()) return;

    for (i = 0; i < commandList.length; i++) {
      let {
        command,
        aliases = [],
        minArgs = 0,
        maxArgs = -1,
        requiredPerms = [],
        requiredRoles = [],
        description = "No description has been set for this command.",
        help = "Sorry this command currently has no help section.",
        callback,
        slashBack
      } = commandList[i];

      let commands = toObj(command).concat(toObj(aliases));

      for (item of commands) {
        if (item.toLowerCase() == interaction.commandName) {
          com = item;

          requiredPerms = toObj(requiredPerms);
          checkPerms(requiredPerms);

          const { options, member, guild } = interaction;

          for (const permission of requiredPerms) {
            if (!member.permissions.has(permission)) {
              return interaction.reply(`You need the \`${permission.toLowerCase()}\` permission to use ${com}.`);
            }
          }

          for (const requiredRole of requiredRoles) {
            const role = guild.roles.cache.find(
              role => role.name === requiredRole
            );
            if (role) {
              if (!member.roles.cache.has(role.id)) {
                return interaction.reply(`You need the \`${requiredRole.toLowerCase()}\` role to use ${com}.`)
              }
            }
          }

          return (slashBack(interaction, options, Discord, client, com));
        }
      }
      break;
    }
  })

}

const db = require('../db/db.js');
const data = require('../db/collections/profileData.js');
const { createProfile } = require('../db/schemas/profileDataSchema.js')

module.exports = {
	command: 'profile',
	minArgs: 1,
	maxArgs: 2,
	description: "creates a profile, testing purposes, this command should not exist in final development.",
	help: "you should know.",
	callback: (message, args, content, command, Discord, client) => {



		let found;

		const search = () => {
			found = db.find(data, { guild: message.guildId, user: args[0] });
		}
		search();

		if (found === undefined) {
			createProfile({
				guild: message.guildId,
				user: args[0],
				coins: Number(args[1]),
			});
			search();
			message.channel.send({ content: `${JSON.stringify(found)}` });
		} else {
			message.channel.send({ content: "Profile already exists." })
		}
	}
}

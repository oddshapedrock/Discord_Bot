module.exports = {
	command: ['purge'],
	aliases: ['delete', 'del'],
	minArgs: 1,
	maxArgs: 1,
	permissions: ['ADMINISTRATOR'],
	description: "!purge delets the specified amount of messages from the channel.",
	help: "!purge expects a number of files to delete. Example !purge 20. Due to speed restrictions !purge is capped at 100 messages. \nYou can also use !delete and !del for the same result.",
	callback: async (message, arguments, text) => {

		const amount = arguments[0];
		await message.delete();
		message.channel.bulkDelete(amount, true)
			.catch(error => message.channel.send("Sorry `!purge` has a limit of 100"));
	}
}

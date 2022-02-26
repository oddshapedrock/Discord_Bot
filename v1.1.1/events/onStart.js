module.exports = (client, Discord) => {
	client.once('ready', () => {
		client.user.setPresence({ activities: [{ name: 'annoying peasantry', type: 'WATCHING' }], status: 'online' });

    for (const guild of client.guilds.cache) {
      guild[1].commands.set([
        {
          name: "ping",
  				description: "pong",
        }
      ])
    }

		console.log('OSB_2 is Active');
	})
}

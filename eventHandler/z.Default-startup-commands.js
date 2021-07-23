module.exports = (client, Discord) => {
  client.once('ready', () => {
    console.log('Oddshapedrock manager is online');

    const glength = client.guilds.cache.map(guild => guild.id).length
    client.user.setPresence({
      status: "online", // You can show online, idle... Do not disturb is dnd
      activity: {
        name: `Watching over ${glength} Discord servers. Try using !commands.`, // The message shown
        type: "PLAYING" // PLAYING, WATCHING, LISTENING, STREAMING,
      }
    });
  })
}

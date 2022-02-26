module.exports = {
	command: ['displayProfile'],
	aliases: ['userProfile', 'profile'],
	minArgs: 1,
	maxArgs: 1,
	requiredPerms: [],
	requiredRoles: [],
	description: "returns users profile.",
	help: "!displayProfile expects 1 argument {profile} (Case Sensititve), if the command is not working contact the developer. \nYou can use the aliases !userProfile and !profile for the same result",
	callback: (message, args, data, Discord, client, command) => {

    message.delete();

    let {db, collection, schema} = data;

    let found = db.find(collection('profileData.json'), {guild: message.guildId, user: args[0]});

    if (found !== undefined) {
      var embed = new Discord.MessageEmbed()
        .setColor('#FFD700')
        .setTitle(args[0])
        .setDescription(`🪙 Coins: ${found[0].coins.toString()}`);
      message.channel.send({ embeds: [embed] });

    } else {
      message.channel.send({content: `Profile for ${args[0]} does not exist in this guild.`})
    }


	}
}

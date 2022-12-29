const db = require('../../db/db.js');
const data = require('../../db/collections/profileData.js');
const { createProfile } = require('../../db/schemas/profileDataSchema.js')

module.exports = {
	command: ['coingive'],
	aliases: ['givecoin'],
	minArgs: 2,
	maxArgs: 2,
	description: "!coingive gives or takes coins from another user.",
	help: "!coingive expects an @ target, and an amount ex: !coingive @user 100. (use a negative number to take coins) If the command is not working contact the developer. \nYou can use the alias !givecoin for the same result",
	callback: (message, args, content, command, Discord) => {

    const amount = args[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send(`${target} not found!`);
    message.delete();

    if (amount % 1 != 0) return message.channel.send("Amount must be a whole number.");

    let targetData;

    const getData = () => {
      targetData = db.find(data, {guild: message.guildId, user: target.id});
    }
    getData();

      if (targetData === undefined) {
        createProfile({
  				guild: message.guildId,
  				user: target.id
  			});
      }

      getData();

      let final = (parseInt(targetData[0].coins, 10)  + parseInt(amount, 10));
      if (final < 0) {
        final = 0;
      }

      db.edit(data, '/collections/profileData.js', { guild: message.guildId, user: target.id}, { coins: final});

    getData();

    var embed = new Discord.MessageEmbed()
      .setColor('#FFD700')
      .setTitle(message.author.username)
      .setDescription(`🪙 Coins: ${targetData[0].coins} \n🏦 bank: ${targetData[0].bank}`)
      .setThumbnail(message.author.avatarURL());
    message.channel.send({ embeds: [embed] });

	}
}

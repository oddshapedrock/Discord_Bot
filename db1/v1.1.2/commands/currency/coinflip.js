const db = require('../../db/db.js');
const data = require('../../db/collections/profileData.js');
const { createProfile } = require('../../db/schemas/profileDataSchema.js')

module.exports = {
	command: ['coinflip'],
	aliases: ['flipcoin', 'flip'],
	minArgs: 1,
	maxArgs: 2,
	description: "!coinflip flips a coin and matches or takes your bid.",
	help: "!coinflip expects a specification (heads or tails), and a wager amount (default 0). If the command is not working contact the developer. \nYou can use the aliases !flipcoin and !flip for the same result",
	callback: (message, args, content, command, Discord) => {

		option = args[0];
		amount = parseInt(args[1], 10) || 0;

		message.delete();

		let optToNum;

		switch (option.toLowerCase()) {
			case "heads":
			case "head":
			case "h":
				optToNum = 0;
				break;
			case "tails":
			case "tail":
			case "t":
				optToNum = 1;
				break;
			default:
				return message.channel.send("Please specify heads or tails.");
		}

		if (amount % 1 != 0 || amount < 0) return message.channel.send("Amount must be a positive whole number.");

		userData = db.find(data, { guild: message.guildId, user: message.author.id });

		if (amount > parseInt(userData[0].coins, 10)) {
			return message.channel.send("You bet more than you own, try betting a lower ammount.")
		}

		const randomNumber = Math.floor(Math.random() * 2);

		let gameState;

		if (optToNum == randomNumber) {
			gameState = 'win';
		} else {
			gameState = 'loss';
			amount *= -1;
		}

		let final = (parseInt(userData[0].coins, 10) + amount);
		if (final < 0) {
			final = 0;
		}

		db.edit(data, '/collections/profileData.js', { guild: message.guildId, user: message.author.id }, { coins: final });

		let side;
		switch (randomNumber) {
			case 0:
				side = "Heads";
				break;
			case 1:
				side = "Tails";
				break;
		}

    const msg = {
      win: `You won ${amount} coins\nYou now have ${final} coins`,
      loss: `You lost ${amount * -1} coins\nYou now have ${final} coins`
    }

		const field = ({
			name: `The coin landed on ${side}`,
      value: `${msg[gameState]}`,
			inline: true
		});

		let color = {
			win: 'GREEN',
			loss: 'RED'
		};

		let title = {
			win: '✅ You won! ✅',
			loss: '❌ You lose... ❌'
		};

		const embed = new Discord.MessageEmbed()
			.setColor(color[gameState])
			.setTitle(title[gameState])
			.addFields(field);

		message.channel.send({ embeds: [embed] });

	}
}

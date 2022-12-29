module.exports = {
	command: ['rps'],
	aliases: ['RockPaperScissors', 'rock', 'paper', 'scissors'],
	maxArgs: 1,
  description: "!rps plays the game rock paper scissors against a random response from the bot.",
	help: "!rps expects a choice of rock, paper, or scissors. Example !rps rock. \nYou can use the alias !RockPaperScissors for the same result.\n Or use !rock, !paper, or !scissors to not require a choice. Example !rock.",
	callback: (message, args, content, command, Discord) => {

		let choices = ["rock", "paper", "scissors"];
		let plrChoice;

		if (args[0] === undefined) {
			if (choices.includes(command)) {
				plrChoice = command;
			} else {
				message.channel.send('You did not use the command rock paper or scissors and you did not specify a choice.');
				return;
			}
		} else if (choices.includes(args[0].toLowerCase())) {
			plrChoice = args[0].toLowerCase();
		} else {
			message.channel.send('Please specify "rock", "paper", or "scissors"');
			return;
		}

		let botChoice = choices[Math.floor((Math.random() * 3))];

		message.delete();

		let emoji = {
			rock: '🪨',
			paper: '📰',
			scissors: '✂️'
		};

		const field = ({
			name: 'You',
			value: (emoji[plrChoice]),
			inline: true
		});

		const field2 = ({
			name: '--->',
			value: 'VS.',
			inline: true
		});

		const field3 = ({
			name: `Bot`,
			value: (emoji[botChoice]),
			inline: true
		});

		let color = {
			win: 'GREEN',
			tie: 'YELLOW',
			loss: 'RED'
		};

		let title = {
			win: '✅ You won! ✅',
			tie: '⛔ It\'s a draw! ⛔',
			loss: '❌ You lose... ❌'
		};

		let gameState;

		if ((plrChoice === "rock" && botChoice === "scissors") || (plrChoice === "paper" && botChoice === "rock") || (plrChoice === "scissors" && botChoice === "paper")) {
			gameState = "win";
		} else if (plrChoice === botChoice) {
			gameState = "tie";
		} else {
			gameState = "loss";
		}

		const embed = new Discord.MessageEmbed()
			.setColor(color[gameState])
			.setTitle(title[gameState])
			.addFields(field, field2, field3);

		message.channel.send({ embeds: [embed] });

	}
}

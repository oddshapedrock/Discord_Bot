module.exports = {
  commands: ['rps', 'rockPaperScisors'],
  expectedArgs: '<type>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  maxArgs: 1,
  callback: (message, arguments, text) => {

    let choices = ["rock", "paper", "scissors"];
    let playerChoice = message.content.split(" ")[1];
    let botChoice = choices[Math.floor((Math.random() * 3))];

    message.delete()
    if (!choices.includes(playerChoice) || !playerChoice) {
      message.reply("Choose, rock, paper, or scissors.");
    }
    else {
      playerChoice = playerChoice.toLowerCase();

      let emote = {
        rock: '🪨',
        paper: '📰',
        scissors: '✂️'
      }

      const Discord = require('discord.js');

      const field = ({
        name: 'You',
        value: (emote[playerChoice]),
        inline: true
      })
      const field2 = ({
        name: '--->',
        value: "VS.",
        inline: true
      })
      const field3 = ({
        name: `Bot`,
        value: (emote[botChoice]),
        inline: true
      })

      const winEmbed = new Discord.MessageEmbed()
        .setColor("GREEN")
        .setTitle("✅ You won! ✅")
        .addFields(field, field2, field3)

      const drawEmbed = new Discord.MessageEmbed()
        .setColor("YELLOW")
        .setTitle("⛔ It's a draw! ⛔")
        .addFields(field, field2, field3)

      const loseEmbed = new Discord.MessageEmbed()
        .setColor("RED")
        .setTitle("❌ You lose... ❌")
        .addFields(field, field2, field3)

      if ((playerChoice === "rock" && botChoice === "scissors") ||
        (playerChoice === "paper" && botChoice === "rock") ||
        (playerChoice === "scissors" && botChoice === "paper")) {
        message.channel.send(winEmbed);
      }
      else if (playerChoice === botChoice) {
        message.channel.send(drawEmbed);
      }
      else {
        message.channel.send(loseEmbed);
      }
    }

  },
  permissions: [],
  requiredRoles: []
}

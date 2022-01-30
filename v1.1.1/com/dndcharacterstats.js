const dndcharacterSchema = require('../schemas/dndcharacterSchema')

module.exports = {
  commands: ['dndstats'],
  expectedArgs: '<set | add | remove> (variable) (amount). \nYou could also try `!dnd help` for more commands',
  permissionError: 'You need more permissions',
  minArgs: 0,
  callback: async (message, arguments, text) => {

    let results = await dndcharacterSchema.findOne({
      guildId: message.guild.id,
      memberId: message.author.id,
    })

    let charInit = results.character
    let character = results.character.toString()
    let character2 = character.replace(/(,|{|}|  |')/gm, '')
    //let attributes =  results.attributes.toString()
    //let attributes2 = attributes.replace(/(,|{|}|  )/gm, '')
    //let skills =  results.skills.toString()
    //let skills2 = skills.replace(/(,|{|}|  |')/gm, '')

    let attributes = results.attributes
    let stats = results.hpStats
    let skills = results.skills
    let saves = results.savingThrows
    let value = results.additionalInfo.money
    let items = results.additionalInfo.items
    let weapons = results.additionalInfo.weapons


    const Discord = require('discord.js');
    const embed = new Discord.MessageEmbed()
    //color and image ->
    embed.setColor('#0099ff')
    embed.setThumbnail('https://i.imgur.com/u0aN19t.png')

    message.delete()
    //list main stats
    if (arguments[0] == null) {

      // character name or default
      if (charInit.name !== null) {
        embed.setTitle(charInit.name + "'s Stats\n")
      }
      else {
        embed.setTitle("Character Stats\n")
      }

      //shows the character owner
      embed.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.js.org')


      //character Main stats
      embed.setDescription('⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀**-Main Stats-**' + "\n:blue_heart: Max Health: " + stats.maxHealth + "⠀⠀⠀" + "❤️ Health: " + stats.currentHealth + "⠀⠀⠀" +
        ":shield: Armor class: " + stats.armorClass + "\n⠀⠀⠀⠀⠀⠀⠀" + "⌛ Initiative: " + stats.initiative + "⠀⠀⠀" + "💨 Speed: " + stats.speed +
        '\n\u200B'
      );

      //stat fields
      embed.setFooter('Made by OddShapedRock', 'https://i.imgur.com/u0aN19t.png');
      message.channel.send(embed);
    }
    else {
      let low = arguments[0].toLowerCase();

      //character excessive information
      if (low == 'info') {

        if (charInit.name !== null) {
          embed.setTitle(charInit.name + "'s Info\n")
        }
        else {
          embed.setTitle("Character Info\n")
        }

        embed.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.js.org')

        let skill0 = []

        //skills
        for (const [key, value] of Object.entries(skills)) {
          if (value == true && key !== '$init') {
            skill0.push(`✔️`)
          }
          else if (key !== '$init') {
            skill0.push(`❌`)
          }
        }

        //saving throws
        let save = []

        for (const [key, value] of Object.entries(saves)) {
          if (value == true && key !== '$init') {
            save.push(`✔️`)
          }
          else if (key !== '$init') {
            save.push(`❌`)
          }
        }

        //information
        embed.addFields({
            name: '⠀',
            value: '⠀⠀⠀💪 Strength:\n⠀⠀⠀💨 Dextarity:\n⠀⠀⠀:shield: Constitution:',
            inline: true
          }, {
            name: '**-Attributes-**',
            value: `${attributes.strength}⠀⠀⠀⠀⠀📚 Intelligence:\n${attributes.dexterity}⠀⠀⠀⠀⠀👴 Wisdom:\n${attributes.constitution}⠀⠀⠀⠀⠀🎲 Charisma:`,
            inline: true
          }, {
            name: '⠀',
            value: `${attributes.intelligence}\n${attributes.wisdom}\n${attributes.charisma}`,
            inline: true
          },

          {
            name: '⠀',
            value: '⠀',
            inline: false
          },

          {
            name: '⠀',
            value: '⠀⠀⠀Strength:\n⠀⠀⠀Dextarity:\n⠀⠀⠀Constitution:',
            inline: true
          }, {
            name: '⠀**-Saves-**',
            value: `${save[0]}⠀⠀⠀⠀⠀Intelligence:\n${save[1]}⠀⠀⠀⠀⠀Wisdom:\n${save[2]}⠀⠀⠀⠀⠀Charisma:`,
            inline: true
          }, {
            name: '⠀',
            value: `${save[3]}\n${save[4]}\n${save[5]}`,
            inline: true
          },

          {
            name: '⠀',
            value: '⠀',
            inline: false
          },

          {
            name: '⠀',
            value: '⠀⠀⠀Acrobatics:\n⠀⠀⠀Animal Handling:\n⠀⠀⠀Arcana:\n⠀⠀⠀Athletics:\n⠀⠀⠀Deception:\n⠀⠀⠀History:\n⠀⠀⠀Insight:\n⠀⠀⠀Intimidation:\n⠀⠀⠀Investigation',
            inline: true
          }, {
            name: '⠀**-Skills-**',
            value: `${skill0[0]}⠀⠀⠀⠀⠀⠀Medicine:\n${skill0[1]}⠀⠀⠀⠀⠀⠀Nature:\n${skill0[2]}⠀⠀⠀⠀⠀⠀Perception:\n${skill0[3]}⠀⠀⠀⠀⠀⠀Performance:\n${skill0[4]}⠀⠀⠀⠀⠀⠀Persuasion:\n${skill0[5]}⠀⠀⠀⠀⠀⠀Religoin:\n${skill0[6]}⠀⠀⠀⠀⠀⠀Sleight of Hand:\n${skill0[7]}⠀⠀⠀⠀⠀⠀Stealth:\n${skill0[8]}⠀⠀⠀⠀⠀⠀Survival:`,
            inline: true
          }, {
            name: '⠀',
            value: `${skill0[9]}\n${skill0[10]}\n${skill0[11]}\n${skill0[12]}\n${skill0[13]}\n${skill0[14]}\n${skill0[15]}\n${skill0[16]}\n${skill0[17]}`,
            inline: true
          },


        )

        embed.setFooter('Made by OddShapedRock', 'https://i.imgur.com/u0aN19t.png');
        message.channel.send(embed);
      }
      else if (low == 'weapons') {

        if (charInit.name !== null) {
          embed.setTitle(charInit.name + "'s Weapons\n")
        }
        else {
          embed.setTitle("Character Weapons\n")
        }

        embed.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.js.org')

        let weapons2 = []

        for (var i = 0; i < weapons.length; i++) {
          weapons2.push({
            name: `${weapons[i].name}`,
            value: `${weapons[i].description}`,
            inline: true
          })
        }
        if (items.length == 0) {
          weapons2.push({
            name: `Uh Oh!`,
            value: `I was unable to find any weapons for this character!`,
            inline: true
          })
        }

        embed.addFields(
          weapons2,
        )

        embed.setFooter('Made by OddShapedRock', 'https://i.imgur.com/u0aN19t.png');
        message.channel.send(embed);


      }
      else if (low == 'items') {

        if (charInit.name !== null) {
          embed.setTitle(charInit.name + "'s Items/tools\n")
        }
        else {
          embed.setTitle("Character Items/tools\n")
        }

        embed.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.js.org')

        let items2 = []

        for (var i = 0; i < items.length; i++) {
          items2.push({
            name: `${items[i].name}`,
            value: `${items[i].description}`,
            inline: true
          })
        }
        if (items.length == 0) {
          items2.push({
            name: `Uh Oh!`,
            value: `I was unable to find any items for this character!`,
            inline: true
          })
        }

        embed.addFields(
          items2,
        )

        embed.setFooter('Made by OddShapedRock', 'https://i.imgur.com/u0aN19t.png');
        message.channel.send(embed);


      }
      else if (low == 'money') {

        if (charInit.name !== null) {
          embed.setTitle(charInit.name + "'s Value\n")
        }
        else {
          embed.setTitle("Character Value\n")
        }

        embed.setAuthor(message.author.username, message.author.avatarURL(), 'https://discord.js.org')

        embed.addFields({
          name: '\u200B',
          value: '\u200B',
          inline: true
        }, {
          name: '⠀⠀ **-Money-**',
          value: `💵 Copper:\n💰 Silver:\n💩️ Electrum:\n🪙 Gold:\n💎 Platinum:`,
          inline: true
        }, {
          name: '⠀',
          value: `${value.copper}\n${value.silver}\n${value.electrum}\n${value.gold}\n${value.platinum}`,
          inline: true
        }, )

        embed.setFooter('Made by OddShapedRock', 'https://i.imgur.com/u0aN19t.png');
        message.channel.send(embed);
      }


      /*
      	embed.addFields(
      	{ name: '\u200B', value: '\u200B' },
      	{ name: 'Attributes', value:  attributes2, inline: true},
      	{ name: '\u200B', value: '\u200B' },
      	)
      */
    }
  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}


/*
	Things I need to do!
	1. create default character stat list (attributes, hp stats, characer description) ***
	2. make secondary character stat lists (profficiency bonuses | items/tools | money)
	3. develop currency system and tracker with money (gambling, conversion, and tracker)
	4. add a dice system for rolls that include bonuses.
*/

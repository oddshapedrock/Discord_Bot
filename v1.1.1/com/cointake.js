const profileSchema = require('../schemas/profileSchema')
module.exports = {
  commands: ['takecoin', 'balsub'],
  expectedArgs: '<player> <amount>',
  permissionError: 'You need more permissions',
  minArgs: 2,
  maxArgs: 2,
  callback: async (message, arguments, text, client, profileData) => {

    const amount = arguments[1];
    const target = message.mentions.users.first();
    if (!target) return message.channel.send(`${target} not found!`);
    message.delete()

    if (amount % 1 != 0 || amount <= 0) return message.channel.send("amount must eb a whole number")

    try {
      const targetData = await profileSchema.findOne({
        userID: target.id
      })
      if (!targetData) return message.channel.send(`This user does not exist in the db`)

      if (profileData.coins + amount > 0) {
        result = {
          $inc: {
            coins: amount,
          },
        }
      }
      else {
        result = {
          $set: {
            coins: 0,
          },
        }
      }
      await profileSchema.findOneAndUpdate({
          userID: message.author.id,
        },
        result
      )
      return message.channel.send(`took coins from ${target}!`)

    }
    catch (e) {
      console.log(e)
    }

  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

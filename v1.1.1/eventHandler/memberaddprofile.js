module.exports = (client, Discord) => {
  const profileSchema = require('../schemas/profileSchema')
  client.on('guildMemberAdd', member => {

    let test = profileSchema.findOne({
      userID: member.id
    })
    if (!test) {
      new profileSchema({
          userID: member.id,
          serverID: member.guild.id,
          coins: 1000,
          bank: 0
        })
        .save()
        .catch(() => {
          message.delete()
            .reply('Failed to save to the database, please report this!')
            .then((message) => {
              message.delete({
                timeout: 1000 * 10,
              })
            })
        })
    }
    else {
      console.log("user has an ID")
    }
  })
}

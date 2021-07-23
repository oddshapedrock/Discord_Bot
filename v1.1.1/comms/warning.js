module.exports = {
  name: 'warning',
  description: "this is a test comand",
  execute(message, args) {

    if (!message.member.hasPermission('ADMINISTRATOR')) {
      message.delete();
      channel.send('You do not have permission to run this command.')
      return
    }

    const user = message.mentions.users.first();
    if (!user) {
      message.delete();
      message.reply('No user mentioned to warn');

    }

    const member = message.guild.member(user)
    if (member) {

      message.delete();
      message.channel.send(`${user.tag} This is your last and final warning read the rules and stop what you are doing!`);
    };
  }
}

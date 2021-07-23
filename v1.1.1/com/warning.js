module.exports = {
  commands: ['warn', 'warning'],
  expectedArgs: '',
  permissionError: 'You need more permissions',
  minArgs: 1,
  callback: (message, arguments, text) => {

    const user = message.mentions.users.first();
    if (!user) {
      message.delete();
      message.reply('No user mentioned to warn');
    }

    const member = message.guild.member(user)
    if (member) {
      message.delete();
      message.channel.send(`${user} This is your last and final warning read the rules and stop what you are doing!`);
    }

  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

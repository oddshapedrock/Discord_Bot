module.exports = {
  commands: ['ban'],
  expectedArgs: '<player>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  maxArgs: 1,
  callback: (message, arguments, text) => {

    const target = message.mentions.users.first();

    if (target) {
      const memberTarget = message.guild.members.cache.get(target.id);
      memberTarget.ban();
      message.channel.send(`"${target}" was baned from the server!`);
    }
    else {
      message.channel.send(`No target player!`);
    }

  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

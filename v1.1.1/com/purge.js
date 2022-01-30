module.exports = {
  commands: ['purge', 'delete', 'del'],
  expectedArgs: '<amount>',
  permissionError: 'You need more permissions',
  minArgs: 1,
  maxArgs: 1,
  callback: async (message, arguments, text) => {

    const amount = arguments[0];
    await message.delete()
    message.channel.bulkDelete(amount, true)
      .catch(error => message.channel.send("Sorry `!purge` has a limit of 100"))
  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

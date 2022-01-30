module.exports = {
  name: 'commands',
  description: "this is a test comand",
  execute(message, args) {
    message.channel.send('!ping \n!purge \n!roles \n!ranks \n!createnewgame \n!kick \n!ban \n!warning')
  }
}

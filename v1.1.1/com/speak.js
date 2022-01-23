module.exports = {
  commands: ['speak', 'say', 'talk'],
  expectedArgs: '',
  permissionError: 'You need more permissions',
  minArgs: 0,
  callback: (message, arguments, text) => {

    const con = message.content;
    const rep = con.split(/[ ]+/);
    rep.shift();
    var rep2 = rep.join(' ');
    message.delete();
    message.channel.send(rep2);

  },
  permissions: ['ADMINISTRATOR'],
  requiredRoles: []
}

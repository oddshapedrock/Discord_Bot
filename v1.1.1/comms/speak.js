module.exports = {
  name: 'speak',
  description: "this is a test comand",
  execute(message, args) {

    const con = message.content;
    const rep = con.split(/[ ]+/);
    rep.shift();
    message.delete();
    message.channel.send(rep);
  }
}

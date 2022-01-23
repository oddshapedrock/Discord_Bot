module.exports = {
  name: 'ranks',
  description: "this is a test comand",
  execute(message, args) {

    async function timer() {
      message.channel.send("hello")
      setTimeout(function() {
        message.react("🦶");
      }, 10000);

    }
    timer();

  }
}

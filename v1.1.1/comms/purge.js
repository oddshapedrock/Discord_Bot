module.exports = {
  name: 'purge',
  description: "this is a text clear comand",
  execute(message, args) {

    const prefix = '!';


    if (message.content.toLowerCase().startsWith(prefix + "purge")) {

      const msg = message.content.toUpperCase();
      const sender = message.author;
      const cont = message.content.slice(prefix.length).split(" ");
      const args = cont.slice(1);
      const amount = parseInt(args[0]);
      const del = amount + 1;

      async function purge() {

        if (!message.member.hasPermission('ADMINISTRATOR')) {
          message.delete();
          message.channel.send(`You need the propper permissions to use this`);
          return;

        }

        if (isNaN(args[0])) {
          message.delete();
          message.channel.send(`please use a number. \nUsage: ` + prefix + `purge <amount>`);
          return;
        }


        message.channel.bulkDelete(del, true)
          .catch(error => message.channel.send("Sorry `!purge` has a limit of 99"))
      }

      purge();

    }
  }
};

const db = require('../db/db.js');
const data = require('../db/collections/data1.js');

module.exports = {
	command: ['testDB'],
	aliases: ['tdb'],
	maxArgs: 0,
	callback: (message, args, content, command, Discord, client) => {

		var end, start;

		//

		for (let i = 0; i < 20; i++) {
			db.add(data, '/collections/data1.js', { id: i, text: "hello world" });
			db.add(data, '/collections/data1.js', { id: i, text: "some thing" });
			db.add(data, '/collections/data1.js', { id: i, text: "edit me" });
		}

		start = performance.now();
		db.add(data, '/collections/data1.js', { id: 1, text: "time" });
		end = performance.now();
		o1 = (end - start);

		//

		start = performance.now();
		find = db.find(data, { text: "some thing" });
		end = performance.now();
		o2 = (end - start);

		//

		start = performance.now();
		db.edit(data, '/collections/data1.js', { text: "edit me" }, { text: "new data", status: "edited" }, true);
		end = performance.now();
		o3 = (end - start)

		//

		start = performance.now();
		db.remove(data, '/collections/data1.js', { text: "hello world" }, true);
		end = performance.now();
		o4 = (end - start);

		for (let i = 0; i < 20; i++) {
			db.remove(data, '/collections/data1.js', { id: i }, true);
		}

		//

		start = performance.now();
		files = db.getAllFiles();
		end = performance.now();
		o5 = (end - start);

		//
		//
		//

		total = (o1 + o2 + o3 + o4 + o5);
		list = (
			`Getting files took -> \`${o5}\` ms\n
			 Adding data took   -> \`${o1}\` ms\n
			 Finding data took  -> \`${o2}\` ms\n
			 Editing data took  -> \`${o3}\` ms\n
			 Deleting data took -> \`${o4}\` ms\n
			 \n
			 Total time: \`${total}\` ms\n
			 Average time: \`${total / 5}\` ms`
		);

		var embed = new Discord.MessageEmbed()
			.setAuthor(`DB test | bot v1.1.2`)
			.setDescription(list)
			.setColor('RED');
		message.channel.send({ embeds: [embed] });

	}
}

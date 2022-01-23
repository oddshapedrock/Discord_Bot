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

		start = new Date();
		db.add(data, '/collections/data1.js', { id: 1, text: "time" });
		end = new Date();
		o1 = (end.getTime() - start.getTime());

		//

		start = new Date();
		find = db.find(data, { text: "some thing" });
		end = new Date();
		o2 = (end.getTime() - start.getTime());

		//

		start = new Date();
		db.edit(data, '/collections/data1.js', { text: "edit me" }, { text: "new data", status: "edited" }, true);
		end = new Date();
		o3 = (end.getTime() - start.getTime())

		//

		start = new Date();
		db.remove(data, '/collections/data1.js', { text: "hello world" }, true);
		end = new Date();
		o4 = (end.getTime() - start.getTime());

		for (let i = 0; i < 20; i++) {
			db.remove(data, '/collections/data1.js', { id: i }, true);
		}

		//

		start = new Date();
		files = db.getAllFiles();
		end = new Date();
		o5 = (end.getTime() - start.getTime());

		//
		//
		//

		total = (o1 + o2 + o3 + o4 + o5);
		list = (
			`Getting files took -> ${o5}ms\n
			 Adding data took   -> ${o1}ms\n
			 Finding data took  -> ${o2}ms\n
			 Editing data took  -> ${o3}ms\n
			 Deleting data took -> ${o4}ms\n
			 \n
			 Total time: ${total}ms\n
			 Average time: ${total / 5}ms`
		);

		var embed = new Discord.MessageEmbed()
			.setAuthor(`DB test | bot v1.1.2`)
			.setDescription(list)
			.setColor('RED');
		message.channel.send({ embeds: [embed] });

	}
}

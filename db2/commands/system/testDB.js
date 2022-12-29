module.exports = {
	command: ['tdb'],
	aliases: ['testDB', 'test'],
	minArgs: 0,
	maxArgs: 0,
	requiredPerms: [],
	requiredRoles: [],
	description: "tests DB features.",
	help: "!testDB or !tdb",
	callback: (message, args, data, Discord, client, command) => {

		const {db, collection, schema} = data

		const dataa = require('../../db/collections/data2.json');

		var end, start;

		//

		for (let i = 0; i < 20; i++) {
			db.add(dataa, '/collections/data2.json', { id: i, text: "hello world" });
			db.add(dataa, '/collections/data2.json', { id: i, text: "some thing" });
			db.add(dataa, '/collections/data2.json', { id: i, text: "edit me" });
		}

		start = performance.now();
		db.add(dataa, '/collections/data2.json', { id: 1, text: "time" });
		end = performance.now();
		o1 = (end - start);

		//

		start = performance.now();
		find = db.find(dataa, { text: "some thing" });
		end = performance.now();
		o2 = (end - start);

		//

		start = performance.now();
		db.edit(dataa, '/collections/data2.json', { text: "edit me" }, { text: "new data", status: "edited" }, true);
		end = performance.now();
		o3 = (end - start)

		//

		start = performance.now();
		db.remove(dataa, '/collections/data2.json', { text: "hello world" }, true);
		end = performance.now();
		o4 = (end - start);

		for (let i = 0; i < 20; i++) {
			db.remove(dataa, '/collections/data2.json', { id: i }, true);
		}

		//

		start = performance.now();
		files = db.getAllFiles('./collections');
		end = performance.now();
		o5 = (end - start);

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
			.setAuthor({name: `DB test | bot v1.1.2`})
			.setDescription(list)
			.setColor('RED');
		message.channel.send({ embeds: [embed] });

	}
}

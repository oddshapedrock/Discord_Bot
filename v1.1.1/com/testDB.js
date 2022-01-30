const testSchema = require('../schemas/testSchema');

module.exports = {
	commands: ['tdb'],
	maxArgs: 0,
	callback: async (message, arguments, text, client, a, Discord) => {

		var end, start;

		//

		for (let i = 0; i < 20; i++) {

			new testSchema({ id: i, text: "hello world" }).save().catch(() => {
				message.reply('Failed to save to the database, please report this!').then((message) => {
					message.delete({ timeout: 1000 * 10, })
				})
			})
			new testSchema({ id: i, text: "some thing" }).save().catch(() => {
				message.reply('Failed to save to the database, please report this!').then((message) => {
					message.delete({ timeout: 1000 * 10, })
				})
			})
			new testSchema({ id: i, text: "edit me" }).save().catch(() => {
				message.reply('Failed to save to the database, please report this!').then((message) => {
					message.delete({ timeout: 1000 * 10, })
				})
			})
		}

		start = new Date();
		new testSchema({ id: 1, text: "time" }).save().catch(() => {
			message.reply('Failed to save to the database, please report this!').then((message) => {
				message.delete({ timeout: 1000 * 10, })
			})
		})
		end = new Date();
		o1 = (end.getTime() - start.getTime());

		//

		start = new Date();
		const targetData2 = await testSchema.find({ text: "some thing" })
		end = new Date();
		o2 = (end.getTime() - start.getTime());

		//

		start = new Date();
		await testSchema.updateMany({ text: "edit me" }, { text: "edited" }, { returnOriginal: false, upsert: true, })
		end = new Date();
		o3 = (end.getTime() - start.getTime());

		//

		start = new Date();
		await testSchema.deleteMany({ text: "hello world" })
		end = new Date();
		o4 = (end.getTime() - start.getTime());

		for (let i = 0; i < 20; i++) {
			await testSchema.deleteMany({ id: i })
		}

		//
		//
		//

		total = (o1 + o2 + o3 + o4);
		list = (
			`Adding data took   -> ${o1}ms\n
     Finding data took  -> ${o2}ms\n
     Editing data took  -> ${o3}ms\n
     Deleting data took -> ${o4}ms\n
     \n
     Total time: ${total}ms\n
     Average time: ${total / 4}ms`
		);

		var embed = new Discord.MessageEmbed()
			.setAuthor(`DB test | bot v1.1.2`)
			.setDescription(list)
			.setColor('RED');
		message.channel.send(embed);

	}
}

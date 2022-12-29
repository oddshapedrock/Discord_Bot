module.exports ={
	name: 'ppcreate',
	execute (message, args){
		
		async function ppmodel() {
		const profileModel = require('../models/pprofileSchema');

		let profile = await profileModel.create({
		userID: message.member.id,
		serverID: message.member.guild.id,
		coins: 1000,
		bank: 0
		});
		profile.save();
		}
		ppmodel();
		
	}
}
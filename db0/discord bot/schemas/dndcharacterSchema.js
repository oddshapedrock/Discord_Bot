const mongoose = require('mongoose')

const reqString = {
	type: String, 
	required: true,
	default: undefined,
}

const reqNumber = {
	type: Number,
	required: true,
	default: 0,
}

const dndcharacterSchema = mongoose.Schema({
	guildId: reqString,
	memberId: reqString,
	character: {
		name: reqString,
		race: reqString,
		class: reqString,
		background: reqString,
		Alignment: reqString,
	},
	hpStats: {
		maxHealth: reqNumber,
		currentHealth: reqNumber,
		armorClass: reqNumber,
		initiative: reqNumber,
		speed: reqNumber,
	},
	attributes: {
		strength: reqNumber,
		dexterity: reqNumber,
		constitution: reqNumber,
		intelligence: reqNumber,
		wisdom: reqNumber,
		charisma: reqNumber,
	},
	skills: {
		acrobatics: reqString,
		animalHandling: reqString,
		arcana: reqString,
		athletics: reqString,
		deception: reqString,
		history: reqString,
		insight: reqString,
		intimidation: reqString,
		investigation: reqString,
		medicine: reqString,
		nature: reqString,
		perception: reqString,
		performance: reqString,
		persuassion: reqString,
		religion: reqString,
		slieghtOfHand: reqString,
		stealth: reqString,
		survival: reqString,
	},
	savingThrows: {
		strength: reqString,
		dexterity: reqString,
		constitution: reqString,
		intelligence: reqString,
		wisdom: reqString,
		charisma: reqString,
	},
	additionalInfo: {
		weapons: [
			{
				name: reqString,
				description: reqString,
			},
		],
		money: {
			copper: reqNumber,
			silver: reqNumber,
			electrum: reqNumber,
			gold: reqNumber,
			platinum: reqNumber,
		},
		items:[
			{
				name: reqString,
				description: reqString,
			},
		],
	},
	
})

module.exports = mongoose.model('dndcharacterSchema', dndcharacterSchema)
const dndcharacterSchema = require('../schemas/dndcharacterSchema')

module.exports = {
	commands: ['dndcreatenew', 'createcharacter', 'newcharacter'],
	expectedArgs: '<new || set || add || remove> (variable) (amount)',
	permissionError: 'You need more permissions',
	minArgs: 0,
	callback: async (message, arguments, text) => {
		
		const obj = {
			guildId: message.guild.id,
			memberId: message.author.id,
		}
		
		let chosen = null
		await dndcharacterSchema.findOneAndUpdate(
			obj,
			{
				...obj,
				character: {
					name: null,
					race: null,
					class: null,
					background: null,
					Alignment: null,
				},
				hpStats: {
					maxHealth: 0,
					currentHealth: 0,
					armorClass: 0,
					initiative: 0,
					speed: 0,
				},
				attributes: {
					strength: 0,
					dexterity: 0,
					constitution: 0,
					intelligence: 0,
					wisdom: 0,
					charisma: 0,
				},
				skills: {
					Acrobatics: 0,
					AnimalHandling: 0,
					Arcana: 0,
					Athletics: 0,
					Deception: 0,
					History: 0,
					Insight: 0,
					Intimidation: 0,
					Investigation: 0,
					Medicine: 0,
					Nature: 0,
					Perception: 0,
					Performance: 0,
					Persuassion: 0,
					Religion: 0,
					SlieghtOfHand: 0,
					Stealth: 0,
					Survival: 0,
				},
				savingThrows: {
					strength: 0,
					dexterity: 0,
					constitution: 0,
					intelligence: 0,
					wisdom: 0,
					charisma: 0,
				},
				additionalInfo: {
					weapons: [],
					money: {
						copper: 0,
						silver: 0,
						electrum: 0,
						gold: 0,
						platinum: 0,
						},
					items: [],
				},
			},
			{
				upsert: true,
			}
		)
		
	message.channel.send("generating character...");
		
	},
	permissions: ['ADMINISTRATOR'],
	requiredRoles: []
}
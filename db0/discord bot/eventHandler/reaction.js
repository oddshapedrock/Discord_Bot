const messageSchema = require('../schemas/message')
const embeded = require('../com/roles')
const rrole = require('../com/rolesav')

const handleReaction = async(reaction, user, adding) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	
	if (user.bot) return;
	if (!reaction.message.guild) return;
	const reacted = reaction.message.id
	const msg = await messageSchema.find({messageId: reacted});
	
	for (const result of msg) {
		const { guildId, channelId, messageId, roles } = result
		
		for (i = 0; i < roles.length; i++){
			if (reaction.emoji.id || reaction.emoji.name == roles[i].emoji){
				if (reacted == messageId){
					if (adding) {
						await reaction.message.guild.members.cache.get(user.id).roles.add(roles[i].roleId)
						} else {
						await reaction.message.guild.members.cache.get(user.id).roles.remove(roles[i].roleId)
					}
				}
			}
		}
		return
	}
}



module.exports = (client, Discord) => {
	client.on('messageReactionAdd', (reaction, user) => {
		handleReaction(reaction, user, true)
	})
	
	client.on('messageReactionRemove', (reaction, user) => {
		handleReaction(reaction, user, false)
	})
}

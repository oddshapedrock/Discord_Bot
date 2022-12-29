const mongo = require('../mongo')
const mongoose = require('mongoose')
const mongodb = require('mongodb')
const messageSchema = require('../models/message')
const { addToCache } = require('../features/rr')
const nfetch = require('node-fetch');

module.exports = {
  minArgs: 1,
  expectedArgs: '[Channel tag] <Message text>',
  requiredPermissions: ['ADMINISTRATOR'],
  callback: async ({ message, args }) => {
    const { guild, mentions } = message
    const { channels } = mentions
    const targetChannel = channels.first() || message.channel

    if (channels.first()) {
      args.shift()
    }

	nfetch('https://api.ipify.org/?format=json').then(results => results.json()).then(console.log);
	
    const text = args.join(' ')

    const newMessage = await targetChannel.send(text)

    if (guild.me.hasPermission('MANAGE_MESSAGES')) {
      message.delete()
    }

    if (!guild.me.hasPermission('MANAGE_ROLES')) {
      message.reply(
        'The bot requires access to manage roles to be able to give or remove roles'
      )
      return
    }
	

			try{
				await messageSchema.findOneAndUpdate({
					guildId: guild.id
				}, {
					guildId: guild.id,
					channelId: targetChannel.id,
					messageId: newMessage.id,
					roles: [],
				}, {
					upsert: true
				})
			} catch(e){
			console.log("E2" + e)
			}
	
	
	
	
	
    addToCache(guild.id, newMessage)

 
  },
}

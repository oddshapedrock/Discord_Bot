const Discord = require("discord.js");

const intent = [
  Discord.Intents.FLAGS.GUILDS,
  Discord.Intents.FLAGS.GUILD_MEMBERS,
  Discord.Intents.FLAGS.GUILD_BANS,
  Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
  Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
  Discord.Intents.FLAGS.GUILD_WEBHOOKS,
  Discord.Intents.FLAGS.GUILD_INVITES,
  Discord.Intents.FLAGS.GUILD_VOICE_STATES,
  Discord.Intents.FLAGS.GUILD_PRESENCES,
  Discord.Intents.FLAGS.GUILD_MESSAGES,
  Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
  Discord.Intents.FLAGS.DIRECT_MESSAGES,
  Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
  Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
];

const validPermissions = [
  "CREATE_INSTANT_INVITE",
  "KICK_MEMBERS",
  "BAN_MEMBERS",
  "ADMINISTRATOR",
  "MANAGE_CHANNELS",
  "MANAGE_GUILD",
  "ADD_REACTIONS",
  "VIEW_AUDIT_LOG",
  "PRIORITY_SPEAKER",
  "STREAM",
  "VIEW_CHANNEL",
  "SEND_MESSAGES",
  "SEND_TTS_MESSAGES",
  "MANAGE_MESSAGES",
  "EMBED_LINKS",
  "ATTACH_FILES",
  "READ_MESSAGE_HISTORY",
  "MENTION_EVERYONE",
  "USE_EXTERNAL_EMOJIS",
  "VIEW_GUILD_INSIGHTS",
  "CONNECT",
  "SPEAK",
  "MUTE_MEMBERS",
  "DEAFEN_MEMBERS",
  "MOVE_MEMBERS",
  "USE_VAD",
  "CHANGE_NICKNAME",
  "MANAGE_NICKNAMES",
  "MANAGE_ROLES",
  "MANAGE_WEBHOOKS",
  "MANAGE_EMOJIS"
];

exports.intent = intent;
exports.validPermissions = validPermissions;
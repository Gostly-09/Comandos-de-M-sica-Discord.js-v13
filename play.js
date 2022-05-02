const Discord = require('discord.js');
const DisTube = require('distube')

module.exports = {
	name: "play",
	alias: ["p", "reproducir"],

execute (client, message, args){

  if(!args.join(' ')) return message.reply('**:x: - Debes especificar una canción!**')
  if(!message.member.voice?.channel) return message.reply('**:x: - Debes estar en un canal de voz!**')
  if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('**:x: - Debes estar en el mismo canal de voz que yo!**')
  client.distube.play(message.member.voice?.channel, args.join(' '), {
      member: message.member,
      textChannel: message.channel,
      message
  });
  if(message.content.includes('playlist')) return message.reply(`**🕒 - Cargando playlist...**`).then(x => setTimeout(() => {x.delete()}, 10000))
  message.reply(`**🔎 - Buscando resultados...**`).then(x => setTimeout(() => {x.delete()}, 10000))
	
  }
	
}
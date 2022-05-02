const Discord = require('discord.js');
const DisTube = require('distube')

module.exports = {
	name: "resume",
	alias: ["resumir"],

execute (client, message, args){

  const queue = client.distube.getQueue(message);
  if(!queue) return message.reply('**:x: - No hay música en el servidor!**')
  if(!message.member.voice?.channel) return message.reply('**:x: - Debes estar en un canal de voz!**')
  if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('**:x: - Debes estar en el mismo canal de voz que yo!**')
  client.distube.resume(message);
  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'Canción resumida!', iconURL: message.author.displayAvatarURL() })
    .setColor('WHITE')
  .setFooter({ text: `Por ${message.author.tag}` })
    message.reply({ embeds: [embed] })
	
  }
	
}
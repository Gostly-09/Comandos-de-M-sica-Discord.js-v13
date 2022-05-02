const Discord = require('discord.js');
const DisTube = require('distube')

module.exports = {
	name: "stop",
	alias: ["parar", "leave", "salir"],

execute (client, message, args){

  const queue = client.distube.getQueue(message);
  if(!queue) return message.reply('**:x: - No hay música en el servidor!**')
  if(!message.member.voice?.channel) return message.reply('**:x: - Debes estar en un canal de voz!**')
  if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('**:x: - Debes estar en el mismo canal de voz que yo!**')
  client.distube.stop(message);
  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'La música ha sido detenida!', iconURL: message.author.displayAvatarURL() })
    .setFooter({ text: `Por ${message.author.tag}` })
    .setColor('WHITE')
    message.reply({ embeds: [embed] })
	
  }
	
}
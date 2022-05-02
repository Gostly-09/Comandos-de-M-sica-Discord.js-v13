const Discord = require('discord.js');
const DisTube = require('distube')

module.exports = {
	name: "siguiente",
	alias: ["skip"],

execute (client, message, args){
    
    const skipi = new Discord.MessageEmbed()
    .setAuthor({ name: 'Ultima canción saltada!', iconURL: message.author.displayAvatarURL() })
    .setFooter({ text: `Por ${message.author.tag}` })
    .setColor('WHITE')

  const queue = client.distube.getQueue(message);
  if(!queue) return message.reply('**:x: - No hay música en el servidor!**')
  if(queue.songs.length <= 1) return client.distube.stop(message).then(message.reply({ embeds: [skipi] }))
  if(!message.member.voice?.channel) return message.reply('**:x: - Debes estar en un canal de voz!**')
  if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('**:x: - Debes estar en el mismo canal de voz que yo!**')
  client.distube.skip(message);
  const embed = new Discord.MessageEmbed()
    .setAuthor({ name: 'Canción saltada!', iconURL: message.author.displayAvatarURL() })
    .setColor('WHITE')
  .setFooter({ text: `Por ${message.author.tag}` })
    message.reply({ embeds: [embed] })
	
  }
	
}
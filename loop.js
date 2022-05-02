const Discord = require('discord.js');
const DisTube = require('distube')

module.exports = {
	name: "loop",
	alias: [],

async execute (client, message, args){
  
  const queue = client.distube.getQueue(message);
  if(!queue) return message.reply('**:x: - No hay música en el servidor!**')
  if(!message.member.voice?.channel) return message.reply('**:x: - Debes estar en un canal de voz!**')
  if(message.guild.me.voice?.channel && message.member.voice?.channel.id != message.guild.me.voice?.channel.id) return message.reply('**:x: - Debes estar en el mismo canal de voz que yo!**')

  const row1 = new Discord.MessageActionRow()
  .addComponents(
    new Discord.MessageButton() 
    .setCustomId("none") 
    .setLabel("Desactivar") 
    .setStyle("SECONDARY") 
  )
  .addComponents( 
    new Discord.MessageButton() 
    .setCustomId("single") 
    .setLabel("Canción Actual") 
    .setStyle("PRIMARY") 
  )
  .addComponents( 
    new Discord.MessageButton() 
    .setCustomId("all") 
    .setLabel("Toda la Lista") 
    .setStyle("SUCCESS") 
  )

  const looping = new Discord.MessageEmbed()
  .setDescription('**────── Elige alguna de estas opciones! ──────\n`Desactivar / Repetir Canción / Repetir Lista`**')
  .setColor('WHITE')
  
  let m = await message.reply({ embeds: [looping], components: [row1] })
  const f = i => i.user.id === message.author.id;
  const collector = m.createMessageComponentCollector({time: 180000})

  collector.on("collect", async i => { 
    if(i.user.id !== message.author.id) return i.reply({ content: "Esta interacción no es para ti!", ephemeral: true })
    if(i.customId === 'none' && client.distube.getQueue(message).repeatMode !== 0){
        await i.deferUpdate()
        client.distube.getQueue(message).setRepeatMode(0) && i.editReply({content:'La repetición ha sido desactivada', embeds:[], components:[]}) } else { if(i.customId === "none" && client.distube.getQueue(message).repeatMode === 0){ i.reply({content:'Esta opción ya esta activa!', ephemeral: true}) }
    }
    if(i.customId === "single" && client.distube.getQueue(message).repeatMode !== 1){ 
        await i.deferUpdate()
        client.distube.getQueue(message).setRepeatMode(1) && i.editReply({content:'La repetición ha sido activada en la canción actual!', embeds:[], components:[]}) } else { if(i.customId === "single" && client.distube.getQueue(message).repeatMode === 1){ i.reply({content:'Esta opción ya esta activa!', ephemeral: true}) }
    }
    if(i.customId === "all" && client.distube.getQueue(message).repeatMode !== 2){ 
        await i.deferUpdate()
        client.distube.getQueue(message).setRepeatMode(2) && i.editReply({content:'La repetición ha sido activada en la lista de canciones actual!', embeds:[], components:[]}) } else { if(i.customId === "all" && client.distube.getQueue(message).repeatMode === 2){ i.reply({content:'Esta opción ya esta activa!', ephemeral: true}) }
	}
    })
  }
	
}
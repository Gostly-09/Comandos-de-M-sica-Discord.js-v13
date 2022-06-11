const { DisTube }  = require('distube');
const { SpotifyPlugin } = require('@distube/spotify');
const { SoundCloudPlugin } = require('@distube/soundcloud');
client.distube = new DisTube(client, {
    emitNewSongOnly: false,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: false,
    savePreviousSongs: true,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 0,
    nsfw: true,
    emptyCooldown: 0,
    ytdlOptions: {
        highWaterMark: 1024 * 1024 * 64,
        quality: "highestaudio",
        format: "audioonly",
        liveBuffer: 60000,
        dlChunkSize: 1024 * 1024 * 4,
    },
    youtubeDL: false,
    plugins: [
        new SpotifyPlugin({
            parallel: true,
            emitEventsAfterFetching: true,
        }),
        new SoundCloudPlugin()
    ]
})

client.distube.on('playSong', (queue, song) => {
    queue.textChannel.send({
        embeds: [new Discord.MessageEmbed()
        .setAuthor({ iconURL: song.user.displayAvatarURL(), name: "Reproduciendo ahora:" })
        .setDescription(`**[\`${song.name}\`](${song.url}) - \`${song.formattedDuration}\`**`)
        .setColor('WHITE')
        .setFooter({ text: `Añadida por ${song.user.tag}!` })
        .setThumbnail(song.thumbnail)
        ]
    })
})

client.distube.on('addSong', (queue, song) => {
    queue.textChannel.send({
        embeds: [new Discord.MessageEmbed()
        .setAuthor({ iconURL: song.user.displayAvatarURL(), name: "Listado ahora:" })
        .setDescription(`**[\`${song.name}\`](${song.url}) - \`${song.formattedDuration}\`**`)
        .setColor('WHITE')
        .setFooter({ text: `Añadida por ${song.user.tag}!` })
        .setThumbnail(song.thumbnail)
        ]
    })
})

client.distube.on('initQueue', (queue) => {
    queue.autoplay = false;
    queue.volume = 100;
})

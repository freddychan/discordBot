const Discord = module.require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
	console.log("in play cmd");
	const playargs = message.content.split(/\s+/g);
	const voiceChannel = message.member.voiceChannel;
	const queue = message.client.queue;
	const serverQueue = message.client.queue.get(message.guild.id);
		
	if (!voiceChannel) return message.reply("I must be in a voice channel.");
		
	const audioInfo = await ytdl.getInfo(playargs[1]);
	const song = {
		title: audioInfo.title,
		url: audioInfo.video_url,
	};
		
	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			this.play(message, queueContruct.songs[0]);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		return message.channel.send(`${song.title} has been added to the queue!`);
	}
}

module.exports.help = {
	name: "play"
}
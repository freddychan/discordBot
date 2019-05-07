const Discord = module.require("discord.js");
const ytdl = require("ytdl-core");

// Calls bot to join voice channel and begin playing audio from youtube link
module.exports.run = async (message) => {
	//console.log("in play cmd");
	const args = message.content.split(/\s+/g);
	const voiceChannel = message.member.voiceChannel;
		
	if (!voiceChannel) return message.reply("I must be in a voice channel.");
		
	const audioInfo = await ytdl.getInfo(args[2]);
	const audio = {
		title: audioInfo.title,
		url: audioInfo.video_url,
	};
		
	const queue = {
		textChannel: message.channel,
		voiceChannel: voiceChannel,
		connection: null,
		songs: [],
		volume: 5,
		playing: true,
	};

	queue.songs.push(audio);

	try {
		var connection = await voiceChannel.join();
		queue.connection = connection;
		const dispatcher = connection.playStream(ytdl(audio.url))
			.on('end', () => {
				console.log('Music ended!');
			})
				.on('error', error => {
					console.error(error);
			});
		message.channel.send("Playing " + audio.title);
		} catch (err) {
			console.log(err);
			return message.channel.send(err);
		}
}

// Call command with !db play "youtube-url"
module.exports.help = {
	name: "play"
}
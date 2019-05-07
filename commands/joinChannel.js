const Discord = module.require("discord.js");

// Joins voice channel of message author
module.exports.run = async (message) => {
	if (message.member.voiceChannel) {
		if (!message.guild.voiceConnection) {
			const channel = message.member.voiceChannel;
			channel.join()
				.then(connection => {
					message.channel.send("Successfully Joined!");
			})
		}
	}
	else {
		message.reply("You must be in a voice channel to call me!");
	}
}

// Call command with !db join
module.exports.help = {
	name: "join"
}
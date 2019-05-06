const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (message.member.voiceChannel) {
		if (!message.guild.voiceConnection) {
			const channel = message.member.voiceChannel;
			channel.join()
				.then(connection => {
					message.reply("Successfully Joined!");
			})
		}
	}
	else {
		message.reply("You must be in a voice channel to call me!");
	}
}

module.exports.help = {
	name: "join"
}
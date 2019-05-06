const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	if (message.guild.voiceConnection) {
		message.reply("Buh-Bye!");
		message.guild.voiceConnection.disconnect();
	}
	else {
		message.reply("I am not in a voice channel!");
	}
}

module.exports.help = {
	name: "leave"
}
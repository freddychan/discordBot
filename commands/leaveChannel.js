const Discord = module.require("discord.js");

// Leaves voice channel of message author
module.exports.run = async (message) => {
	if (message.guild.voiceConnection) {
		message.channel.send("Buh-Bye!");
		message.guild.voiceConnection.disconnect();
	}
	else {
		message.channel.send("I am not in a voice channel!");
	}
}

// Call command with !db leave
module.exports.help = {
	name: "leave"
}
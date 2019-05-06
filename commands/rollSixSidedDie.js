const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) => {
	let cast = Math.floor((Math.random() * 6) + 1);
	message.channel.send(cast);
}

module.exports.help = {
	name: "roll"
}
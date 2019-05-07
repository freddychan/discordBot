const Discord = module.require("discord.js");

// Rolls a six sided die
module.exports.run = async (message) => {
	let cast = Math.floor((Math.random() * 6) + 1);
	message.reply(cast);
}

// Call command with !db roll
module.exports.help = {
	name: "roll"
}
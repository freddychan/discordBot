import "./commands/joinChannel.js";
import "./commands/leaveChannel.js";
import "./commands/rollSixSidedDie.js";

const Discord = require("discord.js");
const bot = new Discord.Client();
//const config = require("./config.json");
const fs = require("fs");

const prefix = process.env.prefix;

bot.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
	if (err) console.error(err);
	
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) {
		console.log("No commands found");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands!`);
	
	jsfiles.forEach((f, i) => {
		let props = require(`../discordBot/commands/${f}`);
		console.log(`${i+1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

bot.once("ready", () => {
	console.log("Ready!");
});

bot.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	let args = message.content.split(/\s+/g);
	let cmd = args[1].toLowerCase();
	
	let command = bot.commands.get(cmd);
	if (command) command.run(bot, message, args);

});


bot.login(process.env.token);
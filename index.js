const Discord = require("discord.js");
const bot = new Discord.Client();
//const config = require("./config.json");
const fs = require("fs");

const prefix = process.env.prefix;

bot.commands = new Discord.Collection();

// Reads all command files found in commands directory
fs.readdir("./commands/", (err, files) => {
	if (err) console.error(err);
	
	let jsfiles = files.filter(f => f.split(".").pop() === "js");
	if (jsfiles.length <= 0) {
		console.log("No commands found");
		return;
	}
	console.log(`Loading ${jsfiles.length} commands!`);
	
	jsfiles.forEach((f, i) => {
		let props = require(`./commands/${f}`);
		console.log(`${i+1}: ${f} loaded!`);
		bot.commands.set(props.help.name, props);
	});
});

// Connects to Heroku Postgres database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

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
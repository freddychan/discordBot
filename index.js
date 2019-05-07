const Discord = require("discord.js");
const bot = new Discord.Client();
//const config = require("./config.json");		// For running local
const fs = require("fs");
const { Client } = require('pg');;

const prefix = process.env.prefix;
//const prefix = config.prefix;					// For running local

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
const dbclient = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

try {
	if (dbclient.connect()) console.log("Connected to database successfully!");
}
catch (error) {
	console.log(error);
};

bot.once("ready", () => {
	console.log("Ready!");
});

bot.on("message", message => {
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	const args = message.content.split(/\s+/g);
	const cmd = args[1].toLowerCase();
	
	let command = bot.commands.get(cmd);
	try {
		command.run(message);
	}
	catch (error) {
		console.log(error);
		message.reply("Error running that command!");
	}
});


bot.login(process.env.token);
//bot.login(config.token);						// For running local
const Discord = require('discord.js');
const client = new Discord.Client();

let arg;
let cmd;

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {
	if (message.content.substring(0,3) == '!db') {
		arg = message.content.split(' ');
		cmd = arg[1];
	}
	switch (cmd) {
		case 'ping':
			// send back "Pong." to the channel the message was sent in
			message.channel.send('Pong.', {file: 'https://i.imgur.com/xtoLyW2.jpg'});
			//arg = null;
			//cmd = null;
			break;
	}
});


client.login('NTc0MDA1OTIyMjIyMDQ3MjMy.XMzHPQ.OwPv_kzjJEpL-cLItsFfo_i_Qi4');
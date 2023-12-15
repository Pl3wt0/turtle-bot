
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const client = new Client({ intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent] });


client.once(Events.ClientReady, readyClient => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});
client.on(Events.MessageCreate, async(message) => {

	if (message.author.bot) return;
	

	
	const links = message.content.match(/https?:\/\/\S+/gi);
  
	if (links) {

	  for(const link of links){
		const foundLink=await prisma.links.findFirst({
			where:{
				link:{
					equals:link
				}
			}
		})



		if(foundLink){
			message.react("🐢")
		}else{
			await prisma.links.create({
				data: {
					link
				}
			})
			console.log(`Added links: ${links.join(', ')}`);
		}
	  }
	  
	}
  });


client.login(token);


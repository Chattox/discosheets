import dotenv from "dotenv";
import { Client, Events, GatewayIntentBits } from "discord.js";

// Get bot token from .env file
dotenv.config();
const { DISCORD_TOKEN } = process.env;
if (!DISCORD_TOKEN) {
  throw new Error("Missing discord bot token from .env file");
}

// Create new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When client is ready, log to console
client.once(Events.ClientReady, (readyClient) => {
  console.info(`Ready! Logged in as ${readyClient.user.tag}`);
});

// Log bot into Discord using bot token
client.login(DISCORD_TOKEN);

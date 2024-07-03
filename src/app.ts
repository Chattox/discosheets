import dotenv from "dotenv";
import { Events, GatewayIntentBits } from "discord.js";
import { initCommands } from "./utils/initCommands";
import { ExtendedClient } from "./utils/ExtendedClient";

// Get bot token from .env file
dotenv.config();
const { DISCORD_TOKEN } = process.env;
if (!DISCORD_TOKEN) {
  throw new Error("Missing discord bot token from .env file");
}

// Create new client instance
const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

initCommands(client);

// When client is ready, log to console
client.once(Events.ClientReady, (readyClient) => {
  console.info(`Ready! Logged in as ${readyClient.user.tag}`);
  console.info(`${client.guilds.cache.size} servers`);
  console.info(`${client.channels.cache.size} channels`);
});

// Log bot into Discord using bot token
client.login(DISCORD_TOKEN);

client.on(Events.InteractionCreate, (interaction) => {
  console.log(interaction);
});

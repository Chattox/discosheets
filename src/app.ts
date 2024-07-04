import pc from "picocolors";
import { Events, GatewayIntentBits } from "discord.js";
import { initCommands } from "./utils/initCommands";
import { ExtendedClient } from "./utils/ExtendedClient";
import { BOT_TOKEN } from "./utils/config";
import { initGoogleSheet } from "./utils/initGoogleSheet";

// Create new client instance
const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

initCommands(client);
initGoogleSheet(client);

// When client is ready, log to console
client.once(Events.ClientReady, (readyClient) => {
  console.log(
    `${pc.green("[INFO]")} Ready! Logged in as ${readyClient.user.tag}`
  );
  console.log(
    `${pc.green("[INFO]")} Active in ${
      client.guilds.cache.size
    } server(s) and ${client.channels.cache.size} channels`
  );
});

// Log bot into Discord using bot token
client.login(BOT_TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    console.log(
      `${pc.bgBlack(pc.red("[WARNING]"))} No command matching ${
        interaction.commandName
      } was found`
    );
  }

  try {
    await command?.run(interaction);
  } catch (err) {
    console.log(err);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("replies with pong");

export const execute = async (interaction: CommandInteraction) => {
  await interaction.reply("Pong!");
};

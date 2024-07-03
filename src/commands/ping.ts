import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("replies with pong");

export const run = async (interaction: CommandInteraction) => {
  await interaction.reply({ content: "Pong!", ephemeral: true });
};

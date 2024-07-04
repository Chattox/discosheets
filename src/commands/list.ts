import { CommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("Shows all rows added to the sheet");

export const run = async (interaction: CommandInteraction) => {
  console.log(interaction);
};

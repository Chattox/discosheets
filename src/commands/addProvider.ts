import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { GOOGLE_SPREADSHEET_ID } from "../utils/config";

export const data = new SlashCommandBuilder()
  .setName("addprovider")
  .setDescription("Add a provider to our recommendation list!")
  .addStringOption((option) =>
    option
      .setName("provider")
      .setDescription("Provider name and title formatted like Jane Doe MD")
      .setRequired(true)
      .setMaxLength(1024)
  )
  .addStringOption((option) =>
    option
      .setName("practice")
      .setDescription("Name of the provider's practice, hospital, clinic, etc")
      .setRequired(true)
      .setMaxLength(1024)
  )
  .addStringOption((option) =>
    option
      .setName("location")
      .setDescription(
        "Location of the practice, formatted like City, State/Province, Country"
      )
      .setRequired(true)
      .setMaxLength(1024)
  )
  .addStringOption((option) =>
    option
      .setName("comments")
      .setDescription(
        "Add notes or a review here. Publicly visible; contact mods to request changes/removal"
      )
      .setRequired(false)
      .setMaxLength(1024)
  );

export const run = async (interaction: ChatInputCommandInteraction) => {
  const provider = interaction.options.getString("provider") as string;
  const practice = interaction.options.getString("practice") as string;
  const location = interaction.options.getString("location") as string;
  const comments = interaction.options.getString("comments") as string;

  const addedRow = await interaction.client.googleWorksheet?.addRow({
    provider: provider,
    practice: practice,
    location: location,
    comments: comments ? comments : "",
  });

  const addedRowNumber = addedRow?.rowNumber;

  const replyEmbed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Success!")
    .setDescription(
      `${addedRow?.get(
        "provider"
      )} has been added to the list!\n Please contact the mods to request edit/removal`
    );

  await interaction.reply({
    embeds: [replyEmbed],
    ephemeral: true,
  });

  if (interaction.client.staffChannel) {
    const staffNotificationEmbedFields: APIEmbedField[] = [
      { name: "Provider", value: provider },
      { name: "Practice", value: practice },
      { name: "Location", value: location },
      { name: "Comments", value: comments ? comments : "n/a" },
    ];

    const staffNotificationEmbed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("New provider added!")
      .setURL(
        `https://docs.google.com/spreadsheets/d/${GOOGLE_SPREADSHEET_ID}/?gid=0#gid=0&range=${addedRowNumber}:${addedRowNumber}`
      )
      .setFields(staffNotificationEmbedFields);

    await interaction.client.staffChannel.send({
      embeds: [staffNotificationEmbed],
    });
  }
};

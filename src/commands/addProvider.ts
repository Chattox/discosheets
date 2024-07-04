import {
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("addprovider")
  .setDescription("Add a provider to our recommendation list!")
  .addStringOption((option) =>
    option
      .setName("name")
      .setDescription("Provider name and title formatted like Jane Doe MD")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("practice")
      .setDescription("Name of the provider's practice, hospital, clinic, etc")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("location")
      .setDescription(
        "Location of the practice, formatted like City, State/Province, Country"
      )
      .setRequired(true)
  )
  .addStringOption((option) =>
    option
      .setName("comments")
      .setDescription(
        "Add notes or a review here. Publicly visible; contact mods to request changes/removal"
      )
      .setRequired(false)
  );

export const run = async (interaction: ChatInputCommandInteraction) => {
  const sheet = interaction.client.googleSheet?.sheetsByIndex[0];
  const name = interaction.options.getString("name");
  const practice = interaction.options.getString("practice");
  const location = interaction.options.getString("location");
  const comments = interaction.options.getString("comments");

  const addedRow = await sheet?.addRow({
    name: name as string,
    practice: practice as string,
    location: location as string,
    comments: comments ? (comments as string) : "",
  });

  const replyEmbed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("Success!")
    .setDescription(
      `${addedRow?.get(
        "name"
      )} has been added to the list!\n Please contact the mods to request edit/removal`
    );

  await interaction.reply({
    embeds: [replyEmbed],
    ephemeral: true,
  });
};

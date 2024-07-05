import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("Shows a list of providers currently added to the sheet");

export const run = async (interaction: ChatInputCommandInteraction) => {
  const rows = await interaction.client.googleWorksheet?.getRows<RowData>({
    limit: 25,
  });
  console.log(interaction.client.googleWorksheet?.headerValues);

  if (!rows?.length) {
    const errorEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Error!")
      .setDescription("The list appears empty!");

    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  const embedFields = rows?.map((row) => {
    const name = row.get("name");
    const practice = row.get("practice");
    const location = row.get("location");
    const comments = row.get("comments");

    return {
      name,
      value: `Practice: ${practice}
      Location: ${location}
      ${comments ? `Comments: ${comments}` : ""}`,
    };
  });

  const replyEmbed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("List of Providers")
    .addFields(embedFields as APIEmbedField[]);
  await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
};

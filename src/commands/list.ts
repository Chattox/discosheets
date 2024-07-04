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
  const sheet = interaction.client.googleSheet?.sheetsByIndex[0];
  const rows = await sheet?.getRows<RowData>({ limit: 25 });

  const embedFields = rows?.map((row) => {
    const name = row.get("name");
    const practice = row.get("practice");
    const location = row.get("location");
    const comments = row.get("comments");

    return {
      name,
      value: `Practice: ${practice}
      Location: ${location}
      Comments: ${comments}`,
    };
  });

  const replyEmbed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("List of Providers")
    .addFields(embedFields as APIEmbedField[]);
  await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
};

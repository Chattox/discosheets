import {
  APIEmbedField,
  ChatInputCommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";
import { GOOGLE_SPREADSHEET_ID } from "../utils/config";
import { truncateField } from "../utils/truncateField";

export const data = new SlashCommandBuilder()
  .setName("list")
  .setDescription("Shows a list of providers currently added to the sheet");

export const run = async (interaction: ChatInputCommandInteraction) => {
  const rows = await interaction.client.googleWorksheet?.getRows<RowData>({
    limit: 10,
  });

  if (!rows?.length) {
    const errorEmbed = new EmbedBuilder()
      .setColor("Red")
      .setTitle("Error!")
      .setDescription("The list appears empty!");

    await interaction.reply({ embeds: [errorEmbed], ephemeral: true });
    return;
  }

  const embedFields: APIEmbedField[] = rows?.map((row) => {
    const name = row.get("name");
    const practice = row.get("practice");
    const location = row.get("location");
    const comments = row.get("comments");

    return {
      name: truncateField(name),
      value: `Practice: ${truncateField(practice)}
      Location: ${truncateField(location)}
      ${comments ? `Comments: ${truncateField(comments)}` : ""}`,
    };
  });

  const sheetURL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SPREADSHEET_ID}/`;

  const replyEmbed = new EmbedBuilder()
    .setColor("Green")
    .setTitle("List of Providers")
    .setDescription(`_For more, click [here](${sheetURL})_`)
    .addFields(embedFields);
  await interaction.reply({ embeds: [replyEmbed], ephemeral: true });
};

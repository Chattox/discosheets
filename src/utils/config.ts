import dotenv from "dotenv";

// Get bot token from .env file
dotenv.config();
export const {
  BOT_TOKEN,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SPREADSHEET_ID,
  STAFF_CHANNEL_ID,
  GUILD_ID,
} = process.env;
if (
  !BOT_TOKEN ||
  !GOOGLE_SERVICE_ACCOUNT_EMAIL ||
  !GOOGLE_PRIVATE_KEY ||
  !GOOGLE_SPREADSHEET_ID ||
  !GUILD_ID
) {
  throw new Error("Missing variables in .env file");
}

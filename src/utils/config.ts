import dotenv from "dotenv";

// Get bot token from .env file
dotenv.config();
export const { BOT_TOKEN, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } =
  process.env;
if (!BOT_TOKEN || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
  throw new Error("Missing variables in .env file");
}

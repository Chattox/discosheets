/*

  Heads up!

  This script is entirely separate to the operation of the bot itself.
  It's intended to be run separately and manually to register new slash commands
  with Discord in order for them to show up in the app itself. Discord limits how many times 
  you can register new slash commands (200 per day, per server/guild) which this bot is unlikely
  to hit, but just something to keep in mind :)

*/

import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { REST, Routes } from "discord.js";

dotenv.config();

const { BOT_TOKEN, BOT_APPLICATION_ID, GUILD_ID } = process.env;

if (!BOT_TOKEN || !BOT_APPLICATION_ID || !GUILD_ID) {
  throw new Error("Missing environment variables!");
}

const deployCommands = async () => {
  const commandArr: object[] = [];

  const commandsFolderPath = path.join(__dirname, "../src/commands");

  const commands = fs.readdirSync(commandsFolderPath);

  for (const command of commands) {
    const commandFilePath = path.join(commandsFolderPath, command);
    const commandFile = await import(commandFilePath);
    if ("data" in commandFile && "run" in commandFile) {
      commandArr.push(commandFile.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at /commands/${command} is missing either the "data" or "run" property`
      );
    }
  }

  const rest = new REST().setToken(BOT_TOKEN);

  try {
    console.log(
      `Starting deployment of ${commandArr.length} slash commands...`
    );

    const data = await rest.put(
      Routes.applicationGuildCommands(BOT_APPLICATION_ID, GUILD_ID),
      { body: commandArr }
    );
    const dataArr = data as object[];

    console.log(`Successfully deployed ${dataArr.length} slash commands!`);
  } catch (err) {
    console.log(err);
  }
};

deployCommands();

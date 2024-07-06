import pc from "picocolors";
import { promises as fs } from "fs";
import path from "path";
import { ExtendedClient } from "./ExtendedClient";

export const initCommands = async (client: ExtendedClient) => {
  const commandsFolderPath = path.join(__dirname, "../commands");

  fs.readdir(commandsFolderPath).then((commands) => {
    commands.forEach((command) => {
      const commandFilePath = path.join(commandsFolderPath, command);
      import(commandFilePath).then((commandFile) => {
        if ("data" in commandFile && "run" in commandFile) {
          client.commands.set(commandFile.data.name, commandFile);
        } else {
          console.log(
            `${pc.red(
              "[WARNING]"
            )} The command at /commands/${command} is missing either the "data" or "run" property`
          );
        }
      });
    });
  });
};

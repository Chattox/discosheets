import { Client, ClientOptions, Collection, TextChannel } from "discord.js";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

export class ExtendedClient extends Client {
  commands: Collection<string, CommandModule>;
  googleSheet?: GoogleSpreadsheet;
  googleWorksheet?: GoogleSpreadsheetWorksheet;
  staffChannel?: TextChannel;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.googleSheet = undefined;
    this.googleWorksheet = undefined;
    this.staffChannel = undefined;
  }
}

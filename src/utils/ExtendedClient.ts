import { Client, ClientOptions, Collection } from "discord.js";
import {
  GoogleSpreadsheet,
  GoogleSpreadsheetWorksheet,
} from "google-spreadsheet";

export class ExtendedClient extends Client {
  commands: Collection<string, CommandModule>;
  googleSheet: GoogleSpreadsheet | undefined;
  googleWorksheet: GoogleSpreadsheetWorksheet | undefined;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.googleSheet = undefined;
  }
}

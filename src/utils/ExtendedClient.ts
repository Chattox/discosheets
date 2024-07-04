import { Client, ClientOptions, Collection } from "discord.js";
import { GoogleSpreadsheet } from "google-spreadsheet";

export class ExtendedClient extends Client {
  commands: Collection<string, CommandModule>;
  googleSheet: GoogleSpreadsheet | undefined;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
    this.googleSheet = undefined;
  }
}

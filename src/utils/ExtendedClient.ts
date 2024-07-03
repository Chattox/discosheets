import { Client, ClientOptions, Collection } from "discord.js";

export class ExtendedClient extends Client {
  commands: Collection<string, CommandModule>;
  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}

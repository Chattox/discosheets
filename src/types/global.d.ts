import { SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from "../utils/ExtendedClient";

export declare global {
  type CommandModule = {
    data: SlashCommandBuilder;
    run: (any) => void;
  };

  type RowData = {
    provider: string;
    practice: string;
    location: string;
    comments: string;
  };
}

export declare module "discord.js" {
  export interface ChatInputCommandInteraction {
    client: ExtendedClient;
  }
}

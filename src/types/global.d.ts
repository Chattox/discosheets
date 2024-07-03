import { SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from "../utils/ExtendedClient";

export declare global {
  type CommandModule = {
    data: SlashCommandBuilder;
    run: (any) => void;
  };
}

export declare module "discord.js" {
  export interface ChatInputCommandInteraction {
    client: ExtendedClient;
  }
}

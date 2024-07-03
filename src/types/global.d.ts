import { SlashCommandBuilder } from "discord.js";

export declare global {
  type CommandModule = {
    data: SlashCommandBuilder;
    execute: void;
  };
}

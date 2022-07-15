import { CommandInteraction } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  execute: (message: CommandInteraction) => Promise<any> | void;
}

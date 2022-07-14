import { CommandInteraction } from 'discord.js';
import { Collection, Intents, Client } from 'discord.js';

export interface Command {
  name: string;
  description: string;
  execute: (message: CommandInteraction) => Promise<any> | void;
}

export class CommandClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({ intents: [Intents.FLAGS.GUILDS] });
    this.commands = new Collection();
  }
}

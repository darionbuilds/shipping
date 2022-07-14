import * as fs from 'fs';
import * as path from 'path';
import { Client, Intents, Collection } from 'discord.js';
import { Command } from 'types';
import { token } from '../config.json';

class CommandClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({ intents: [Intents.FLAGS.GUILDS] });
    this.commands = new Collection();
  }
}

const client = new CommandClient();

client.once('ready', () => {
  console.log('Ready!');
});

client.login(token);

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith('.ts'));

commandFiles.forEach((file) => {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  client.commands.set(command.default.data.name, command.default);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});

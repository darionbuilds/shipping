import * as fs from 'fs';
import * as path from 'path';
import { Collection, Intents, Client } from 'discord.js';
import { token } from '../config.json';
import { Command } from './types';
import { get } from 'http';
import ship from './commands/ship';
import getShip, { Ship } from './api/get-ship';
import shipEmbed from './helpers/embed';

class CommandClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({ intents: [Intents.FLAGS.GUILDS] });
    this.commands = new Collection();
  }
}

export const client = new CommandClient();

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
  if (command.default.data) {
    client.commands.set(command.default.data.name, command.default);
  }
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isSelectMenu()) {
    return;
  }

  getShip(interaction.values[0]).then((shipResponse) => {
    if (shipResponse instanceof Ship) {
      interaction.reply('Success!');
      interaction.channel
        .send({ embeds: [shipEmbed(shipResponse)] })
        .then(() => interaction.deleteReply());
    } else {
      interaction.reply({
        content: 'Something went wrong! Try with a different name.',
        ephemeral: true,
      });
    }
  });
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

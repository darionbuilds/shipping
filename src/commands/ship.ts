import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import getShip from '../api/get-ship';

export default {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('View specs for a ship')
    .addStringOption((option) =>
      new SlashCommandStringOption()
        .setName('name')
        .setDescription('The name of the ship')
        .setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    getShip(interaction.options.getString('name'))
      .then((ship) => {
        if (ship.name) {
          interaction.reply(ship.name);
        } else {
          throw new Error('No ship found with this name!');
        }
      })
      .catch((error) => {
        interaction.reply(error.message);
      });
  },
};

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
        try {
          interaction.reply(ship);
        } catch {
          interaction.reply('Something went wrong. (Internal)');
        }
      })
      .catch((error) => {
        interaction.reply({ content: error.message, ephemeral: true });
      });
  },
};

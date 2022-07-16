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
        if (!ship.name) {
          throw new Error(
            "If trying a more specific name doesn't work, check your spelling and try again."
          );
        } else {
          interaction.reply(ship.name);
        }
      })
      .catch((error) => {
        console.error(error);
        interaction.reply({
          content: 'Something went wrong! Try with a different name.',
          ephemeral: true,
        });
      });
  },
};

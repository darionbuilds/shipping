import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import getShip from '../api/get-ship';

export default {
  data: new SlashCommandBuilder()
  .setName('ship')
  .setDescription('View specs for a ship'),
  async execute(interaction: CommandInteraction) {
    const ship = await getShip(interaction.options.getString('name'));
    interaction.reply(`${ship.focus}`);
  }
}

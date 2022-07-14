import { SlashCommandBuilder } from '@discordjs/builders'
import { CommandInteraction } from 'discord.js'

export default {
  data: new SlashCommandBuilder()
  .setName('shipsearch')
  .setDescription('Search for ships with matching specs'),
  async execute(interaction: CommandInteraction) {
    interaction.reply('Not implemented yet!');
  }
}
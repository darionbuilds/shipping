import {
  SlashCommandBuilder,
  SlashCommandStringOption,
} from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';
import getShip, { Ship } from '../api/get-ship';
import shipEmbed from '../helpers/embed';
import variantSelector from '../helpers/variant-select';

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
      .then((shipResponse) => {
        if (shipResponse instanceof Ship) {
          interaction.reply('✅');
          interaction.channel.send({ embeds: [shipEmbed(shipResponse)] });
          interaction.deleteReply();
        } else if (Array.isArray(shipResponse)) {
          interaction
            .reply(
              'This name belongs to a series. Getting you a list of variants...'
            )
            .then(() => {
              interaction.channel
                .send({
                  content: 'Please choose a variant:',
                  components: [variantSelector(shipResponse)],
                })
                .then(() => interaction.deleteReply());
            });
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

import { MessageActionRow, MessageSelectMenu } from 'discord.js';

export default function variantSelector(variants: string[]): MessageActionRow {
  const options = variants.map((variant) => {
    return {
      label: variant,
      value: variant,
    };
  });
  return new MessageActionRow().addComponents(
    new MessageSelectMenu()
      .setCustomId('variant-select')
      .setPlaceholder('Choose a ship variant')
      .addOptions(options)
  );
}

import { MessageEmbed } from 'discord.js';
import { Ship } from '../api/get-ship';

export default function shipEmbed(ship: Ship): MessageEmbed {
  const shipEmbed = new MessageEmbed()
    .setColor('#0099ff')
    .setAuthor({ name: ship.manufacturer })
    .setTitle(ship.name)
    .setURL(ship.url)
    .addFields([
      { name: 'Size', value: ship.size, inline: true },
      { name: 'Role', value: ship.role, inline: true },
      {
        name: 'Crew',
        value:
          ship.mincrew == ship.maxcrew
            ? ship.mincrew
            : `${ship.mincrew} - ${ship.maxcrew}`,
        inline: true,
      },
    ])
    .addFields([
      {
        name: 'Combat speed',
        value: ship.combatspeed ? `${ship.combatspeed}m/s` : 'N/A',
        inline: true,
      },
      {
        name: 'Max speed',
        value: ship.maxspeed ? `${ship.maxspeed}m/s` : 'N/A',
        inline: true,
      },
      { name: 'Mass', value: `${ship.mass}kg`, inline: true },
    ])
    .addFields([
      { name: 'Length', value: `${ship.length}m`, inline: true },
      { name: 'Beam', value: `${ship.beam}m`, inline: true },
      { name: 'Height', value: `${ship.height}m`, inline: true },
    ])
    .addFields([
      {
        name: 'Buy cost',
        value: ship.buycost ? `${ship.buycost} aUEC` : 'N/A',
        inline: true,
      },
      {
        name: 'Pledge cost',
        value: ship.pledgecost ? `$${ship.pledgecost}` : 'N/A',
        inline: true,
      },
      {
        name: 'Production status',
        value: ship.productionstate,
        inline: true,
      },
    ])
    .addFields([
      {
        name: 'Cargo capacity',
        value: ship.cargocapacity ? `${ship.cargocapacity} SCU` : 'N/A',
        inline: true,
      },
      {
        name: 'Stowage',
        value: ship.stowagespace ? `${ship.stowagespace} μSCU` : 'N/A',
        inline: true,
      },
      { name: 'Rentable?', value: ship.rentable ? 'Yes' : 'No', inline: true },
    ])
    .setImage(ship.image);

  return shipEmbed;
}

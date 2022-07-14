import { Client, Collection, Intents } from 'discord.js';
import { token, guildId } from '../config.json';

export const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.login(token);

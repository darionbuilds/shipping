import * as cheerio from 'cheerio';
import axios from 'axios';

export default function getShipImageUrl(name: string): Promise<string> {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://starcitizen.tools/${name}`)
      .then((response) => {
        const $ = cheerio.load(response.data);
        const imageUrl = $('.infobox-image img').attr('src');
        resolve(imageUrl);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

import axios from 'axios';
import * as cheerio from 'cheerio';
import { Urls, Versions } from './constants';

class Ship {
  [key: string]: string;
}

export default function getShip(name: string): Promise<Ship> {
  const ship: Ship = new Ship();
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${Urls.SC_TOOLS_API_URL}/${Versions.SC_TOOLS_API_VERSION}${name}${Versions.SC_TOOLS_API_TAIL}`
      )
      .then((response) => {
        const $ = cheerio.load(response.data);
        const shipDataRaw = $('#wpTextbox1').text();

        if (!shipDataRaw || !shipDataRaw.length) {
          throw new Error(`No ships named ${name} were found.`);
        }

        const shipDataLines = shipDataRaw.split('| ');
        const endingLine = shipDataLines.findIndex((line) =>
          line.includes('}}\n\n')
        );
        const infoBox = shipDataLines.slice(1, endingLine);
        infoBox.push(shipDataLines[endingLine].split('}}\n\n')[0]);

        infoBox.forEach((line) => {
          let [key, value] = line.split(' = ').map((item) => item.trim());
          if (value) {
            ship[key] = value;
          }
        });

        resolve(ship);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

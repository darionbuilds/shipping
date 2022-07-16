import axios from 'axios';
import * as cheerio from 'cheerio';
import { wikiStatus } from './types';
import { Urls, Versions } from './constants';
import suggestedName from '../helpers/suggested-name';
import getShipImageUrl from './get-ship-image';

export class Ship {
  [key: string]: string;
}

export default function getShip(name: string | null): Promise<Ship | Error> {
  if (!name) {
    return Promise.reject(
      new Error('Unable to find or suggest a ship with this name')
    );
  }

  let shipDataRaw: string | undefined;
  let statusCode: wikiStatus;

  return new Promise((resolve, reject) => {
    console.log('Name input:', name);
    axios
      .get(
        `${Urls.SC_TOOLS_API_URL}/${Versions.SC_TOOLS_API_VERSION}${name}${Versions.SC_TOOLS_API_TAIL}`
      )
      .then((response) => {
        const $ = cheerio.load(response.data);
        shipDataRaw = $('#wpTextbox1').text();

        if (!shipDataRaw || !shipDataRaw.length) {
          statusCode = wikiStatus.NotFound;

          console.log('Retrying with capitalization...');
          resolve(getShip(suggestedName(name, statusCode, shipDataRaw)));
        }

        const shipDataLines = shipDataRaw.split('| ');

        if (shipDataRaw.includes('#REDIRECT')) {
          statusCode = wikiStatus.Redirect;

          console.log('Retrying due to redirect...');
          resolve(getShip(suggestedName(name, statusCode, shipDataRaw)));
        }

        if (shipDataLines[0].includes('{{Disambig}}')) {
          statusCode = wikiStatus.Ambigous;

          console.log('Retrying due to ambiguous name...');
          resolve(getShip(suggestedName(name, statusCode, shipDataRaw)));
        }

        const ship: Ship = new Ship();

        const startInfoBox: number = shipDataLines.findIndex((line) =>
          line.includes('{{Infobox vehicle')
        );

        const endingLine: number = shipDataLines.findIndex(
          (line, currentIndex) =>
            line.includes('}}\n') &&
            currentIndex > startInfoBox &&
            !shipDataLines[currentIndex + 1].includes('    = ')
        );

        const infoBox: string[] = shipDataLines.slice(1, endingLine);
        infoBox.push(shipDataLines[endingLine].split('\n')[0]);

        infoBox.forEach((line) => {
          let [key, value] = line.split(' = ').map((item) => item.trim());
          if (value) {
            if (!isNaN(Number(value))) {
              value = Number(value).toLocaleString();
            }
            ship[key] = value;
          }
        });

        ship.url = `${Urls.SC_TOOLS_API_URL}/${ship.name.replaceAll(
          ' ',
          '%20'
        )}`;

        getShipImageUrl(ship.name)
          .then((imageUrl) => {
            ship.image = `${Urls.SC_TOOLS_API_URL}${imageUrl}`;
            console.log(ship);
            resolve(ship);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

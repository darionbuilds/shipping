import axios from 'axios';
import * as cheerio from 'cheerio';
import { wikiStatus } from './types';
import { Urls, Versions } from './constants';
import suggestedNames from '../helpers/suggested-name';
import getShipImageUrl from './get-ship-image';

export class Ship {
  [key: string]: string;
}

export default function getShip(name: string | null): Promise<Ship | string[]> {
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
        // TODO: modularize the string parsing into its own file and return status
        const $ = cheerio.load(response.data);
        shipDataRaw = $('#wpTextbox1').text();

        if (!shipDataRaw || !shipDataRaw.length) {
          statusCode = wikiStatus.NotFound;

          console.log('Retrying with capitalization...');
          resolve(getShip(suggestedNames(statusCode, shipDataRaw, name)[0]));
        }

        const shipDataLines = shipDataRaw.split('| ');

        if (shipDataRaw.includes('#REDIRECT')) {
          statusCode = wikiStatus.Redirect;

          console.log('Retrying due to redirect...');
          resolve(getShip(suggestedNames(statusCode, shipDataRaw, name)[0]));
        }

        if (shipDataRaw.includes('Series Variants')) {
          statusCode = wikiStatus.Variants;

          console.log('Retrying due to series name...');
          resolve(suggestedNames(statusCode, shipDataRaw, name));
        }

        if (shipDataLines[0].includes('{{Disambig}}')) {
          statusCode = wikiStatus.Ambigous;

          console.log('Retrying due to ambiguous name...');
          resolve(getShip(suggestedNames(statusCode, shipDataRaw, name)[0]));
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
            const valueToNumber = Number(value);
            if (!isNaN(valueToNumber)) {
              value = valueToNumber.toLocaleString();
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

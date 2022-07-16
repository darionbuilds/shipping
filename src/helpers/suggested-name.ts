import { wikiStatus } from '../api/types';

export default function suggestedName(
  name: string,
  statusCode: wikiStatus,
  shipDataRaw: string
): string | null {
  switch (statusCode) {
    case 0:
      const capitalizedName = name
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      if (name !== capitalizedName) {
        return capitalizedName;
      } else {
        return null;
      }

    case 1:
      const dataLines = shipDataRaw.split('\n');
      const spaceShipHeaderIndex = dataLines.indexOf('==Spaceship==') + 2;
      if (spaceShipHeaderIndex >= 0) {
        const spaceShipLineRaw: string = dataLines[spaceShipHeaderIndex];
        const spaceShipName = spaceShipLineRaw.match(/\[\[(.*?)\]\]/)[1];

        console.log('Suggesting less ambiguous name:', spaceShipName);

        return spaceShipName;
      } else {
        return null;
      }

    case 2:
      const redirectName = shipDataRaw.match(/\[\[(.*?)\]\]/)[1];
      console.log('Wiki redirected to suggested page:', redirectName);
      return redirectName;

    default:
      return null;
  }
}

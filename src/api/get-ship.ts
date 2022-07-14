import axios from 'axios';
import { Hardpoints, IShip } from 'types';
import { Urls, Versions } from './constants';
import { scapiApiKey } from '../../config.json';

class Ship {
  afterburnerSpeed: string;
  beam?: string;
  cargo: string;
  chassisId?: string;
  hardpoints: Hardpoints;
  description: string;
  focus: string;
  height: string;
  id: string;
  length: string;
  manufacturer: {
    name: string;
    code: string;
  };
  manufacturerId?: string;
  mass: string;
  maxCrew: string;
  image: string;
  minCrew: string;
  name: string;
  pitchMax?: string;
  price: number;
  productionNote?: string;
  productionStatus: string;
  rollMax?: string;
  scmSpeed: string;
  size: string;
  timeModified?: string;
  timeModifiedUnfiltered?: string;
  type: string;
  url: string;
  xaxisAcceleration?: string;
  yawMax?: string;
  yaxisAcceleration?: string;
  zaxisAcceleration?: string;
}

export default function getShip(name: string): Promise<Ship> {
  let ship: IShip =  new Ship();
  axios.get(`${Urls.SC_API_URL}/${scapiApiKey}/${Versions.SC_API_VERSION}/ships?name=${name}`)
    .then(response => {
      if (response.data.data.length) {
        ship.afterburnerSpeed = response.data.data[0].afterburner_speed;
        ship.cargo = response.data.data[0].cargocapacity;
        ship.hardpoints = response.data.data[0].compiled;
        ship.description = response.data.data[0].description;
        ship.focus = response.data.data[0].focus;
        ship.height = response.data.data[0].height;
        ship.id = response.data.data[0].id;
        ship.length = response.data.data[0].length;
        ship.manufacturer = {
          name: response.data.data[0].manufacturer.name,
          code: response.data.data[0].manufacturer.code
        }
        ship.mass = response.data.data[0].mass;
        ship.maxCrew = response.data.data[0].max_crew;
        ship.image = Urls.RSI_URL + response.data.data[0].media[0].images.slideshow;
        ship.minCrew = response.data.data[0].min_crew;
        ship.name = response.data.data[0].name;
        ship.price = response.data.data[0].price;
        ship.productionStatus = response.data.data[0].production_status;
        ship.scmSpeed = response.data.data[0].scm_speed;
        ship.size = response.data.data[0].size;
        ship.type = response.data.data[0].type;
        ship.url = Urls.RSI_URL + response.data.data[0].url;
      } else {
        throw new Error('No results... Looking for a matching moniker');
      }
      console.log(ship);
    })
    .catch(error => {
      //TODO: Develop moniker list -> look for a matching moniker, else throw an error
      console.error(error.message);
    });

    return new Promise((resolve, reject) => {
      resolve(ship);
      reject(new Error('Ship not found'));
    });
};

getShip('Mercury');
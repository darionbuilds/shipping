export enum wikiStatus {
  NotFound,
  Ambigous,
  Redirect,
  Variants,
}

export interface Component {
  details: string;
  manufacturer: string;
  mount: string;
  name: string;
  quantity: string;
  size: string;
  type: string;
}

export interface AvionicComponents {
  computers: Component[];
  radar: Component[];
}

export interface ModularComponents {
  coolers: Component[];
  powerPlants: Component[];
  shieldGenerators: Component[];
}

export interface PropulsionComponents {
  fuelIntakes: Component[];
  fuelTanks: Component[];
  jumpModules: Component[];
  quantumDrives: Component[];
  quantumFuelTanks: Component[];
}

export interface ThrustersComponents {
  mainThrusters: Component[];
  maneuveringThrusters: Component[];
}

export interface WeaponComponents {
  missiles: Component[];
  turrets: Component[];
  utilityItems: Component[];
  weapons: Component[];
}

export interface Hardpoints {
  avionic: AvionicComponents;
  modular: ModularComponents;
  propulsion: PropulsionComponents;
  thrusters: ThrustersComponents;
  weapon: WeaponComponents;
}

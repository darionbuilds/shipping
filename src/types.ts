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

export interface IShip {
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
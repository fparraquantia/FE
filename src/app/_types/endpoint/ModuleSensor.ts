export interface ModuleType {
  id: number;
  device?: string;
  name?: string;
  brand?: string;
  model?: string;
  communication?: string;
  status: "CONNECTED" | "DISCONNECTED";
  installationDate?: null;
}

export interface ModuleWithSite {
  sensorId: string;
}

export type ModulesResponse = ModuleType[];

export interface Sensor {
  id: number;
  endPoint?: string;
  modelId?: string;
  manufacturerId?: string;
  installDate?: string;
  uninstallDate?: string;
  formula?: string;
  influenceFactor?: string;
  streamId?: string;
  aggregation?: string;
  indexDifference?: string;
}

export interface CheckConnectionType {
  idExists: boolean;
  alreadyConnected: boolean;
}

export interface UpdateModule {
  name: string;
  brand: string;
  model: string;
}

export type AssociatedSensorsResponse = Sensor[];

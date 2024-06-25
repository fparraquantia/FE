export interface CreateParameter {
  siteId: number;
  applicationId: number;
  parameterId: number;
  unitId: number;
  limitMin: number;
  limitMax: number;
}

export type ParametersResponse = ParameterUnit[];

export interface ParameterUnit {
  id: number;
  label: string;
}

"use server";

import {
  AssociatedSensorsResponse,
  CheckConnectionType,
  ModulesResponse,
  ModuleType,
  ModuleWithSite,
  UpdateModule,
} from "../_types/endpoint/ModuleSensor";
import { fetchAPI } from "./fetchInstance";

export const getModules = async (siteId: number): Promise<ModulesResponse> => {
  return fetchAPI<ModulesResponse>(`/modules/${siteId}`);
};

export const getSensors = async (
  moduleId: number
): Promise<AssociatedSensorsResponse> => {
  return fetchAPI<AssociatedSensorsResponse>(
    `/modules/${moduleId}/associatedSensors`
  );
};

export const getModuleProperties = async (
  moduleId: number
): Promise<ModulesResponse> => {
  return fetchAPI<ModulesResponse>(`/modules/${moduleId}/properties`);
};

export const checkModuleConnection = async (
  siteId: number,
  moduleId: string
): Promise<CheckConnectionType> => {
  return fetchAPI<CheckConnectionType>(
    `/site/${siteId}/module/${moduleId}/checkConnection`
  );
};

export const updateModuleWithSite = async (
  siteId: number,
  payload: ModuleWithSite
): Promise<void> => {
  return fetchAPI<void>(`/modules/${siteId}`, "POST", payload);
};

export const updateModuleProperties = async (
  moduleId: number,
  payload: UpdateModule
): Promise<ModuleType> => {
  return fetchAPI<ModuleType>(
    `/modules/${moduleId}/properties`,
    "PUT",
    payload
  );
};

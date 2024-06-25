"use server";

import { BaseSuccessResponse } from "../_types/endpoint/Base";
import {
  CitiesResponse,
  CreateSite,
  RegionsResponse,
  SiteDetail,
  SitesResponse,
  UpdateSite,
} from "../_types/endpoint/Site";
import { fetchAPI } from "./fetchInstance";

// Obtener todos los sitios
export const getSites = async (): Promise<SitesResponse> => {
  return fetchAPI<SitesResponse>("/sites");
};

// Crear un sitio
export const createSite = async (payload: CreateSite): Promise<SiteDetail> => {
  return fetchAPI<SiteDetail>("/sites/create", "POST", payload);
};

// Obtener un sitio específico
export const getSite = async (siteId: number): Promise<SiteDetail> => {
  return fetchAPI<SiteDetail>(`/sites/${siteId}`);
};

// Borrar un sitio específico
export const deleteSite = async (siteId: number): Promise<void> => {
  return fetchAPI<void>(`/sites/${siteId}`, "DELETE");
};

// Actualizar un sitio específico
export const updateSite = async (siteId: number, payload: UpdateSite) => {
  return fetchAPI<SiteDetail>(`/sites/${siteId}`, "PUT", payload);
};

// Obtener todas las regiones
export const getRegions = async (): Promise<RegionsResponse> => {
  return fetchAPI<RegionsResponse>("/regions");
};

// Obtener los países de una región específica
export const getCountriesByRegion = async (
  regionId: number
): Promise<BaseSuccessResponse> => {
  return fetchAPI<BaseSuccessResponse>(`/region/${regionId}/countries`);
};

// Obtener los ciudades de un pais específico
export const getCitiesByCountryId = async (
  countryId: number
): Promise<CitiesResponse> => {
  return fetchAPI<CitiesResponse>(`/regions/cities/${countryId}`);
};

// Obtener los tipos de aplicaciones
export const getApplicationTypes = async (): Promise<BaseSuccessResponse> => {
  return fetchAPI<BaseSuccessResponse>(`/applications/types`);
};

// Obtener los productos de un tipo de aplicación específico y tipo de producto
export const getProductsByApplicationType = async (
  applicationTypeId: number,
  productType: "csv" | "chemical"
): Promise<BaseSuccessResponse> => {
  return fetchAPI<BaseSuccessResponse>(
    `/applications/${applicationTypeId}/products/${productType}`
  );
};

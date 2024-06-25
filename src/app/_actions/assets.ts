// "use server";

// import {
//   AssetCreate,
//   AssetCreateResponse,
//   AssetProperties,
//   AssetsResponse,
// } from "../_types/endpoint/Asset";
// import { BaseSuccessResponse } from "../_types/endpoint/Base";
// import { fetchAPI } from "./fetchInstance";

// // 1 - Obtener todos los tipos de activos existentes
// export const getAssets = async (): Promise<BaseSuccessResponse> => {
//   return fetchAPI<BaseSuccessResponse>("/assets/types");
// };

// // 2 - Obtener las propiedades de un activo específico
// export const getAssetProperties = async (
//   assetId: number
// ): Promise<AssetProperties> => {
//   const data = await fetchAPI<AssetProperties[]>(
//     `/assets/${assetId}/properties`
//   );
//   if (!data[0]) {
//     throw new Error(`No data could be obtained for the assets properties`);
//   }
//   return data[0];
// };

// // 3 - Actualizar las propiedades de un activo
// export const updateAssetsProperties = async (
//   assetId: number,
//   payload: AssetProperties
// ) => {
//   console.log("updateAssetsProperties", payload);
//   return fetchAPI<AssetProperties>(
//     `/assets/${assetId}/properties`,
//     "PUT",
//     payload
//   );
// };

// // 4 - Crear un activo
// export const createAsset = async (
//   payload: AssetCreate
// ): Promise<AssetCreateResponse> => {
//   return fetchAPI<AssetCreateResponse>("/assets/create", "POST", payload);
// };

// // 5 - Obtener los detalles de un activo por su ID
// export const getAssetsBySite = async (
//   siteId: number
// ): Promise<AssetsResponse> => {
//   return fetchAPI<AssetsResponse>(`/assets/site/${siteId}`);
// };

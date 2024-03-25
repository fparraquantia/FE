import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSites,
  createSite,
  getSite,
  deleteSite,
  updateSite,
  getRegions,
  getCountriesByRegion,
  getApplicationTypes,
  getProductsByApplicationType,
  getCitiesByCountryId,
} from "../../views/Connect/SiteList/apiConfig";
import { KEY_REACT_QUERY } from "../../constants/reactQuery/keys";

// Hook para obtener todos los sitios
export function useGetSites() {
  return useQuery([KEY_REACT_QUERY.SITES], getSites);
}

// Hook para crear un sitio
export function useCreateSite() {
  const queryClient = useQueryClient();
  return useMutation(createSite, {
    onSuccess: () => {
      queryClient.invalidateQueries([KEY_REACT_QUERY.SITES]);
    },
  });
}

// Hook para obtener un sitio específico
export function useGetSite(siteId) {
  return useQuery([KEY_REACT_QUERY.SITE, siteId], () => getSite(siteId), {
    enabled: siteId > 0,
  });
}

// Hook para actualizar un sitio
export function useUpdateSite() {
  const queryClient = useQueryClient();
  return useMutation(updateSite, {
    onSuccess: () => {
      queryClient.invalidateQueries([KEY_REACT_QUERY.SITES]);
    },
  });
}

// Hook para borrar un sitio
export function useDeleteSite() {
  const queryClient = useQueryClient();
  return useMutation(deleteSite, {
    onSuccess: () => {
      queryClient.invalidateQueries([KEY_REACT_QUERY.SITES]);
    },
  });
}

// Hook para obtener todas las regiones
export function useGetRegions() {
  return useQuery([KEY_REACT_QUERY.REGIONS], getRegions);
}

// Hook para obtener países por región
export function useGetCountriesByRegion(regionId) {
  return useQuery(
    [KEY_REACT_QUERY.COUNTRIES, regionId],
    () => getCountriesByRegion(regionId),
    {
      enabled: !!regionId,
    }
  );
}

// Hook para obtener ciudades por país
export function useGetCitiesByCountryId(countryId) {
  return useQuery(
    [KEY_REACT_QUERY.CITIES, countryId],
    () => getCitiesByCountryId(countryId),
    {
      enabled: !!countryId,
    }
  );
}

// Hook para obtener tipos de aplicaciones
export function useGetApplicationTypes() {
  return useQuery([KEY_REACT_QUERY.APPLICATION], getApplicationTypes);
}

// Hook para obtener productos por tipo de aplicación
export function useGetProductsByApplicationType(
  applicationTypeId,
  productType
) {
  return useQuery(
    [KEY_REACT_QUERY.PRODUCTS, applicationTypeId, productType],
    () => getProductsByApplicationType(applicationTypeId, productType),
    {
      enabled: !!applicationTypeId && !!productType,
    }
  );
}

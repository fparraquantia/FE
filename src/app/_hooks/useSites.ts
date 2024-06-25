import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

import {
  createSite,
  deleteSite,
  getApplicationTypes,
  getCitiesByCountryId,
  getCountriesByRegion,
  getProductsByApplicationType,
  getRegions,
  getSite,
  updateSite,
  getSites,
} from "../_actions/sites";
import ApiNotification from "../_components/ApiNotification/ApiNotification";
import { CreateSite, UpdateSite } from "../_types/endpoint/Site";
import { queryKeys } from "../_types/endpoint/enum";

export function useGetSites() {
  const query = useQuery({
    queryKey: [queryKeys.site],
    queryFn: () => getSites(),
  });

  useEffect(() => {
    if (query.error) ApiNotification.error("Error Loading Sites", "Sites could not be loaded");
  }, [query.error]);

  return query;
}

// Hook to create a site
export function useCreateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSite) => createSite(payload),
    onSuccess: () => {
      ApiNotification.success("Site Created", "The site has been created successfully.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.site],
      });
    },
    onError: () => {
      ApiNotification.error("Error Creating Site", "The site could not be created.");
    },
  });
}

// Hook to get a specific site
export function useGetSite(siteId: number) {
  const query = useQuery({
    queryKey: [queryKeys.site, siteId],
    queryFn: () => getSite(siteId),
    enabled: siteId > 0,
  });

  useEffect(() => {
    if (query.error) ApiNotification.error("Error Loading Site", "The site could not be loaded.");
  }, [query.error]);
  return query;
}

// Hook to update a site
export function useUpdateSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ siteId, payload }: { siteId: number; payload: UpdateSite }) => updateSite(siteId, payload),
    onSuccess: () => {
      ApiNotification.success("Site Updated", "The site has been updated successfully.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.site],
      });
    },
    onError: () => {
      ApiNotification.error("Error Updating Site", "The site could not be updated");
    },
  });
}

// Hook to delete a site
export function useDeleteSite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (siteId: number) => deleteSite(siteId),
    onSuccess: () => {
      ApiNotification.success("Site Deleted", "The site has been deleted successfully.");
      queryClient.invalidateQueries({
        queryKey: [queryKeys.site],
      });
    },
    onError: () => {
      ApiNotification.error("Error Deleting Site", "The site could not be deleted.");
    },
  });
}

// Hook to get every region
export function useGetRegions() {
  return useQuery({
    queryKey: [queryKeys.regions],
    queryFn: () => getRegions(),
  });
}

// Hook to get countries by region
export function useGetCountriesByRegion(regionId: number) {
  return useQuery({
    queryKey: [queryKeys.countries, regionId],
    queryFn: () => getCountriesByRegion(regionId),
    enabled: !!regionId && regionId > 0,
  });
}

// Hook to get cities by country
export function useGetCitiesByCountryId(countryId: number) {
  return useQuery({
    queryKey: [queryKeys.cities, countryId],
    queryFn: () => getCitiesByCountryId(countryId),
    enabled: !!countryId && countryId > 0,
  });
}

// Hook to get applications types
export function useGetApplicationTypes() {
  return useQuery({
    queryKey: [queryKeys.applicationTypes],
    queryFn: () => getApplicationTypes(),
  });
}

// Hook to get products by application type and product type
export function useGetProductsByApplicationType(applicationTypeId: number, productType: "csv" | "chemical") {
  return useQuery({
    queryKey: [queryKeys.products, applicationTypeId, productType],
    queryFn: () => getProductsByApplicationType(applicationTypeId, productType),
    enabled: !!applicationTypeId && applicationTypeId > 0,
  });
}

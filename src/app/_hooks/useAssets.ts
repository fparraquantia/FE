import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAsset,
  getAssetProperties,
  getAssets,
  getAssetsBySite,
  updateAssetsProperties,
} from "../_actions/assets";
import { queryKeys } from "../_types/endpoint/enum";
import { useEffect } from "react";
import ApiNotification from "../_components/ApiNotification/ApiNotification";
import { AssetProperties } from "../_types/endpoint/Asset";

// Hook para obtener todos los assets
export function useGetAssets() {
  const query = useQuery({
    queryKey: [queryKeys.assets],
    queryFn: () => getAssets(),
  });

  useEffect(() => {
    if (query.error)
      ApiNotification.error(
        "Error Loading Assets",
        "Assets could not be loaded."
      );
  }, [query.error]);
  return query;
}

// Hook para obtener todos los assets de un site
export function useGetAssetsBySite(siteId: number) {
  const query = useQuery({
    queryKey: [queryKeys.assets, siteId],
    queryFn: () => getAssetsBySite(siteId),
    enabled: siteId > 0,
  });

  useEffect(() => {
    if (query.error)
      ApiNotification.error(
        "Error Loading associated assets",
        "Associated assets could not be loaded."
      );
  }, [query.error]);
  return query;
}

// Hook para obtener las propiedades de un asset
export function useGetAssetProperties(assetId: number) {
  const query = useQuery({
    queryKey: [queryKeys.asset, assetId],
    queryFn: () => getAssetProperties(assetId),
    enabled: assetId > 0,
  });

  useEffect(() => {
    if (query.error)
      ApiNotification.error(
        "Error Loading properties asset",
        "Properties asset could not be loaded."
      );
  }, [query.error]);
  return query;
}

// Hook para actualizar las propiedades del Asset
export function useUpdateAssetProperties(assetId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssetProperties) =>
      updateAssetsProperties(assetId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.asset, assetId],
      });
    },
    onError: (_, variable) => {
      ApiNotification.error(
        `Error updating required asset ${variable.name || ""}`,
        "Try again."
      );
    },
  });
}

// Hook para crear Asset
export function useCreateAsset(siteId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (assetTypeId: number) => createAsset({ assetTypeId, siteId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.assets],
      });
    },
    onError: (_, variable) => {
      ApiNotification.error(
        `Error creating required asset with type ID: ${variable}`,
        "Try again."
      );
    },
  });
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../_types/endpoint/enum";

import { useEffect } from "react";
import ApiNotification from "../_components/ApiNotification/ApiNotification";
import {
  checkModuleConnection,
  getModuleProperties,
  getModules,
  getSensors,
  updateModuleProperties,
  updateModuleWithSite,
} from "../_actions/modules";
import { UpdateModule } from "../_types/endpoint/ModuleSensor";

// Hook para obtener todos los módulos de un sitio
export function useGetModules(siteId: number) {
  const query = useQuery({
    queryKey: [queryKeys.modules, siteId],
    queryFn: () => getModules(siteId),
    enabled: siteId > 0,
  });

  useEffect(() => {
    if (query.error)
      ApiNotification.error(
        "Error Loading Modules",
        "Modules could not be loaded."
      );
  }, [query.error]);
  return query;
}

// Hook para obtener un módulo
export function useGetModule(moduleId: number) {
  const query = useQuery({
    queryKey: [queryKeys.module, moduleId],
    queryFn: () => getModuleProperties(moduleId),
    enabled: moduleId > 0,
  });

  useEffect(() => {
    if (query.error)
      ApiNotification.error(
        "Error Loading module properties",
        "Module properties could not be loaded."
      );
  }, [query.error]);
  return query;
}

// Hook para obtener las propiedades de un módulo
export function useGetSensors(moduleId: number) {
  const query = useQuery({
    queryKey: [queryKeys.sensors, moduleId],
    queryFn: () => getSensors(moduleId),
    enabled: moduleId > 0,
  });

  useEffect(() => {
    if (query.error)
      ApiNotification.error(
        "Error Loading Sensors",
        "Sensors could not be loaded."
      );
  }, [query.error]);
  return query;
}

// Hook para comprobar la conexión de un módulo
export function useCheckModuleConnection(siteId: number) {
  return useMutation({
    mutationFn: (moduleId: string) => checkModuleConnection(siteId, moduleId),
    onError: () => {
      ApiNotification.error(
        "Error",
        "Error trying to check module connection."
      );
    },
  });
}

// Hook para actualizar módulo
export function useUpdateModule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      moduleId,
      payload,
    }: {
      moduleId: number;
      payload: UpdateModule;
    }) => updateModuleProperties(moduleId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.modules],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.module, variables.moduleId],
      });
    },
    onError: () => {
      ApiNotification.error("Error updating module", "Try again.");
    },
  });
}

// Hook para añadir módulo a un sitio
export function useUpdateModuleWithSite(siteId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moduleId: string) =>
      updateModuleWithSite(siteId, { sensorId: moduleId }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.modules],
      });
      queryClient.invalidateQueries({
        queryKey: [queryKeys.module, variables],
      });
    },
    onError: () => {
      ApiNotification.error("Error updating module with site", "Try again.");
    },
  });
}

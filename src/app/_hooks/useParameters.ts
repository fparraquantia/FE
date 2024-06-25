import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "../_types/endpoint/enum";
import { getParameters, getUnitByParameter } from "../_actions/parameters";

// Hook para obtener todos los assets
export function useGetParameters() {
  return useQuery({
    queryKey: [queryKeys.parameters],
    queryFn: () => getParameters(),
  });
}

// Hook para obtener un sitio específico
export function useGetUnitsByParameter(parameterId: number) {
  return useQuery({
    queryKey: [queryKeys.parameters, parameterId],
    queryFn: () => getUnitByParameter(parameterId),
  });
}

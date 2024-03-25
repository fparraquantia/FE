import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { KEY_REACT_QUERY } from "../../constants/reactQuery/keys";
import { getParameters, getUnitByParameter } from "../../services/parameters";

// Hook para obtener todos los assets
export function useGetParameters() {
  return useQuery([KEY_REACT_QUERY.PARAMETERS], getParameters);
}

// Hook para obtener un sitio específico
export function useGetUnitsByParameter(parameterId) {
  return useQuery(
    [KEY_REACT_QUERY.PARAMETER, parameterId],
    () => getUnitByParameter(parameterId),
    {
      enabled: parameterId > 0,
    }
  );
}

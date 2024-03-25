import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { KEY_REACT_QUERY } from "../../constants/reactQuery/keys";
import { getAssets } from "../../services/assets";

// Hook para obtener todos los assets
export function useGetAssets() {
  return useQuery([KEY_REACT_QUERY.SITES], getAssets);
}

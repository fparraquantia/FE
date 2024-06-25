import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

type TPath = "/pages/user_management/get_tree_sites";

export type TParams = paths[TPath]["get"]["parameters"]["query"];
export type TResponse = paths[TPath]["get"]["responses"]["200"]["content"]["application/json"];
export type TTreeSites = TResponse["data"];
export type TTreeSite = TTreeSites[0];

export const getTreeSites = async (params: TParams) => {
  let url = "/pages/user_management/get_tree_sites";
  if (params?.siteName) {
    url += `?siteName=${encodeURIComponent(params.siteName)}`;
  }
  const data = await getFetcher<TResponse>({ url });
  return data.data;
};

export function useGetTreeSites(params: TParams) {
  return useQuery<TTreeSites, TErrorResponse>({
    queryKey: queryKeys.treeSites(params?.siteName ?? ""),
    queryFn: () => getTreeSites(params),
  });
}

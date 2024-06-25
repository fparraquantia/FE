import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

import ApiNotification from "../_components/ApiNotification/ApiNotification";

type TResponse = paths["/sites"]["get"]["responses"]["200"]["content"]["application/json"];
export type TSites = TResponse["data"];
export type TSite = TSites[0];

export const getSites = async () => {
  const data = await getFetcher<TResponse>({ url: "/sites" });
  return data.data;
};

export function useGetSites() {
  const query = useQuery<TSites, TErrorResponse>({
    queryKey: queryKeys.sites(),
    queryFn: () => getSites(),
  });

  useEffect(() => {
    if (query.error) {
      ApiNotification.error("Error Loading Sites", query.error.detail);
    }
  }, [query.error]);

  return query;
}

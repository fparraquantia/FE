import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

type TResponse = paths["/pages/access_profiles/get_groups"]["get"]["responses"]["200"]["content"]["application/json"];
export type TProfiles = TResponse["data"];
export type TProfile = TProfiles[0];

export const getProfiles = async () => {
  const data = await getFetcher<TResponse>({ url: "/pages/access_profiles/get_groups" });
  return data.data;
};

export function useGetGroups() {
  return useQuery<TProfiles, TErrorResponse>({
    queryKey: queryKeys.profiles(),
    queryFn: () => getProfiles(),
  });
}

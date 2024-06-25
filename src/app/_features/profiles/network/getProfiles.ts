import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

export type TResponse = paths["/features/profiles/get_profiles"]["get"]["responses"]["200"]["content"]["application/json"];
export type TProfiles = TResponse["data"];
export type TProfile = TProfiles[0];

export const getProfiles = async () => {
  const data = await getFetcher<TResponse>({ url: "/features/profiles/get_profiles" });
  return data.data;
};

export function useGetProfiles() {
  return useQuery<TProfiles, TErrorResponse>({
    queryKey: queryKeys.users(),
    queryFn: () => getProfiles(),
  });
}

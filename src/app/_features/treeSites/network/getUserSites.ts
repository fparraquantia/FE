import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

export type TParams = paths["/pages/user_management/get_user_sites/{userId}"]["get"]["parameters"]["path"];
export type TResponse = paths["/pages/user_management/get_user_sites/{userId}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TUserSites = TResponse["siteIds"];

export const getUserSites = async (params: TParams) => {
  const data = await getFetcher<TResponse>({ url: `/pages/user_management/get_user_sites/${params.userId}` });
  return data.siteIds;
};

export function useGetUserSites(userId: string) {
  return useQuery<TUserSites, TErrorResponse>({
    queryKey: queryKeys.userSites(userId),
    queryFn: () => getUserSites({ userId }),
    enabled: !!userId && userId !== "none",
  });
}

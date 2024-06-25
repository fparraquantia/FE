import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

type TParams = paths["/pages/access_profiles/get_group_roles/{groupId}"]["get"]["parameters"]["path"];
type TResponse = paths["/pages/access_profiles/get_group_roles/{groupId}"]["get"]["responses"]["200"]["content"]["application/json"];
export type TRoles = TResponse["data"];
export type TRole = TRoles[0];

export const getProfileRoles = async (params: TParams) => {
  const data = await getFetcher<TResponse>({ url: `/pages/access_profiles/get_group_roles/${params.groupId}` });
  return data.data;
};

export function useGetProfileRoles(params: TParams) {
  return useQuery<TRoles, TErrorResponse>({
    queryKey: queryKeys.profileRoles(params.groupId),
    queryFn: () => getProfileRoles(params),
    enabled: !!params.groupId,
  });
}

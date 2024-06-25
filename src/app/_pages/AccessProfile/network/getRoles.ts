import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

type TResponse = paths["/pages/access_profiles/get_roles"]["get"]["responses"]["200"]["content"]["application/json"];
export type TRoles = TResponse["data"];
export type TRole = TRoles[0];

export const getRoles = async () => {
  const data = await getFetcher<TResponse>({ url: "/pages/access_profiles/get_roles" });
  return data.data;
};

export function useGetRoles() {
  return useQuery<TRoles, TErrorResponse>({
    queryKey: queryKeys.roles(),
    queryFn: () => getRoles(),
  });
}

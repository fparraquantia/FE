import { paths } from "@/types/schema";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { getFetcher } from "@/core/network/v1/fetcher";

export type TResponse = paths["/pages/user_management/get_users"]["get"]["responses"]["200"]["content"]["application/json"];
export type TUsers = TResponse["data"];
export type TUser = TUsers[0];

export const getUsers = async () => {
  const data = await getFetcher<TResponse>({ url: "/pages/user_management/get_users" });
  return data.data;
};

export function useGetUsers() {
  return useQuery<TUsers, TErrorResponse>({
    queryKey: queryKeys.users(),
    queryFn: () => getUsers(),
  });
}

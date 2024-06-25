import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { postFetcher } from "@/core/network/v1/fetcher";

type TPath = "/pages/user_management/change_user_sites";

export type TBody = paths[TPath]["post"]["requestBody"]["content"]["application/json"];
export type TResponse = paths[TPath]["post"]["responses"]["204"]["content"];

export const changeUserSites = async (body: TBody) => {
  return postFetcher<TResponse>(body, { url: "/pages/user_management/change_user_sites" });
};

export function useChangeUserSites(userId: string) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TBody>({
    mutationFn: changeUserSites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userSites(userId) });
    },
    onError: (error) => {
      ApiNotification.error("Error when assigning site", error.detail);
    },
  });
}

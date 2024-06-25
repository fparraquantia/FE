import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { postFetcher } from "@/core/network/v1/fetcher";

export type TParams = paths["/pages/access_profiles/change_group_roles/{groupId}"]["post"]["parameters"]["path"];
export type TBody = paths["/pages/access_profiles/change_group_roles/{groupId}"]["post"]["requestBody"]["content"]["application/json"];
export type TResponse = paths["/pages/access_profiles/change_group_roles/{groupId}"]["post"]["responses"]["204"]["content"];

export const changeProfileRoles = (params: TParams, body: TBody) => {
  return postFetcher<TResponse>(body, { url: `/pages/access_profiles/change_group_roles/${params.groupId}` });
};

export function useChangeGroupRoles(params: TParams) {
  const queryClient = useQueryClient();
  return useMutation<TResponse, TErrorResponse, TBody>({
    mutationFn: (body) => changeProfileRoles(params, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.success("Edited roles", "The group's roles have been edited correctly.");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.error("Error when editing", error.detail);
    },
  });
}

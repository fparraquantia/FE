import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { postFetcher } from "@/core/network/v1/fetcher";

export type TBody = paths["/pages/user_management/invite_user"]["post"]["requestBody"]["content"]["application/json"];
export type TResponse = paths["/pages/user_management/invite_user"]["post"]["responses"]["204"]["content"];

export const inviteUser = (body: TBody) => {
  return postFetcher<TResponse>(body, { url: "/pages/user_management/invite_user" });
};

export function useInviteUser() {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TBody>({
    mutationFn: inviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users() });
      ApiNotification.success("Invited User", "The User has been created correctly.");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users() });
      ApiNotification.error("Error when creating", error.detail);
    },
  });
}

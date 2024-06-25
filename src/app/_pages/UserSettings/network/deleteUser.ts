import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { deleteFetcher } from "@/core/network/v1/fetcher";

export type TParams = paths["/pages/user_management/delete_user/{userId}"]["delete"]["parameters"]["path"];
export type TResponse = paths["/pages/user_management/delete_user/{userId}"]["delete"]["responses"]["204"]["content"];

export const deleteUser = (params: TParams) => {
  return deleteFetcher<TResponse>({ url: `/pages/user_management/delete_user/${params.userId}` });
};

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TParams>({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users() });
      ApiNotification.success("Deleted User", "The user has been deleted correctly.");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users() });
      ApiNotification.error("Error when deleting", error.detail);
    },
  });
}

import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { deleteFetcher } from "@/core/network/v1/fetcher";

export type TParams = paths["/pages/access_profiles/delete_group/{groupId}"]["delete"]["parameters"]["path"];
export type TResponse = paths["/pages/access_profiles/delete_group/{groupId}"]["delete"]["responses"]["204"]["content"];

export const deleteProfile = (params: TParams) => {
  return deleteFetcher<TResponse>({ url: `/pages/access_profiles/delete_group/${params.groupId}` });
};

export function useDeleteProfile() {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TParams>({
    mutationFn: deleteProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.success("Deleted profile", "The profile has been deleted correctly.");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.error("Error when deleting", error.detail);
    },
  });
}

import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { patchFetcher } from "@/core/network/v1/fetcher";

type TUrl = "/pages/access_profiles/edit_profile/{groupId}";

export type TParams = paths[TUrl]["patch"]["parameters"]["path"];
export type TBody = paths[TUrl]["patch"]["requestBody"]["content"]["application/json"];
export type TResponse = paths[TUrl]["patch"]["responses"]["204"]["content"];

export const editProfile = (params: TParams, body: TBody) => {
  return patchFetcher<TResponse>(body, { url: `/pages/access_profiles/edit_profile/${params.groupId}` });
};

export function useEditProfile(params: TParams) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TBody>({
    mutationFn: (body) => editProfile(params, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.success("Edited profile", "The profile has been edited correctly.");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.error("Error when editing", error.detail);
    },
  });
}

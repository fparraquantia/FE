import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { postFetcher } from "@/core/network/v1/fetcher";

export type TBody = paths["/pages/access_profiles/add_group"]["post"]["requestBody"]["content"]["application/json"];
export type TResponse = paths["/pages/access_profiles/add_group"]["post"]["responses"]["200"]["content"]["application/json"];

export const addProfile = (body: TBody) => {
  return postFetcher<TResponse>(body, { url: "/pages/access_profiles/add_group" });
};

export function useAddProfile() {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TBody>({
    mutationFn: addProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.success("Created profile", "The profile has been created correctly.");
    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profiles() });
      ApiNotification.error("Error when creating", error.detail);
    },
  });
}

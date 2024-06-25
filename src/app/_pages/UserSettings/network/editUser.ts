import ApiNotification from "@/app/_components/ApiNotification/ApiNotification";
import { paths } from "@/types/schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/core/network/queryKeys";
import { TErrorResponse } from "@/core/network/v1/base";
import { patchFetcher } from "@/core/network/v1/fetcher";

type TUrl = "/pages/user_management/edit_user/{userId}";

export type TParams = paths[TUrl]["patch"]["parameters"]["path"];
export type TBody = paths[TUrl]["patch"]["requestBody"]["content"]["application/json"];
export type TResponse = paths[TUrl]["patch"]["responses"]["204"]["content"];

export const editUser = (params: TParams, body: TBody) => {
  return patchFetcher<TResponse>({
    ...body,
    mail: body.mail === "" ? null : body.mail,
    phone: body.phone === "" ? null : body.phone,
  }, { url: `/pages/user_management/edit_user/${params.userId}` });
};

export function useEditUser(params: TParams) {
  const queryClient = useQueryClient();

  return useMutation<TResponse, TErrorResponse, TBody>({
    mutationFn: (body) => editUser(params, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users() });
      ApiNotification.success("Edited User", "The User has been edited correctly.");
    },
    onError: (error) => {
      ApiNotification.error("Error when edited", error.detail);
    },
  });
}

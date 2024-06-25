import { getCurrentUser } from "@/app/session.server";
import { ZodObject, z } from "zod";

import { BACKEND_URL } from "@/core/constants";

export type TErrorResponse = z.infer<typeof ErrorResponseZod>;
export const ErrorResponseZod = z.object({
  detail: z.string(),
});

type RequiredRequestOptions = {
  url: string;
};

type OptionalRequestOptions = {
  baseUrl: string;
  defaultError: string;
  errorZod: ZodObject<any>;
  requiresAuth: boolean;
};

export type PartialRequestOptions = RequiredRequestOptions & Partial<OptionalRequestOptions>;
export type RequestOptions = RequiredRequestOptions & OptionalRequestOptions;

export const parseRequestOptions = (requestOptions: PartialRequestOptions): RequestOptions => {
  return {
    ...requestOptions,
    baseUrl: requestOptions.baseUrl ?? BACKEND_URL,
    errorZod: requestOptions.errorZod ?? ErrorResponseZod,
    defaultError: requestOptions.defaultError ?? "There has been an error.",
    requiresAuth: requestOptions.requiresAuth ?? true,
  };
};

export const addAuthorization = async (options: RequestInit) => {
  const user = await getCurrentUser();

  if (user) {
    options.headers = {
      Authorization: `Bearer ${user.id_token}`,
      ...options.headers,
    };
  }

  return options;
};

export const performFetch = async (promise: Promise<any>, requestOptions: RequestOptions) => {
  let res;
  let err;

  try {
    res = await promise;
  } catch (_) {
    throw { detail: "No se ha podido conectar con el servidor. Compruebe que está conectado a internet." } as TErrorResponse;
  }

  try {
    if (res.ok) return res;
    err = requestOptions.errorZod.parse(await res.json());
  } catch (exc) {
    console.error(exc);
    throw { detail: requestOptions.defaultError } as TErrorResponse;
  }

  throw err;
};

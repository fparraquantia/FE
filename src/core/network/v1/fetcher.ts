import { BACKEND_URL } from "@/core/constants";

import { PartialRequestOptions, addAuthorization, parseRequestOptions, performFetch } from "./base";

export const getFetcher = <T>(partialRequestOptions: PartialRequestOptions) => {
  return fetcher(partialRequestOptions, { method: "GET" }) as Promise<T>;
};

export const postFetcher = <T>(body: Record<string, unknown>, partialRequestOptions: PartialRequestOptions) => {
  return fetcher(partialRequestOptions, {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }) as Promise<T>;
};

export const patchFetcher = <T>(body: Record<string, unknown>, partialRequestOptions: PartialRequestOptions) => {
  return fetcher(partialRequestOptions, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }) as Promise<T>;
};

export const deleteFetcher = <T>(partialRequestOptions: PartialRequestOptions) => {
  return fetcher(partialRequestOptions, { method: "DELETE" }) as Promise<T>;
};

export const putFetcher = <T>(body: Record<string, unknown>, partialRequestOptions: PartialRequestOptions) => {
  return fetcher(partialRequestOptions, {
    method: "PUT",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  }) as Promise<T>;
};

const fetcher = async (partialRequestOptions: PartialRequestOptions, options: RequestInit) => {
  const requestOptions = parseRequestOptions(partialRequestOptions);
  if (requestOptions.requiresAuth) options = await addAuthorization(options);
  options.cache = "no-store";

  const promise = fetch(`${BACKEND_URL}${requestOptions.url}`, options);
  const res = await performFetch(promise, requestOptions);
  // No content
  if (res.status == 204) {
    return;
  }
  return res.json();
};

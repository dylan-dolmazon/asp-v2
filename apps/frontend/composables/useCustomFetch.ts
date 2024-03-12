import type { UseFetchOptions } from "nuxt/app";

type HttpMethod =
  | "GET"
  | "HEAD"
  | "PATCH"
  | "POST"
  | "PUT"
  | "DELETE"
  | "CONNECT"
  | "OPTIONS"
  | "TRACE";

export const useCustomFetch = <T>(url: string, method: HttpMethod = "GET") => {
  const defaults: UseFetchOptions<T> = {
    baseURL: "https://api.publicapis.org/",
    method: method,
    server: false,
  };

  return useLazyFetch(url, defaults);
};

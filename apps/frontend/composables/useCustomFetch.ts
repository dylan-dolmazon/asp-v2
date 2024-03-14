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

export const useCustomFetch = <T>(
  url: string,
  method: HttpMethod = "GET",
  datas?: any
) => {
  const defaults: UseFetchOptions<T> = {
    baseURL: "http://localhost:3333",
    method: method,
    server: false,
    body: datas,
  };

  return useLazyFetch(url, defaults);
};

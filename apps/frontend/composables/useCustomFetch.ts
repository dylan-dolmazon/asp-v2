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

export const useCustomFetch = async <T>(
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

  const { data, pending, error } = await useLazyFetch(url, defaults);
  if (error.value?.data.errors) {
    addToast(
      `Erreur: ${error.value.statusCode} - ${error.value.statusMessage}`,
      error?.value?.data.errors.map((e: any) => e.message),
      "error"
    );
  }
  return { data, pending, error };
};

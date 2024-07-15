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
  url: string | (() => string),
  method: HttpMethod = "GET",
  options: UseFetchOptions<T> = {}
) => {
  const userStore = useUserStore();
  const config = useRuntimeConfig();
  const baseURL = config.public.API_URL;

  const { data, pending, error, refresh } = await useLazyFetch(url, {
    ...options,
    method,
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${userStore.getToken?.token}`,
      Abilities: userStore.getToken?.abilities.join(",") || "",
    },
  });

  if (error.value?.data.errors) {
    addToast(
      `Erreur: ${error.value.statusCode} - ${error.value.statusMessage}`,
      error?.value?.data.errors.map((e: any) => e.message),
      "error"
    );
  } else if (error.value) {
    addToast(`Erreur`, ["Une erreur est survenue."], "error");
  }
  return { data, pending, error, refresh };
};

import type { UseFetchOptions } from "#app";

export const getCompets = async (options: UseFetchOptions<any> = {}) => {
  return await useCustomFetch<Compet[]>(`/compets`, "GET", options);
};

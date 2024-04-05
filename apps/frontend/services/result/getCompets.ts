import type { UseFetchOptions } from "#app";

export const getCompets = async (options: UseFetchOptions<Compet[]> = {}) => {
  return await useCustomFetch<Compet[]>(`/compets`, "GET", options);
};

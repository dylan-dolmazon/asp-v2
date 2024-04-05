import type { UseFetchOptions } from "#app";

export const getResults = async (
  id: number,
  pool: number,
  page: number,
  options: UseFetchOptions<Game[]> = {}
) => {
  return await useCustomFetch<Game[]>(
    `/dofa/compet/${id}/results/${pool}`,
    "GET",
    { ...options, params: { page } }
  );
};

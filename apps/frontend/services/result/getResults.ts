import type { UseFetchOptions } from "#app";

export const getResults = async (
  id: number,
  pool: number,
  page: number,
  options: UseFetchOptions<any> = {}
) => {
  return await useCustomFetch<Results>(
    `/dofa/compet/${id}/results/${pool}`,
    "GET",
    {
      ...options,
      params: { page },
    }
  );
};

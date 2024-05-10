import type { UseFetchOptions } from "#app";

export const getCompets = async (
  options: UseFetchOptions<any> = {},
  limit?: number
) => {
  return await useCustomFetch<{ data: Compet[]; meta: Meta }>(
    `/compets`,
    "GET",
    {
      ...options,
      params: {
        limit,
      },
    }
  );
};

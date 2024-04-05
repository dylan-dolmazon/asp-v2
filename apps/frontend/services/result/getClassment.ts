import type { UseFetchOptions } from "#app";

export const getClassment = async (
  id: number,
  pool: number,
  options: UseFetchOptions<ClubInfo[]> = {}
) => {
  return await useCustomFetch<ClubInfo[]>(
    `/dofa/compet/${id}/ranking/${pool}`,
    "GET",
    options
  );
};

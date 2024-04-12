import type { UseFetchOptions } from "#app";

export const getCalendar = async (
  id: number,
  pool: number,
  page: number,
  options: UseFetchOptions<any> = {}
) => {
  return await useCustomFetch<Results>(
    `/dofa/compet/${id}/calendar/${pool}`,
    "GET",
    { ...options, params: { page } }
  );
};

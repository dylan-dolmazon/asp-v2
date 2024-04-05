import type { UseFetchOptions } from "#app";

export const getCalendar = async (
  id: number,
  pool: number,
  page: number,
  options: UseFetchOptions<Calendar> = {}
) => {
  return await useCustomFetch<Calendar>(
    `/dofa/compet/${id}/calendar/${pool}`,
    "GET",
    { ...options, params: { page } }
  );
};

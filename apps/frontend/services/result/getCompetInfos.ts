import type { UseFetchOptions } from "#app";

export const getCompetInfos = async (
  id: number,
  options: UseFetchOptions<any> = {}
) => {
  return await useCustomFetch<Championnat>(
    `/dofa/compet/${id}`,
    "GET",
    options
  );
};

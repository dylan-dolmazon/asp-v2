export const getPlayers = async (
  page: Ref,
  limit: number = 10,
  sortBy: Ref,
  name?: Ref
) => {
  return await useCustomFetch<{ data: Player[]; meta: Meta }>(
    `players`,
    "GET",
    {
      params: {
        page,
        limit,
        sortBy,
        name,
      },
    }
  );
};

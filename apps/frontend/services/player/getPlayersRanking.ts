export const getPlayersRanking = async (
  page: Ref,
  limit: number = 10,
  name?: Ref
) => {
  return await useCustomFetch<{ data: PlayerRanking[]; meta: Meta }>(
    `players/ranking`,
    "GET",
    {
      params: {
        page,
        limit,
        name,
      },
    }
  );
};

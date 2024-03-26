export const getPlayersRanking = async (page: Ref, limit: number = 10) => {
  return await useCustomFetch<{ data: PlayerRanking[]; meta: Meta }>(
    `players/ranking`,
    "GET",
    {
      params: {
        page: page,
        limit: limit,
      },
    }
  );
};

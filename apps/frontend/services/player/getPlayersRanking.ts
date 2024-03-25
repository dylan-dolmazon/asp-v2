export const getPlayersRanking = async (page: Ref) => {
  return await useCustomFetch<{ data: PlayerRanking[]; meta: Meta }>(
    `players/ranking`,
    "GET",
    {
      params: {
        page: page,
      },
    }
  );
};

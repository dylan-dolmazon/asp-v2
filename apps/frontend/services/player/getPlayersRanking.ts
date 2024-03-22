export const getPlayersRanking = async (page: number = 1) => {
  return useCustomFetch<{ data: PlayerRanking[]; meta: Meta }>(
    `players/ranking?page=${page}`
  );
};

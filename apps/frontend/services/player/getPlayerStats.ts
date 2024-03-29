export const getPlayerStats = async (id: string) => {
  return await useCustomFetch<{ player: Player; stats: PlayerStats }>(
    `players/${id}/stats`
  );
};

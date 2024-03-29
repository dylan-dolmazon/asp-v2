export const updatePlayers = async (
  datas: { id: string; goalsscored: number; assists: number }[]
) => {
  return await useCustomFetch(`players/updates`, "PUT", {
    body: { players: datas },
  });
};

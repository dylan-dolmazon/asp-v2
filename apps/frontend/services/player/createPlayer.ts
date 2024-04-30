export const createPlayer = async (player: CreatePlayerType) => {
  return await useCustomFetch(`players`, "POST", {
    body: {
      ...player,
    },
  });
};

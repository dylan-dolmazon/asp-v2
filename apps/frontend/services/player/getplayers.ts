import type { Player } from "~/utils/types/player/PlayerTypes";

export const getPlayers = async (page: number = 1) => {
  return await useCustomFetch<{ data: Player[]; meta: Meta }>(
    `players?page=${page}`
  );
};

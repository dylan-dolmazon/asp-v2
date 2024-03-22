import type { Player } from "@shared/types/PlayerTypes";

export const getPlayers = async (page: number = 1) => {
  return useCustomFetch<{ data: Player[]; meta: Meta }>(`players?page=${page}`);
};

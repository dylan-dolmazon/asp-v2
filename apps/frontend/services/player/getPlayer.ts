import type { Player } from "~/utils/types/player/PlayerTypes";

export const getPlayer = async (id: string) => {
  return await useCustomFetch<Player>(`players/${id}`);
};

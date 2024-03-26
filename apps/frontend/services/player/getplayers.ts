import type { Player } from "~/utils/types/player/PlayerTypes";

export const getPlayers = async (page: Ref, limit: number = 10) => {
  return await useCustomFetch<{ data: Player[]; meta: Meta }>(
    `players`,
    "GET",
    {
      params: {
        page: page,
        limit: limit,
      },
    }
  );
};

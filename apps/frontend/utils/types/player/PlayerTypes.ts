import type { Player } from "@shared/types/PlayerTypes";

export interface PlayerRanking extends Player {
  fullname: string;
  rank: number;
}

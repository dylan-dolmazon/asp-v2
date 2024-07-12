export type ClassementHistory = {
  id: number;
  saison: string;
  totalMatchs: number;
  points: number;
  goalFor: number;
  goalAgainst: number;
  rank: number;
  win: number;
  draw: number;
  loss: number;
  forfeit: number;
  penality: number;
  pool: string;
  equipeHistoryId?: number;
  competId?: number;
};

export type EquipeHistory = {
  id: number;
  name: string;
  categoryLabel: string;
  type: string;
  pool: string;
  number: number;
  competId?: number;
  classementHistoryId?: number;
};

export type DisplayClassementHistory = {
  competName: string;
  districtName: string;
  saison: string;
  pool: string;
  teams: ClubInfo[];
};

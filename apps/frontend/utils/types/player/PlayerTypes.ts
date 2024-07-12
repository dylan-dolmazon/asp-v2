export interface PlayerRanking extends Player {
  fullname: string;
  rank: number;
}

export interface Player {
  id: string;
  firstname: string;
  lastname: string;
  fullname?: string;
  age: number;
  position: Position;
  positionLabel?: string;
  nationality: string;
  height?: number;
  weight?: number;
  footed: Footed;
  footedLabel?: string;
  goalsscored: number;
  assists: number;
  yellowcards: number;
  redcards: number;
  pace: number;
  shooting: number;
  passing: number;
  dribbling: number;
  defending: number;
  physical: number;
  country?: Country;
  createdAt: string;
  updatedAt: string;
}

export type CreatePlayerType = Omit<
  Player,
  "id" | "country" | "updatedAt" | "createdAt"
>;

export type PlayerStats = {
  clubAverage: {
    goalsscored: number;
    assists: number;
    yellowcards: number;
    redcards: number;
    age: number;
  };
  stats: {
    goalsRank: number;
    assistsRank: number;
    yellowcardsRank: number;
    redcardsRank: number;
    totalPlayersCount: number;
  };
};

export type InfosPersonnels = {
  firstname: string;
  lastname: string;
  age: number;
  nationality: string;
  height?: number;
  weight?: number;
};

export type Stats = {
  assists: number;
  footed: Footed;
  goalsscored: number;
  position: Position;
  redcards: number;
  yellowcards: number;
};

export type FifaStats = {
  defending: number;
  dribbling: number;
  pace: number;
  passing: number;
  physical: number;
  shooting: number;
};

export interface StepperData {
  infosPersonnels: InfosPersonnels;
  stats: Stats;
  performance: FifaStats;
}

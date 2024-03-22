import type { Country } from "./CountryTypes";

export interface Player {
  id: string;
  firstname: string;
  lastname: string;
  fullname: string;
  age: number;
  position: Position;
  positionLabel: string;
  nationality: string;
  height?: number;
  weight?: number;
  footed?: Footed;
  goalsscored?: number;
  assists?: number;
  yellowcards?: number;
  redcards?: number;
  pace?: number;
  shooting?: number;
  passing?: number;
  dribbling?: number;
  defending?: number;
  physical?: number;
  country?: Country;
  createdAt: string;
  updatedAt: string;
}

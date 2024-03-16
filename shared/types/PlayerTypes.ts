import {
  FootedAbb,
  FootedAbbFr,
  FootedFull,
  FootedFullFr,
} from "../enums/Footed.enum";
import { Position } from "../enums/Position.enum";
import { Country } from "./CountryTypes";

type Footed = FootedFull | FootedAbb | FootedAbbFr | FootedFullFr;

export interface Player {
  id: string;
  firstname: string;
  lastname: string;
  age: number;
  position: Position;
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

import {
  PositionAbb,
  PositionAbbFr,
  PositionFull,
  PositionFullFr,
} from "../../enums/position/positionEnum";

export type Position =
  | PositionFull
  | PositionAbb
  | PositionFullFr
  | PositionAbbFr;

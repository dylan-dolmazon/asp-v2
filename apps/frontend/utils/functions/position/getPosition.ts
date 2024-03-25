import {
  PositionFull,
  PositionAbbFr,
  PositionFullFr,
} from "../../enums/position/positionEnum.ts";

export const getPosition = (
  position: PositionFull,
  useAbbrevation: Boolean = false
): string => {
  if (position === PositionFull.GOALKEEPER) {
    if (useAbbrevation) return PositionAbbFr.GOALKEEPER;
    return PositionFullFr.GOALKEEPER;
  }
  if (position === PositionFull.DEFENDER) {
    if (useAbbrevation) return PositionAbbFr.DEFENDER;
    return PositionFullFr.DEFENDER;
  }
  if (position === PositionFull.MIDFIELDER) {
    if (useAbbrevation) return PositionAbbFr.MIDFIELDER;
    return PositionFullFr.MIDFIELDER;
  }
  if (position === PositionFull.FORWARD) {
    if (useAbbrevation) return PositionAbbFr.FORWARD;

    return PositionFullFr.FORWARD;
  }

  return "Indéfinit";
};

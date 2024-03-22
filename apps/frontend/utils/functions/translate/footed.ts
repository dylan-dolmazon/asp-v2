import {
  FootedAbbFr,
  FootedFull,
  FootedFullFr,
} from "../../enums/footed/footedEnums";
export const getFooted = (
  footed: FootedFull,
  useAbbrevation: Boolean = false
): string => {
  if (footed === FootedFull.LEFT) {
    if (useAbbrevation) return FootedAbbFr.LEFT;
    return FootedFullFr.LEFT;
  }
  if (footed === FootedFull.RIGHT) {
    if (useAbbrevation) return FootedAbbFr.RIGHT;
    return FootedFullFr.RIGHT;
  }
  return "Indéfinit";
};

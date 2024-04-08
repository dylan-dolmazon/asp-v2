import { FootedAbbFr, FootedFull, FootedFullFr } from '#enums/footed_enums.js'

export const getFooted = (footed: string, useAbbrevation: Boolean = false): string => {
  if (footed === FootedFull.LEFT) {
    if (useAbbrevation) return FootedAbbFr.LEFT
    return FootedFullFr.LEFT
  }
  if (footed === FootedFull.RIGHT) {
    if (useAbbrevation) return FootedAbbFr.RIGHT
    return FootedFullFr.RIGHT
  }
  return 'Indéfinit'
}

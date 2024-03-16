enum PositionFull {
  GOALKEEPER = "GOALKEEPER",
  DEFENDER = "DEFENDER",
  MIDFIELDER = "MIDFIELDER",
  FORWARD = "FORWARD",
}

enum PositionFullFr {
  GOALKEEPER = "Gardien",
  DEFENDER = "Défenseur",
  MIDFIELDER = "Milieu",
  FORWARD = "Attaquant",
}

enum PositionAbb {
  GOALKEEPER = "G",
  DEFENDER = "DEF",
  MIDFIELDER = "MID",
  FORWARD = "FOR",
}

enum PositionAbbFr {
  GOALKEEPER = "G",
  DEFENDER = "DEF",
  MIDFIELDER = "MIL",
  FORWARD = "ATT",
}

export type Position =
  | PositionFull
  | PositionAbb
  | PositionFullFr
  | PositionAbbFr;

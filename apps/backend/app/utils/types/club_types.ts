export type Compet = {
  name: string
  number: number
}

export type Championnat = {
  label: string
  code: number
  pools: {
    name: string
    number: number
  }[]
}

export type ClubInfo = {
  club?: {
    '@id': string
    '@type': string
    'cl_no': number
    'logo'?: string
  }
  name: string
  categoryLabel: string
  ranking: number
  goalFor?: number
  goalAgainst?: number
  goalDifference?: number
  win?: number
  draw?: number
  loss?: number
  totalMatchs?: number
  points?: number
}

export type Game = {
  date: string
  time: string
  home?: ClubInfo
  away?: ClubInfo
  referer?: {
    lastname: string
    firstname: string
  }
  stade?: {
    name: string
    street: string
    postalCode: string
    city: string
    surface: string
  }
  journee: number
  matchSheet?: string
  status?: string
  score?: {
    away: number
    home: number
  }
}

export type CompetRanking = {
  ranking: ClubInfo[]
  compet: {
    name: string
    pool: string
  }
}

export type Calendar = {
  compet: {
    name: string
    pool: string
  }
  games: Game[]
}

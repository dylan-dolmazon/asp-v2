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
  club: {
    '@id': string
    '@type': string
    'cl_no': number
    'logo'?: string
  }
  name: string
  category_label: string
  ranking?: number
  goals_for_count?: number
  goals_against_count?: number
  goals_difference?: number
  won_games_count?: number
  draw_games_count?: number
  lost_games_count?: number
  total_games_count?: number
  point_count?: number
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

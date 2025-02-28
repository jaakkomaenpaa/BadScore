export type Match = {
  id: number
  code: string // Int
  courtCode: string // Int
  courtIndex: number
  courtName: string
  drawCode: string // Int
  drawName: string // MS, MS-Q etc
  duration: number // Minutes
  eventName: string // MS, WS etc
  isTeamMatch: boolean
  locationName: string
  matchOrder: number | null
  matchStatus: "F" | "P" | "N" | "O" // F = Finished, P = In progress, N = None: future, O = Off court: over, but not confirmed
  matchStatusValue: string
  matchTime: string // Date, scheduled time
  matchTimeUtc: string
  matchTypeId: number // 1 = MS, 2 = WS etc
  matchTypeValue: string
  matches: Match[]
  oopRound: string // Int, order of match in "followed by" court
  oopText: string // e.g. Followed by
  oopTypeId: number // Int
  reliability: number // CHECK THIS
  roundName: string
  score: GameScore[]
  scoreStatus: number // 0 = Normal, 1 = Walkover, 2 = Retired
  scoreStatusValue: string
  team1: Team
  team1seed: string // Int
  team2: Team
  team2seed: string // Int
  time: string // Duration display
  tournamentCode: string
  tournamentName: string
  winner: 1 | 2 // 1 = Team 1, 2 = Team 2
}

export type GameScore = {
  away: number
  home: number
  lastPointWinner: null // Maybe used in relay?
  serve: null // In live scores ?
  set: number
}

export type Team = {
  countryCode: string
  countryFlagUrl: string
  linkName: null // In team matches?
  players: Player[]
  teamId: null // In team matches?
  teamName: string

  prevScore: GameScore[] | null
  prevScoreStatus: number | null
  prevScoreStatusValue: string | null
  prevMatchSide: 'home' | 'away'
  seed: string | null
  matchIsLive: boolean
}

export type Player = {
  avatar: {
    thumbnailUrl: string
    title: string
  }
  countryCode: string
  countryFlagUrl: string
  countryName: string
  firstName: string
  id: string // Int, 5 digits
  initials: string
  lastName: string
  nameDisplay: string
  nameShort: string
  nameShort2: string
  nameType: number // CHECK THIS
  slug: string
  status: string | null
}

export type Court = {
  code: string | null // Int
  name: string // Int - name
}

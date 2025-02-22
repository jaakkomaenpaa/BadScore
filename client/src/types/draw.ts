import { Match, Team } from './match'

export type Draw = {
  isQualification: boolean
  name: string
  type: number // 0 = main, 5 = qualification
  value: string // Int
}

export type BracketResponse = {
  bracket: BracketData
  standings: StandingsEntry[]
}

export type BracketData = {
  rounds: Rounds
  winners: Team[]
}

export type BracketResults = Record<ResultKey, { match: Match }>

type ResultKey = `${number}-${number}` // Round-Position, e.g. 0-15 for first round, 15th match

export type Rounds = Record<number, { index: number; match: Match }[]>

export type StandingsEntry = {
  game_against: number
  game_for: number
  lost: number
  match_against: number
  match_for: number
  played: number
  point_against: number
  point_for: number
  points: number
  rank: number
  stageEntryStatus: string | null // Don't know
  team: Team
  won: number
}

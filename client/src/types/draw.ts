import { Match, Team } from './match'

export type Draw = {
  isQualification: boolean
  name: string
  type: number // 0 = main, 5 = qualification
  value: string // Int
}

export type BracketResponse = {
  rounds: Rounds
  winners: Team[]
}

export type BracketResults = Record<ResultKey, { match: Match }>

type ResultKey = `${number}-${number}` // Round-Position, e.g. 0-15 for first round, 15th match

export type Rounds = Record<number, { index: number; match: Match }[]>

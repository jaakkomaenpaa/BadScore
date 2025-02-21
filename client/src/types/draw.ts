import { Match } from './match'

export type Draw = {
  isQualification: boolean
  name: string
  type: number // 0 = main, 5 = qualification
  value: string // Int
}

export type BracketResponse = {
  drawEndCol: number | null // Until how many players are in the draw, null => 1
  drawSize: number // Amount of matches on first round, i.e. 32 for 64 draw
  results: Record<ResultKey, { match: Match }>
}

type ResultKey = `${number}-${number}` // Round-Position, e.g. 0-15 for first round, 15th match
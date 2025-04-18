import { CountryModel } from './country'

export type Ranking = {
  id: number
  name: string
  name2: string
  isTeam: boolean
  categories: RankingCategory[]
}

export type RankingData = {
  publication_date: string // Date
}

export type RankingCategory = {
  id: number
  name: string
  shortName: string
  isDoubles: boolean
}

export type RankingWeek = {
  date: string // Date
  display: string
  id: number
  key: string
  week: number
  year: number
}

export type RankingSearch = {
  rankingId: number
  categoryId: number
  weekId?: number
  isDoubles?: boolean
  page?: number
  perPage?: number
}

export type RankingSearchResponse = {
  entries: PlayerRankingEntry[] | TeamRankingEntry[]
  total: number
  lastPage: number
  currentPage: number
  onThisPage: number
}

export interface RankingEntry {
  confederation_id: number
  id: number
  rank: number
  rank_change: number
  ranking_category_id: number
}

export interface PlayerRankingEntry extends RankingEntry {
  p1_country: string
  player1_id: number
  player1_model: PlayerModel
  p2_country: string | null
  player2_id: number | null
  player2_model: PlayerModel | null
  points: string
  rank_previous: number
  tournaments: number
}

export interface TeamRankingEntry extends RankingEntry {
  team_id: number
  team_ms: string
  team_ws: string
  team_md: string
  team_wd: string
  team_xd: string
  team_sc: string
  team_tc: string
  team_uc: string
  team_total_points: string
  team_model: TeamModel
}

export type TeamModel = {
  code: string
  country_code: string
  country_id: number
  country_model: CountryModel
  name: string
  type: number
}

export type PlayerModel = {
  active: number
  code: string
  country: string
  country_model: CountryModel
  date_of_birth: string
  first_name: string
  gender_id: number
  id: number
  last_name: string
  name_display: string
  nationality: string
  slug: string
}

export type PlayerPointsBreakdown = {
  date: string
  name: string
  points: string
  
  ranking_calc: 1 | 0
  url: string

  result: string
  tournamentId: number
  isCountedIn: boolean
}

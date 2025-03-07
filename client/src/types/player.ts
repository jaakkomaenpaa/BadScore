import { CountryModel } from './country'

export type PlayerSearchResponse = {
  players: Player[]
  page: PaginationInfo
}

export type PaginationInfo = {
  currentPage: number
  from: number
  lastPage: number
  to: number
  total: number
}

export type Player = {
  avatar: {
    url_cloudinary: string
    url_original: string
  }
  bio_model: PlayerBioModel | null
  code: string
  country_model: CountryModel
  date_of_birth: string
  first_name: string
  gender_id: number
  id: number
  language: number
  last_name: string
  name_display: string
  nationality: string
  slug: string
}

export type PlayerBioModel = {
  begin_sport?: string
  club?: string
  coach?: string
  current_residence?: string
  education_level?: string
  equipment_sponsor?: string
  famous_sporting_relatives?: string
  height?: string
  hobbies?: string
  impairment_cause?: string
  impairment_type?: string
  international_debut?: string
  languages?: string
  major_injuries?: string
  member_national_team_since?: string
  memorable_achievements?: string
  most_influential_person?: string
  nickname?: string
  occupation?: string
  other_sports?: string
  plays?: string // 1 = Right, 2 = Left
  pob?: string
  previus_olympics?: string
  sporting_ambitions?: string
  sporting_awards?: string
  sporting_hero?: string
  sporting_philosophy?: string
  start_playing_competitively?: string
  style_of_play?: string
  superstitions_rituals?: string
  trainign_regime?: string
  website?: string
}

export type PlayerBio = {
  age: number
  current_residence: string
  hand: string
  height: string
  languages: string
  prize_money: string
  qa: {
    begin_sport?: string
    member_national_team_since?: string
    place_of_birth?: string
    sporting_ambitions?: string
    start_playing_competitively?: string
    superstitions_rituals?: string
  }
  social: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
}

export type PlayerTournament = {
  cat_logo: string | null
  date: string
  draws: PlayerTournamentDraw[]
  location: string
  logo: string
  tournament_id: number
  tournament_model: PlayerTournamentModel
}

export type PlayerTournamentModel = {
  code: string
  country_model: CountryModel
  id: number
  name: string
  official_website: string
  prize_money: string
  slug: string
}

export type PlayerTournamentDraw = {
  event_id: number
  game_count: number
  game_lose: number
  game_percent: number
  game_win: number
  match_count: number
  match_lose: number
  match_percent: number
  match_win: number
  name: string
  points_percent: number
  position: string
  score_opponent: number
  score_player: number
}

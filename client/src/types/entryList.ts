export type Event = {
  text: string // MS, WS, etc...
  value: string // 1 - 5
}

export type EventStage = {
  text: string // Main Draw, Qualifying, etc...
  value: number // ID
}

export type PlayerStageResponse = {
  [key: EventStage['value']]: EntryStage
}

export type EntryStage = {
  display_order: number
  entries: ListEntry[]
  entries_count: number
  has_notional_points: boolean
  name: StageName
  statuses: string[] // WDN, SWM, PFR, etc...
}

export enum StageName {
  MainDraw = 'Main Draw',
  Qualifying = 'Qualifying',
  Reserve = 'Reserve',
  Withdrawn = 'Withdrawn',
}

export type ListEntry = {
  notional_points: string | null
  player1: PlayerEntry
  player2: PlayerEntry | null
  points: string
  position_name: string
  protected: boolean
  rank: number
  seed: number
  status: string | null
  tournaments: number
}

export type PlayerEntry = {
  active: number
  code: string
  country: {
    name: string
    url_original: string
    url_svg: string
  }
  country_model: {
    code_iso3: string
    custom_code: string
    language_name: string
    name: string
    nationality: string
  }
  date_of_birth: string
  first_name: string
  gender_id: number
  id: number
  last_name: string
  name_display: string
  nationality: string
  slug: string
}

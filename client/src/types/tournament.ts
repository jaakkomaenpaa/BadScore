export interface TournamentPreview {
  category: string
  code: string
  country: string
  dates: string
  endDate: Date
  flagUrl: string
  hasLiveScores: boolean
  headerUrl: string
  headerUrlMobile: string
  id: number
  liveStatus: TournamentLiveStatus
  location: string
  logoUrl: string
  name: string
  prizeMoney: string
  startDate: Date
}

export interface Tournament extends TournamentPreview {}

type TournamentLiveStatus = 'post' | 'live' | 'future'

export type TournamentCategory = {
  grade: number
  id: number
  isJunior: boolean
  isPara: boolean
  level: number | null
  name: string
}

export type TournamentGrade = {
  label: string
  name: string
  categories: TournamentCategory[]
}

export type TournamentOrganization = {
  id: number
  name: string
}

export type Country = {
  code: string
  name: string
}

export type SearchParams = {
  startDate?: string
  endDate?: string
  searchText?: string
  country?: string
  perPage?: string
  page?: string
  categories?: string
  organization?: string
}

export type Week = {
  startDate: Date
  endDate: Date
}

export type TournamentSearchResponse = {
  results: TournamentPreview[]
  total: number
  lastPage: number
  currentPage: number
  onThisPage: number
}
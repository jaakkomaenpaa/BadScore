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
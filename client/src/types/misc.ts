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

export type ContactData = {
  title?: string
  issue: IssueType
  pageUrl?: string
  email?: string
  description?: string
}

export enum IssueType {
  Bug = 'Bug',
  FeatureRequest = 'Feature request',
  UIEnhancement = 'UI enhancement',
  Other = 'Other',
}

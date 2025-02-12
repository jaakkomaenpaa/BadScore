import { API_URL } from '../config'
import axios from 'axios'
import { formatDateToApi } from '../utils'
import {
  Country,
  TournamentGrade,
  TournamentOrganization,
  TournamentPreview,
} from '../types/tournament'

const URL = `${API_URL}/tournaments`

type SearchParams = {
  startDate: Date
  endDate: Date
  searchText?: string
  country?: string
  perPage?: number
  page?: number
}

const getTournaments = async (): Promise<TournamentPreview[]> => {
  const response = await axios.get(URL)
  return response.data.results
}

const searchTournaments = async (
  search: SearchParams
): Promise<TournamentPreview[]> => {
  const startDate = formatDateToApi(search.startDate)
  const endDate = formatDateToApi(search.endDate)

  let url = `${URL}/search?start=${startDate}&end=${endDate}&`

  if (search.searchText) url += `search=${search.searchText}&`
  if (search.country) url += `country=${search.country}&`
  if (search.perPage) url += `per_page=${search.perPage}&`
  if (search.page) url += `page=${search.page}`

  const response = await axios.get(url)
  return response.data.results
}

const getCategories = async (): Promise<TournamentGrade[]> => {
  const response = await axios.get(`${API_URL}/categories`)
  return response.data.results
}

const getOrganizations = async (): Promise<TournamentOrganization[]> => {
  const response = await axios.get(`${API_URL}/organizations`)
  return response.data.results
}

const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get(`${API_URL}/countries`)
  return response.data.results
}

const service = {
  getTournaments,
  searchTournaments,
  getCategories,
  getOrganizations,
  getCountries,
}

export default service

import { API_URL } from '../config'
import axios from 'axios'
import {
  Country,
  SearchParams,
  TournamentCategory,
  TournamentGrade,
  TournamentOrganization,
  TournamentPreview,
  TournamentSearchResponse,
} from '../types/tournament'

const URL = `${API_URL}/tournaments`

const getTournaments = async (): Promise<TournamentPreview[]> => {
  const response = await axios.get(URL)
  return response.data.results
}

const searchTournaments = async (
  search: SearchParams
): Promise<TournamentSearchResponse> => {
  let url = `${URL}/search?`

  if (search.startDate) url += `start=${search.startDate}&`
  if (search.endDate) url += `end=${search.endDate}&`
  if (search.searchText) url += `search=${search.searchText}&`
  if (search.country) url += `country=${search.country}&`
  if (search.categories) url += `categories=${search.categories}&`
  if (search.organization) url += `organization=${search.organization}&`
  if (search.perPage) url += `per_page=${search.perPage}&`
  if (search.page) url += `page=${search.page}`

  const response = await axios.get(url)
  return response.data
}

const getCategories = async (): Promise<TournamentCategory[]> => {
  const response = await axios.get(`${URL}/categories`)
  return response.data.results
}

const getCategoriesByGrade = async (): Promise<TournamentGrade[]> => {
  const response = await axios.get(`${URL}/grades`)
  return response.data.results
}

const getOrganizations = async (): Promise<TournamentOrganization[]> => {
  const response = await axios.get(`${URL}/organizations`)
  return response.data.results
}

const getCountries = async (): Promise<Country[]> => {
  const response = await axios.get(`${URL}/countries`)
  return response.data.results
}

const service = {
  getTournaments,
  searchTournaments,
  getCategories,
  getCategoriesByGrade,
  getOrganizations,
  getCountries,
}

export default service

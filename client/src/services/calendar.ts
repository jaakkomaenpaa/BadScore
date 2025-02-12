import { API_URL } from '../config'
import axios from 'axios'
import { formatDate } from '../utils'

const URL = `${API_URL}/tournaments`

type SearchParams = {
  startDate: Date
  endDate: Date
  searchText?: string
  country?: string
  perPage?: number
  page?: number
}

const getTournaments = async () => {
  const response = await axios.get(URL)
  return response.data
}

const searchTournaments = async (search: SearchParams) => {
  const startDate = formatDate(search.startDate)
  const endDate = formatDate(search.endDate)

  let url = `${URL}/search?start=${startDate}&end=${endDate}&`

  if (search.searchText) url += `search=${search.searchText}&`
  if (search.country) url += `country=${search.country}&`
  if (search.perPage) url += `per_page=${search.perPage}&`
  if (search.page) url += `page=${search.page}`

  const response = await axios.get(url)
  return response.data
}

const getCategories = async () => {
  const response = await axios.get(`${API_URL}/categories`)
  return response.data
}

const getOrganizations = async () => {
  const response = await axios.get(`${API_URL}/organizations`)
  return response.data
}

const getCountries = async () => {
  const response = await axios.get(`${API_URL}/countries`)
  return response.data
}

const service = {
  getTournaments,
  searchTournaments,
  getCategories,
  getOrganizations,
  getCountries,
}

export default service

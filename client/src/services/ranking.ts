import {
  PlayerPointsBreakdown,
  Ranking,
  RankingData,
  RankingEntry,
  RankingSearch,
  RankingSearchResponse,
  RankingWeek,
} from '@/types/ranking'
import { API_URL } from '../config'
import axios from 'axios'

const URL = `${API_URL}/ranking`

const getAll = async (): Promise<Ranking[]> => {
  const response = await axios.get(`${URL}`)
  return response.data.rankings
}

const getById = async (rankingId: number): Promise<Ranking> => {
  const response = await axios.get(`${URL}/${rankingId}`)
  return response.data
}

const getData = async (rankingId: number): Promise<RankingData> => {
  const response = await axios.get(`${URL}/${rankingId}/data`)
  return response.data
}

const getTable = async (search: RankingSearch): Promise<RankingSearchResponse> => {
  const { rankingId, categoryId } = search

  let url = `${URL}/${rankingId}/category/${categoryId}?`

  if (search.weekId) url += `week=${search.weekId}&`
  if (search.isDoubles !== undefined) url += `is_doubles=${search.isDoubles ? 1 : 0}&`
  if (search.page) url += `page=${search.page}&`
  if (search.perPage) url += `per_page=${search.perPage}`

  const response = await axios.get(url)
  return response.data
}

const getWeeks = async (rankingId: number): Promise<RankingWeek[]> => {
  const response = await axios.get(`${URL}/${rankingId}/weeks`)
  return response.data
}

const getPlayerBreakdown = async (
  rankingId: number,
  categoryId: number,
  entry: RankingEntry
): Promise<PlayerPointsBreakdown[]> => {
  const body = {
    entry,
  }

  const response = await axios.post(
    `${URL}/${rankingId}/category/${categoryId}/breakdown`,
    body
  )
  return response.data
}

const service = {
  getAll,
  getById,
  getData,
  getTable,
  getWeeks,
  getPlayerBreakdown,
}

export default service

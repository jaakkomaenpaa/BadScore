import {
  Ranking,
  RankingSearch,
  RankingSearchResponse,
  RankingWeek,
} from '@/types/ranking'
import { API_URL } from '../config'
import axios from 'axios'

const URL = `${API_URL}/ranking`

const getRankings = async (): Promise<Ranking[]> => {
  const response = await axios.get(`${URL}`)
  return response.data.rankings
}

const getRankingTable = async (
  search: RankingSearch
): Promise<RankingSearchResponse> => {
  const { rankingId, categoryId } = search

  let url = `${URL}/${rankingId}/category/${categoryId}?`

  if (search.weekId) url += `week=${search.weekId}&`
  if (search.isDoubles !== undefined) url += `is_doubles=${search.isDoubles ? 1 : 0}&`
  if (search.page) url += `page=${search.page}&`
  if (search.perPage) url += `per_page=${search.perPage}`

  const response = await axios.get(url)
  return response.data
}

const getRankingWeeks = async (rankingId: number): Promise<RankingWeek[]> => {
  const response = await axios.get(`${URL}/${rankingId}/weeks`)
  return response.data
}

const service = {
  getRankings,
  getRankingTable,
  getRankingWeeks,
}

export default service

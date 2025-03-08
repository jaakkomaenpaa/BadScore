import {
  Player,
  PlayerBio,
  PlayerSearchResponse,
  PlayerTournament,
  PlayerTournamentMatchesResponse,
} from '@/types/player'
import { API_URL } from '../config'
import axios from 'axios'

const URL = `${API_URL}/players`

const search = async (
  search: string,
  page: number = 1
): Promise<PlayerSearchResponse> => {
  const response = await axios.get(`${URL}/search?search=${search}&page=${page}`)
  return response.data
}

const getById = async (playerId: number): Promise<Player> => {
  const response = await axios.get(`${URL}/${playerId}`)
  return response.data
}

const getBio = async (playerId: number): Promise<PlayerBio> => {
  const response = await axios.get(`${URL}/${playerId}/bio`)
  return response.data
}

const getTournamentYears = async (playerId: number): Promise<number[]> => {
  const response = await axios.get(`${URL}/${playerId}/tmt-years`)
  return response.data
}

const getTournaments = async (
  playerId: number,
  year: number
): Promise<PlayerTournament[]> => {
  const response = await axios.get(`${URL}/${playerId}/tournaments/year/${year}`)
  return response.data
}

const getTournamentMatches = async (
  playerId: number,
  tournamentId: number,
  eventIds: number[],
  tournamentType: number
): Promise<PlayerTournamentMatchesResponse> => {
  const body = {
    eventIds,
    tmtType: tournamentType,
  }

  const response = await axios.post(
    `${URL}/${playerId}/tournaments/${tournamentId}`,
    body
  )
  return response.data
}

const service = {
  search,
  getById,
  getBio,
  getTournamentYears,
  getTournaments,
  getTournamentMatches,
}

export default service

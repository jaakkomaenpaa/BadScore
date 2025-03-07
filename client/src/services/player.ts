import {
  Player,
  PlayerBio,
  PlayerSearchResponse,
  PlayerTournament,
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
  const response = await axios.get(`${URL}/${playerId}/tournaments/${year}`)
  return response.data
}

const service = {
  search,
  getById,
  getBio,
  getTournamentYears,
  getTournaments,
}

export default service

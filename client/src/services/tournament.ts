import { API_URL } from '../config'
import axios from 'axios'
import { formatDateToApi } from '../utils'
import { TournamentPreview } from '@/types/tournament'

const URL = `${API_URL}/tournament`

const getById = async (tournamentId: number): Promise<TournamentPreview> => {
  const response = await axios.get(`${URL}/${tournamentId}`)
  return response.data.results[0]
}

const getDraws = async (tournamentId: number) => {
  const response = await axios.get(`${URL}/${tournamentId}/draws`)
  return response.data
}

const getEvents = async (tournamentId: number) => {
  const response = await axios.get(`${URL}/${tournamentId}/events`)
  return response.data
}

const getEventStages = async (tournamentId: number, eventId: string) => {
  const response = await axios.get(`${URL}/${tournamentId}/events/${eventId}/stages`)
  return response.data
}

const getBracket = async (tournamentId: number, drawId: string) => {
  const response = await axios.get(`${URL}/${tournamentId}/bracket?draw=${drawId}`)
  return response.data
}

const getCourts = async (tournamentCode: string, date: Date) => {
  const formattedDate = formatDateToApi(date)
  const response = await axios.get(
    `${URL}/${tournamentCode}/courts?date=${formattedDate}`
  )
  return response.data
}

const getMatches = async (tournamentCode: string, date: Date) => {
  const formattedDate = formatDateToApi(date)
  console.log('Formatted Date:', formattedDate)
  const response = await axios.get(
    `${URL}/${tournamentCode}/matches?date=${formattedDate}`
  )
  return response.data.matches
}

const getPlayersStaged = async (tournamentId: number, eventId: string) => {
  const response = await axios.get(`${URL}/${tournamentId}/events/${eventId}/players`)
  return response.data
}

const service = {
  getById,
  getDraws,
  getEvents,
  getEventStages,
  getBracket,
  getCourts,
  getMatches,
  getPlayersStaged,
}

export default service

import { API_URL } from '../config'
import axios from 'axios'
import { formatDateToApi } from '../utils/dates'
import { TournamentPreview } from '@/types/tournament'
import { Event, EventStage, PlayerStageResponse } from '@/types/entryList'
import { BracketResponse, Draw } from '@/types/draw'
import { Match } from '@/types/match'

const URL = `${API_URL}/tournament`

const getById = async (tournamentId: number): Promise<TournamentPreview> => {
  const response = await axios.get(`${URL}/${tournamentId}`)
  return response.data.results[0]
}

const getDraws = async (tournamentId: number): Promise<Draw[]> => {
  const response = await axios.get(`${URL}/${tournamentId}/draws`)
  return response.data.draws
}

const getEvents = async (tournamentId: number): Promise<Event[]> => {
  const response = await axios.get(`${URL}/${tournamentId}/events`)
  return response.data.events
}

const getEventStages = async (
  tournamentId: number,
  eventId: string
): Promise<EventStage[]> => {
  const response = await axios.get(`${URL}/${tournamentId}/events/${eventId}/stages`)
  return response.data.eventStages
}

const getBracket = async (
  tournamentId: number,
  drawId: string
): Promise<BracketResponse> => {
  const response = await axios.get(`${URL}/${tournamentId}/bracket?draw=${drawId}`)
  return response.data.bracket
}

const getCourts = async (tournamentCode: string, date: Date) => {
  const formattedDate = formatDateToApi(date)
  const response = await axios.get(
    `${URL}/${tournamentCode}/courts?date=${formattedDate}`
  )
  return response.data
}

const getMatches = async (tournamentCode: string, date: Date): Promise<Match[]> => {
  const formattedDate = formatDateToApi(date)
  const response = await axios.get(
    `${URL}/${tournamentCode}/matches?date=${formattedDate}`
  )
  return response.data.matches
}

const getPlayersStaged = async (
  tournamentId: number,
  eventId: string
): Promise<PlayerStageResponse> => {
  const response = await axios.get(`${URL}/${tournamentId}/events/${eventId}/players`)
  return response.data.players
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

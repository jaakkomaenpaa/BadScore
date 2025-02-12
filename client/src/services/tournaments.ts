import { API_URL } from '../config'
import axios from 'axios'
import { formatDate } from '../utils'

const URL = `${API_URL}/tournament`

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
  const formattedDate = formatDate(date)
  const response = await axios.get(
    `${URL}/${tournamentCode}/courts?date=${formattedDate}`
  )
  return response.data
}

const getMatches = async (tournamentCode: string, date: Date) => {
  const formattedDate = formatDate(date)
  const response = await axios.get(
    `${URL}/${tournamentCode}/matches?date=${formattedDate}`
  )
  return response.data
}

const getPlayersStaged = async (tournamentId: number, eventId: string) => {
  const response = await axios.get(`${URL}/${tournamentId}/events/${eventId}/players`)
  return response.data
}

const service = {
  getDraws,
  getEvents,
  getEventStages,
  getBracket,
  getCourts,
  getMatches,
  getPlayersStaged,
}

export default service

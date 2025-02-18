import { useSearchParams } from 'react-router'
import { useTournament } from './useTournament'
import { useCallback, useEffect, useState } from 'react'
import { Match } from '@/types/match'
import tournamentService from '@/services/tournament'
import { addDays, formatDateToApi } from '@/utils/dates'

const getDefaultDate = (startDate: Date, endDate: Date): Date => {
  const today = new Date()
  return today >= startDate && today <= endDate ? today : addDays(startDate, 1)
}

export const useMatchData = () => {
  const { tournament } = useTournament()
  if (!tournament) return null

  const [searchParams, setSearchParams] = useSearchParams()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Determine the initial date
  const urlDate = searchParams.get('date')
  const defaultDate = getDefaultDate(
    new Date(tournament.startDate),
    new Date(tournament.endDate)
  )
  const [date, setDate] = useState<Date>(urlDate ? new Date(urlDate) : defaultDate)

  // Fetch matches whenever date or tournament changes
  useEffect(() => {
    if (!tournament) return
    console.log('Fetching matches', date)
    const fetchMatches = async () => {
      setLoading(true)
      try {
        const matchRes = await tournamentService.getMatches(tournament.code, date)
        setMatches(matchRes)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [date, tournament])

  // Update date and sync it with URL
  const handleSelectDate = useCallback(
    (selectedDate: Date) => {
      setDate(selectedDate)
      setSearchParams({ date: formatDateToApi(selectedDate) })
    },
    [setSearchParams]
  )

  return { matches, loading, date, handleSelectDate, tournament }
}

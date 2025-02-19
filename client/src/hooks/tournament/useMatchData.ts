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

  const [searchParams, setSearchParams] = useSearchParams()
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [date, setDate] = useState<Date | null>(null)

  useEffect(() => {
    if (!tournament) return

    const urlDate = searchParams.get('date')
    const computedDate = urlDate
      ? new Date(urlDate)
      : getDefaultDate(new Date(tournament.startDate), new Date(tournament.endDate))

    setDate(computedDate)
  }, [searchParams, tournament])

  // Fetch matches whenever date or tournament changes
  useEffect(() => {
    if (!tournament || !date) return

    const fetchMatches = async () => {
      setLoading(true)
      try {
        const matchRes = await tournamentService.getMatches(tournament.code, date)
        setMatches(matchRes)
      } catch (error) {
        console.error('Error fetching matches:', error)
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

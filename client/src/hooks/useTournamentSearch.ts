import {
  SearchParams,
  TournamentPreview,
  TournamentSearchResponse,
} from '@/types/tournament'
import { useEffect, useState } from 'react'
import calendarService from '@/services/calendar'

export const useTournamentSearch = (filters: SearchParams) => {
  const [tournaments, setTournaments] = useState<TournamentPreview[]>([])
  const [resultsLength, setResultsLength] = useState<number>(0)
  const [lastPage, setLastPage] = useState<number>(0)
  const [onThisPage, setOnThisPage] = useState<number>(0)

  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsSearchLoading(true)

    const search = async () => {
      try {
        const tournamentData: TournamentSearchResponse =
          await calendarService.searchTournaments(filters)
        if (tournamentData) {
          setTournaments(tournamentData.results)
          setResultsLength(tournamentData.total)
          setLastPage(tournamentData.lastPage)
          setOnThisPage(tournamentData.onThisPage)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsSearchLoading(false)
      }
    }

    search()
  }, [filters])

  return { tournaments, resultsLength, lastPage, onThisPage, isSearchLoading }
}

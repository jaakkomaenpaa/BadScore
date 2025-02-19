import { TournamentPreview, TournamentSearchResponse } from '@/types/tournament'
import { useEffect, useState } from 'react'
import calendarService from '@/services/calendar'
import { useSearchFilters } from './useSearchFilters'

export const useTournamentSearch = () => {
  const { filters } = useSearchFilters()
  const [tournaments, setTournaments] = useState<TournamentPreview[]>([])
  const [resultsLength, setResultsLength] = useState<number>(0)
  const [lastPage, setLastPage] = useState<number>(0)
  const [onThisPage, setOnThisPage] = useState<number>(0)

  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    setIsLoading(true)

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
        setIsLoading(false)
      }
    }

    search()
  }, [filters])

  return { tournaments, resultsLength, lastPage, onThisPage, isLoading }
}

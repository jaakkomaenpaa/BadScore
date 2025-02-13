import calendarService from '@/services/calendar'
import { useEffect, useState } from 'react'
import { TournamentList } from '@/components/calendar/TournamentList'
import { TournamentPreview } from '@/types/tournament'
import { SearchBar } from '@/components/calendar/SearchBar'
import { Box, CircularProgress } from '@mui/material'
import { useSearchFilters } from '@/hooks/useSearchFilters'
import { useDropdownData } from '@/hooks/useDropdownData'

function Calendar() {
  const { filters, handleFilterChange, resetFilters } = useSearchFilters()
  const [tournaments, setTournaments] = useState<TournamentPreview[]>([])
  const { countries, organizations, categories, isLoading } = useDropdownData()

  const [isSearchLoading, setIsSearchLoading] = useState<boolean>(true)

  // Handle search
  useEffect(() => {
    setIsSearchLoading(true)

    const search = async () => {
      try {
        const tournamentData = await calendarService.searchTournaments(filters)
        if (tournamentData) setTournaments(tournamentData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsSearchLoading(false)
      }
    }

    search()
  }, [filters])

  if (isLoading || isSearchLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <CircularProgress />
      </Box>
    )

  return (
    <>
      <h2 style={{ color: 'white' }}>Calendar</h2>
      <SearchBar
        countries={countries}
        organizations={organizations}
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        resetFilters={resetFilters}
      />
      <TournamentList tournaments={tournaments} />
    </>
  )
}

export default Calendar

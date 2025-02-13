import { TournamentList } from '@/components/calendar/TournamentList'
import { SearchBar } from '@/components/calendar/SearchBar'
import { Box, CircularProgress, Pagination, Typography } from '@mui/material'
import { useSearchFilters } from '@/hooks/useSearchFilters'
import { useDropdownData } from '@/hooks/useDropdownData'
import { useTournamentSearch } from '@/hooks/useTournamentSearch'

function Calendar() {
  const { isLoading: isDataLoading } = useDropdownData()
  const {
    resultsLength,
    tournaments,
    isLoading: isSearchLoading,
  } = useTournamentSearch()

  if (isDataLoading || isSearchLoading)
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ color: 'white' }}>Calendar</h2>
      
      <SearchBar />

      <PaginationField />

      <TournamentList tournaments={tournaments} />

      {resultsLength >= 1 && <PaginationField />}
    </Box>
  )
}

export default Calendar

function PaginationField() {
  const { filters, handleFilterChange } = useSearchFilters()
  const { resultsLength, lastPage, onThisPage } = useTournamentSearch()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Typography sx={{ color: 'text.primary', margin: 2 }} variant='body1'>
        Total results: {resultsLength}
      </Typography>
      <Pagination
        count={lastPage}
        color='primary'
        shape='rounded'
        page={Number(filters.page) || 1}
        onChange={(_, page) => handleFilterChange('page', page)}
      />

      <Typography sx={{ color: 'text.primary', margin: 2 }} variant='body1'>
        On this page: {onThisPage}
      </Typography>
    </Box>
  )
}

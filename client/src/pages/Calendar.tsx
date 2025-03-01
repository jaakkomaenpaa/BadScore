import { TournamentList } from '@/components/calendar/TournamentList'
import { SearchBar } from '@/components/calendar/SearchBar'
import { Box, Pagination, Typography } from '@mui/material'
import { useSearchFilters } from '@/hooks/calendar/useSearchFilters'
import { useDropdownData } from '@/hooks/calendar/useDropdownData'
import { useTournamentSearch } from '@/hooks/calendar/useTournamentSearch'
import { LoadingCircle } from '@/components/LoadingCircle'

function Calendar() {
  const { isLoading: isDataLoading } = useDropdownData()
  const {
    resultsLength,
    tournaments,
    isLoading: isSearchLoading,
    lastPage,
    onThisPage,
  } = useTournamentSearch()

  if (isDataLoading || isSearchLoading) return <LoadingCircle />

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ color: 'white' }}>Calendar</h2>

      <SearchBar />

      <PaginationField
        resultsLength={resultsLength}
        lastPage={lastPage}
        onThisPage={onThisPage}
      />

      <TournamentList tournaments={tournaments} />

      {resultsLength >= 1 && (
        <PaginationField
          resultsLength={resultsLength}
          lastPage={lastPage}
          onThisPage={onThisPage}
        />
      )}
    </Box>
  )
}

export default Calendar

type PaginationFieldProps = {
  resultsLength: number
  lastPage: number
  onThisPage: number
}

function PaginationField({
  resultsLength,
  lastPage,
  onThisPage,
}: PaginationFieldProps) {
  const { filters, handleFilterChange } = useSearchFilters()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap',
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
        onChange={(_, page) => handleFilterChange({ page: page.toString() })}
      />

      <Typography sx={{ color: 'text.primary', margin: 2 }} variant='body1'>
        On this page: {onThisPage}
      </Typography>
    </Box>
  )
}

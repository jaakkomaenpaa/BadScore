import { TournamentList } from '@/components/calendar/TournamentList'
import { SearchBar } from '@/components/calendar/SearchBar'
import { Box, CircularProgress, Pagination, Typography } from '@mui/material'
import { useSearchFilters } from '@/hooks/useSearchFilters'
import { useDropdownData } from '@/hooks/useDropdownData'
import { useTournamentSearch } from '@/hooks/useTournamentSearch'
import { SearchParams } from '@/types/tournament'

function Calendar() {
  const { filters, handleFilterChange, resetFilters } = useSearchFilters()
  const { countries, organizations, categories, isLoading } = useDropdownData()
  const { tournaments, resultsLength, lastPage, onThisPage, isSearchLoading } =
    useTournamentSearch(filters)

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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ color: 'white' }}>Calendar</h2>
      <SearchBar
        countries={countries}
        organizations={organizations}
        categories={categories}
        filters={filters}
        onFilterChange={handleFilterChange}
        resetFilters={resetFilters}
      />
      <PaginationField
        resultsLength={resultsLength}
        lastPage={lastPage}
        onThisPage={onThisPage}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
      <TournamentList tournaments={tournaments} />
      <PaginationField
        resultsLength={resultsLength}
        lastPage={lastPage}
        onThisPage={onThisPage}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  )
}

export default Calendar

type PaginationFieldProps = {
  resultsLength: number
  lastPage: number
  onThisPage: number
  filters: SearchParams
  handleFilterChange: (key: keyof SearchParams, value: any) => void
}

function PaginationField({
  resultsLength,
  lastPage,
  onThisPage,
  filters,
  handleFilterChange,
}: PaginationFieldProps) {
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

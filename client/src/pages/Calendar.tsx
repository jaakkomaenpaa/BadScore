import { TournamentList } from '@/components/calendar/TournamentList'
import { SearchBar } from '@/components/calendar/SearchBar'
import { Box, Pagination, Typography, useTheme } from '@mui/material'
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: 1200,
      }}
    >
      <Typography
        variant='h4'
        sx={{ alignSelf: 'center', color: 'text.primary', margin: 1 }}
      >
        Calendar
      </Typography>

      <SearchBar />

      <PaginationField
        resultsLength={resultsLength}
        lastPage={lastPage}
        onThisPage={onThisPage}
      />

      <TournamentList tournaments={tournaments} />

      {resultsLength >= 4 && (
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
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 2,
        flexWrap: 'wrap',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
          gap: 1,
          margin: 1,
          flexDirection: 'column',
        },
      }}
    >
      <Typography
        sx={{
          color: 'text.primary',
          margin: 2,
          [theme.breakpoints.down('sm')]: {
            margin: 0,
          },
        }}
        variant='body1'
      >
        Total results: {resultsLength}
      </Typography>
      <Pagination
        count={lastPage}
        color='primary'
        shape='rounded'
        page={Number(filters.page) || 1}
        onChange={(_, page) => handleFilterChange({ page: page.toString() })}
      />

      <Typography
        sx={{
          color: 'text.primary',
          margin: 2,
          [theme.breakpoints.down('sm')]: {
            margin: 0,
          },
        }}
        variant='body1'
      >
        On this page: {onThisPage}
      </Typography>
    </Box>
  )
}

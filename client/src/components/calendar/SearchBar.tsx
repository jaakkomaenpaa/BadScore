import {
  Country,
  SearchParams,
  TournamentCategory,
  TournamentOrganization,
} from '@/types/tournament'
import { formatDateToApi, getWeek } from '@/utils'
import { Autocomplete, Box, TextField, Typography } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

type SearchBarProps = {
  countries: Country[]
  organizations: TournamentOrganization[]
  categories: TournamentCategory[]
  filters: SearchParams
  onFilterChange: (key: keyof SearchParams, value: any) => void
  resetFilters: () => void
}

export const SearchBar = ({
  countries,
  organizations,
  categories,
  filters,
  onFilterChange,
  resetFilters,
}: SearchBarProps) => {
  /*
    const [searchInput, setSearchInput] = useState<string>('')

    const [page, setPage] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(10)
    */

  const handleWeekChange = (offset: number) => {
    const week = getWeek(offset)
    onFilterChange('startDate', formatDateToApi(week.startDate))
    onFilterChange('endDate', formatDateToApi(week.endDate))
  }

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 4,
        marginBottom: 2,
      }}
    >
      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <Autocomplete
          options={countries}
          getOptionLabel={(option: Country) => option.name}
          value={
            countries.find((country) => country.code === filters.country) || null
          }
          onChange={(_, value) => onFilterChange('country', value?.code ?? '')}
          renderInput={(params) => <TextField {...params} label='Country' />}
          sx={{ width: 200 }}
        />

        <Autocomplete
          options={organizations}
          getOptionLabel={(option: TournamentOrganization) => option.name}
          value={
            organizations.find((org) => org.id.toString() === filters.organization) ||
            null
          }
          onChange={(_, value) =>
            onFilterChange('organization', value?.id.toString() ?? '')
          }
          renderInput={(params) => <TextField {...params} label='Organization' />}
          sx={{ width: 200 }}
        />

        <Autocomplete
          options={categories}
          getOptionLabel={(option: TournamentCategory) => option.name}
          value={
            categories.find((cat) => cat.id.toString() === filters.categories) || null
          }
          onChange={(_, value) =>
            onFilterChange('categories', value?.id.toString() ?? '')
          }
          renderInput={(params) => <TextField {...params} label='Category' />}
          sx={{ width: 200 }}
        />
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <DatePicker
          label='Start Date'
          value={filters.startDate ? dayjs(filters.startDate) : null}
          onChange={(date) =>
            date && onFilterChange('startDate', formatDateToApi(date.toDate()))
          }
          sx={{
            width: 200,
          }}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => onFilterChange('startDate', ''),
            },
          }}
        />

        <DatePicker
          label='End Date'
          value={filters.endDate ? dayjs(filters.endDate) : null}
          onChange={(date) =>
            date && onFilterChange('endDate', formatDateToApi(date.toDate()))
          }
          sx={{
            width: 200,
          }}
          slotProps={{
            field: { clearable: true, onClear: () => onFilterChange('endDate', '') },
          }}
        />
      </Box>

      <Box
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <WeekButton
          label='Previous week'
          isActive={false}
          onClick={() => handleWeekChange(-1)}
        />

        <WeekButton
          label='This week'
          isActive={false}
          onClick={() => handleWeekChange(0)}
        />

        <WeekButton
          label='Next week'
          isActive={false}
          onClick={() => handleWeekChange(1)}
        />
      </Box>

      <ResetButton label='Reset filters' onClick={resetFilters} />
    </Box>
  )
}

type WeekButtonProps = {
  isActive: boolean
  label: string
  onClick: (props: any) => void
}

function WeekButton({ isActive, label, onClick }: WeekButtonProps) {
  return (
    <Box
      sx={{
        width: 120,
        height: 40,
        backgroundColor: isActive ? 'primary.main' : 'inherit',
        color: isActive ? 'inherit' : 'primary.main',
        border: '1px solid',
        borderColor: 'primary.main',
        borderRadius: 1,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.1s ease',
        '&:hover': {
          opacity: 0.8,
        },
      }}
      onClick={onClick}
    >
      <Typography variant='body2'>{label}</Typography>
    </Box>
  )
}

type ResetButtonProps = {
  label: string
  onClick: (props: any) => void
}

function ResetButton({ label, onClick }: ResetButtonProps) {
  return (
    <Box
      sx={{
        width: 120,
        height: 40,
        backgroundColor: 'inherit',
        color: 'error.main',
        border: '1px solid',
        borderColor: 'error.main',
        borderRadius: 1,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transition: 'all 0.1s ease',
        '&:hover': {
          opacity: 0.8,
        },
      }}
      onClick={onClick}
    >
      <Typography variant='body2'>{label}</Typography>
    </Box>
  )
}

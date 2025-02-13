import {
  Country,
  SearchParams,
  TournamentCategory,
  TournamentOrganization,
} from '@/types/tournament'
import { formatDateToApi, getWeek } from '@/utils'
import {
  Autocomplete,
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  styled,
  TextField,
} from '@mui/material'
import { ClearIcon, DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { useState } from 'react'

const SpaceBetweenBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  width: '100%',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
})

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
  const [searchInput, setSearchInput] = useState<string>(filters.searchText || '')
  /*
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
      <SpaceBetweenBox>
        <SearchField
          value={searchInput}
          onChange={setSearchInput}
          buttonAction={(value: string) => onFilterChange('searchText', value)}
        />

        <WeekButtonContainer handleWeekChange={handleWeekChange} />
      </SpaceBetweenBox>

      <SpaceBetweenBox>
        <DropdownContainer
          countries={countries}
          organizations={organizations}
          categories={categories}
          filters={filters}
          onFilterChange={onFilterChange}
        />
        <DatePickerContainer filters={filters} onFilterChange={onFilterChange} />
      </SpaceBetweenBox>

      <SpaceBetweenBox>
        <SecondaryButton label='Reset filters' onClick={resetFilters} type='error' />
        <PageSelector
          page={Number(filters.page) || 0}
          onPageChange={(page) => onFilterChange('page', page)}
          perPage={Number(filters.perPage) || 20}
          onPerPageChange={(perPage) => onFilterChange('perPage', perPage)}
        />
      </SpaceBetweenBox>
    </Box>
  )
}

type PageSelectorProps = {
  page: number
  onPageChange: (value: number) => void
  perPage: number
  onPerPageChange: (value: number) => void
}

function PageSelector({ perPage, onPerPageChange }: PageSelectorProps) {
  return (
    <Box>
      <TextField
        id='perPage'
        label='Per page'
        select
        defaultValue={20}
        sx={{ width: 100 }}
        value={perPage}
        onChange={(e) => onPerPageChange(Number(e.target.value))}
      >
        {['10', '20', '50', '100'].map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  )
}

type SearchFieldProps = {
  value: string
  onChange: (value: string) => void
  buttonAction: (value: string) => void
}

function SearchField({ value, onChange, buttonAction }: SearchFieldProps) {
  const handleClear = () => {
    onChange('')
    buttonAction('')
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      <TextField
        id='search'
        label='Search'
        variant='outlined'
        value={value}
        onChange={(e) => onChange(e.target.value)}
        sx={{ width: 200 }}
        size='small'
        slotProps={{
          input: {
            endAdornment: value && (
              <InputAdornment position='end'>
                <IconButton onClick={handleClear}>
                  <ClearIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
      <SecondaryButton
        label='Use'
        onClick={() => buttonAction(value)}
        sx={{ height: 36, width: 60 }}
        type='success'
      />
    </Box>
  )
}

type DropdownContainerProps = {
  countries: Country[]
  organizations: TournamentOrganization[]
  categories: TournamentCategory[]
  filters: SearchParams
  onFilterChange: (key: keyof SearchParams, value: any) => void
}

function DropdownContainer({
  countries,
  organizations,
  categories,
  filters,
  onFilterChange,
}: DropdownContainerProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      <Autocomplete
        options={countries}
        getOptionLabel={(option: Country) => option.name}
        value={countries.find((country) => country.code === filters.country) || null}
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
  )
}

type WeekButtonContainerProps = {
  handleWeekChange: (offset: number) => void
}

function WeekButtonContainer({ handleWeekChange }: WeekButtonContainerProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      <SecondaryButton
        label='Previous week'
        isActive={false}
        onClick={() => handleWeekChange(-1)}
      />

      <SecondaryButton
        label='This week'
        isActive={false}
        onClick={() => handleWeekChange(0)}
      />

      <SecondaryButton
        label='Next week'
        isActive={false}
        onClick={() => handleWeekChange(1)}
      />
    </Box>
  )
}

type DatePickerContainerProps = {
  filters: SearchParams
  onFilterChange: (key: keyof SearchParams, value: any) => void
}

function DatePickerContainer({ filters, onFilterChange }: DatePickerContainerProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
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
  )
}

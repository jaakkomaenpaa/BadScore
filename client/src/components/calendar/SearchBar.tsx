import { formatDateToApi, getWeek } from '@/utils/dates'
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  styled,
  TextField,
  Typography,
} from '@mui/material'
import { ClearIcon } from '@mui/x-date-pickers'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { useState } from 'react'
import { useDropdownData } from '@/hooks/calendar/useDropdownData'
import { useSearchFilters } from '@/hooks/calendar/useSearchFilters'
import { DropdownContainer } from './DropdownContainer'
import { DatePickerContainer } from './DatePickerContainer'
import { WeekButtonContainer } from './WeekButtonContainer'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

const SpaceBetweenBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: '20px',
  width: '100%',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}))

export const SearchBar = () => {
  const { filters, handleFilterChange, resetFilters } = useSearchFilters()
  const [searchInput, setSearchInput] = useState<string>(filters.searchText || '')
  const { countries, organizations, categories } = useDropdownData()
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false)

  const handleWeekChange = (offset: number) => {
    const week = getWeek(offset)
    handleFilterChange({
      startDate: formatDateToApi(week.startDate),
      endDate: formatDateToApi(week.endDate),
    })
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
          buttonAction={(value: string) => handleFilterChange({ searchText: value })}
        />

        <WeekButtonContainer handleWeekChange={handleWeekChange} />
      </SpaceBetweenBox>

      <Box
        sx={{
          color: 'text.primary',
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          cursor: 'pointer',
        }}
        onClick={() => setShowAdvanced(!showAdvanced)}
      >
        Advanced filters{' '}
        <ExpandMoreIcon
          sx={{
            transition: 'transform 0.3s ease-in-out',
            transform: showAdvanced ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </Box>

      {showAdvanced && (
        <SpaceBetweenBox>
          <DropdownContainer
            countries={countries}
            organizations={organizations}
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <DatePickerContainer
            filters={filters}
            onFilterChange={handleFilterChange}
          />
        </SpaceBetweenBox>
      )}

      <SpaceBetweenBox>
        <SecondaryButton onClick={resetFilters} type='error'>
          <Typography variant='body2'>Reset filters</Typography>
        </SecondaryButton>
        <PageSelector
          perPage={Number(filters.perPage) || 20}
          onPerPageChange={(perPage) =>
            handleFilterChange({ perPage: perPage.toString() })
          }
        />
      </SpaceBetweenBox>
    </Box>
  )
}

type PageSelectorProps = {
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
        onClick={() => buttonAction(value)}
        sx={{ height: 36, width: 60 }}
        type='success'
      >
        <Typography variant='body2'>Use</Typography>
      </SecondaryButton>
    </Box>
  )
}

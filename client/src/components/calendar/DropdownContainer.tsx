import { SearchParams } from '@/types/misc'
import {
  Country,
  TournamentCategory,
  TournamentOrganization,
} from '@/types/tournament'
import { Autocomplete, Box, TextField, useTheme } from '@mui/material'

type DropdownContainerProps = {
  countries: Country[]
  organizations: TournamentOrganization[]
  categories: TournamentCategory[]
  filters: SearchParams
  onFilterChange: (updates: Partial<SearchParams>) => void
}

export function DropdownContainer({
  countries,
  organizations,
  categories,
  filters,
  onFilterChange,
}: DropdownContainerProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 2,
        },
      }}
    >
      <Autocomplete
        options={countries}
        getOptionLabel={(option: Country) => option.name}
        value={countries.find((country) => country.code === filters.country) || null}
        onChange={(_, value) => onFilterChange({ country: value?.code ?? '' })}
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
          onFilterChange({ organization: value?.id.toString() ?? '' })
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
          onFilterChange({ categories: value?.id.toString() ?? '' })
        }
        renderInput={(params) => <TextField {...params} label='Category' />}
        sx={{ width: 200 }}
      />
    </Box>
  )
}

import { MenuItem, Select } from '@mui/material'

type YearSelectorProps = {
  tournamentYears: number[]
  selectedYear: number
  onSelect: (year: number) => void
  disabled?: boolean
}

export function YearSelector({
  tournamentYears,
  selectedYear,
  onSelect,
  disabled,
}: YearSelectorProps) {
  return (
    <Select
      id='year-select'
      value={selectedYear}
      onChange={(e) => onSelect(parseInt(e.target.value.toString()))}
      disabled={disabled}
      sx={{ width: '200px', alignSelf: 'center' }}
    >
      {tournamentYears.map((year: number) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  )
}

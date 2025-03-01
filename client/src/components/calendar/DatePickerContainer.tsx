import { SearchParams } from '@/types/misc'
import { formatDateToApi } from '@/utils/dates'
import { Box, useTheme } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

type DatePickerContainerProps = {
  filters: SearchParams
  onFilterChange: (updates: Partial<SearchParams>) => void
}

export function DatePickerContainer({
  filters,
  onFilterChange,
}: DatePickerContainerProps) {
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
      <DatePicker
        label='Start Date'
        value={filters.startDate ? dayjs(filters.startDate) : null}
        maxDate={filters.endDate ? dayjs(filters.endDate) : undefined}
        onAccept={(date) =>
          date &&
          onFilterChange({ startDate: formatDateToApi(date.add(1, 'day').toDate()) })
        }
        sx={{
          width: 200,
        }}
        slotProps={{
          field: {
            readOnly: true,
            onClear: () => onFilterChange({ startDate: '' }),
          },
        }}
      />

      <DatePicker
        label='End Date'
        value={filters.endDate ? dayjs(filters.endDate) : null}
        minDate={filters.startDate ? dayjs(filters.startDate) : undefined}
        onAccept={(date) =>
          date &&
          onFilterChange({ endDate: formatDateToApi(date.add(1, 'day').toDate()) })
        }
        sx={{
          width: 200,
        }}
        slotProps={{
          field: { clearable: true, onClear: () => onFilterChange({ endDate: '' }) },
        }}
      />
    </Box>
  )
}

import { Box, useTheme } from '@mui/material'
import { SecondaryButton } from '../buttons/SecondaryButton'

type WeekButtonContainerProps = {
  handleWeekChange: (offset: number) => void
}

export function WeekButtonContainer({ handleWeekChange }: WeekButtonContainerProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          flexWrap: 'wrap',
        },
      }}
    >
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

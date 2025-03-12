import { Box, Typography, useTheme } from '@mui/material'
import { SecondaryButton } from '../buttons/SecondaryButton'

type WeekButtonContainerProps = {
  handleWeekChange: (offset: number) => void
  activeTab?: number
  mobileButtonWidth?: number
}

export function WeekButtonContainer({
  handleWeekChange,
  activeTab = -1,
  mobileButtonWidth,
}: WeekButtonContainerProps) {
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
        isActive={activeTab === 0}
        onClick={() => handleWeekChange(-1)}
        sx={
          mobileButtonWidth !== undefined ? { width: mobileButtonWidth } : undefined
        }
      >
        <Typography variant='body2'>Previous week</Typography>
      </SecondaryButton>

      <SecondaryButton
        isActive={activeTab === 1}
        onClick={() => handleWeekChange(0)}
        sx={
          mobileButtonWidth !== undefined ? { width: mobileButtonWidth } : undefined
        }
      >
        <Typography variant='body2'>This week</Typography>
      </SecondaryButton>

      <SecondaryButton
        isActive={activeTab === 2}
        onClick={() => handleWeekChange(1)}
        sx={
          mobileButtonWidth !== undefined ? { width: mobileButtonWidth } : undefined
        }
      >
        <Typography variant='body2'>Next week</Typography>
      </SecondaryButton>
    </Box>
  )
}

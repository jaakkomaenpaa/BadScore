import { About } from '@/components/home/About'
import { CalendarPreview } from '@/components/home/CalendarPreview'
import { PlayerSearch } from '@/components/home/PlayerSearch'
import { RankingPreview } from '@/components/home/RankingPreview'
import { Box, useTheme } from '@mui/material'

function HomePage() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <PlayerSearch />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          [theme.breakpoints.down(1150)]: {
            flexDirection: 'column',
          },
          marginBottom: 1,
        }}
      >
        <CalendarPreview />
        <RankingPreview />
      </Box>
      <About />
    </Box>
  )
}

export default HomePage

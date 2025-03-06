import { CalendarPreview } from '@/components/home/CalendarPreview'
import { PlayerSearch } from '@/components/home/PlayerSearch'
import { RankingPreview } from '@/components/home/RankingPreview'
import { Box, useMediaQuery } from '@mui/material'

function HomePage() {
  const isMobile = useMediaQuery('(max-width: 600px)')

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
        sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', flex: 1 }}
      >
        <CalendarPreview />
        <RankingPreview />
      </Box>
    </Box>
  )
}

export default HomePage

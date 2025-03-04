import { LoadingCircle } from '@/components/LoadingCircle'
import { WeekSelector } from '@/components/ranking/WeekSelector'
import { RankingProvider } from '@/contexts/RankingContext'
import { useRanking } from '@/hooks/ranking/useRanking'
import { Ranking, RankingData } from '@/types/ranking'
import { Box, Typography, useTheme } from '@mui/material'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <RankingProvider>
      <Content />
    </RankingProvider>
  )
}

export default Layout

function Content() {
  const { ranking, rankingData, weeks, loading, error } = useRanking()
  const theme = useTheme()

  if (error) return <Typography color='error'>{error}</Typography>
  if (loading) return <LoadingCircle />
  if (!ranking || !rankingData || !weeks) {
    return <Typography>No ranking data available</Typography>
  }

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px 0px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Header ranking={ranking} rankingData={rankingData} />

      <WeekSelector weeks={weeks} disabled={loading} />

      <Box
        sx={{
          padding: 2,
          [theme.breakpoints.down('sm')]: {
            padding: '10px 0px',
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

type HeaderProps = {
  ranking: Ranking
  rankingData: RankingData
}

function Header({ ranking, rankingData }: HeaderProps) {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}
    >
      <Typography variant='h3' sx={{ color: 'text.primary' }}>
        {ranking.name}
      </Typography>
      <Typography variant='body1' sx={{ color: 'text.secondary' }}>
        Updated at: {new Date(rankingData.publication_date).toLocaleString()}
      </Typography>
    </Box>
  )
}

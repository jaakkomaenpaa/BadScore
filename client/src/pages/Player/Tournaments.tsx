import { LoadingCircle } from '@/components/LoadingCircle'
import { PlayerTmtList } from '@/components/player/PlayerTmtList'
import { YearSelector } from '@/components/player/YearSelector'
import { usePlayer } from '@/hooks/player/usePlayer'
import { Box, Typography } from '@mui/material'

export function Tournaments() {
  const {
    player,
    currentYear,
    tournamentYears,
    tournaments,
    handleYearChange,
    error,
    loading,
  } = usePlayer()

  if (error) return <Typography color='error'>{error}</Typography>
  if (loading) return <LoadingCircle />
  if (!player) {
    return <Typography>No player data available</Typography>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <YearSelector
        tournamentYears={tournamentYears}
        selectedYear={currentYear}
        onSelect={handleYearChange}
        disabled={loading}
      />
      <PlayerTmtList tournaments={tournaments} />
    </Box>
  )
}

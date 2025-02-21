import { LoadingCircle } from '@/components/LoadingCircle'
import { RoundColumn } from '@/components/tournament/bracket/RoundColumn'
import { WinnerColumn } from '@/components/tournament/bracket/WinnerColumn'
import { useBracket } from '@/hooks/tournament/useBracket'
import { Box, Typography } from '@mui/material'

export function Bracket() {
  const { bracket, bracketLoading } = useBracket()

  if (bracketLoading) return <LoadingCircle />
  if (!bracket?.rounds) return <Typography>No bracket data available</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {Object.entries(bracket.rounds).map(([round, matches], index) => (
        <RoundColumn key={index} round={parseInt(round)} matches={matches} />
      ))}
      <WinnerColumn
        winnerEntries={bracket.winners}
        roundsLength={Object.values(bracket.rounds).length}
      />
    </Box>
  )
}

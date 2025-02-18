import { GameScore, Match } from '@/types/match'
import { Box, Typography } from '@mui/material'

type ScoreFieldProps = {
  match: Match
}

export function ScoreField({ match }: ScoreFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'flex-end',
        flex: 1,
      }}
    >
      {match.score.map((game: GameScore) => (
        <Box key={game.set} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            sx={{
              fontWeight: game.home > game.away ? 'bold' : 'normal',
              color: game.home < game.away ? 'text.secondary' : 'text.primary',
            }}
          >
            {game.home}
          </Typography>
          -
          <Typography
            sx={{
              fontWeight: game.away > game.home ? 'bold' : 'normal',
              color: game.away < game.home ? 'text.secondary' : 'text.primary',
            }}
          >
            {game.away}
          </Typography>
        </Box>
      ))}
      {match.scoreStatus !== 0 && match.scoreStatusValue}
    </Box>
  )
}

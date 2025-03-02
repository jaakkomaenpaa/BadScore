import { GameScore, Match } from '@/types/match'
import { Box, Typography, useTheme } from '@mui/material'

type ScoreFieldProps = {
  match: Match
}

export function ScoreField({ match }: ScoreFieldProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'flex-end',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
          gap: '3px',
        },
      }}
    >
      {match.matchStatus === 'P' && (
        <Box>
          <Typography
            variant='matchScore'
            sx={{
              backgroundColor: 'success.main',
              padding: '1px 5px',
              borderRadius: 1,
              color: 'black',
            }}
          >
            Live
          </Typography>
        </Box>
      )}
      {match.score.map((game: GameScore) => (
        <Box
          key={game.set}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Typography
            variant='matchScore'
            sx={{
              fontWeight: game.home > game.away ? 'bold' : 'normal',
              color: game.home < game.away ? 'text.secondary' : 'text.primary',
            }}
          >
            {game.home}
          </Typography>
          <Typography variant='matchScore'>-</Typography>
          <Typography
            variant='matchScore'
            sx={{
              fontWeight: game.away > game.home ? 'bold' : 'normal',
              color: game.away < game.home ? 'text.secondary' : 'text.primary',
            }}
          >
            {game.away}
          </Typography>
        </Box>
      ))}
      {match.scoreStatus !== 0 && (
        <Typography variant='matchScore'> {match.scoreStatusValue}</Typography>
      )}
    </Box>
  )
}

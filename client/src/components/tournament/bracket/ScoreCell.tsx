import { useBracket } from '@/hooks/tournament/useBracket'
import { GameScore } from '@/types/match'
import { Box, Typography } from '@mui/material'

type ScoreCellProps = {
  score: GameScore[]
  scoreStatusValue: string | null
  side?: 'home' | 'away'
  prevSide?: 'home' | 'away'
  isLastRound?: boolean
  isLive?: boolean
}

export function ScoreCell({
  score,
  scoreStatusValue,
  side,
  prevSide,
  isLastRound = false,
  isLive = false,
}: ScoreCellProps) {
  const { cellHeight } = useBracket()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        gap: 1,
        height: cellHeight,
        paddingLeft: 2,
        ...(side === 'home' &&
          !isLastRound && {
            borderRight: '1px solid',
          }),
        borderColor: 'text.secondary',
        color: 'text.primary',
      }}
    >
      {isLive ? (
        <Box>
          <Typography
            sx={{
              backgroundColor: 'warning.main',
              padding: '1px 5px',
              borderRadius: 1,
              color: 'black',
            }}
          >
            Playing
          </Typography>
        </Box>
      ) : (
        score.map((game: GameScore) => (
          <Box
            key={game.set}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: '2px',
            }}
          >
            <Typography variant='body2'>
              {prevSide === 'home' ? game.home : game.away}
            </Typography>
            <Typography variant='body2'>-</Typography>
            <Typography variant='body2'>
              {prevSide === 'home' ? game.away : game.home}
            </Typography>
          </Box>
        ))
      )}
      <Typography variant='body2'>{scoreStatusValue}</Typography>
    </Box>
  )
}

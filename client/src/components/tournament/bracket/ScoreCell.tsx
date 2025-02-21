import { useBracket } from '@/hooks/tournament/useBracket'
import { GameScore } from '@/types/match'
import { Box, Typography } from '@mui/material'

type ScoreCellProps = {
  score: GameScore[]
  scoreStatusValue: string | null
  side?: 'home' | 'away'
  prevSide?: 'home' | 'away'
  isLastRound?: boolean
}

export function ScoreCell({
  score,
  scoreStatusValue,
  side,
  prevSide,
  isLastRound = false,
}: ScoreCellProps) {
  const { cellHeight } = useBracket()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 1,
        height: cellHeight,
        paddingLeft: 1,
        ...(side === 'home' &&
          !isLastRound && {
            borderRight: '1px solid',
          }),
        borderColor: 'text.primary',
        color: 'text.primary',
      }}
    >
      {score.map((game: GameScore) => (
        <Box
          key={game.set}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Typography>{prevSide === 'home' ? game.home : game.away}</Typography>
          <Typography variant='body2'>-</Typography>
          <Typography>{prevSide === 'home' ? game.away : game.home}</Typography>
        </Box>
      ))}
      {scoreStatusValue}
    </Box>
  )
}

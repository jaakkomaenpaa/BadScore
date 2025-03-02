import { useBracket } from '@/hooks/tournament/useBracket'
import { GameScore } from '@/types/match'
import { Box, Typography, useTheme } from '@mui/material'

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
  const theme = useTheme()

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
        [theme.breakpoints.down('md')]: {
          paddingLeft: 1,
          gap: '4px',
        },
      }}
    >
      {isLive ? (
        <Box>
          <Typography
            variant='bracketEntryText'
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
              [theme.breakpoints.down('md')]: {
                gap: '1px',
              },
            }}
          >
            <Typography variant='bracketEntryText'>
              {prevSide === 'home' ? game.home : game.away}
            </Typography>
            <Typography variant='bracketEntryText'>-</Typography>
            <Typography variant='bracketEntryText'>
              {prevSide === 'home' ? game.away : game.home}
            </Typography>
          </Box>
        ))
      )}
      <Typography variant='bracketEntryText'>{scoreStatusValue}</Typography>
    </Box>
  )
}

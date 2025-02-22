import { Box, Typography } from '@mui/material'
import { Cell } from './Cell'
import { Team } from '@/types/match'
import { BracketEntry } from './BracketEntry'
import { getMiddleCellsToAdd, getTopCellsToAdd } from '@/utils/bracket'
import { useBracket } from '@/hooks/tournament/useBracket'

type WinnerColumnProps = {
  winnerEntries: Team[]
  roundsLength: number
}

export function WinnerColumn({ winnerEntries, roundsLength }: WinnerColumnProps) {
  const { cellHeight } = useBracket()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography variant='h6' sx={{ textAlign: 'center', color: 'text.primary' }}>
        Winner
      </Typography>

      {Array.from({
        length: getTopCellsToAdd(roundsLength) + 1,
      }).map((_, index) => (
        <Cell key={index} />
      ))}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${cellHeight * getMiddleCellsToAdd(roundsLength) - 0.7}px`,
        }}
      >
        {winnerEntries.map((team, index) => (
          <BracketEntry
            key={index}
            team={team}
            isLastRound
            side={team.prevMatchSide}
            drawIndex={index}
            round={roundsLength + 1}
            seed={team.seed || undefined}
          />
        ))}
      </Box>
    </Box>
  )
}

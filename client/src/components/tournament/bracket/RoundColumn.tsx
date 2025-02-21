import { Match } from '@/types/match'
import { getMiddleCellsToAdd, getRoundName, getTopCellsToAdd } from '@/utils/bracket'
import { Box, Typography } from '@mui/material'
import { Cell } from './Cell'
import { BracketMatchItem } from './BracketMatchItem'
import { useMemo } from 'react'
import { useBracket } from '@/hooks/tournament/useBracket'

type RoundColumnProps = {
  round: string
  matches: { index: number; match: Match }[]
}

export function RoundColumn({ round, matches }: RoundColumnProps) {
  const { cellHeight } = useBracket()

  const topCellsToAdd = getTopCellsToAdd(parseInt(round))
  const middleCellsToAdd = getMiddleCellsToAdd(parseInt(round))
  const sortedMatches = useMemo(
    () => [...matches].sort((a, b) => a.index - b.index),
    [matches]
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant='h6'
        sx={{ textAlign: 'center', color: 'text.primary', marginBottom: 2 }}
      >
        {getRoundName(matches.length)}
      </Typography>

      {Array.from({ length: topCellsToAdd }).map((_, index) => (
        <Cell key={index} />
      ))}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: `${cellHeight * middleCellsToAdd}px`,
        }}
      >
        {sortedMatches.map(({ match }: { match: Match }) => (
          <BracketMatchItem
            key={`${match.code}-${round}`}
            match={match}
            round={parseInt(round) + 1}
          />
        ))}
      </Box>
    </Box>
  )
}

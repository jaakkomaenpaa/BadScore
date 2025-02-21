import { Match } from '@/types/match'
import { Box } from '@mui/material'
import { Cell } from './Cell'
import { BracketEntry } from './BracketEntry'
import { getMiddleCellsToAdd } from '@/utils/bracket'

type BracketMatchItemProps = {
  match: Match
  round: number
}

export function BracketMatchItem({ match, round }: BracketMatchItemProps) {
  const cellsToAdd = getMiddleCellsToAdd(round - 1)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <BracketEntry team={match.team1} side='home' />
      {Array.from({ length: cellsToAdd }).map((_, index) => (
        <Cell key={index} borderRight />
      ))}
      <BracketEntry team={match.team2} side='away' />
    </Box>
  )
}

/*
    
      
    


    
*/

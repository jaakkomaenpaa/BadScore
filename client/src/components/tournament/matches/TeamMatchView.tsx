import { Match } from '@/types/match'
import { Box } from '@mui/material'
import { MatchListItem } from './MatchListItem'

type TeamMatchViewProps = {
  teamMatch: Match
}

export function TeamMatchView({ teamMatch }: TeamMatchViewProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {teamMatch.matches.map((match) => (
        <MatchListItem key={match.id} match={match} isPartOfTeamMatch />
      ))}
    </Box>
  )
}

import { Match } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { PlayersField } from './PlayersField'
import { ScoreField } from './ScoreField'

type MatchListProps = {
  matches: Match[]
}

export function MatchList({ matches }: MatchListProps) {
  if (matches.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          color: 'white',
        }}
      >
        <Typography>No matches scheduled for this day</Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
      }}
    >
      {matches.map((match) => (
        <MatchListItem key={match.id} match={match} />
      ))}
    </Box>
  )
}

type MatchListItemProps = {
  match: Match
}

function MatchListItem({ match }: MatchListItemProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        color: 'white',
        padding: 1,
      }}
    >
      <InfoField match={match} />
      <PlayersField match={match} />
      <ScoreField match={match} />
    </Box>
  )
}

type InfoFieldProps = {
  match: Match
}

function InfoField({ match }: InfoFieldProps) {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ color: 'text.primary' }}>{match.matchTypeValue}</Typography>
      <Typography sx={{ color: 'text.secondary' }}>{match.roundName}</Typography>
    </Box>
  )
}

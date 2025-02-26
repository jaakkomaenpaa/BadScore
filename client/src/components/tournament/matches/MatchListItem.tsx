import { Match } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { InfoField } from './InfoField'
import { PlayersField } from './PlayersField'
import { ScoreField } from './ScoreField'

type MatchListItemProps = {
  match: Match
  isPartOfTeamMatch?: boolean
  minimalistic?: boolean
}

export function MatchListItem({
  match,
  isPartOfTeamMatch = false,
  minimalistic = false,
}: MatchListItemProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'column',
        padding: 1,
        gap: 1,
      }}
    >
      {match.oopRound && !minimalistic && (
        <Typography sx={{ color: 'text.secondary', alignSelf: 'center' }}>
          {match.oopRound} {match.oopText}
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
        }}
      >
        <InfoField
          match={match}
          isPartOfTeamMatch={isPartOfTeamMatch}
          minimalistic={minimalistic}
        />
        <PlayersField match={match} />
        <ScoreField match={match} />
      </Box>
    </Box>
  )
}

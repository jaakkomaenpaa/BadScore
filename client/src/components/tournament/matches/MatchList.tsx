import { Court, Match } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { TeamMatchListItem } from './TeamMatchListItem'
import { MatchListItem } from './MatchListItem'

type CourtMatches = {
  court: Court
  matches: Match[]
}

type MatchListProps = {
  matches: Match[]
}

export function MatchList({ matches }: MatchListProps) {
  const mainCourtMatches: CourtMatches[] = []
  const otherMatches: Match[] = []

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

  // Sort matches to main court matches and other matches
  matches.forEach((match) => {
    const court = mainCourtMatches.find(
      (court) => court.court.code === match.courtCode
    )
    if (court && match.oopRound) {
      court.matches.push(match)
    } else if (!court && match.oopRound) {
      mainCourtMatches.push({
        court: { code: match.courtCode, name: match.courtName },
        matches: [match],
      })
    } else {
      otherMatches.push(match)
    }
  })

  const ListItem = ({ match }: { match: Match }) =>
    match.isTeamMatch ? (
      <TeamMatchListItem match={match} />
    ) : (
      <MatchListItem match={match} />
    )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
      }}
    >
      {mainCourtMatches.map((courtMatches) => (
        <Box
          key={courtMatches.court.code}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1 }}
        >
          <Typography variant='h6' sx={{ color: 'white', alignSelf: 'center' }}>
            {courtMatches.court.name}
          </Typography>
          {courtMatches.matches.map((match) => (
            <ListItem key={match.id} match={match} />
          ))}
        </Box>
      ))}
      {otherMatches.length > 0 && mainCourtMatches.length > 0 && (
        <Typography variant='h6' sx={{ color: 'white', alignSelf: 'center' }}>
          Other courts
        </Typography>
      )}
      {otherMatches.map((match) => (
        <ListItem key={match.id} match={match} />
      ))}
    </Box>
  )
}

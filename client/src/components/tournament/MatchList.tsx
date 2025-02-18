import { Court, Match } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { PlayersField } from './PlayersField'
import { ScoreField } from './ScoreField'
import { formatTime } from '@/utils/dates'

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
      {mainCourtMatches.map((courtMatches) => (
        <Box
          key={courtMatches.court.code}
          sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 1 }}
        >
          <Typography variant='h6' sx={{ color: 'white', alignSelf: 'center' }}>
            {courtMatches.court.name}
          </Typography>
          {courtMatches.matches.map((match) => (
            <MatchListItem key={match.id} match={match} />
          ))}
        </Box>
      ))}
      {otherMatches.length > 0 && (
        <Typography variant='h6' sx={{ color: 'white', alignSelf: 'center' }}>
          Other courts
        </Typography>
      )}
      {otherMatches.map((match) => (
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
        flexDirection: 'column',
        padding: 1,
        gap: 1,
      }}
    >
      {match.oopRound && (
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
        <InfoField match={match} />
        <PlayersField match={match} />
        <ScoreField match={match} />
      </Box>
    </Box>
  )
}

type InfoFieldProps = {
  match: Match
}

function InfoField({ match }: InfoFieldProps) {
  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography sx={{ color: 'text.primary' }}>{match.drawName}</Typography>
        <Typography sx={{ color: 'text.secondary' }}>{match.roundName}</Typography>
      </Box>
      {!match.oopRound && (
        <Typography sx={{ color: 'text.primary' }}>
          {formatTime(new Date(match.matchTime))}
        </Typography>
      )}
    </Box>
  )
}

import { Match } from '@/types/match'
import { formatTime } from '@/utils/dates'
import { Box, Typography } from '@mui/material'

type InfoFieldProps = {
  match: Match
  isPartOfTeamMatch?: boolean
}

export function InfoField({ match, isPartOfTeamMatch = false }: InfoFieldProps) {
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
      {!match.oopRound && !isPartOfTeamMatch && (
        <Typography sx={{ color: 'text.primary' }}>
          {formatTime(new Date(match.matchTime))}
        </Typography>
      )}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {isPartOfTeamMatch ? (
          <Typography sx={{ color: 'text.primary' }}>
            {match.matchTypeValue}
          </Typography>
        ) : (
          <>
            <Typography sx={{ color: 'text.primary' }}>{match.drawName}</Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {match.roundName}
            </Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

export function TeamMatchInfoField({ match }: InfoFieldProps) {
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
        <Typography sx={{ color: 'text.primary' }}>{match.matchTypeValue}</Typography>
      </Box>
      {!match.oopRound && (
        <Typography sx={{ color: 'text.primary' }}>
          {formatTime(new Date(match.matchTime))}
        </Typography>
      )}
    </Box>
  )
}

export function GeneralMatchInfoField({ match }: InfoFieldProps) {
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

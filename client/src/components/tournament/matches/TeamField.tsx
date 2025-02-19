import { Match, Team } from '@/types/match'
import { Box, Typography } from '@mui/material'

type TeamFieldProps = {
  match: Match
}

export function TeamField({ match }: TeamFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <TeamItem
          team={match.team1}
          seed={match.team1seed}
          side='home'
          isWinner={match.winner === 1}
          isLoser={match.winner === 2}
        />
      </Box>
      <Box sx={{ margin: '0px 10px' }}>-</Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <TeamItem
          team={match.team2}
          seed={match.team2seed}
          side='away'
          isWinner={match.winner === 2}
          isLoser={match.winner === 1}
        />
      </Box>
    </Box>
  )
}

type TeamItemProps = {
  team: Team
  seed: string
  side: 'home' | 'away'
  isWinner: boolean
  isLoser: boolean
}

function TeamItem({ team, seed, side, isWinner, isLoser }: TeamItemProps) {
  const Flag = () => (
    <img src={team.countryFlagUrl} alt={team.teamName} style={{ height: 20 }} />
  )

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'home' ? 'flex-end' : 'flex-start',
        textAlign: side === 'home' ? 'right' : 'left',
      }}
    >
      <Box
        key={team.teamId}
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        {side === 'away' && <Flag />}
        <Typography
          variant='body1'
          sx={{
            color: isLoser ? 'text.secondary' : 'text.primary',
            fontWeight: isWinner ? 'bold' : 'normal',
          }}
        >
          {team.teamName} {seed && `[${seed}]`}
        </Typography>
        {side === 'home' && <Flag />}
      </Box>
    </Box>
  )
}

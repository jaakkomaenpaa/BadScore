import { NavigationLink } from '@/components/NavigationLink'
import { Match, Player, Team } from '@/types/match'
import { Box, useMediaQuery } from '@mui/material'
import { useParams } from 'react-router'

type PlayersFieldProps = {
  match: Match
}

export function PlayersField({ match }: PlayersFieldProps) {
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
        <PlayerTeamItem
          team={match.team1}
          seed={match.team1seed}
          side='home'
          isWinner={match.winner === 1}
        />
      </Box>
      <Box sx={{ margin: '0px 10px' }}>-</Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <PlayerTeamItem
          team={match.team2}
          seed={match.team2seed}
          side='away'
          isWinner={match.winner === 2}
        />
      </Box>
    </Box>
  )
}

type PlayerTeamItemProps = {
  team: Team
  seed: string | null
  side: 'home' | 'away'
  isWinner: boolean
}

function PlayerTeamItem({ team, seed, side, isWinner }: PlayerTeamItemProps) {
  const isMobile = useMediaQuery('(max-width:600px)')
  const { tournamentId } = useParams()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'home' ? 'flex-end' : 'flex-start',
        textAlign: side === 'home' ? 'right' : 'left',
      }}
    >
      {team.players.map((player: Player, index: number) => {
        const Flag = () => (
          <img
            src={player.countryFlagUrl}
            alt={player.lastName}
            style={{ height: !isMobile ? 20 : 14 }}
          />
        )

        return (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
            }}
          >
            {side === 'away' && <Flag />}
            <NavigationLink
              to={`/players/${player.id}/tournaments/${tournamentId}`}
              variant='matchPlayerName'
              sx={{
                color: isWinner ? 'text.primary' : 'text.secondary',
                fontWeight: isWinner ? 'bold' : 'normal',
              }}
            >
              {player.nameDisplay} {seed && index === 0 && `[${seed}]`}
            </NavigationLink>
            {side === 'home' && <Flag />}
          </Box>
        )
      })}
    </Box>
  )
}

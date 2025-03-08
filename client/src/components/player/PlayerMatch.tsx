import { CountryModel } from '@/types/country'
import { Player, PlayerTournamentMatch, ScoreModel } from '@/types/player'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material'

type PlayerMatchProps = {
  match: PlayerTournamentMatch
}

export function PlayerMatch({ match }: PlayerMatchProps) {
  if (!match.t1p1_player_model || !match.t2p1_player_model) {
    return null
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        padding: 1,
      }}
    >
      <InfoField match={match} />
      <PlayerField match={match} />
      <ScoreField match={match} />
    </Box>
  )
}

function ScoreField({ match }: { match: PlayerTournamentMatch }) {
  const scoreModel = match.match_set_model
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'flex-end',
        flex: 1,
        [theme.breakpoints.down('sm')]: {
          gap: '3px',
        },
      }}
    >
      {scoreModel.map((set: ScoreModel) => (
        <Box
          key={set.id}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Typography
            variant='matchScore'
            sx={{
              fontWeight: set.team1 > set.team2 ? 'bold' : 'normal',
              color: set.team1 < set.team2 ? 'text.secondary' : 'text.primary',
            }}
          >
            {set.team1}
          </Typography>
          <Typography variant='matchScore'>-</Typography>
          <Typography
            variant='matchScore'
            sx={{
              fontWeight: set.team2 > set.team1 ? 'bold' : 'normal',
              color: set.team2 < set.team1 ? 'text.secondary' : 'text.primary',
            }}
          >
            {set.team2}
          </Typography>
        </Box>
      ))}
      {match.score_status !== 0 && (
        <Typography variant='matchScore'>{match.status_name}</Typography>
      )}
    </Box>
  )
}

function InfoField({ match }: { match: PlayerTournamentMatch }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <Typography variant='matchInfo' sx={{ color: 'text.primary' }}>
        {match.draw_name}
      </Typography>
      <Typography variant='matchInfo' sx={{ color: 'text.secondary' }}>
        {match.round_name}
      </Typography>
    </Box>
  )
}

function PlayerField({ match }: { match: PlayerTournamentMatch }) {
  const t1Players = [match.t1p1_player_model]
  if (match.t1p2_player_model) {
    t1Players.push(match.t1p2_player_model)
  }

  const t1Countries = [match.t1p1country_model]
  if (match.t1p2country_model) {
    t1Countries.push(match.t1p2country_model)
  }

  const t2Players = [match.t2p1_player_model]
  if (match.t2p2_player_model) {
    t2Players.push(match.t2p2_player_model)
  }

  const t2Countries = [match.t2p1country_model]
  if (match.t2p2country_model) {
    t2Countries.push(match.t2p2country_model)
  }

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
          players={t1Players}
          countries={t1Countries}
          seed={null}
          side='home'
          isWinner={match.winner === 1}
        />
      </Box>

      <Box sx={{ margin: '0px 10px' }}>-</Box>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <TeamItem
          players={t2Players}
          countries={t2Countries}
          seed={null}
          side='away'
          isWinner={match.winner === 2}
        />
      </Box>
    </Box>
  )
}

type TeamItemProps = {
  players: Player[]
  countries: CountryModel[]
  seed: string | null
  side: 'home' | 'away'
  isWinner: boolean
}

function TeamItem({ players, countries, side, isWinner }: TeamItemProps) {
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'home' ? 'flex-end' : 'flex-start',
        textAlign: side === 'home' ? 'right' : 'left',
      }}
    >
      {players.map((player, index: number) => {
        const Flag = () => (
          <img
            src={countries[index].flag_url_svg}
            style={{ height: isMobile ? 10 : 16 }}
          />
        )

        return (
          <Box
            key={player.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              gap: 1,
              alignItems: 'center',
              [theme.breakpoints.down('sm')]: {
                gap: '4px',
              },
            }}
          >
            {side === 'away' && <Flag />}
            <Typography
              variant='matchPlayerName'
              sx={{
                color: isWinner ? 'text.primary' : 'text.secondary',
                fontWeight: isWinner ? 'bold' : 'normal',
              }}
            >
              {player.name_display ?? 'No name'}
            </Typography>
            {side === 'home' && <Flag />}
          </Box>
        )
      })}
    </Box>
  )
}

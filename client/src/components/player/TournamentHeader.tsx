import { PlayerTournament } from '@/types/player'
import { Box, Typography, useMediaQuery } from '@mui/material'
import { NavigationLink } from '../NavigationLink'

type TournamentHeaderProps = {
  tournament: PlayerTournament
}

export function TournamentHeader({ tournament }: TournamentHeaderProps) {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 2 }}>
      {tournament.logo && (
        <img
          src={tournament.logo}
          alt='logo'
          style={{
            overflow: 'hidden',
            width: 50,
            height: 50,
            borderRadius: '50%',
            flexShrink: 0,
          }}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <NavigationLink
          to={`/tournaments/${tournament.tournament_id}/overview`}
          variant='h6'
        >
          {tournament.tournament_model.name}
        </NavigationLink>
        <Box sx={{ color: 'text.secondary' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Typography variant='body2'>{tournament.location}</Typography>
            <img
              src={tournament.tournament_model.country_model.flag_url_svg}
              style={{ height: isMobile ? 12 : 16 }}
            />
          </Box>

          <Typography variant='body2'>{tournament.date}</Typography>
        </Box>
      </Box>
    </Box>
  )
}

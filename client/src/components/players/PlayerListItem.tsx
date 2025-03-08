import { CountryModel } from '@/types/country'
import { Player } from '@/types/player'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router'

type PlayerListItemProps = {
  player: Player
}

export function PlayerListItem({ player }: PlayerListItemProps) {
  const country: CountryModel = player.country_model ?? null

  return (
    <NavLink to={`/players/${player.id}/overview`} style={{ textDecoration: 'none' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1,
          backgroundColor: 'background.paper',
          padding: 1,
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            opacity: 0.8,
          },
          '&:hover .hover-underline': {
            textDecoration: 'underline',
          },
        }}
      >
        {country && <img src={country.flag_url_svg} style={{ height: 14 }} />}

        <Typography
          className='hover-underline'
          variant='body2'
          sx={{ color: 'text.primary' }}
        >
          {player.name_display}
        </Typography>

        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {player.id}
        </Typography>
      </Box>
    </NavLink>
  )
}

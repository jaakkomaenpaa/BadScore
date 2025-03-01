import { Avatar, Box, Typography } from '@mui/material'
import { TournamentPreview } from '../../types/tournament'
import { memo } from 'react'
import { NavLink, useNavigate } from 'react-router'

type TournamentListProps = {
  tournaments: TournamentPreview[]
}

export const TournamentList = memo(({ tournaments }: TournamentListProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {tournaments.map((tournament) => (
        <TournamentListItem key={tournament.id} tournament={tournament} />
      ))}
    </Box>
  )
})

type TournamentListItemProps = {
  tournament: TournamentPreview
}

function TournamentListItem({ tournament }: TournamentListItemProps) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/tournaments/${tournament.id}/overview`)
  }

  return (
    <NavLink
      style={{ textDecoration: 'none' }}
      to={`/tournaments/${tournament.id}/overview`}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: 'background.paper',
          padding: 2,
          cursor: 'pointer',
          transition: 'all 0.1s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          },
        }}
        onClick={handleClick}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            marginBottom: 1,
          }}
        >
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            {tournament.name}
          </Typography>
          <Avatar
            sx={{ width: 30, height: 30 }}
            src={tournament.flagUrl}
            alt={tournament.name}
          />
        </Box>

        <Typography variant='body2' color='text.secondary'>
          {tournament.category}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: 1
          }}
        >
          <Typography variant='body2' color='text.secondary'>
            {tournament.dates}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {tournament.location}
          </Typography>
        </Box>
      </Box>
    </NavLink>
  )
}

import { useTournament } from '@/hooks/useTournament'
import { TournamentPreview } from '@/types/tournament'
import { Box, Typography } from '@mui/material'
import { ReactNode } from 'react'
import { NavLink, Outlet, To, useParams } from 'react-router'

function Layout() {
  const { tournamentId } = useParams()
  const numericTournamentId = tournamentId ? Number(tournamentId) : null

  if (!numericTournamentId || isNaN(numericTournamentId)) {
    return <Typography>No tournament data available</Typography>
  }

  const { tournament, error } = useTournament(numericTournamentId)

  if (error) {
    return <Typography color='error'>{error}</Typography>
  }

  if (!tournament) {
    return <Typography>Loading...</Typography>
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Header tournament={tournament} />
      <Navbar />
      <Outlet />
    </Box>
  )
}

export default Layout

function Navbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'whitesmoke',
        padding: '10px 0px',
      }}
    >
      <NavButton to={`overview`}>Overview</NavButton>
      <NavButton to={`draws`}>Draws</NavButton>
      <NavButton to={`matches`}>Matches</NavButton>
      <NavButton to={`entry-list`}>Entry list</NavButton>
      <NavButton to={`players`}>Players</NavButton>
    </Box>
  )
}

type HeaderProps = {
  tournament: TournamentPreview
}

function Header({ tournament }: HeaderProps) {
  return (
    <Box
      sx={{
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${tournament.headerUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(50%)',
          zIndex: -1,
        }}
      />
      <NavLink
        to='/'
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          color: 'white',
          fontSize: 20,
        }}
      >
        Calendar
      </NavLink>
      <Typography
        variant='h4'
        sx={{ zIndex: 1, textWrap: 'wrap', textAlign: 'center' }}
      >
        {tournament.name}
      </Typography>
    </Box>
  )
}

type NavButtonProps = {
  to: To
  children: ReactNode
}

const NavButton = ({ to, children }: NavButtonProps) => (
  <NavLink style={{ textDecoration: 'none' }} to={to}>
    {({ isActive }) => (
      <Box
        sx={{
          color: isActive ? 'white' : 'black',
          backgroundColor: isActive ? 'black' : 'whitesmoke',
          padding: '8px 16px',
          textDecoration: 'none',
          borderRadius: 1,
          transition: 'all 0.1s ease',
          '&:hover': {
            opacity: 0.8,
            backgroundColor: isActive ? 'black' : 'rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        {children}
      </Box>
    )}
  </NavLink>
)

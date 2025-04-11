import { LoadingCircle } from '@/components/LoadingCircle'
import { NavButton } from '@/components/NavButton'
import { BracketProvider } from '@/contexts/BracketContext'
import { TournamentProvider } from '@/contexts/TournamentContext'
import { useTournament } from '@/hooks/tournament/useTournament'
import { TournamentPreview } from '@/types/tournament'
import { Box, Typography, useTheme } from '@mui/material'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <TournamentProvider>
      <BracketProvider>
        <Content />
      </BracketProvider>
    </TournamentProvider>
  )
}

export default Layout

function Content() {
  const { tournament, loading, error } = useTournament()
  const theme = useTheme()

  if (error) return <Typography color='error'>{error}</Typography>
  if (loading) return <LoadingCircle />
  if (!tournament) return <Typography>No tournament data available</Typography>

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Header tournament={tournament} />
      <Navbar />
      <Box
        sx={{
          padding: 2,
          [theme.breakpoints.down('sm')]: {
            padding: '10px 0px',
          },
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}

function Navbar() {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'whitesmoke',
        padding: '10px 0px',
        [theme.breakpoints.down('sm')]: {
          padding: '6px 0px',
        },
      }}
    >
      <NavButton to={`overview`} label='Overview' />
      <NavButton to={`draws`} label='Draws'></NavButton>
      <NavButton to={`matches`} label='Matches'></NavButton>
      <NavButton to={`entry-list`} label='Entry list'></NavButton>
      {/* <NavButton to={`players`} label='Players'></NavButton> */}
    </Box>
  )
}

type HeaderProps = {
  tournament: TournamentPreview
}

function Header({ tournament }: HeaderProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: 200,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        padding: 2,
        [theme.breakpoints.down('sm')]: {
          height: 160,
        },
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
      <Typography
        variant='h3'
        sx={{
          zIndex: 1,
          textWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {tournament.name}
      </Typography>
      <Typography
        variant='body1'
        sx={{
          zIndex: 1,
          textWrap: 'wrap',
          textAlign: 'center',
        }}
      >
        {tournament.dates} | {tournament.location}
      </Typography>
    </Box>
  )
}

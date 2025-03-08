import { LoadingCircle } from '@/components/LoadingCircle'
import { NavButton } from '@/components/NavButton'
import { PlayerProvider } from '@/contexts/PlayerContext'
import { usePlayer } from '@/hooks/player/usePlayer'
import { CountryModel } from '@/types/country'
import { Player } from '@/types/player'
import { Box, Typography, useTheme } from '@mui/material'
import { Outlet } from 'react-router'

function Layout() {
  return (
    <PlayerProvider>
      <Content />
    </PlayerProvider>
  )
}

export default Layout

function Content() {
  const { player, error, loading } = usePlayer()
  const theme = useTheme()

  if (error) return <Typography color='error'>{error}</Typography>
  if (loading) return <LoadingCircle />
  if (!player) {
    return <Typography>No player data available</Typography>
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header player={player} />

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
      <NavButton to={`overview`} label='Bio' />
      <NavButton to={`tournaments`} label='Tournaments'></NavButton>
    </Box>
  )
}

type HeaderProps = {
  player: Player
}

function Header({ player }: HeaderProps) {
  const theme = useTheme()
  const country: CountryModel = player.country_model ?? null

  return (
    <Box
      sx={{
        height: 120,
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        padding: 2,
        gap: 2,
        [theme.breakpoints.down('sm')]: {
          height: 80,
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
          backgroundImage: `url(${player.hero_image.url_cloudinary_large})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(50%)',
          zIndex: -1,
          [theme.breakpoints.down('sm')]: {
            backgroundImage: `url(${player.hero_image.url_cloudinary_mobile})`,
          },
        }}
      />
      <img
        src={player.avatar.url_cloudinary}
        style={{
          overflow: 'hidden',
          width: 100,
          height: 100,
          borderRadius: '50%',
          border: '2px solid #fff',
          flexShrink: 0,
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
        {player.name_display}
      </Typography>

      {country && (
        <img
          src={player.country_model.flag_url_svg}
          style={{
            overflow: 'hidden',
            height: 40,
            borderRadius: '50%',
            border: '2px solid #fff',
          }}
        />
      )}
    </Box>
  )
}

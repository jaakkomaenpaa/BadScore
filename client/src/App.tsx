import { NavLink, Route, Routes } from 'react-router'
import Calendar from '@/pages/Calendar'
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  ThemeProvider,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import TournamentLayout, {
  TournamentHome,
  Draws,
  Matches,
  EntryList,
} from './pages/Tournament'
import { BracketPage } from '@/pages/Tournament/Bracket'
import HomePage from '@/pages/Home'
import ErrorPage from './pages/Error'
import { useAppTheme } from './theme'
import { CURRENT_VERSION } from './config'
import RankingsPage from './pages/Rankings'
import RankingLayout, { RankingHome, CategoryView } from './pages/Ranking'
import Players from './pages/Players'
import logo from '../public/logo.svg'
import {
  PlayerHome,
  PlayerLayout,
  PlayerTournament,
  PlayerTournaments,
} from './pages/Player'
import GitHubIcon from '@mui/icons-material/GitHub'
import { NavigationLink } from './components/NavigationLink'
import { ContactForm } from './components/home/ContactForm'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

function App() {
  const theme = useAppTheme()

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header />

        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            paddingBottom: 2,
          }}
        >
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/tournaments' element={<Calendar />} />
            <Route path='/rankings' element={<RankingsPage />} />
            <Route path='/players' element={<Players />} />

            <Route path='/players/:playerId' element={<PlayerLayout />}>
              <Route path='' element={<PlayerHome />} />
              <Route path='overview' element={<PlayerHome />} />
              <Route path='tournaments' element={<PlayerTournaments />} />
              <Route
                path='tournaments/:tournamentId'
                element={<PlayerTournament />}
              />
            </Route>

            <Route path='/rankings/:rankingId' element={<RankingLayout />}>
              <Route path='overview' element={<RankingHome />} />
              <Route path='category/:categoryId' element={<CategoryView />} />
            </Route>

            <Route path='/tournaments/:tournamentId' element={<TournamentLayout />}>
              <Route path='overview' element={<TournamentHome />} />
              <Route path='draws' element={<Draws />} />
              <Route path='draws/:drawId' element={<BracketPage />} />
              <Route path='matches' element={<Matches />} />
              <Route path='entry-list' element={<EntryList />} />{' '}
              {/* <Route path='players' element={<TournamentPlayers />} /> */}
            </Route>

            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </Box>

        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App

function Footer() {
  const theme = useTheme()

  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: 'background.paper',
        width: '100%',
        color: 'text.primary',
        height: 120,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        [theme.breakpoints.down('sm')]: {
          height: 80,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 20px',
        }}
      >
        <Typography variant='body2'>Created in 2025</Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '4px',
          }}
        >
          <GitHubIcon className='hover-child' sx={{ height: 20 }} />
          <NavigationLink
            to='https://github.com/jaakkomaenpaa/BadScore'
            variant='body2'
            sx={{ color: 'text.secondary' }}
          >
            GitHub
          </NavigationLink>
        </Box>
        <Typography variant='body2'>Version {CURRENT_VERSION}</Typography>
      </Box>
    </Box>
  )
}

function Header() {
  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  const [contactOpen, setContactOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 4,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        backgroundColor: 'primary.main',
        borderRadius: 0,
        [theme.breakpoints.down('md')]: {
          justifyContent: 'space-between',
          padding: '0px 10px',
        },
      }}
    >
      <NavLink
        to='/'
        style={{
          textDecoration: 'none',
          position: isSmallScreen ? 'relative' : 'absolute',
          right: isSmallScreen ? 0 : 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img
          src={logo}
          style={{
            height: 40,
          }}
        />
      </NavLink>

      <CardContent>
        <NavLink to='/' style={{ textDecoration: 'none' }}>
          <Typography sx={{ color: 'text.primary' }} variant='h4'>
            BadScore
          </Typography>
        </NavLink>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 3,
          position: 'absolute',
          left: 20,
          [theme.breakpoints.down('md')]: {
            position: 'relative',
            left: 'unset',
          },
        }}
      >
        {isSmallScreen && (
          <>
            <Box
              sx={{
                display: 'none',
                [theme.breakpoints.down('md')]: { display: 'block' },
              }}
              onClick={handleClickMenu}
            >
              <IconButton onClick={handleMenuToggle}>
                <MenuIcon />
              </IconButton>
            </Box>

            <Menu
              id='basic-menu'
              open={menuOpen}
              onClose={closeMenu}
              anchorEl={anchorEl}
            >
              <MenuItem onClick={closeMenu}>
                <NavLink to='/tournaments' style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'text.primary' }} variant='subtitle1'>
                    Calendar
                  </Typography>
                </NavLink>
              </MenuItem>

              <MenuItem onClick={closeMenu}>
                <NavLink to='/rankings' style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'text.primary' }} variant='subtitle1'>
                    Rankings
                  </Typography>
                </NavLink>
              </MenuItem>

              <MenuItem onClick={closeMenu}>
                <Typography
                  sx={{ color: 'text.primary', cursor: 'pointer' }}
                  variant='subtitle1'
                  onClick={() => setContactOpen(true)}
                >
                  Contact
                </Typography>
              </MenuItem>
            </Menu>
          </>
        )}

        {!isSmallScreen && (
          <>
            <NavLink to='/tournaments' style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'text.primary' }} variant='subtitle1'>
                Calendar
              </Typography>
            </NavLink>
            <NavLink to='/rankings' style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'text.primary' }} variant='subtitle1'>
                Rankings
              </Typography>
            </NavLink>
            <Typography
              sx={{ color: 'text.primary', cursor: 'pointer' }}
              variant='subtitle1'
              onClick={() => setContactOpen(true)}
            >
              Contact
            </Typography>
          </>
        )}

        <ContactForm isOpen={contactOpen} onClose={() => setContactOpen(false)} />
      </Box>
    </Card>
  )
}

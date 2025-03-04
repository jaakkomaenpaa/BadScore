import { NavLink, Route, Routes } from 'react-router'
import Calendar from '@/pages/Calendar'
import {
  Box,
  Card,
  CardContent,
  ThemeProvider,
  Typography,
  useMediaQuery,
} from '@mui/material'
import TournamentLayout, {
  TournamentHome,
  Draws,
  Matches,
  Players,
  EntryList,
} from './pages/Tournament'
import { BracketPage } from '@/pages/Tournament/Bracket'
import HomePage from '@/pages/Home'
import ErrorPage from './pages/Error'
import { useAppTheme } from './theme'
import { CURRENT_VERSION } from './config'
import RankingsPage from './pages/Rankings'
import RankingLayout, { RankingHome } from './pages/Ranking'
import { CategoryView } from './pages/Ranking/CategoryView'

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

            <Route path='/rankings/:rankingId' element={<RankingLayout />}>
              <Route path='overview' element={<RankingHome />} />
              <Route path='category/:categoryId' element={<CategoryView />} />
            </Route>

            <Route path='/tournaments/:tournamentId' element={<TournamentLayout />}>
              <Route path='overview' element={<TournamentHome />} />
              <Route path='draws' element={<Draws />} />
              <Route path='draws/:drawId' element={<BracketPage />} />
              <Route path='matches' element={<Matches />} />
              <Route path='players' element={<Players />} />
              <Route path='entry-list' element={<EntryList />} />
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
  const isMobile = useMediaQuery('(max-width:600px)')

  return (
    <Box
      component='footer'
      sx={{
        backgroundColor: 'background.paper',
        width: '100%',
        color: 'text.primary',
        height: isMobile ? 80 : 120,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center',
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
        <Typography variant='body2'>Version {CURRENT_VERSION}</Typography>
      </Box>
    </Box>
  )
}

function Header() {
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
      }}
    >
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
        }}
      >
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
      </Box>
    </Card>
  )
}

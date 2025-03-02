import { Route, Routes } from 'react-router'
import Calendar from '@/pages/Calendar'
import { responsiveFontSizes, ThemeProvider } from '@mui/material'
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

function App() {
  const theme = useAppTheme()
  //theme = responsiveFontSizes(theme)

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path='/tournaments' element={<Calendar />} />

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
    </ThemeProvider>
  )
}

export default App

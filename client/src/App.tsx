import { Route, Routes } from 'react-router'
import Calendar from '@/pages/Calendar'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'
import TournamentLayout, {
  Home,
  Draws,
  Matches,
  Players,
  EntryList,
} from './pages/Tournament'
import { Bracket } from './pages/Tournament/Bracket'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path='/tournaments' element={<Calendar />} />

        <Route path='/tournaments/:tournamentId' element={<TournamentLayout />}>
          <Route path='overview' element={<Home />} />
          <Route path='draws' element={<Draws />} />
          <Route path='draws/:drawId' element={<Bracket />} />
          <Route path='matches' element={<Matches />} />
          <Route path='players' element={<Players />} />
          <Route path='entry-list' element={<EntryList />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App

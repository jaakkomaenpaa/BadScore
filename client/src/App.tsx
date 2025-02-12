import { Route, Routes } from 'react-router'
import Calendar from '@/pages/Calendar'
import Tournament from '@/pages/Tournament'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path='/' element={<Calendar />} />
        <Route path='/tournaments' element={<Calendar />} />
        <Route path='/tournaments/:id' element={<Tournament />} />
        <Route path='/' element={<></>} />
      </Routes>
    </ThemeProvider>
  )
}

export default App

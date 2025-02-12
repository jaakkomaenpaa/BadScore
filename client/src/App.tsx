import { Route, Routes } from 'react-router'
import Calendar from './pages/Calendar'
import Tournament from './pages/Tournament'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<></>} />
        <Route path='/tournaments' element={<Calendar />} />
        <Route path='/tournaments/:id' element={<Tournament />} />
        <Route path='/' element={<></>} />
      </Routes>
    </>
  )
}

export default App

import calendarService from '@/services/calendar'
import { useEffect, useState } from 'react'
import { TournamentList } from '@/components/calendar/TournamentList'
import { TournamentPreview } from '@/types/tournament'

function Calendar() {
  const [tournaments, setTournaments] = useState<TournamentPreview[]>([])

  useEffect(() => {
    const getData = async () => {
      const tournamentData = await calendarService.getTournaments()
      if (!tournamentData) return

      setTournaments(tournamentData)
      console.log
    }

    getData()
  }, [])

  return (
    <>
      <h2 style={{ color: 'white' }}>Calendar</h2>
      <TournamentList tournaments={tournaments} />
    </>
  )
}

export default Calendar

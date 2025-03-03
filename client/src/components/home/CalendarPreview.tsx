import { TournamentPreview } from '@/types/tournament'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { WeekButtonContainer } from '../calendar/WeekButtonContainer'
import { formatDateToApi, getWeek } from '@/utils/dates'
import { Week } from '@/types/misc'
import calendarService from '@/services/calendar'
import { LoadingCircle } from '../LoadingCircle'
import { TournamentList } from '../calendar/TournamentList'
import { NavLink } from 'react-router'

export function CalendarPreview() {
  const [tournaments, setTournaments] = useState<TournamentPreview[]>([])
  const [week, setWeek] = useState<Week>(getWeek(0))
  const [loading, setLoading] = useState<boolean>(true)
  const [activeWeek, setActiveWeek] = useState<number>(1)

  useEffect(() => {
    const fetchTournaments = async () => {
      setLoading(true)
      const response = await calendarService.searchTournaments({
        startDate: formatDateToApi(week.startDate),
        endDate: formatDateToApi(week.endDate),
      })
      setTournaments(response.results)
      setLoading(false)
    }

    fetchTournaments()
  }, [week])

  const handleWeekChange = (offset: number) => {
    const week = getWeek(offset)
    setActiveWeek(offset + 1)
    setWeek(week)
  }

  return (
    <Box
      sx={{
        flex: 1,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: 2,
          gap: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <WeekButtonContainer
            handleWeekChange={handleWeekChange}
            activeTab={activeWeek}
          />
          <NavLink
            to='/tournaments'
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              variant='body1'
              sx={{ color: 'text.primary', textDecoration: 'underline' }}
            >
              View more
            </Typography>
          </NavLink>
        </Box>

        {loading ? <LoadingCircle /> : <TournamentList tournaments={tournaments} />}
      </Box>
    </Box>
  )
}

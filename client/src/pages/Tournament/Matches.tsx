import { MatchList } from '@/components/tournament/MatchList'
import { useTournament } from '@/hooks/useTournament'
import { Match } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import tournamentService from '@/services/tournament'
import { addDays, formatDateToApi, getDateList } from '@/utils'
import { useSearchParams } from 'react-router'
import { LoadingCircle } from '@/components/LoadingCircle'

const getDefaultDate = (startDate: Date, endDate: Date): Date => {
  const today = new Date()

  // If tournament is ongoing, default to today
  if (today >= startDate && today <= endDate) {
    const fixedDate = new Date(today)
    fixedDate.setDate(fixedDate.getDate())
    return today
  }

  return startDate
}

export function Matches() {
  const { tournament } = useTournament()
  if (!tournament) return null

  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  // Parse date from URL or use default
  const urlDate = searchParams.get('date')
  const defaultDate = getDefaultDate(
    new Date(tournament.startDate),
    new Date(tournament.endDate)
  )
  const [date, setDate] = useState<Date>(urlDate ? new Date(urlDate) : defaultDate)

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      try {
        const matchRes = await tournamentService.getMatches(tournament!.code, date)
        setMatches(matchRes)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchMatches()
  }, [date, tournament])

  const handleSelectDate = useCallback(
    (selectedDate: Date) => {
      setDate(selectedDate)
      setSearchParams({ date: formatDateToApi(selectedDate) })
    },
    [setSearchParams]
  )

  const memoizedMatches = useMemo(() => matches, [matches])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
      <DateSelector
        startDate={new Date(tournament.startDate)}
        endDate={new Date(tournament.endDate)}
        onSelect={handleSelectDate}
        selectedDate={date}
      />
      {loading ? <LoadingCircle /> : <MatchList matches={memoizedMatches} />}
    </Box>
  )
}

type DateSelectorProps = {
  startDate: Date
  endDate: Date
  onSelect: (date: Date) => void
  selectedDate: Date
}

function DateSelector({
  startDate,
  endDate,
  onSelect,
  selectedDate,
}: DateSelectorProps) {
  const dates = getDateList(startDate, endDate)

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}
    >
      {dates.map((date) => {
        const [weekDay, month, day] = date.toDateString().split(' ')
        const fixedDate = addDays(date, 1)
        const isSelected =
          formatDateToApi(fixedDate) === formatDateToApi(selectedDate)

        return (
          <Box
            sx={{
              backgroundColor: isSelected ? 'black' : 'whitesmoke',
              color: isSelected ? 'white' : 'black',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5px 20px',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: isSelected ? 'black' : 'lightgray',
                opacity: isSelected ? 0.8 : 1,
              },
            }}
            key={date.toISOString()}
            onClick={() => onSelect(fixedDate)}
          >
            <Typography sx={{ margin: 0, fontSize: 12 }}>{weekDay}</Typography>
            <Typography sx={{ margin: 0, fontSize: 16, fontWeight: '600' }}>
              {day}
            </Typography>
            <Typography sx={{ margin: 0 }}>{month}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}

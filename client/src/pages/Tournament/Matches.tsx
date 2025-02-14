import { MatchList } from '@/components/tournament/MatchList'
import { useTournament } from '@/hooks/useTournament'
import { Match } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import tournamentService from '@/services/tournament'
import { getDateList } from '@/utils'

export function Matches() {
  const { tournament } = useTournament()
  if (!tournament) return null

  const [matches, setMatches] = useState<Match[]>([])
  const [date, setDate] = useState<Date>(new Date(tournament.startDate))
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      const matchRes = await tournamentService.getMatches(tournament!.code, date)
      setMatches(matchRes)
      setLoading(false)
    }

    if (tournament) {
      fetchMatches()
    }
  }, [date])

  const memoizedMatches = useMemo(() => matches, [matches])

  if (loading) return <Box>Loading...</Box>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
      <DateSelector
        startDate={new Date(tournament.startDate)}
        endDate={new Date(tournament.endDate)}
        onSelect={setDate}
      />
      <MatchList matches={memoizedMatches} />
    </Box>
  )
}

type DateSelectorProps = {
  startDate: Date
  endDate: Date
  onSelect: (date: Date) => void
}

function DateSelector({ startDate, endDate, onSelect }: DateSelectorProps) {
  const dates = getDateList(startDate, endDate)

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'row', gap: 1, justifyContent: 'center' }}
    >
      {dates.map((date) => {
        const [weekDay, month, day] = date.toDateString().split(' ')

        return (
          <Box
            sx={{
              backgroundColor: 'whitesmoke',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '5px 20px',
              borderRadius: '5px',
              '&:hover': {
                backgroundColor: 'lightgray',
              },
            }}
            key={date.toISOString()}
            onClick={() => onSelect(date)}
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

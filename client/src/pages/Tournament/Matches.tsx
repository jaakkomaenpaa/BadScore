import { MatchList } from '@/components/tournament/matches/MatchList'
import { Box, Typography } from '@mui/material'
import { addDays, formatDateToApi, getDateList } from '@/utils/dates'
import { LoadingCircle } from '@/components/LoadingCircle'
import { useMatchData } from '@/hooks/tournament/useMatchData'

export function Matches() {
  const { matches, loading, date, handleSelectDate, tournament } = useMatchData()

  if (!tournament || !date) {
    return <LoadingCircle />
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <DateSelector
        startDate={new Date(tournament.startDate)}
        endDate={new Date(tournament.endDate)}
        onSelect={handleSelectDate}
        selectedDate={date}
      />
      {loading ? <LoadingCircle /> : <MatchList matches={matches} />}
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

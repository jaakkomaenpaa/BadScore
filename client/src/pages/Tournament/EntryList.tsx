import { LoadingCircle } from '@/components/LoadingCircle'
import { StageList } from '@/components/tournament/entryList/PlayerList'
import { useEntryList } from '@/hooks/tournament/useEntryList'
import { Event } from '@/types/entryList'
import { Box, MenuItem, Select, Typography } from '@mui/material'

export function EntryList() {
  const { events, players, eventStages, selectedEvent, handleSelectEvent } =
    useEntryList()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, paddingTop: 2 }}>
      <EventSelect
        events={events}
        selectedEvent={selectedEvent}
        onSelect={handleSelectEvent}
      />
      {!players ? (
        <LoadingCircle />
      ) : (
        <StageList players={players} eventStages={eventStages} />
      )}
    </Box>
  )
}

type EventSelectProps = {
  events: Event[]
  selectedEvent: string
  onSelect: (eventId: string) => void
}

function EventSelect({ events, selectedEvent, onSelect }: EventSelectProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
      }}
    >
      <Typography>Event:</Typography>
      <Select
        sx={{ width: '100px' }}
        labelId='event-label'
        id='event-select'
        value={selectedEvent}
        onChange={(e) => onSelect(e.target.value)}
      >
        {events.map((event) => (
          <MenuItem key={event.value} value={event.value}>
            {event.text}
          </MenuItem>
        ))}
      </Select>
    </Box>
  )
}

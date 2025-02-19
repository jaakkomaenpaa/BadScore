import { Event, EventStage, PlayerStageResponse } from '@/types/entryList'
import { useCallback, useEffect, useState } from 'react'
import { useTournament } from './useTournament'
import tournamentService from '@/services/tournament'
import { useSearchParams } from 'react-router'

export const useEntryList = () => {
  const { tournament } = useTournament()
  const [searchParams, setSearchParams] = useSearchParams()

  const [events, setEvents] = useState<Event[]>([{ value: '1', text: 'MS' }])
  const [loading, setLoading] = useState<boolean>(true)
  const [players, setPlayers] = useState<PlayerStageResponse | null>(null)
  const [eventStages, setEventStages] = useState<EventStage[]>([])

  const eventParam = searchParams.get('event')
  const defaultEvent = eventParam ?? '1' // Default MS
  const [selectedEvent, setSelectedEvent] = useState<string>(defaultEvent)

  // Fetch available events
  useEffect(() => {
    if (!tournament) return

    const fetchEvents = async () => {
      setLoading(true)
      try {
        const eventRes = await tournamentService.getEvents(tournament.id)
        setEvents(eventRes)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [tournament])

  // Fetch event stages and player data
  useEffect(() => {
    if (!tournament) return

    const fetchPlayers = async () => {
      setLoading(true)
      try {
        const eventStageRes = await tournamentService.getEventStages(
          tournament.id,
          selectedEvent
        )
        const playersRes = await tournamentService.getPlayersStaged(
          tournament.id,
          selectedEvent
        )
        setEventStages(eventStageRes)
        setPlayers(playersRes)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPlayers()
  }, [tournament, selectedEvent])

  const handleSelectEvent = useCallback(
    (event: string) => {
      setSelectedEvent(event)
      setSearchParams({ event })
    },
    [setSearchParams]
  )

  return { events, players, eventStages, selectedEvent, handleSelectEvent, loading }
}

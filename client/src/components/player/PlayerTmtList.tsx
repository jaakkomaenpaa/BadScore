import {
  PlayerTournament,
  PlayerTournamentMatch,
  PlayerTournamentMatchesResponse,
} from '@/types/player'
import { Box } from '@mui/material'
import playerService from '@/services/player'
import { useEffect, useState } from 'react'
import { usePlayer } from '@/hooks/player/usePlayer'
import { LoadingCircle } from '../LoadingCircle'
import { PlayerMatch } from './PlayerMatch'
import { TournamentHeader } from './TournamentHeader'

type PlayerTmtListProps = {
  tournaments: PlayerTournament[]
}

export function PlayerTmtList({ tournaments }: PlayerTmtListProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        width: '100%',
        maxWidth: 1200,
        alignSelf: 'center',
      }}
    >
      {tournaments.map((tournament) => (
        <TournamentItem key={tournament.tournament_id} tournament={tournament} />
      ))}
    </Box>
  )
}

type TournamentProps = {
  tournament: PlayerTournament
}

export function TournamentItem({ tournament }: TournamentProps) {
  const { player } = usePlayer()
  const [loading, setLoading] = useState<boolean>(true)
  const [matches, setMatches] = useState<PlayerTournamentMatchesResponse | null>(null)

  const eventIds = tournament.draws.map((draw) => draw.event_id)

  useEffect(() => {
    if (!player) return

    const fetchMatches = async () => {
      setLoading(true)

      try {
        const matchRes = await playerService.getTournamentMatches(
          player.id,
          tournament.tournament_id,
          eventIds,
          tournament.tournament_model.type_id
        )

        setMatches(matchRes)
      } catch (error) {
        console.error(
          'Error fetching matches:',
          tournament.tournament_model.name,
          error
        )
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  if (loading) return <LoadingCircle />
  if (!matches) return null

  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: 2,
      }}
    >
      <TournamentHeader tournament={tournament} />
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {eventIds.map((eventId) => {
          if (!matches[eventId]) {
            console.log('event', tournament.tournament_model.name, eventId, matches)
          }

          return <EventMatches key={eventId} event={matches[eventId]} />
        })}
      </Box>
    </Box>
  )
}

type EventMatchesProps = {
  event: {
    [drawId: number]: PlayerTournamentMatch[] | Record<number, PlayerTournamentMatch>
  }
}

function EventMatches({ event }: EventMatchesProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {Object.keys(event).map((drawId) => {
        const matches = event[Number(drawId)]

        if (Array.isArray(matches)) {
          return (
            <Box key={drawId}>
              {matches.map((match) => (
                <PlayerMatch key={match.code} match={match} />
              ))}
            </Box>
          )
        } else {
          return (
            <Box key={drawId}>
              {Object.keys(matches).map((stageId) => {
                const match = matches[Number(stageId)]
                return <PlayerMatch key={match.code} match={match} />
              })}
            </Box>
          )
        }
      })}
    </Box>
  )
}

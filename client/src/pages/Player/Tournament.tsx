import { PlayerTournament } from '@/types/player'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import playerService from '@/services/player'
import { LoadingCircle } from '@/components/LoadingCircle'
import { Typography } from '@mui/material'
import { TournamentItem } from '@/components/player/PlayerTmtList'

export function Tournament() {
  const { playerId, tournamentId } = useParams()
  const numericPlayerId = playerId ? parseInt(playerId) : null
  const numericTournamentId = tournamentId ? parseInt(tournamentId) : null

  const [tournament, setTournament] = useState<PlayerTournament | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (
      !numericPlayerId ||
      isNaN(numericPlayerId) ||
      !numericTournamentId ||
      isNaN(numericTournamentId)
    ) {
      return
    }

    const fetchTournament = async () => {
      setLoading(true)

      const tournamentRes = await playerService.getTournamentById(
        numericPlayerId,
        numericTournamentId
      )

      setTournament(tournamentRes)
      setLoading(false)
    }

    fetchTournament()
  }, [])

  if (loading) return <LoadingCircle />
  if (!tournament) return <Typography>No tournament data available</Typography>

  return <TournamentItem tournament={tournament} />
}

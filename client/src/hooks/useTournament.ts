import { TournamentPreview } from '@/types/tournament'
import { useEffect, useState } from 'react'
import tournamentService from '@/services/tournament'

export const useTournament = (tournamentId: number | null) => {
  const [tournament, setTournament] = useState<TournamentPreview | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!tournamentId) return

    const fetchTournament = async () => {
      try {
        const tournamentRes = await tournamentService.getById(tournamentId)
        setTournament(tournamentRes)
      } catch (err) {
        setError('Failed to load tournament')
      }
    }

    fetchTournament()
  }, [tournamentId])

  return { tournament, error }
}

import { TournamentPreview } from '@/types/tournament'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useParams } from 'react-router'
import tournamentService from '@/services/tournament'

type TournamentContextType = {
  tournament: TournamentPreview | null
  error: string
  loading: boolean
}

const defaultContextValue = {
  tournament: null,
  error: '',
  loading: true,
}

export const TournamentContext =
  createContext<TournamentContextType>(defaultContextValue)

export const TournamentProvider = ({ children }: { children: ReactNode }) => {
  const { tournamentId } = useParams()
  const numericTournamentId = tournamentId ? Number(tournamentId) : null

  const [tournament, setTournament] = useState<TournamentPreview | null>(
    defaultContextValue.tournament
  )
  const [error, setError] = useState<string>(defaultContextValue.error)
  const [loading, setLoading] = useState<boolean>(defaultContextValue.loading)

  useEffect(() => {
    if (!numericTournamentId) return

    const fetchTournament = async () => {
      try {
        setLoading(true)
        const tournamentRes = await tournamentService.getById(numericTournamentId)
        setTournament(tournamentRes)
      } catch (err) {
        setError('Failed to load tournament')
      } finally {
        setLoading(false)
      }
    }

    fetchTournament()
  }, [numericTournamentId])

  return (
    <TournamentContext.Provider value={{ tournament, error, loading }}>
      {children}
    </TournamentContext.Provider>
  )
}

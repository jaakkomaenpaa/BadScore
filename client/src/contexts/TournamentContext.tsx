import { TournamentPreview } from '@/types/tournament'
import { createContext, useState, useEffect, ReactNode } from 'react'
import { useParams } from 'react-router'
import tournamentService from '@/services/tournament'

type TournamentContextType = {
  tournament: TournamentPreview | null
  error: string
  loading: boolean
}

export const TournamentContext = createContext<TournamentContextType>({
  tournament: null,
  error: '',
  loading: true,
})

export const TournamentProvider = ({ children }: { children: ReactNode }) => {
  const { tournamentId } = useParams()
  const numericTournamentId = tournamentId ? parseInt(tournamentId) : null

  const [tournament, setTournament] = useState<TournamentPreview | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!numericTournamentId || isNaN(numericTournamentId)) return

    const fetchTournament = async () => {
      setLoading(true)
      setError('')

      try {
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

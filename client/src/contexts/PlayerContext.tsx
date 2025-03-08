import { createContext, ReactNode, useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router'
import { Player, PlayerTournament } from '@/types/player'
import playerService from '@/services/player'

type PlayerContextType = {
  player: Player | null
  tournaments: PlayerTournament[]
  tournamentYears: number[]
  currentYear: number
  handleYearChange: (year: number) => void
  error: string
  loading: boolean
}

export const PlayerContext = createContext<PlayerContextType>({
  player: null,
  tournaments: [],
  tournamentYears: [],
  currentYear: new Date().getFullYear(),
  handleYearChange: () => {},
  error: '',
  loading: true,
})

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const { playerId } = useParams()
  const numericPlayerId = playerId ? parseInt(playerId) : null

  const [searchParams, setSearchParams] = useSearchParams()

  const [player, setPlayer] = useState<Player | null>(null)
  const [tournaments, setTournaments] = useState<PlayerTournament[]>([])
  const [tournamentYears, setTournamentYears] = useState<number[]>([])

  const yearParam = searchParams.get('year')
  const defaultYear = yearParam ? parseInt(yearParam) : new Date().getFullYear()
  const [currentYear, setCurrentYear] = useState<number>(defaultYear)

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!numericPlayerId || isNaN(numericPlayerId)) return

    const fetchPlayer = async () => {
      setLoading(true)
      setError('')

      try {
        const [playerRes, tmtYearsRes] = await Promise.all([
          playerService.getById(numericPlayerId),
          playerService.getTournamentYears(numericPlayerId),
        ])

        const initialYear =
          tmtYearsRes.length > 0 && !yearParam ? tmtYearsRes[0] : defaultYear
        handleYearChange(initialYear)

        setPlayer(playerRes)
        setTournamentYears(tmtYearsRes)
      } catch (err) {
        setError('Failed to load player')
      } finally {
        setLoading(false)
      }
    }

    fetchPlayer()
  }, [numericPlayerId])

  const handleYearChange = async (year: number) => {
    if (!numericPlayerId || isNaN(numericPlayerId)) return

    setSearchParams({ year: year.toString() })
    setCurrentYear(year)

    const tournamentsRes = await playerService.getTournaments(numericPlayerId, year)
    setTournaments(tournamentsRes)
  }

  return (
    <PlayerContext.Provider
      value={{
        player,
        tournaments,
        tournamentYears,
        currentYear,
        handleYearChange,
        error,
        loading,
      }}
    >
      {children}
    </PlayerContext.Provider>
  )
}

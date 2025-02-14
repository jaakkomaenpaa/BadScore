import { useContext } from 'react'
import { TournamentContext } from '@/contexts/TournamentContext'

export const useTournament = () => useContext(TournamentContext)

import { useEffect, useState } from 'react'
import { useTournament } from './useTournament'
import { BracketResponse, Draw } from '@/types/draw'
import tournamentService from '@/services/tournament'
import { useParams } from 'react-router'

export const useDrawData = () => {
  const { tournament } = useTournament()
  const { drawId } = useParams()

  const [draws, setDraws] = useState<Draw[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [bracket, setBracket] = useState<BracketResponse | null>(null)

  useEffect(() => {
    if (!tournament) return

    const fetchDraws = async () => {
      setLoading(true)
      try {
        const eventRes = await tournamentService.getDraws(tournament.id)
        setDraws(eventRes)
      } finally {
        setLoading(false)
      }
    }

    fetchDraws()
  }, [tournament])

  useEffect(() => {
    if (!drawId || !tournament) return

    const fetchBracket = async () => {
      setLoading(true)
      try {
        const bracketRes = await tournamentService.getBracket(tournament.id, drawId)
        setBracket(bracketRes)
      } finally {
        setLoading(false)
      }
    }

    fetchBracket()
  }, [tournament, drawId])

  return { draws, bracket, loading }
}

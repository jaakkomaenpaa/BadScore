import { useEffect, useState } from 'react'
import { useTournament } from './useTournament'
import { BracketResponse, Draw } from '@/types/draw'
import tournamentService from '@/services/tournament'
import { useParams } from 'react-router'

const SINGLES_CELL_HEIGHT = 24
const DOUBLES_CELL_HEIGHT = 48

export const useDrawData = () => {
  const { tournament } = useTournament()
  const { drawId } = useParams()

  const [draws, setDraws] = useState<Draw[]>([])
  const [bracket, setBracket] = useState<BracketResponse | null>(null)
  const [drawsLoading, setDrawsLoading] = useState<boolean>(true)
  const [bracketLoading, setBracketLoading] = useState<boolean>(true)
  const [cellHeight, setCellHeight] = useState<number>(SINGLES_CELL_HEIGHT)

  useEffect(() => {
    if (!tournament) return

    const fetchDraws = async () => {
      setDrawsLoading(true)
      try {
        const drawRes = await tournamentService.getDraws(tournament.id)
        setDraws(drawRes)
      } finally {
        setDrawsLoading(false)
      }
    }

    fetchDraws()
  }, [tournament])

  useEffect(() => {
    if (!drawId || !tournament || bracket) return

    const fetchBracket = async () => {
      setBracketLoading(true)
      try {
        const bracketRes = await tournamentService.getBracket(tournament.id, drawId)

        const isSingles = bracketRes.rounds[0][0].match.team1.players.length === 1
        const cellHeight = isSingles ? SINGLES_CELL_HEIGHT : DOUBLES_CELL_HEIGHT

        console.log('bracketRes', bracketRes)
        setCellHeight(cellHeight)
        setBracket(bracketRes)
      } finally {
        setBracketLoading(false)
      }
    }

    fetchBracket()
  }, [tournament, drawId])

  return { draws, bracket, cellHeight, drawsLoading, bracketLoading }
}

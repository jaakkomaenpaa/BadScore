import { useEffect, useMemo, useState } from 'react'
import { useDrawData } from './useDrawData'

const SINGLES_CELL_HEIGHT = 24
const DOUBLES_CELL_HEIGHT = 48

export const useBracketDims = () => {
  const { bracket } = useDrawData()

  return useMemo(() => {
    if (!bracket)
      return {
        cellHeight: SINGLES_CELL_HEIGHT,
      }

    const isSingles = true // bracket.rounds[0][0].match.team1.players.length === 1
    const cellHeight = isSingles ? SINGLES_CELL_HEIGHT : DOUBLES_CELL_HEIGHT

    return { cellHeight }
  }, [bracket])
}

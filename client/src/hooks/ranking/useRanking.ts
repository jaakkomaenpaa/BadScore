import { RankingContext } from '@/contexts/RankingContext'
import { useContext } from 'react'

export const useRanking = () => useContext(RankingContext)

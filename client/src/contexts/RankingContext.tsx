import { Ranking, RankingData } from '@/types/ranking'
import { createContext, ReactNode, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import rankingService from '@/services/ranking'

type RankingContextType = {
  ranking: Ranking | null
  rankingData: RankingData | null
  error: string
  loading: boolean
}

export const RankingContext = createContext<RankingContextType>({
  ranking: null,
  rankingData: null,
  error: '',
  loading: true,
})

export const RankingProvider = ({ children }: { children: ReactNode }) => {
  const { rankingId } = useParams()
  const numericRankingId = rankingId ? parseInt(rankingId) : null

  const [ranking, setRanking] = useState<Ranking | null>(null)
  const [rankingData, setRankingData] = useState<RankingData | null>(null)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!numericRankingId || isNaN(numericRankingId)) return

    const fetchRanking = async () => {
      setLoading(true)
      setError('')

      try {
        const [rankingRes, rankingDataRes] = await Promise.all([
          rankingService.getById(numericRankingId),
          rankingService.getData(numericRankingId),
        ])
        setRanking(rankingRes)
        setRankingData(rankingDataRes)
      } catch (err) {
        setError('Failed to load ranking')
      } finally {
        setLoading(false)
      }
    }

    fetchRanking()
  }, [numericRankingId])

  return (
    <RankingContext.Provider value={{ ranking, rankingData, error, loading }}>
      {children}
    </RankingContext.Provider>
  )
}

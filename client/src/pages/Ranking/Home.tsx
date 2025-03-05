import { useRanking } from '@/hooks/ranking/useRanking'
import {
  Ranking,
  RankingCategory,
  RankingSearch,
  RankingSearchResponse,
} from '@/types/ranking'
import { useEffect, useState } from 'react'
import rankingService from '@/services/ranking'
import { Box, Typography } from '@mui/material'
import { LoadingCircle } from '@/components/LoadingCircle'
import { NavLink, useSearchParams } from 'react-router'
import { RankingTable } from '@/components/ranking/RankingTable'

type RankingInfo = RankingSearchResponse & RankingCategory & { categoryId: number }

export function Home() {
  const { ranking, weeks } = useRanking()
  const [rankingTables, setRankingTables] = useState<Map<number, RankingInfo>>(
    new Map()
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [searchParams] = useSearchParams()

  const weekParam = searchParams.get('week') ?? weeks[0].id.toString()
  const weekId = parseInt(weekParam)

  useEffect(() => {
    if (!ranking) return

    const fetchRankingData = async () => {
      setLoading(true)
      try {
        const tablesMap = new Map(rankingTables)

        const results = await Promise.all(
          ranking.categories.map(async (category: RankingCategory) => {
            const search: RankingSearch = {
              rankingId: ranking.id,
              categoryId: category.id,
              weekId: weekId,
              isDoubles: category.isDoubles,
            }

            const rankingRes: RankingSearchResponse = await rankingService.getTable(
              search
            )
            return { ...rankingRes, ...category, categoryId: category.id }
          })
        )

        results.forEach((table) => tablesMap.set(table.id, table))

        setRankingTables(tablesMap)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRankingData()
  }, [ranking, weekId])

  if (loading) return <LoadingCircle />
  if (!ranking) return <Typography>Error loading ranking</Typography>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
      }}
    >
      {[...rankingTables.values()].map((table: RankingInfo) => (
        <RankingOverview key={table.categoryId} tableInfo={table} ranking={ranking} />
      ))}
    </Box>
  )
}

type RankingOverviewProps = {
  tableInfo: RankingInfo
  ranking: Ranking
}

function RankingOverview({ tableInfo, ranking }: RankingOverviewProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: '0px 10px',
        }}
      >
        <NavLink
          to={`../category/${tableInfo.categoryId}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            sx={{
              color: 'text.primary',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {tableInfo.name}
          </Typography>
        </NavLink>

        <NavLink
          to={`../category/${tableInfo.categoryId}`}
          style={{ textDecoration: 'none' }}
        >
          <Typography
            sx={{
              color: 'text.primary',
              textDecoration: 'underline',
            }}
          >
            More
          </Typography>
        </NavLink>
      </Box>

      <RankingTable entries={tableInfo.entries} ranking={ranking} loading={false} />
    </Box>
  )
}

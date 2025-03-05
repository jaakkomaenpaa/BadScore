import { useRanking } from '@/hooks/ranking/useRanking'
import { useEffect, useState, useTransition } from 'react'
import { useParams, useSearchParams } from 'react-router'
import rankingService from '@/services/ranking'
import {
  PlayerRankingEntry,
  RankingCategory,
  RankingSearch,
  RankingSearchResponse,
  TeamRankingEntry,
} from '@/types/ranking'
import { LoadingCircle } from '@/components/LoadingCircle'
import {
  Box,
  MenuItem,
  Pagination,
  Select,
  Typography,
  useTheme,
} from '@mui/material'
import { RankingTable } from '@/components/ranking/RankingTable'

export function CategoryView() {
  const { categoryId } = useParams()
  const { ranking, weeks } = useRanking()
  const [searchParams, setSearchParams] = useSearchParams()

  const [entries, setEntries] = useState<PlayerRankingEntry[] | TeamRankingEntry[]>(
    []
  )
  const [loading, setLoading] = useState<boolean>(true)
  const [category, setCategory] = useState<RankingCategory | null>(null)

  const weekParam = searchParams.get('week') ?? weeks[0].id.toString()
  const weekId = parseInt(weekParam)

  const pageParam = searchParams.get('page') ?? '1'
  const defaultPage = parseInt(pageParam)
  const [page, setPage] = useState<number>(defaultPage)

  const perPageParam = searchParams.get('perPage') ?? '25'
  const defaultPerPage = parseInt(perPageParam)
  const [perPage, setPerPage] = useState<number>(defaultPerPage)

  const [lastPage, setLastPage] = useState<number>(1)
  const [_, startTransition] = useTransition()

  // Fetch table data
  useEffect(() => {
    if (!categoryId || !ranking) return

    const categoryIdNum = parseInt(categoryId)
    if (isNaN(categoryIdNum)) return

    const fetchTable = async () => {
      setLoading(true)
      try {
        const selectedCategory = ranking.categories.find(
          (c) => c.id === categoryIdNum
        )

        setCategory(selectedCategory ?? null)

        const search: RankingSearch = {
          rankingId: ranking.id,
          categoryId: categoryIdNum,
          weekId: weekId,
          isDoubles: selectedCategory?.isDoubles,
          page: page,
          perPage: perPage,
        }

        const tableRes: RankingSearchResponse = await rankingService.getTable(search)

        setEntries(tableRes.entries)
        setLastPage(tableRes.lastPage)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTable()
  }, [categoryId, ranking, page, perPage])

  const handlePageChange = (page: number) => {
    setPage(page)
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.set('page', page.toString())
      return newParams
    })
  }

  const handlePerPageChange = (perPage: number) => {
    startTransition(() => {
      setPerPage(perPage)
      setPage(1)

      setSearchParams((prevParams) => {
        const newParams = new URLSearchParams(prevParams)
        newParams.set('perPage', perPage.toString())
        newParams.set('page', '1')
        return newParams
      })
    })
  }

  if (loading) return <LoadingCircle />
  if (!category || !ranking) return <Typography>Category not found</Typography>

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Typography sx={{ color: 'text.primary' }}>{category.name}</Typography>
      <RankingTable entries={entries} ranking={ranking} loading={loading} />
      <PaginationField
        lastPage={lastPage}
        currentPage={page}
        currentPerPage={perPage}
        handlePageChange={handlePageChange}
        handlePerPageChange={handlePerPageChange}
        disabled={loading}
      />
    </Box>
  )
}

type PaginationFieldProps = {
  lastPage: number
  currentPage: number
  currentPerPage: number
  disabled?: boolean
  handlePageChange: (page: number) => void
  handlePerPageChange: (perPage: number) => void
}

function PaginationField({
  lastPage,
  currentPage,
  currentPerPage,
  handlePageChange,
  handlePerPageChange,
  disabled,
}: PaginationFieldProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 1,
        flexWrap: 'wrap',
        position: 'relative',
        width: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
          alignItems: 'center',
          alignSelf: 'flex-end',
          [theme.breakpoints.down('sm')]: {
            position: 'relative',
          },
        }}
      >
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          Per page:{' '}
        </Typography>
        <Select
          sx={{ height: 30 }}
          id='perpage-select'
          value={currentPerPage}
          onChange={(e) => handlePerPageChange(Number(e.target.value))}
          disabled={disabled}
        >
          {[10, 25, 50, 100].map((value: number) => (
            <MenuItem key={value} value={value}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Pagination
        count={lastPage}
        color='primary'
        shape='rounded'
        page={currentPage}
        onChange={(_, page) => handlePageChange(page)}
      />
    </Box>
  )
}

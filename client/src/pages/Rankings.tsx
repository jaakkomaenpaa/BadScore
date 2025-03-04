import { Ranking } from '@/types/ranking'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import rankingService from '@/services/ranking'
import { LoadingCircle } from '@/components/LoadingCircle'
import { NavLink } from 'react-router'

function RankingsPage() {
  const [rankings, setRankings] = useState<Ranking[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchRankings = async () => {
      setLoading(true)

      const rankingRes = await rankingService.getAll()
      setRankings(rankingRes)

      setLoading(false)
    }

    fetchRankings()
  }, [])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 2 }}>
      <Typography variant='h4' sx={{ color: 'text.primary' }}>
        Rankings
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {loading ? (
          <LoadingCircle />
        ) : (
          rankings.map((ranking) => (
            <NavLink
              key={ranking.id}
              style={{ textDecoration: 'none' }}
              to={`${ranking.id}`}
            >
              <Typography
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {ranking.name2}
              </Typography>
            </NavLink>
          ))
        )}
      </Box>
    </Box>
  )
}

export default RankingsPage

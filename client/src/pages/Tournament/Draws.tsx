import { LoadingCircle } from '@/components/LoadingCircle'
import { useDrawData } from '@/hooks/tournament/useDrawData'
import { Draw } from '@/types/draw'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router'

export function Draws() {
  const { draws, loading } = useDrawData()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        paddingTop: 2,
      }}
    >
      {loading ? <LoadingCircle /> : <DrawList draws={draws} />}
    </Box>
  )
}

type DrawListProps = {
  draws: Draw[]
}

function DrawList({ draws }: DrawListProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      {draws.map((draw) => (
        <NavLink
          key={draw.value}
          style={{ textDecoration: 'none' }}
          to={`${draw.value}`}
        >
          <Typography
            sx={{
              color: 'white',

              '&:hover': {
                color: 'black',
                textDecoration: 'underline',
              },
            }}
          >
            {draw.name}
          </Typography>
        </NavLink>
      ))}
    </Box>
  )
}

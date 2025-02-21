import { LoadingCircle } from '@/components/LoadingCircle'
import { useBracket } from '@/hooks/tournament/useBracket'
import { Draw } from '@/types/draw'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router'

export function Draws() {
  const { draws, drawsLoading } = useBracket()

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
      {drawsLoading ? <LoadingCircle /> : <DrawList draws={draws} />}
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

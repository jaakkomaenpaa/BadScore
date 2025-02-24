import { Draw } from '@/types/draw'
import { Box, Typography } from '@mui/material'
import { NavLink } from 'react-router'

type DrawListProps = {
  draws: Draw[]
  orientation?: 'x' | 'y'
  defaultColor?: string
}

export function DrawList({
  draws,
  orientation,
  defaultColor = 'text.primary',
}: DrawListProps) {
  if (!draws || draws.length === 0) {
    return (
      <Typography variant='body1' sx={{ color: 'text.primary' }}>
        No draws available
      </Typography>
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: orientation === 'x' ? 'row' : 'column',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      {draws.map((draw: Draw, index: number) => (
        <Box sx={{ display: 'flex', flexDirection: 'row' }} key={draw.value}>
          <NavLink style={{ textDecoration: 'none' }} to={'../draws/' + draw.value}>
            {({ isActive }) => (
              <Typography
                sx={{
                  color: isActive ? 'text.primary' : defaultColor,

                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {draw.name}
              </Typography>
            )}
          </NavLink>
          {orientation === 'x' && index !== draws.length - 1 && (
            <Typography sx={{ color: 'text.primary' }}>,</Typography>
          )}
        </Box>
      ))}
    </Box>
  )
}

import { Select } from '@/components/Select'
import { Draw } from '@/types/draw'
import { Box, Typography } from '@mui/material'
import { NavLink, useNavigate, useParams } from 'react-router'

type DrawListProps = {
  draws: Draw[]
  defaultColor?: string
  type?: 'row' | 'column' | 'select'
}

export function DrawList({
  draws,
  defaultColor = 'text.primary',
  type = 'column',
}: DrawListProps) {
  const navigate = useNavigate()
  const { drawId } = useParams()

  if (!draws || draws.length === 0) {
    return (
      <Typography variant='body1' sx={{ color: 'text.primary' }}>
        No draws available
      </Typography>
    )
  }

  if (type === 'select') {
    return (
      <Select
        options={draws.map((draw: Draw) => ({
          label: draw.name,
          value: draw,
        }))}
        value={draws.find((draw: Draw) => drawId === draw.value) ?? draws[0]}
        onChange={(draw: Draw) => navigate('../draws/' + draw.value)}
        label='Draw'
      />
    )
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: type === 'row' ? 'row' : 'column',
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
          {type === 'row' && index !== draws.length - 1 && (
            <Typography sx={{ color: 'text.primary' }}>,</Typography>
          )}
        </Box>
      ))}
    </Box>
  )
}

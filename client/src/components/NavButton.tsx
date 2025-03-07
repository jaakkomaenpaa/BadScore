import { Box, Typography, useTheme } from '@mui/material'
import { NavLink, To } from 'react-router'

type NavButtonProps = {
  to: To
  label: string
}

export function NavButton({ to, label }: NavButtonProps) {
  const theme = useTheme()

  return (
    <NavLink style={{ textDecoration: 'none' }} to={to}>
      {({ isActive }) => (
        <Box
          sx={{
            color: isActive ? 'white' : 'black',
            backgroundColor: isActive ? 'black' : 'whitesmoke',
            padding: '8px 16px',
            textDecoration: 'none',
            borderRadius: 1,
            transition: 'all 0.1s ease',
            textWrap: 'nowrap',
            '&:hover': {
              opacity: 0.8,
              backgroundColor: isActive ? 'black' : 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Typography sx={{ [theme.breakpoints.down('sm')]: { fontSize: 10 } }}>
            {label}
          </Typography>
        </Box>
      )}
    </NavLink>
  )
}

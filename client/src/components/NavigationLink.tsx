import { SxProps, Theme, Typography, TypographyOwnProps } from '@mui/material'
import { NavLink, To } from 'react-router'

type NavigationLinkProps = {
  to: To
  children: string
  sx?: SxProps<Theme>
  variant?: TypographyOwnProps['variant']
}

export function NavigationLink({ to, children, sx, variant }: NavigationLinkProps) {
  return (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
      <Typography
        variant={variant ?? 'body1'}
        sx={{
          color: 'text.primary',
          '&:hover': {
            textDecoration: 'underline',
          },
          ...sx,
        }}
      >
        {children}
      </Typography>
    </NavLink>
  )
}

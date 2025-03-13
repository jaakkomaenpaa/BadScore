import { SxProps, Theme, Typography, TypographyOwnProps } from '@mui/material'
import { ReactNode } from 'react'
import { NavLink, To } from 'react-router'

type NavigationLinkProps = {
  to: To
  children: ReactNode
  sx?: SxProps<Theme>
  variant?: TypographyOwnProps['variant']
  onClick?: () => void
}

export function NavigationLink({
  to,
  children,
  sx,
  variant,
  onClick,
}: NavigationLinkProps) {
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
        onClick={onClick}
      >
        {children}
      </Typography>
    </NavLink>
  )
}

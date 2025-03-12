import { Box, SxProps, Theme } from '@mui/material'
import { ReactNode } from 'react'

type ButtonType = 'primary' | 'secondary' | 'error' | 'success'

type SecondaryButtonProps = {
  onClick: (props: any) => void
  children: ReactNode
  isActive?: boolean
  type?: ButtonType
  sx?: SxProps<Theme>
}

export function SecondaryButton({
  children,
  onClick,
  isActive = false,
  type = 'secondary',
  sx,
}: SecondaryButtonProps) {
  const colors = {
    textColor: {
      ['primary']: 'primary.main',
      ['secondary']: 'secondary.main',
      ['success']: 'success.main',
      ['error']: 'error.main',
    },
    borderColor: {
      ['primary']: 'primary.main',
      ['secondary']: 'secondary.main',
      ['success']: 'success.main',
      ['error']: 'error.main',
    },
  }

  return (
    <Box
      sx={{
        width: 120,
        height: 40,
        backgroundColor: isActive ? colors.textColor[type] : 'inherit',
        color: isActive ? 'inherit' : colors.textColor[type],
        border: '1px solid',
        borderColor: colors.borderColor[type],
        borderRadius: 1,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textWrap: 'wrap',
        textAlign: 'center',
        transition: 'all 0.1s ease',
        '&:hover': {
          opacity: 0.8,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  )
}

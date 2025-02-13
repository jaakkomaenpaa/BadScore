import { Box, SxProps, Theme, Typography } from '@mui/material'

type ButtonType = 'primary' | 'secondary' | 'error' | 'success'

type SecondaryButtonProps = {
  label: string
  onClick: (props: any) => void
  isActive?: boolean
  type?: ButtonType
  sx?: SxProps<Theme>
}

export function SecondaryButton({
  label,
  onClick,
  isActive = false,
  type = 'primary',
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
        transition: 'all 0.1s ease',
        '&:hover': {
          opacity: 0.8,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <Typography variant='body2'>{label}</Typography>
    </Box>
  )
}

import { Box, CircularProgress } from '@mui/material'

export function LoadingCircle() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
      }}
    >
      <CircularProgress />
    </Box>
  )
}

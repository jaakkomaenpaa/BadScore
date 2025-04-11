import { LoadingCircle } from '@/components/LoadingCircle'
import { DrawList } from '@/components/tournament/draws/DrawList'
import { useBracket } from '@/hooks/tournament/useBracket'
import { Box } from '@mui/material'

export function Draws() {
  const { draws, drawsLoading } = useBracket()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      {drawsLoading ? <LoadingCircle /> : <DrawList draws={draws} type='column' />}
    </Box>
  )
}

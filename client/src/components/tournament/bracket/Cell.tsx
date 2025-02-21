import { useBracket } from '@/hooks/tournament/useBracket'
import { Box } from '@mui/material'

type CellProps = {
  borderRight?: boolean
}

export function Cell({ borderRight }: CellProps) {
  const { cellHeight } = useBracket()

  return (
    <Box
      sx={{
        height: cellHeight,
        ...(borderRight && {
          borderRight: '1px solid',
          borderColor: 'text.secondary',
        }),
      }}
    />
  )
}

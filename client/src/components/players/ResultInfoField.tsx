import { Box, Typography } from '@mui/material'

type ResultInfoFieldProps = {
  entriesTotal: number
  entriesFrom: number
  entriesTo: number
}

export function ResultInfoField({
  entriesTotal,
  entriesFrom,
  entriesTo,
}: ResultInfoFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        Total results: {entriesTotal}
      </Typography>
      <Typography variant='body2' sx={{ color: 'text.secondary' }}>
        Showing {entriesFrom} to {entriesTo}
      </Typography>
    </Box>
  )
}

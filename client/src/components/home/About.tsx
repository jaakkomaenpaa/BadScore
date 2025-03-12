import { Box, styled, Typography } from '@mui/material'

const List = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  color: theme.palette.text.secondary,
}))

export function About() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
        gap: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Typography variant='h5' sx={{ color: 'text.primary' }}>
        About
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          padding: 2,
          textAlign: 'left',
          maxWidth: 400,
          color: 'text.primary',
          borderLeft: '1px solid',
          borderRight: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography variant='body1'>
          A website to view scores from official BWF tournaments.
        </Typography>

        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Note that this site is not affiliated with BWF in any way.
        </Typography>

        <Typography variant='body1'>Current features:</Typography>
        <List>
          <Typography variant='body1'>
            ✅ Tournament info, results, and brackets
          </Typography>
          <Typography variant='body1'>✅ Official rankings</Typography>
          <Typography variant='body1'>
            ✅ Player profiles and match history
          </Typography>
        </List>
        <Typography variant='body1'>Upcoming features:</Typography>
        <List>
          <Typography variant='body1'>
            ⏳ View for player matches in current tournament
          </Typography>
          <Typography variant='body1'>
            ⏳ View for player ranking points breakdown
          </Typography>
          <Typography variant='body1'>⏳ Overall robustness checking</Typography>
        </List>

        <Typography variant='body1'>
          If you encounter any issues, have suggestions, or any other need to contact
          the dev, you can send a message from the <em>contact</em> tab.
        </Typography>

        <Typography variant='body1' sx={{ color: 'text.secondary' }}>
          Finally, note that unfortunately some data (player statuses, seeds, etc) for
          the tournaments before 2025 is missing. This is probably caused by the BWF
          results being moved to the new platform.
        </Typography>
      </Box>
    </Box>
  )
}

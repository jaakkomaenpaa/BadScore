import { LoadingCircle } from '@/components/LoadingCircle'
import { QAField } from '@/components/player/QAField'
import { SocialsField } from '@/components/player/SocialsField'
import { usePlayer } from '@/hooks/player/usePlayer'
import { Player } from '@/types/player'
import { Box, Stack, Typography } from '@mui/material'

export function Home() {
  const { player, error, loading } = usePlayer()

  if (error) return <Typography color='error'>{error}</Typography>
  if (loading) return <LoadingCircle />
  if (!player) {
    return <Typography>No player data available</Typography>
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 800,
          width: '90%',
          alignSelf: 'center',
        }}
      >
        <SocialsField bioModel={player.bio_model} />
        <BasicInfo player={player} />
        <QAField bioModel={player.bio_model} />
      </Box>
    </Box>
  )
}

type BasicInfoProps = {
  player: Player
}

function BasicInfo({ player }: BasicInfoProps) {
  const dateOfBirth = new Date(player.date_of_birth).toDateString()
  const height = player.bio_model?.height
  const hand = player.bio_model?.plays
  const residence = player.bio_model?.current_residence
  const languages = player.bio_model?.languages

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'background.paper',
        padding: 2,
      }}
    >
      <Stack spacing={1}>
        <InfoRow label='Date of Birth' value={dateOfBirth} />
        <InfoRow
          label='Height'
          value={
            height && parseInt(height) !== 0
              ? `${parseInt(height).toFixed(0)} cm`
              : '-'
          }
        />
        <InfoRow
          label='Playing hand'
          value={hand === '1' ? 'R' : hand === '2' ? 'L' : '-'}
        />
        <InfoRow
          label='Residence'
          value={residence && residence !== '' ? residence : '-'}
        />
        <InfoRow
          label='Languages'
          value={languages && languages !== '' ? languages : '-'}
        />
      </Stack>
    </Box>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
      <Typography variant='subtitle2' color='text.secondary'>
        {label}
      </Typography>
      <Typography variant='body1' color='text.primary'>
        {value}
      </Typography>
    </Box>
  )
}

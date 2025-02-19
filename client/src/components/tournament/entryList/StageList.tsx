import {
  EntryStage,
  EventStage,
  PlayerEntry,
  PlayerStageResponse,
  RankingEntry,
  StageName,
} from '@/types/entryList'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

type StageListProps = {
  players: PlayerStageResponse
  eventStages: EventStage[]
}

export function StageList({ players, eventStages }: StageListProps) {
  return (
    <Box>
      {eventStages.map((stage) => {
        if (stage.value === 0) return null

        return <StagePlayers key={stage.value} stage={players[stage.value]} />
      })}
    </Box>
  )
}

type StagePlayersProps = {
  stage: EntryStage
}

function StagePlayers({ stage }: StagePlayersProps) {
  const stageColors: Record<StageName, { background: string; text: string }> = {
    [StageName.MainDraw]: {
      background: 'success.main',
      text: 'text.primary',
    },
    [StageName.Qualifying]: {
      background: 'neutral.main',
      text: 'neutralText',
    },
    [StageName.Reserve]: {
      background: 'warning.main',
      text: 'errorText',
    },
    [StageName.Withdrawn]: {
      background: 'error.main',
      text: 'errorText',
    },
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginBottom: 6,
      }}
    >
      <StageHeader stage={stage} />
      <TableContainer sx={{ backgroundColor: 'background.paper' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Country</TableCell>
              <TableCell align='right'>WR</TableCell>
              <TableCell align='right'>Total points</TableCell>
              {stage.has_notional_points && (
                <TableCell align='right'>Notional / protected points</TableCell>
              )}
              <TableCell align='right'>Tournaments</TableCell>
              <TableCell align='right'>Seed</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stage.entries.map((entry) => (
              <PlayerListItem
                key={entry.player1.id}
                entry={entry}
                hasNotionalPoints={stage.has_notional_points}
                color={stageColors[stage.name]}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

type PlayerListItemProps = {
  entry: RankingEntry
  hasNotionalPoints?: boolean
  color: { background: string; text: string }
}

function PlayerListItem({
  entry,
  color,
  hasNotionalPoints = false,
}: PlayerListItemProps) {
  return (
    <TableRow key={entry.player1.id}>
      <TableCell sx={{ backgroundColor: color.background, color: 'black' }}>
        {entry.position_name}
      </TableCell>
      <TableCell
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
        }}
      >
        <PlayerInfo player={entry.player1} />
        {entry.player2 && <PlayerInfo player={entry.player2} />}
      </TableCell>
      <TableCell sx={{ color: 'text.secondary' }}>
        {entry.player1.country.name}
      </TableCell>
      <TableCell align='right'>{entry.rank ?? '-'}</TableCell>
      <TableCell
        sx={{ color: entry.notional_points ? 'text.secondary' : 'white' }}
        align='right'
      >
        {entry.points ?? '-'}
      </TableCell>
      {hasNotionalPoints && (
        <TableCell align='right'>{entry.notional_points}</TableCell>
      )}
      <TableCell sx={{ color: 'text.secondary' }} align='right'>
        {entry.tournaments ?? '-'}{' '}
      </TableCell>
      <TableCell align='right'>{entry.seed}</TableCell>
    </TableRow>
  )
}

type PlayerInfoProps = {
  player: PlayerEntry
}

function PlayerInfo({ player }: PlayerInfoProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      <img
        src={player.country.url_svg}
        alt={player.country.name}
        style={{ height: 18 }}
      />
      <Typography variant='body2'>{player.name_display}</Typography>
    </Box>
  )
}

type StageHeaderProps = {
  stage: EntryStage
}

function StageHeader({ stage }: StageHeaderProps) {
  return (
    <Box sx={{ color: 'white', textAlign: 'center' }}>
      <Typography variant='h5'>{stage.name}</Typography>
      <Typography sx={{ color: 'text.secondary' }} variant='subtitle2'>
        {stage.entries_count} entries
      </Typography>
    </Box>
  )
}

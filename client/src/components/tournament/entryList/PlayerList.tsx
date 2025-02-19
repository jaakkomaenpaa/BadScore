import {
  EntryStage,
  EventStage,
  PlayerStageResponse,
  RankingEntry,
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
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        marginBottom: 2,
      }}
    >
      <StageHeader title={stage.name} />
      <TableContainer sx={{ backgroundColor: 'background.paper' }}>
        <Table>
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
}

function PlayerListItem({ entry, hasNotionalPoints = false }: PlayerListItemProps) {
  return (
    <TableRow key={entry.player1.id}>
      <TableCell>{entry.position_name}</TableCell>
      <TableCell
        sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}
      >
        <img
          src={entry.player1.country.url_svg}
          alt={entry.player1.country.name}
          style={{ height: 20 }}
        />
        <Typography>{entry.player1.name_display}</Typography>
      </TableCell>
      <TableCell>{entry.player1.country.name}</TableCell>
      <TableCell align='right'>{entry.rank ?? '-'}</TableCell>
      <TableCell align='right'>{entry.points ?? '-'}</TableCell>
      {hasNotionalPoints && (
        <TableCell align='right'>{entry.notional_points}</TableCell>
      )}
      <TableCell align='right'>{entry.tournaments ?? '-'} </TableCell>
      <TableCell align='right'>{entry.seed}</TableCell>
    </TableRow>
  )
}

type StageHeaderProps = {
  title: string
}

function StageHeader({ title }: StageHeaderProps) {
  return (
    <Typography sx={{ color: 'white' }} variant='h6'>
      {title}
    </Typography>
  )
}

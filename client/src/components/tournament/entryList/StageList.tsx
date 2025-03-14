import { NavigationLink } from '@/components/NavigationLink'
import {
  EntryStage,
  EventStage,
  PlayerEntry,
  PlayerStageResponse,
  ListEntry,
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
  useMediaQuery,
  useTheme,
} from '@mui/material'

type StageListProps = {
  players: PlayerStageResponse | null
  eventStages: EventStage[]
}

export function StageList({ players, eventStages }: StageListProps) {
  if (!players) return null

  return (
    <Box sx={{}}>
      {eventStages.map((stage) => {
        if (stage.value === 0 && Object.values(players).length > 1) return null

        return <StagePlayers key={stage.value} stage={players[stage.value]} />
      })}
    </Box>
  )
}

type StagePlayersProps = {
  stage: EntryStage
}

function StagePlayers({ stage }: StagePlayersProps) {
  if (!stage) return null

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
    [StageName.AllStages]: {
      background: 'info.main',
      text: 'text.primary',
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
            {stage.entries.map((entry, index) => (
              <PlayerListItem
                key={entry.player1.id + index}
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
  entry: ListEntry
  hasNotionalPoints?: boolean
  color: { background: string; text: string }
}

function PlayerListItem({
  entry,
  color,
  hasNotionalPoints = false,
}: PlayerListItemProps) {
  const country1 = entry.player1.country_model || entry.player1.country || null
  const country2 = entry.player1.country_model || entry.player1.country || null

  return (
    <TableRow key={entry.player1.id}>
      <TableCell
        sx={{
          backgroundColor: color.background,
          color: 'black',
          width: 20,
        }}
      >
        <Typography variant='entryListText'>{entry.position_name}</Typography>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <PlayerInfo player={entry.player1} status={entry.status} />
          {entry.player2 && <PlayerInfo player={entry.player2} />}
        </Box>
      </TableCell>

      <TableCell>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          }}
        >
          <Typography
            variant='entryListText'
            sx={{ color: 'text.secondary', textWrap: 'nowrap' }}
          >
            {country1?.name || 'NONE'}
          </Typography>
          {entry.player2 && (
            <Typography
              variant='entryListText'
              sx={{ color: 'text.secondary', textWrap: 'nowrap' }}
            >
              {country2?.name || 'NONE'}
            </Typography>
          )}
        </Box>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='entryListText'>{entry.rank ?? '-'}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography
          variant='entryListText'
          sx={{ color: entry.notional_points ? 'text.secondary' : 'white' }}
        >
          {entry.points ?? '-'}
        </Typography>
      </TableCell>

      {hasNotionalPoints && (
        <TableCell align='right'>
          <Typography variant='entryListText'>{entry.notional_points}</Typography>
        </TableCell>
      )}

      <TableCell align='right'>
        <Typography variant='entryListText' sx={{ color: 'text.secondary' }}>
          {entry.tournaments ?? '-'}
        </Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='entryListText'>{entry.seed}</Typography>
      </TableCell>
    </TableRow>
  )
}

type PlayerInfoProps = {
  player: PlayerEntry
  status?: string | null
}

function PlayerInfo({ player, status }: PlayerInfoProps) {
  const isMobile = useMediaQuery('(max-width:600px)')
  const theme = useTheme()

  const flagUrl = player.country?.url_svg ?? null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        [theme.breakpoints.down('sm')]: {
          gap: '4px',
        },
      }}
    >
      {flagUrl && (
        <img
          src={player.country.url_svg}
          alt={player.country.name}
          style={{ height: !isMobile ? 18 : 14 }}
        />
      )}

      <NavigationLink
        to={`/players/${player.id}/overview`}
        variant='entryListText'
        sx={{ textWrap: 'nowrap' }}
      >
        {player.name_display}
      </NavigationLink>
      {status && <Typography variant='body2'>[{status}]</Typography>}
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

import {
  CountryModel,
  PlayerModel,
  PlayerRankingEntry,
  TeamModel,
  TeamRankingEntry,
} from '@/types/ranking'
import {
  Box,
  TableCell,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

type PlayerRankingItemProps = {
  entry: PlayerRankingEntry
}

export function PlayerRankingItem({ entry }: PlayerRankingItemProps) {
  return (
    <TableRow>
      <TableCell>
        <RankInfo rank={entry.rank} rankChange={entry.rank_change} />
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <Typography variant='rankingEntryText'>
            {entry.player1_model.country_model.custom_code}
          </Typography>
          {entry.player2_model && (
            <Typography variant='rankingEntryText'>
              {entry.player2_model.country}
            </Typography>
          )}
        </Box>
      </TableCell>

      <TableCell>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <PlayerInfo player={entry.player1_model} />
          {entry.player2_model && <PlayerInfo player={entry.player2_model} />}
        </Box>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>
          {parseInt(entry.points, 10).toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{entry.tournaments}</Typography>
      </TableCell>
    </TableRow>
  )
}

type PlayerInfoProps = {
  player: PlayerModel
}

function PlayerInfo({ player }: PlayerInfoProps) {
  const isMobile = useMediaQuery('(max-width: 600px)')

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      <img
        src={player.country_model.flag_url_svg}
        style={{ height: isMobile ? 14 : 18 }}
      />
      <Typography variant='rankingEntryText' sx={{ textWrap: 'nowrap' }}>
        {player.name_display}
      </Typography>
    </Box>
  )
}

type TeamRankingItemProps = {
  entry: TeamRankingEntry
}

// To be implemented when creating the actual ranking page
export function TeamRankingItem({ entry }: TeamRankingItemProps) {
  const country: CountryModel = entry.team_model.country_model ?? null

  return (
    <TableRow>
      <TableCell>
        <RankInfo rank={entry.rank} rankChange={entry.rank_change} />
      </TableCell>

      <TableCell>
        <Typography variant='rankingEntryText'>
          {country ? country.custom_code : ''}
        </Typography>
      </TableCell>

      <TableCell>
        <TeamInfo team={entry.team_model} />
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_ms)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_ws)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_md)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_wd)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_xd)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_sc)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_tc)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>{parseInt(entry.team_uc)}</Typography>
      </TableCell>

      <TableCell align='right'>
        <Typography variant='rankingEntryText'>
          {parseInt(entry.team_total_points, 10)}
        </Typography>
      </TableCell>
    </TableRow>
  )
}

type TeamInfoProps = {
  team: TeamModel
}

function TeamInfo({ team }: TeamInfoProps) {
  const isMobile = useMediaQuery('(max-width: 600px)')
  const country: CountryModel = team.country_model ?? null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, alignItems: 'center' }}>
      {country && (
        <img src={country.flag_url_svg} style={{ height: isMobile ? 14 : 18 }} />
      )}

      <Typography variant='rankingEntryText' sx={{ textWrap: 'nowrap' }}>
        {team.name}
      </Typography>
    </Box>
  )
}

type RankInfoProps = {
  rank: number
  rankChange: number
}

function RankInfo({ rank, rankChange }: RankInfoProps) {
  const theme = useTheme()

  const color =
    rankChange === 0
      ? 'text.secondary'
      : rankChange > 0
      ? 'success.main'
      : 'error.main'

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant='rankingEntryText' sx={{ textAlign: 'right', flex: 1 }}>
        {rank}
      </Typography>
      <Box
        sx={{
          textAlign: 'left',
          width: '50%',
          color,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        {rankChange === 0 ? (
          <Typography variant='rankingEntryText' sx={{ textAlign: 'left', flex: 1 }}>
            -
          </Typography>
        ) : rankChange > 0 ? (
          <>
            <ArrowDropUpIcon
              sx={{
                color: 'success.main',
                height: 20,
                [theme.breakpoints.down('sm')]: {
                  height: 14,
                },
              }}
            />
            <Typography variant='rankingEntryText'>{rankChange}</Typography>
          </>
        ) : (
          <>
            <ArrowDropDownIcon
              sx={{
                color: 'error.main',
                height: 20,
                [theme.breakpoints.down('sm')]: {
                  height: 14,
                },
              }}
            />
            <Typography variant='rankingEntryText'>{rankChange * -1}</Typography>
          </>
        )}
      </Box>
    </Box>
  )
}

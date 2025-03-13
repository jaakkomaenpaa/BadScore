import { PlayerRankingEntry, Ranking, TeamRankingEntry } from '@/types/ranking'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { LoadingCircle } from '../LoadingCircle'
import { PlayerRankingItem, TeamRankingItem } from './RankingItem'

type RankingTableProps = {
  entries: PlayerRankingEntry[] | TeamRankingEntry[]
  ranking: Ranking
  loading: boolean
}

export function RankingTable({ entries, ranking, loading }: RankingTableProps) {
  if (loading) return <LoadingCircle />

  if (ranking.isTeam) {
    return <TeamRankingTable entries={entries as TeamRankingEntry[]} />
  } else {
    return (
      <PlayerRankingTable
        rankingId={ranking.id}
        entries={entries as PlayerRankingEntry[]}
      />
    )
  }
}

type PlayerRankingTableProps = {
  entries: PlayerRankingEntry[]
  rankingId: number
}

function PlayerRankingTable({ entries, rankingId }: PlayerRankingTableProps) {
  return (
    <TableContainer sx={{ backgroundColor: 'background.paper' }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Player</TableCell>
            <TableCell align='right'>Points</TableCell>
            <TableCell align='right'>Tournaments</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <PlayerRankingItem
              key={entry.id}
              rankingId={rankingId}
              entry={entry as PlayerRankingEntry}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

type TeamRankingTableProps = {
  entries: TeamRankingEntry[]
}

function TeamRankingTable({ entries }: TeamRankingTableProps) {
  return (
    <TableContainer sx={{ backgroundColor: 'background.paper' }}>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Team</TableCell>
            <TableCell align='right'>MS</TableCell>
            <TableCell align='right'>WS</TableCell>
            <TableCell align='right'>MD</TableCell>
            <TableCell align='right'>WD</TableCell>
            <TableCell align='right'>XD</TableCell>
            <TableCell align='right'>SC</TableCell>
            <TableCell align='right'>TC</TableCell>
            <TableCell align='right'>UC</TableCell>
            <TableCell align='right'>Total points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry) => (
            <TeamRankingItem key={entry.id} entry={entry} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

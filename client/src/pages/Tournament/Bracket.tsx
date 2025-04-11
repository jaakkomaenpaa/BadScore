import { LoadingCircle } from '@/components/LoadingCircle'
import { RoundColumn } from '@/components/tournament/bracket/RoundColumn'
import { WinnerColumn } from '@/components/tournament/bracket/WinnerColumn'
import { DrawList } from '@/components/tournament/draws/DrawList'
import { useBracket } from '@/hooks/tournament/useBracket'
import { BracketData, StandingsEntry } from '@/types/draw'
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
} from '@mui/material'

export function BracketPage() {
  const { bracket, standings, draws, bracketLoading } = useBracket()
  const isMobile = useMediaQuery('(max-width:600px)')

  if (bracketLoading) return <LoadingCircle />
  if (!bracket && !standings) {
    return (
      <Typography variant='body1' sx={{ color: 'text.primary' }}>
        No draw data available
      </Typography>
    )
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, padding: 2 }}>
      {isMobile || draws.length > 5 ? (
        <DrawList draws={draws} type='select' defaultColor='text.secondary' />
      ) : (
        <DrawList draws={draws} type='row' defaultColor='text.secondary' />
      )}

      {!bracket && <Standings entries={standings} />}
      <Bracket bracket={bracket} />
    </Box>
  )
}

type BracketProps = {
  bracket: BracketData | null
}

function Bracket({ bracket }: BracketProps) {
  if (!bracket) return null

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', overflowX: 'auto' }}>
      {Object.entries(bracket.rounds).map(([round, matches], index) => (
        <RoundColumn key={index} round={parseInt(round)} matches={matches} />
      ))}
      <WinnerColumn
        winnerEntries={bracket.winners}
        roundsLength={Object.values(bracket.rounds).length}
      />
    </Box>
  )
}

type StandingsProps = {
  entries: StandingsEntry[] | null
}

function Standings({ entries }: StandingsProps) {
  if (!entries) return null

  return (
    <Box>
      <TableContainer sx={{ backgroundColor: 'background.paper' }}>
        <Table size='medium'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell align='left'>Points</TableCell>
              <TableCell align='left'>Games</TableCell>
              <TableCell align='left'>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.team.teamId}>
                <TableCell>{entry.rank}</TableCell>
                <TableCell sx={{ display: 'flex', gap: 1 }}>
                  <img
                    src={entry.team.countryFlagUrl}
                    alt={entry.team.teamName}
                    style={{ height: 20 }}
                  />
                  {entry.team.teamName}
                </TableCell>
                <TableCell align='left'>{entry.points}</TableCell>
                <TableCell align='left'>
                  {entry.game_for} - {entry.game_against}
                </TableCell>
                <TableCell align='left'>
                  {entry.point_for}- {entry.point_against}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

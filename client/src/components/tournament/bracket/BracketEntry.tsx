import { Player, Team } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { Cell } from './Cell'
import { ScoreCell } from './ScoreCell'
import { useBracket } from '@/hooks/tournament/useBracket'

type BracketEntryProps = {
  team: Team
  side?: 'home' | 'away'
  isLastRound?: boolean
}

export function BracketEntry({ team, side, isLastRound = false }: BracketEntryProps) {
  const { cellHeight } = useBracket()

  if (team.teamName?.toLowerCase() === 'bye') return <ByeEntry />

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: cellHeight - 1,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.primary',
        }}
      >
        {team.players.map((player: Player) => (
          <PlayerItem key={player.id} player={player} />
        ))}
      </Box>

      {team.prevScore ? (
        <ScoreCell
          score={team.prevScore}
          scoreStatusValue={
            team.prevScoreStatus !== 0 ? team.prevScoreStatusValue : null
          }
          side={side}
          prevSide={team.prevMatchSide}
          isLastRound={isLastRound}
        />
      ) : (
        <Cell borderRight={side === 'home'} />
      )}
    </Box>
  )
}

type PlayerItemProps = {
  player: Player
}

function PlayerItem({ player }: PlayerItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        paddingRight: 1,
        paddingLeft: 1,
      }}
    >
      <img src={player.countryFlagUrl} alt={player.lastName} style={{ height: 18 }} />
      <Typography
        variant='body2'
        sx={{
          color: 'text.primary',
          textWrap: 'nowrap',
        }}
      >
        {player.nameDisplay}
      </Typography>
    </Box>
  )
}

type ByeEntryProps = {
  side?: 'home' | 'away'
  isLastRound?: boolean
}

function ByeEntry({ side, isLastRound }: ByeEntryProps) {
  const { cellHeight } = useBracket()

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: cellHeight - 0.8,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.primary',
        }}
      >
        <Typography variant='body2' sx={{ color: 'text.secondary', marginLeft: 4 }}>
          Bye
        </Typography>
      </Box>
      <Cell borderRight={side === 'home'} />
    </Box>
  )
}

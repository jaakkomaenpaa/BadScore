import { Player, Team } from '@/types/match'
import { Box, Typography } from '@mui/material'
import { Cell } from './Cell'
import { ScoreCell } from './ScoreCell'
import { useBracket } from '@/hooks/tournament/useBracket'

type BracketEntryProps = {
  team: Team
  drawIndex: number
  round: number
  side?: 'home' | 'away'
  isLastRound?: boolean
  seed?: string
}

export function BracketEntry({
  team,
  drawIndex,
  round,
  side,
  isLastRound = false,
  seed,
}: BracketEntryProps) {
  const { cellHeight } = useBracket()

  if (team.teamName?.toLowerCase() === 'bye')
    return <ByeEntry drawIndex={drawIndex} isLastRound={isLastRound} side={side} />

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: cellHeight - 1,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.secondary',
        }}
      >
        {team.players.length === 0 && <TeamItem team={team} seed={seed} />}
        {team.players.map((player: Player, index: number) => (
          <Box
            key={player.id}
            sx={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            {round === 1 && (
              <Typography variant='body2' sx={{ color: 'text.secondary', width: 20 }}>
                {index === team.players.length - 1 ? drawIndex : undefined}
              </Typography>
            )}
            <PlayerItem player={player} seed={index === 0 ? seed : undefined} />
          </Box>
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

type TeamItemProps = {
  team: Team
  seed?: string
}

function TeamItem({ team, seed }: TeamItemProps) {
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
      <img
        src={team.countryFlagUrl}
        alt={team.teamName}
        style={{ height: 16, verticalAlign: 'middle', alignSelf: 'center' }}
      />
      <Typography
        variant='body2'
        sx={{
          color: 'text.primary',
          textWrap: 'nowrap',
        }}
      >
        {team.teamName} {seed && `[${seed}]`}
      </Typography>
    </Box>
  )
}

type PlayerItemProps = {
  player: Player
  seed?: string
}

function PlayerItem({ player, seed }: PlayerItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        paddingRight: 2,
        paddingLeft: 1,
      }}
    >
      <img
        src={player.countryFlagUrl}
        alt={player.lastName}
        style={{ height: 16, verticalAlign: 'middle', alignSelf: 'center' }}
      />
      <Typography
        variant='body2'
        sx={{
          color: 'text.primary',
          textWrap: 'nowrap',
        }}
      >
        {player.nameDisplay} {seed && `[${seed}]`}
      </Typography>
    </Box>
  )
}

type ByeEntryProps = {
  drawIndex: number
  side?: 'home' | 'away'
  isLastRound?: boolean
}

function ByeEntry({ drawIndex, side, isLastRound }: ByeEntryProps) {
  const { cellHeight } = useBracket()

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-end',
          height: cellHeight - 1,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.secondary',
        }}
      >
        <Typography
          variant='body2'
          sx={{ color: 'text.secondary', width: 20, marginBottom: '1px' }}
        >
          {drawIndex}
        </Typography>
        <Typography
          variant='body2'
          sx={{ color: 'text.secondary', marginLeft: 4, marginBottom: '1px' }}
        >
          Bye
        </Typography>
      </Box>
      <Cell borderRight={side === 'home'} />
    </Box>
  )
}

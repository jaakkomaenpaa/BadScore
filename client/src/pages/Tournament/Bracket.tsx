import { LoadingCircle } from '@/components/LoadingCircle'
import { useDrawData } from '@/hooks/tournament/useDrawData'
import { GameScore, Match, Player, Team } from '@/types/match'
import { Box, Typography } from '@mui/material'

const getRoundName = (round: number) => {
  if (round === 0) return 'Final'
  if (round === 1) return 'Semifinals'
  if (round === 2) return 'Quarterfinals'
  if (round === 3) return 'Round of 16'
  if (round === 4) return 'Round of 32'
  if (round === 5) return 'Round of 64'
  return `Round of ${2 ** round}`
}

const DIMENSIONS = {
  CELL_HEIGHT: 24,
}

const getPreviousScore = (prevMatch: { index: number; match: Match }, team: Team) => {
  team.prevScore = prevMatch.match.score ?? null
  team.prevScoreStatus = prevMatch.match.scoreStatus ?? null
  team.prevScoreStatusValue = prevMatch.match.scoreStatusValue ?? ''
  team.prevMatchSide = prevMatch.match.winner === 1 ? 'home' : 'away'
}

export function Bracket() {
  const { bracket, loading } = useDrawData()

  if (loading) return <LoadingCircle />
  if (!bracket?.results) return <Typography>No bracket data available</Typography>

  const rounds: Record<number, { index: number; match: Match }[]> = {}

  Object.entries(bracket.results)
    .sort((a, b) => {
      const [aRound, aMatch] = a[0].split('-').map(Number)
      const [bRound, bMatch] = b[0].split('-').map(Number)

      if (aRound === bRound) return aMatch - bMatch
      return aRound - bRound
    })
    .forEach(([key, { match }]) => {
      if (!match) return

      const [roundIndex, matchIndex] = key.split('-').map(Number)
      rounds[roundIndex] ??= []

      if (roundIndex > 0) {
        const prevRound = rounds[roundIndex - 1] ?? []

        const prevMatchHome = prevRound[matchIndex * 2]
        const prevMatchAway = prevRound[matchIndex * 2 + 1]

        getPreviousScore(prevMatchHome, match.team1)
        getPreviousScore(prevMatchAway, match.team2)
      }

      rounds[roundIndex].push({ index: matchIndex, match })
    })

  const winnerEntries: Team[] = []
  rounds[Object.entries(rounds).length - 1].forEach(({ match }) => {
    const winner = match.winner === 1 ? { ...match.team1 } : { ...match.team2 }
    getPreviousScore({ index: 0, match }, winner)
    winnerEntries.push(winner)
  })

  const getTopCellsToAdd = (round: number) => 2 ** round - 1
  const getMiddleCellsToAdd = (round: number) => 2 ** (round + 1) - 1 - 1

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
      {Object.entries(rounds).map(([round, matches]) => {
        const topCellsToAdd = getTopCellsToAdd(parseInt(round))
        const middleCellsToAdd = getMiddleCellsToAdd(parseInt(round))

        return (
          <Box
            key={round}
            sx={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Typography
              variant='h6'
              sx={{ textAlign: 'center', color: 'text.primary', marginBottom: 2 }}
            >
              Round {parseInt(round) + 1}
            </Typography>
            {Array.from({ length: topCellsToAdd }).map((_, index) => (
              <Cell key={index} />
            ))}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${DIMENSIONS.CELL_HEIGHT * middleCellsToAdd}px`,
              }}
            >
              {matches
                .sort((a, b) => a.index - b.index) // Sort matches within the round
                .map(({ index, match }: { index: number; match: Match }) => (
                  <MatchItem
                    key={match.id}
                    match={match}
                    round={parseInt(round) + 1}
                  />
                ))}
            </Box>
          </Box>
        )
      })}
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant='h6' sx={{ textAlign: 'center', color: 'text.primary' }}>
          Winner
        </Typography>
        {Array.from({
          length: getTopCellsToAdd(Object.values(rounds).length),
        }).map((_, index) => (
          <Cell key={index} />
        ))}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: `${
              DIMENSIONS.CELL_HEIGHT *
              getMiddleCellsToAdd(Object.values(rounds).length)
            }px`,
          }}
        >
          {winnerEntries.map((team, index) => (
            <TeamItem
              key={index}
              team={team}
              round={Object.entries(rounds).length}
              isLastRound
              side={team.prevMatchSide}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

type CellProps = {
  borderRight?: boolean
}

const Cell = ({ borderRight }: CellProps) => (
  <Box
    sx={{
      height: DIMENSIONS.CELL_HEIGHT,
      ...(borderRight && { borderRight: '1px solid', borderColor: 'text.primary' }),
    }}
  />
)

type MatchItemProps = {
  match: Match
  round: number
}

function MatchItem({ match, round }: MatchItemProps) {
  const cellsToAdd = 2 ** round - 1 - 1

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <TeamItem team={match.team1} round={round} side='home' />
      {Array.from({ length: cellsToAdd }).map((_, index) => (
        <Cell key={index} borderRight />
      ))}
      <TeamItem team={match.team2} round={round} side='away' />
    </Box>
  )
}

type TeamItemProps = {
  team: Team
  round: number
  side?: 'home' | 'away'
  isLastRound?: boolean
}

function TeamItem({ team, round, side, isLastRound = false }: TeamItemProps) {
  if (team.teamName?.toLowerCase() === 'bye') {
    return (
      <Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: DIMENSIONS.CELL_HEIGHT - 0.7,
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

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: DIMENSIONS.CELL_HEIGHT - 0.7,
          borderBottom: '1px solid',
          ...(side === 'away' &&
            !isLastRound && {
              borderRight: '1px solid',
            }),
          borderColor: 'text.primary',
        }}
      >
        {team.players.map((player: Player, index: number) => {
          return (
            <Box
              key={index}
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
                src={player.countryFlagUrl}
                alt={player.lastName}
                style={{ height: 18 }}
              />
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
        })}
      </Box>
      {team.prevScore ? (
        <Score
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

type ScoreProps = {
  score: GameScore[]
  scoreStatusValue: string | null
  side?: 'home' | 'away'
  prevSide?: 'home' | 'away'
  isLastRound?: boolean
}

function Score({
  score,
  scoreStatusValue,
  side,
  prevSide,
  isLastRound = false,
}: ScoreProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 1,
        height: DIMENSIONS.CELL_HEIGHT,
        paddingLeft: 1,
        ...(side === 'home' &&
          !isLastRound && {
            borderRight: '1px solid',
          }),
        borderColor: 'text.primary',
        color: 'text.primary',
      }}
    >
      {score.map((game: GameScore) => (
        <Box
          key={game.set}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '2px',
          }}
        >
          <Typography>{prevSide === 'home' ? game.home : game.away}</Typography>
          <Typography variant='body2'>-</Typography>
          <Typography>{prevSide === 'home' ? game.away : game.home}</Typography>
        </Box>
      ))}
      {scoreStatusValue}
    </Box>
  )
}

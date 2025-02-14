import { GameScore, Match, Player, Team } from '@/types/match'
import { Box, Typography } from '@mui/material'

type MatchListProps = {
  matches: Match[]
}

export function MatchList({ matches }: MatchListProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        padding: 1,
      }}
    >
      {matches.map((match) => (
        <MatchListItem key={match.id} match={match} />
      ))}
    </Box>
  )
}

type MatchListItemProps = {
  match: Match
}

function MatchListItem({ match }: MatchListItemProps) {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 1,
        color: 'white',
        padding: 1,
      }}
    >
      <InfoField match={match} />
      <PlayersField match={match} />
      <ScoreField match={match} />
    </Box>
  )
}

type ScoreFieldProps = {
  match: Match
}

function ScoreField({ match }: ScoreFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        justifyContent: 'flex-end',
        flex: 1,
      }}
    >
      {match.score.map((game: GameScore) => (
        <Box key={game.set} sx={{ display: 'flex', flexDirection: 'row' }}>
          <Typography
            sx={{
              fontWeight: game.home > game.away ? 'bold' : 'normal',
              color: game.home < game.away ? 'text.secondary' : 'text.primary',
            }}
          >
            {game.home}
          </Typography>
          -
          <Typography
            sx={{
              fontWeight: game.away > game.home ? 'bold' : 'normal',
              color: game.away < game.home ? 'text.secondary' : 'text.primary',
            }}
          >
            {game.away}
          </Typography>
        </Box>
      ))}
      {match.scoreStatus !== 0 && match.scoreStatusValue}
    </Box>
  )
}

type PlayersFieldProps = {
  match: Match
}

function PlayersField({ match }: PlayersFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
      }}
    >
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <TeamItem
          team={match.team1}
          seed={match.team1seed}
          side='home'
          isWinner={match.winner === 1}
          isLoser={match.winner === 2}
        />
      </Box>
      <Box sx={{ margin: '0px 10px' }}>-</Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-start' }}>
        <TeamItem
          team={match.team2}
          seed={match.team2seed}
          side='away'
          isWinner={match.winner === 2}
          isLoser={match.winner === 1}
        />
      </Box>
    </Box>
  )
}

type InfoFieldProps = {
  match: Match
}

function InfoField({ match }: InfoFieldProps) {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography sx={{ color: 'text.primary' }}>{match.matchTypeValue}</Typography>
      <Typography sx={{ color: 'text.secondary' }}>{match.roundName}</Typography>
    </Box>
  )
}

type TeamItemProps = {
  team: Team
  seed: string | null
  side: 'home' | 'away'
  isWinner: boolean
  isLoser: boolean
}

function TeamItem({ team, seed, side, isWinner, isLoser }: TeamItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: side === 'home' ? 'flex-end' : 'flex-start',
      }}
    >
      {team.players.map((player: Player, index: number) => (
        <Box key={player.id} sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
          <Typography
            variant='body1'
            sx={{
              color: isLoser ? 'text.secondary' : 'text.primary',
              fontWeight: isWinner ? 'bold' : 'normal',
            }}
          >
            {player.nameDisplay} {seed && index === 0 && `[${seed}]`}
          </Typography>
        </Box>
      ))}
    </Box>
  )
}

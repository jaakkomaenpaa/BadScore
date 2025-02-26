import { LoadingCircle } from '@/components/LoadingCircle'
import { useTournament } from '@/hooks/tournament/useTournament'
import { Match } from '@/types/match'
import { TournamentPreview } from '@/types/tournament'
import { Box, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import tournamentService from '@/services/tournament'
import { addDays } from '@/utils/dates'
import { MatchListItem } from '@/components/tournament/matches/MatchListItem'

const getDefaultDate = (startDate: Date, endDate: Date): Date => {
  const today = new Date()
  return today >= startDate && today <= endDate ? today : addDays(endDate, 1)
}

export function Home() {
  const { tournament, loading } = useTournament()

  if (loading) return <LoadingCircle />
  if (!tournament) return null

  const date = getDefaultDate(
    new Date(tournament.startDate),
    new Date(tournament.endDate)
  )

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {/* INFO BOX - prize money etc. */}
      <InfoBox tournament={tournament} />
      <LatestMatches tournamentCode={tournament.code} date={date} />
      {/* PODIUM */}
    </Box>
  )
}

type InfoBoxProps = {
  tournament: TournamentPreview
}

function InfoBox({ tournament }: InfoBoxProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        backgroundColor: 'background.paper',
        color: 'text.primary',
        alignSelf: 'center',
        padding: 2,
      }}
    >
      <Box sx={{ display: 'flex' }}>Prize money - ${tournament.prizeMoney}</Box>
    </Box>
  )
}

type LatestMatchesProps = {
  tournamentCode: string
  date: Date
}

function LatestMatches({ tournamentCode, date }: LatestMatchesProps) {
  const [matches, setMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)

  const MATCHES_LENGTH = 5

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true)
      try {
        const matchRes = await tournamentService.getMatches(
          tournamentCode,
          date,
          MATCHES_LENGTH
        )
        setMatches(matchRes)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchMatches()
  }, [])

  if (loading) return <LoadingCircle />
  if (!matches.length) return null

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        alignSelf: 'center',
        gap: 2,
        color: 'text.primary',
      }}
    >
      <Typography variant='h5' sx={{ alignSelf: 'center' }}>
        Latest matches - {date.toLocaleDateString()}
      </Typography>
      {matches
        .sort(
          (a, b) => new Date(b.matchTime).getTime() - new Date(a.matchTime).getTime()
        )
        .map((match: Match) => (
          <MatchListItem key={match.id} match={match} minimalistic />
        ))}
    </Box>
  )
}

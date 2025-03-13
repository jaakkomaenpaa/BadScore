import {
  PlayerModel,
  PlayerPointsBreakdown,
  PlayerRankingEntry,
} from '@/types/ranking'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useEffect, useState } from 'react'
import rankingService from '@/services/ranking'
import { LoadingCircle } from '@/components/LoadingCircle'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { NavigationLink } from '../NavigationLink'

type PointsBreakdownProps = {
  entry: PlayerRankingEntry
  player: PlayerModel
  rankingId: number
  categoryId: number
  isOpen: boolean
  onClose: () => void
}

export function PointsBreakdown({
  entry,
  player,
  rankingId,
  categoryId,
  isOpen,
  onClose,
}: PointsBreakdownProps) {
  const [breakdown, setBreakdown] = useState<PlayerPointsBreakdown[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!rankingId || !categoryId || !isOpen) return

    const fetchBreakdown = async () => {
      setLoading(true)

      const breakdownRes = await rankingService.getPlayerBreakdown(
        rankingId,
        categoryId,
        entry
      )

      console.log('breakdownRes', breakdownRes)
      setBreakdown(breakdownRes)
      setLoading(false)
    }

    fetchBreakdown()
  }, [])

  if (!isOpen) return null

  if (loading) return <LoadingCircle />
  if (!breakdown) return <Typography>No breakdown data available</Typography>

  return (
    <Dialog
      onClose={onClose}
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          width: '90%',
          maxWidth: '1200px',
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: 'background.paper' }}>
        Points breakdown for {player.name_display}
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: 'background.paper' }}>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <Typography variant='rankingEntryText' sx={{ textWrap: 'nowrap' }}>
                  Year / week
                </Typography>
              </TableCell>
              <TableCell>Tournament</TableCell>
              <TableCell align='right'>Result</TableCell>
              <TableCell align='right'>Points</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {breakdown.map((tournament, index) => (
              <TableRow key={index}>
                <TableCell>{tournament.isCountedIn ? '✅' : ''}</TableCell>

                <TableCell>
                  <Typography variant='rankingEntryText' sx={{ textWrap: 'nowrap' }}>
                    {tournament.date}
                  </Typography>
                </TableCell>

                <TableCell>
                  <NavigationLink
                    to={`/tournaments/${tournament.tournamentId}/overview`}
                    variant='rankingEntryText'
                  >
                    {tournament.name}
                  </NavigationLink>
                </TableCell>

                <TableCell align='right'>
                  <Typography variant='rankingEntryText'>
                    {tournament.result}
                  </Typography>
                </TableCell>

                <TableCell align='right'>
                  <Typography variant='rankingEntryText'>
                    {parseInt(tournament.points, 10).toLocaleString()}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'background.paper' }}>
        <SecondaryButton type='error' onClick={onClose}>
          Close
        </SecondaryButton>
      </DialogActions>
    </Dialog>
  )
}

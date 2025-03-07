import { Box, Pagination, styled } from '@mui/material'
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import playerService from '@/services/player'
import { Player, PlayerSearchResponse } from '@/types/player'
import { LoadingCircle } from '@/components/LoadingCircle'
import { SearchField } from '@/components/SearchField'
import { PlayerListItem } from '@/components/players/PlayerListItem'
import { ResultInfoField } from '@/components/players/ResultInfoField'

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: 14,
    backgroundColor: theme.palette.primary.main,
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.primary.main,
  },
}))

function Players() {
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParam = searchParams.get('search') ?? ''
  const pageParam = searchParams.get('page') ?? '1'

  const [page, setPage] = useState<number>(parseInt(pageParam))
  const [search, setSearch] = useState<string>(searchParam)
  const [players, setPlayers] = useState<Player[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  const [entriesTotal, setEntriesTotal] = useState<number>(0)
  const [pageEntriesFrom, setPageEntriesFrom] = useState<number>(0)
  const [pageEntriesTo, setPageEntriesTo] = useState<number>(0)
  const [lastPage, setLastPage] = useState<number>(1)

  useEffect(() => {
    fetchPlayers()
  }, [page])

  const fetchPlayers = async () => {
    setLoading(true)

    if (search.length < 3) {
      setLoading(false)
      return
    }

    const playerRes: PlayerSearchResponse = await playerService.search(search, page)
    setPlayers(playerRes.players)
    setEntriesTotal(playerRes.page.total)
    setPageEntriesFrom(playerRes.page.from)
    setPageEntriesTo(playerRes.page.to)
    setLastPage(playerRes.page.lastPage)

    setLoading(false)
  }

  const handlePageChange = (page: number) => {
    setPage(page)
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams)
      newParams.set('page', page.toString())
      return newParams
    })
  }

  const handleSearch = () => {
    setPage(1)
    setSearchParams({ search: search })
    fetchPlayers()
  }

  if (loading) return <LoadingCircle />

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        padding: 2,
      }}
    >
      <CustomTooltip
        open={search.length < 3}
        title='Fill in at least 3 characters'
        placement='bottom-start'
        arrow
        slotProps={{
          popper: {
            disablePortal: true,
          },
        }}
      >
        <span style={{ width: '100%' }}>
          <SearchField
            value={search}
            onSearch={handleSearch}
            onInputChange={(e) => setSearch(e.target.value)}
          />
        </span>
      </CustomTooltip>

      <ResultInfoField
        entriesTotal={entriesTotal}
        entriesFrom={pageEntriesFrom}
        entriesTo={pageEntriesTo}
      />

      <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1, flexWrap: 'wrap' }}>
        {players.map((player: Player) => (
          <PlayerListItem player={player} key={player.id} />
        ))}
      </Box>

      <Pagination
        count={lastPage}
        color='primary'
        shape='rounded'
        page={page}
        onChange={(_, page) => handlePageChange(page)}
      />
    </Box>
  )
}

export default Players

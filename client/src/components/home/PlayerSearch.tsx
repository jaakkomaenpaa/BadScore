import { Box, Typography, useTheme } from '@mui/material'
import { ChangeEvent, useRef, useState } from 'react'
import playerService from '@/services/player'
import { Player, PlayerSearchResponse } from '@/types/player'
import { NavLink, useNavigate } from 'react-router'
import { SearchField } from '../SearchField'

export function PlayerSearch() {
  const [search, setSearch] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const [results, setResults] = useState<Player[]>([])
  const blurTimeout = useRef<NodeJS.Timeout | null>(null)
  const navigate = useNavigate()

  const handleSearch = async () => {
    navigate(`/players?search=${search}`)

    setHasFocus(false)
    setResults([])
    setSearch('')
  }

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value
    setSearch(input)

    if (input.length < 3) {
      setResults([])
      return
    }

    const data: PlayerSearchResponse = await playerService.search(input)
    setResults(data.players)
  }

  const handleFocus = () => {
    if (blurTimeout.current) clearTimeout(blurTimeout.current)
    setHasFocus(true)
  }

  const handleBlur = () => {
    blurTimeout.current = setTimeout(() => setHasFocus(false), 150)
  }

  return (
    <>
      {hasFocus && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            opacity: hasFocus ? 1 : 0,
            //backdropFilter: 'blur(1px)',
            transition: 'opacity 0.2s ease-in-out',
            zIndex: 999,
          }}
          onClick={() => setHasFocus(false)}
        />
      )}
      <Box
        sx={{
          alignSelf: 'center',
          width: '90%',
          maxWidth: 1200,
          position: hasFocus ? 'fixed' : 'relative',
          top: hasFocus ? '20px' : 'auto',
          zIndex: 1001,
          transform: hasFocus ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.3s ease-in-out',
          padding: 2,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            width: '100%',
          }}
        >
          <SearchField
            value={search}
            onSearch={handleSearch}
            onInputChange={handleInputChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          {hasFocus && results.length > 0 && <SearchResultList results={results} />}
        </Box>
      </Box>
    </>
  )
}

type SearchResultListProps = {
  results: Player[]
}

function SearchResultList({ results }: SearchResultListProps) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        top: '100%',
        alignSelf: 'center',
        width: '100%',
        backgroundColor: 'background.paper',
        borderRadius: 1,
        zIndex: 1000,
        maxHeight: 400,
        overflowY: 'auto',
        [theme.breakpoints.down('sm')]: {
          maxHeight: 250,
        },
      }}
    >
      <Box sx={{ padding: 2 }}>
        {results.map((player: Player) => (
          <ResultListItem key={player.id} player={player} />
        ))}
      </Box>
    </Box>
  )
}

type ResultListItemProps = {
  player: Player
}

function ResultListItem({ player }: ResultListItemProps) {
  return (
    <NavLink to={`/players/${player.id}`} style={{ textDecoration: 'none' }}>
      <Box
        key={player.id}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          transition: 'background-color 0.2s ease-in-out, opacity 0.2s ease-in-out',
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            opacity: 0.8,
          },
          '&:hover .hover-underline': {
            textDecoration: 'underline',
          },
          borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
        }}
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}
        >
          <img src={player.country_model.flag_url_svg} style={{ height: 14 }} />
          <Typography
            className='hover-underline'
            sx={{
              color: 'text.primary',
            }}
          >
            {player.name_display}
          </Typography>
        </Box>

        <Typography
          sx={{
            color: 'text.primary',
          }}
        >
          {player.id}
        </Typography>
      </Box>{' '}
    </NavLink>
  )
}

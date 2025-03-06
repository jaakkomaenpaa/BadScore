import { Box, TextField, Typography } from '@mui/material'
import { PrimaryButton } from '../buttons/PrimaryButton'
import { ChangeEvent, useRef, useState } from 'react'

export function PlayerSearch() {
  const [search, setSearch] = useState<string>('')
  const [hasFocus, setHasFocus] = useState<boolean>(false)
  const blurTimeout = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = async () => {
    console.log('Searching for:', search)

    setSearch('')
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value)
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
          display: 'flex',
          flexDirection: 'row',
          alignSelf: 'center',
          padding: 2,
          width: '90%',
          maxWidth: 1200,

          position: hasFocus ? 'fixed' : 'relative',
          top: hasFocus ? '20px' : 'auto',
          transform: hasFocus ? 'translateY(-20px)' : 'translateY(0)',
          transition: 'all 0.3s ease-in-out',
          zIndex: hasFocus ? 1000 : 'auto',
        }}
      >
        <TextField
          fullWidth
          autoComplete='off'
          value={search}
          label='Search players'
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '5px 0px 0px 5px',
              height: '53px',
              backgroundColor: 'background.default',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'secondary.main',
              },
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: 'secondary.main',
            },
            '& .MuiOutlinedInput-input': {
              padding: '15px 14px',
            },
          }}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />

        <PrimaryButton
          onClick={handleSearch}
          type='primary'
          sx={{ borderRadius: '0px 5px 5px 0px', height: '51px' }}
        >
          <Typography variant='body1'>Search</Typography>
        </PrimaryButton>
      </Box>
    </>
  )
}

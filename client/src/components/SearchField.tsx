import { Box, TextField } from '@mui/material'
import { ChangeEvent } from 'react'
import { PrimaryButton } from './buttons/PrimaryButton'
import SearchIcon from '@mui/icons-material/Search'

type SearchFieldProps = {
  value: string
  onSearch: () => void
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void
  onFocus?: () => void
  onBlur?: () => void
}

export function SearchField({
  value,
  onSearch,
  onInputChange,
  onFocus,
  onBlur,
}: SearchFieldProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
      }}
    >
      <TextField
        fullWidth
        autoComplete='off'
        value={value}
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
        onChange={onInputChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      <PrimaryButton
        onClick={onSearch}
        type='primary'
        sx={{ borderRadius: '0px 5px 5px 0px', height: '51px', width: 60 }}
      >
        <SearchIcon />
      </PrimaryButton>
    </Box>
  )
}

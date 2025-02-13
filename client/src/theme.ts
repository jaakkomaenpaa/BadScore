import { createTheme, Theme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    folder: Palette['primary']
  }
  interface PaletteOptions {
    folder?: PaletteOptions['primary']
  }
}

export const theme: Theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#2a2a2a',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
    error: {
      main: '#e67c75',
    },
    success: {
      main: '#a5d6a7',
    },
  },
})

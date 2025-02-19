import { createTheme, Theme } from '@mui/material'

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary']
    warning: Palette['primary']
    errorText: string
    successText: string
    neutralText: string
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary']
    warning?: PaletteOptions['primary']
    errorText?: string
    successText?: string
    neutralText?: string
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
    neutral: {
      main: '#f5eb9f',
    },
    warning: {
      main: '#e0a960',
    },
  },
})

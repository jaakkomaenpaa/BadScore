import { createTheme, Theme, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'

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

  interface TypographyVariants {
    matchPlayerName: React.CSSProperties
    matchScore: React.CSSProperties
    matchInfo: React.CSSProperties
    entryListText: React.CSSProperties
    bracketEntryText: React.CSSProperties
  }

  interface TypographyVariantsOptions {
    matchPlayerName?: React.CSSProperties
    matchScore?: React.CSSProperties
    matchInfo?: React.CSSProperties
    entryListText?: React.CSSProperties
    bracketEntryText?: React.CSSProperties
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    matchPlayerName: true
    matchScore: true
    matchInfo: true
    entryListText: true
    bracketEntryText: true
  }
}

export const useAppTheme = (): Theme => {
  const isMobile = useMediaQuery('(max-width:600px)')

  return useMemo(
    () =>
      createTheme({
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
        typography: {
          fontSize: isMobile ? 12 : 14,
          h1: {
            fontSize: isMobile ? '2rem' : '2.5rem',
          },
          h2: {
            fontSize: isMobile ? '1.75rem' : '2rem',
          },
          h3: {
            fontSize: isMobile ? '1.5rem' : '1.75rem',
          },
          h4: {
            fontSize: isMobile ? '1.25rem' : '1.5rem',
          },
          body1: {
            fontSize: isMobile ? '0.875rem' : '1rem',
          },
          body2: {
            fontSize: isMobile ? '0.65rem' : '0.875rem',
          },
          matchPlayerName: {
            fontSize: isMobile ? '0.5rem' : '0.9rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          },
          matchScore: {
            fontSize: isMobile ? '0.5rem' : '0.9rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          },
          matchInfo: {
            fontSize: isMobile ? '0.5rem' : '0.9rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          },
          entryListText: {
            fontSize: isMobile ? '0.5rem' : '0.8rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          },
          bracketEntryText: {
            fontSize: isMobile ? '0.5rem' : '0.85rem',
            lineHeight: 1.5,
            letterSpacing: '0.00938em',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
          }
        },
      }),
    [isMobile]
  )
}

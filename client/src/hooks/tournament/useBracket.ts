import { useContext } from 'react'
import { BracketContext } from '@/contexts/BracketContext'

export const useBracket = () => useContext(BracketContext)

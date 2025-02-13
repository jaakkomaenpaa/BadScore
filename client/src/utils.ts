import { Week } from './types/tournament'

// Format date to API format
export const formatDateToApi = (date: Date): string => {
  return date.toISOString().split('T')[0]
}

// Format date to client format
export const formatDateToClient = (date: Date): string => {
  return date.toLocaleDateString()
}

// Offset 0 = current week, 1 = next week, -1 = previous week
export const getWeek = (offset: number = 0): Week => {
  const today = new Date()
  const dayOfWeek = today.getDay()

  // Calculate Monday
  const startDate = new Date(today)
  startDate.setDate(
    today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7
  )

  // Calculate Sunday
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  return { startDate, endDate }
}

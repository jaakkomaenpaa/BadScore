import { Week } from './types/tournament'

// Format date to API format
export const formatDateToApi = (date: Date): string => {
  const fixedDate = new Date(date.setDate(date.getDate() + 1))
  return fixedDate.toISOString().split('T')[0]
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
    today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1) + offset * 7 - 1
  )

  // Calculate Sunday
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)

  return { startDate, endDate }
}

export const getDateList = (startDate: Date, endDate: Date): Date[] => {
  const dates = []

  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

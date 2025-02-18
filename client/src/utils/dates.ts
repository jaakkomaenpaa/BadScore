import { Week } from '../types/tournament'

// Format date to API format
export const formatDateToApi = (date: Date): string => {
  const formattedDate = date.toISOString().split('T')[0]
  return formattedDate
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

// Get list of dates between two dates
export const getDateList = (startDate: Date, endDate: Date): Date[] => {
  const dates = []

  let currentDate = new Date(startDate)

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export const formatTime = (date: Date): string => {
  //return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`
}
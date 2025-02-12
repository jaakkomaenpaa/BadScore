export const formatDateToApi = (date: Date) => {
  return date.toISOString().split('T')[0]
}

export const formatDateToClient = (date: Date) => {
  return date.toLocaleDateString()
}

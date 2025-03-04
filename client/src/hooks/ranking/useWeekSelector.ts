import { useState } from 'react'
import { useSearchParams } from 'react-router'

export const useWeekSelector = (defaultValue: number) => {
  const [searchParams, setSearchParams] = useSearchParams()

  const weekParam = searchParams.get('week') ?? defaultValue.toString()
  const defaultWeek = parseInt(weekParam)
  const [selectedWeekId, setSelectedWeekId] = useState<number>(defaultWeek)

  const handleSelectWeek = (weekId: number) => {
    setSelectedWeekId(weekId)
    setSearchParams({ week: weekId.toString() })
  }

  return {
    selectedWeekId,
    handleSelectWeek,
  }
}

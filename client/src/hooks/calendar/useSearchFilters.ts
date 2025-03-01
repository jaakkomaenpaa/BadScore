import { SearchParams } from '@/types/misc'
import { formatDateToApi, getWeek } from '@/utils/dates'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

const defaultFilters: SearchParams = {
  startDate: formatDateToApi(getWeek(0).startDate),
  endDate: `${new Date().getFullYear()}-12-31`,
}

export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Extract search params from URL if they exist
  const filters = useMemo(() => {
    const extractedFilters = Array.from(searchParams.entries()).reduce<SearchParams>(
      (acc, [key, value]) => {
        if (value) acc[key as keyof SearchParams] = value
        return acc
      },
      {}
    )

    return Object.keys(extractedFilters).length > 0
      ? extractedFilters
      : { ...defaultFilters }
  }, [searchParams])

  const handleFilterChange = (updates: Partial<SearchParams>) => {
    const newFilters = { ...filters, ...updates }

    // Remove empty values
    Object.keys(newFilters).forEach((key) => {
      if (
        newFilters[key as keyof SearchParams] === '' ||
        newFilters[key as keyof SearchParams] === null
      ) {
        delete newFilters[key as keyof SearchParams]
      }
    })

    setSearchParams(newFilters)
  }

  const resetFilters = () => {
    setSearchParams(defaultFilters)
  }

  return { filters, handleFilterChange, resetFilters }
}

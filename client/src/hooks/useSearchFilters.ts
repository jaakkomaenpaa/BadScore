import { SearchParams } from '@/types/tournament'
import { formatDateToApi, getWeek } from '@/utils'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

const defaultFilters: SearchParams = {
  startDate: formatDateToApi(getWeek(0).startDate),
}

export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  // Extract search params from URL if they exist
  const [filters, setFilters] = useState<SearchParams>(() => {
    return Array.from(searchParams.entries()).reduce<SearchParams>(
      (acc, [key, value]) => {
        if (value) acc[key as keyof SearchParams] = value
        return acc
      },
      { ...defaultFilters }
    )
  })

  useEffect(() => {
    setSearchParams(filters)
  }, [filters, setSearchParams])

  const handleFilterChange = (key: keyof SearchParams, value: any) => {
    setFilters((prev) => {
      const updatedFilters = { ...prev }
      if (value === '' || value === null) {
        delete updatedFilters[key]
      } else {
        updatedFilters[key] = value
      }
      return updatedFilters
    })
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }
  
  return { filters, handleFilterChange, resetFilters }
}

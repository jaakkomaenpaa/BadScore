import calendarService from '@/services/calendar'
import { useEffect, useMemo, useState } from 'react'
import { TournamentList } from '@/components/calendar/TournamentList'
import {
  Country,
  SearchParams,
  TournamentCategory,
  TournamentOrganization,
  TournamentPreview,
} from '@/types/tournament'
import { SearchBar } from '@/components/calendar/SearchBar'
import { Box, CircularProgress } from '@mui/material'
import { useSearchParams } from 'react-router'
import { formatDateToApi, getWeek } from '@/utils'

const defaultFilters: SearchParams = {
  startDate: formatDateToApi(getWeek(0).startDate),
}

function Calendar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState<SearchParams>(() => {
    const extractedFilters = Array.from(searchParams.entries()).reduce<SearchParams>(
      (acc, [key, value]) => {
        if (value) acc[key as keyof SearchParams] = value
        return acc
      },
      defaultFilters
    )

    return extractedFilters
  })

  const [tournaments, setTournaments] = useState<TournamentPreview[]>([])
  const [organizations, setOrganizations] = useState<TournamentOrganization[]>([])
  const [countries, setCountries] = useState<Country[]>([])
  const [categories, setCategories] = useState<TournamentCategory[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Fetch data for dropdowns
  useEffect(() => {
    setIsLoading(true)

    const getData = async () => {
      try {
        const [countryData, organizationData, categoryData] = await Promise.all([
          calendarService.getCountries(),
          calendarService.getOrganizations(),
          calendarService.getCategories(),
        ])

        if (countryData) setCountries(countryData)
        if (organizationData) setOrganizations(organizationData)
        if (categoryData) setCategories(categoryData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])

  // Handle search
  useEffect(() => {
    setIsLoading(true)
    setSearchParams(filters)

    const search = async () => {
      try {
        const tournamentData = await calendarService.searchTournaments(filters)
        if (tournamentData) setTournaments(tournamentData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    search()
  }, [filters, setSearchParams])

  const memoizedCountries = useMemo(() => countries, [countries])
  const memoizedOrganizations = useMemo(() => organizations, [organizations])
  const memoizedCategories = useMemo(() => categories, [categories])

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

  if (isLoading)
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <CircularProgress />
      </Box>
    )

  return (
    <>
      <h2 style={{ color: 'white' }}>Calendar</h2>
      <SearchBar
        countries={memoizedCountries}
        organizations={memoizedOrganizations}
        categories={memoizedCategories}
        filters={filters}
        onFilterChange={handleFilterChange}
        resetFilters={resetFilters}
      />
      <TournamentList tournaments={tournaments} />
    </>
  )
}

export default Calendar

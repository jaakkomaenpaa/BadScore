import {
  Country,
  TournamentCategory,
  TournamentOrganization,
} from '@/types/tournament'
import { useEffect, useMemo, useState } from 'react'
import calendarService from '@/services/calendar'

export const useDropdownData = () => {
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

  const memoizedCountries = useMemo(() => countries, [countries])
  const memoizedOrganizations = useMemo(() => organizations, [organizations])
  const memoizedCategories = useMemo(() => categories, [categories])

  return {
    countries: memoizedCountries,
    organizations: memoizedOrganizations,
    categories: memoizedCategories,
    isLoading,
  }
}

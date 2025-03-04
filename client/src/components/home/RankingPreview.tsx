import {
  PlayerRankingEntry,
  Ranking,
  RankingCategory,
  TeamRankingEntry,
} from '@/types/ranking'
import { Box, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import { useEffect, useState } from 'react'
import rankingService from '@/services/ranking'
import { SecondaryButton } from '../buttons/SecondaryButton'
import { NavLink } from 'react-router'
import { RankingTable } from '../ranking/RankingTable'

const ranking: Ranking = {
  categories: [
    {
      id: 6,
      isDoubles: false,
      name: "Men's Singles",
      shortName: 'MS',
    },
    {
      id: 7,
      isDoubles: false,
      name: "Women's Singles",
      shortName: 'WS',
    },
    {
      id: 8,
      isDoubles: true,
      name: "Men's Doubles",
      shortName: 'MD',
    },
    {
      id: 9,
      isDoubles: true,
      name: "Women's Doubles",
      shortName: 'WD',
    },
    {
      id: 10,
      isDoubles: true,
      name: 'Mixed Doubles',
      shortName: 'XD',
    },
  ],
  id: 2,
  isTeam: false,
  name: 'BWF World Rankings',
  name2: 'BWF World Rankings',
}

export function RankingPreview() {
  const [rankingEntries, setRankingEntries] = useState<
    PlayerRankingEntry[] | TeamRankingEntry[]
  >([])
  const [selectedCategory, setSelectedCategory] = useState<RankingCategory>(
    ranking.categories[0]
  )
  const [loading, setLoading] = useState<boolean>(true)
  const isMobile = useMediaQuery('(max-width: 600px)')

  useEffect(() => {
    const fetchRanking = async () => {
      setLoading(true)

      const response = await rankingService.getRankingTable({
        rankingId: ranking.id,
        categoryId: selectedCategory.id,
        weekId: 0,
        isDoubles: selectedCategory.isDoubles,
        page: 1,
        perPage: 10,
      })

      setRankingEntries(response.entries)
      setLoading(false)
    }

    fetchRanking()
  }, [selectedCategory])

  return (
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', padding: 2, gap: 2 }}>
        <Typography variant='h6' sx={{ color: 'text.primary', alignSelf: 'center' }}>
          {ranking.name}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          {isMobile ? (
            <RankingSelect
              categories={ranking.categories}
              selectedCategory={selectedCategory}
              disabled={loading}
              onSelect={setSelectedCategory}
            />
          ) : (
            <RankingButtons
              categories={ranking.categories}
              selectedCategory={selectedCategory}
              onSelect={setSelectedCategory}
            />
          )}
          <NavLink
            to='/rankings'
            style={{
              textDecoration: 'none',
            }}
          >
            <Typography
              variant='body1'
              sx={{ color: 'text.primary', textDecoration: 'underline' }}
            >
              View more
            </Typography>
          </NavLink>
        </Box>

        <RankingTable entries={rankingEntries} ranking={ranking} loading={loading} />
      </Box>
    </Box>
  )
}

type RankingButtonsProps = {
  categories: RankingCategory[]
  selectedCategory: RankingCategory
  onSelect: (category: RankingCategory) => void
}

function RankingButtons({
  categories,
  selectedCategory,
  onSelect,
}: RankingButtonsProps) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', gap: 1 }}>
      {categories.map((category: RankingCategory) => (
        <SecondaryButton
          key={category.id}
          sx={{ width: 50 }}
          label={category.shortName}
          onClick={() => onSelect(category)}
          isActive={category.id === selectedCategory.id}
        />
      ))}
    </Box>
  )
}

type RankingSelectProps = {
  categories: RankingCategory[]
  selectedCategory: RankingCategory
  disabled: boolean
  onSelect: (category: RankingCategory) => void
}

function RankingSelect({
  categories,
  selectedCategory,
  disabled,
  onSelect,
}: RankingSelectProps) {
  return (
    <Select
      sx={{ width: '120px' }}
      labelId='event-label'
      id='event-select'
      value={JSON.stringify(selectedCategory)}
      onChange={(e) => onSelect(JSON.parse(e.target.value))}
      disabled={disabled}
    >
      {categories.map((category) => (
        <MenuItem key={category.id} value={JSON.stringify(category)}>
          {category.shortName}
        </MenuItem>
      ))}
    </Select>
  )
}

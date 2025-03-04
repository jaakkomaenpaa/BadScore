import { useWeekSelector } from '@/hooks/ranking/useWeekSelector'
import { RankingWeek } from '@/types/ranking'
import { MenuItem, Select } from '@mui/material'

type WeekSelectorProps = {
  weeks: RankingWeek[]
  disabled: boolean
}

export function WeekSelector({ weeks, disabled }: WeekSelectorProps) {
  const { selectedWeekId, handleSelectWeek } = useWeekSelector(weeks[0].id)

  return (
    <Select
      id='week-select'
      value={selectedWeekId}
      onChange={(e) => handleSelectWeek(parseInt(e.target.value.toString()))}
      disabled={disabled}
    >
      {weeks.map((week: RankingWeek) => (
        <MenuItem key={week.id} value={week.id}>
          {week.year} - Week {week.week}
        </MenuItem>
      ))}
    </Select>
  )
}

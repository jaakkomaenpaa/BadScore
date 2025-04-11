import { Typography } from '@mui/material'
import { ChangeEvent } from 'react'

type Option<T> = {
  label: string
  value: T
}

type SelectProps<T> = {
  options: Option<T>[]
  value: T
  onChange: (value: T) => void
  label?: string
}

export function Select<T>({ options, value, onChange, label }: SelectProps<T>) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex
    const selectedOption = options[selectedIndex]
    onChange(selectedOption.value)
  }

  return (
    <div style={{}}>
      {label && <Typography style={{}}>{label}</Typography>}
      <select
        value={options.findIndex((option: Option<T>) => option.value === value)}
        onChange={handleChange}
        style={{}}
      >
        {options.map((option: Option<T>, index: number) => (
          <option key={index} value={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

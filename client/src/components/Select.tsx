import { Box, Typography } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

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

// Mostly vibe coded
export function Select<T>({ options, value, onChange, label }: SelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        position: 'relative',
        maxWidth: '200px',
      }}
      ref={dropdownRef}
    >
      {label && (
        <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
          {label}
        </Typography>
      )}

      {/* Trigger */}
      <Box
        onClick={() => setIsOpen((prev) => !prev)}
        sx={{
          padding: '10px 12px',
          border: '1px solid',
          borderRadius: '8px',
          backgroundColor: 'secondary.main',
          cursor: 'pointer',
          userSelect: 'none',
          display: 'flex',
          flexDirection: 'row',
          transition: '0.3s',
          '&:hover': {
            opacity: 0.8,
          },
        }}
      >
        <Typography sx={{ color: 'text.primary', fontWeight: 500 }}>
          {selectedOption?.label ?? 'Select...'}
        </Typography>
        <ArrowDropDownIcon sx={{ color: 'text.primary', marginLeft: 'auto' }} />
      </Box>

      {/* Dropdown */}
      {isOpen && (
        <ul
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            listStyle: 'none',
            padding: 0,
            zIndex: 10,
            maxHeight: '300px',
            overflowY: 'auto',
          }}
        >
          {options.map((option, index) => (
            <li
              key={index}
              onClick={() => {
                onChange(option.value)
                setIsOpen(false)
              }}
              style={{
                padding: '10px 12px',
                cursor: 'pointer',
                backgroundColor: option.value === value ? '#f0f0f0' : 'white',
                color: '#333',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f5f5f5'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  option.value === value ? '#f0f0f0' : 'white'
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

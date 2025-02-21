export const getRoundName = (matchesLength: number) => {
  if (matchesLength === 1) return 'Final'
  if (matchesLength === 2) return 'Semifinals'
  if (matchesLength === 4) return 'Quarterfinals'
  return `Round of ${2 * matchesLength}`
}

export const getTopCellsToAdd = (round: number) => 2 ** round - 1

export const getMiddleCellsToAdd = (round: number) => 2 ** (round + 1) - 1 - 1

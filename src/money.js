import { FX_PKR_PER_UNIT } from './data.js'

// Fares are stored in PKR. Switching the widget's currency has to convert —
// relabelling the same figure would quote a 20,830 rupee ticket as 20,830
// dollars. Rates are indicative, not a live feed (see data.js).
export function money(pkr, cur = 'PKR') {
  const rate = FX_PKR_PER_UNIT[cur]
  if (!rate) return `PKR ${new Intl.NumberFormat('en-PK').format(Math.round(pkr))}`
  const value = pkr / rate
  return `${cur} ${new Intl.NumberFormat('en-PK', {
    maximumFractionDigits: value < 1000 ? 2 : 0,
  }).format(value)}`
}

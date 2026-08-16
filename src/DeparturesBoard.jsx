import { useEffect, useState } from 'react'
import { DEPARTURES } from './data.js'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789: '

// Split-flap text: scrambles, then locks left to right on mount. Deterministic
// (no randomness) and skipped entirely under reduced motion.
function SplitFlap({ text, className = '' }) {
  const reduce =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [display, setDisplay] = useState(reduce ? text : ' '.repeat(text.length))

  useEffect(() => {
    if (reduce) {
      setDisplay(text)
      return
    }
    let frame = 0
    const id = setInterval(() => {
      frame++
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (frame > i * 2 + 5) return ch
            if (ch === ' ') return ' '
            return CHARS[(frame * 7 + i * 13) % CHARS.length]
          })
          .join(''),
      )
      if (frame > text.length * 2 + 6) clearInterval(id)
    }, 45)
    return () => clearInterval(id)
  }, [text, reduce])

  return <span className={`data ${className}`}>{display}</span>
}

// Status as a bordered pill, the way the design calls it: boarding is the only
// filled one, so the eye lands on the flight that is actually leaving.
const STATUS = {
  BOARDING: 'border-lime/40 bg-lime/20 text-lime',
  'ON TIME': 'text-mint',
  DELAYED: 'text-[#f5a524]',
  'GATE OPEN': 'text-[#44a5d8]',
}

export default function DeparturesBoard() {
  return (
    <div className="panel overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-5 py-3">
        <span className="data text-[11px] uppercase tracking-[0.2em] text-white/65">
          Karachi (KHI) · departures
        </span>
        <span className="data flex items-center gap-2 text-[11px] tracking-[0.15em] text-mint">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-mint" /> LIVE
        </span>
      </div>

      <div className="grid grid-cols-[4.5rem_1fr_4rem_6rem] gap-3 px-5 py-2 text-[11px] uppercase tracking-[0.15em] text-white/55 sm:grid-cols-[5rem_5rem_1fr_4rem_7rem]">
        <span>Time</span>
        <span className="hidden sm:block">Flight</span>
        <span>Destination</span>
        <span>Gate</span>
        <span className="text-right">Status</span>
      </div>

      <div className="divide-y divide-white/5">
        {DEPARTURES.map((d) => (
          <div
            key={d.flight}
            className="grid grid-cols-[4.5rem_1fr_4rem_6rem] items-center gap-3 px-5 py-3 text-sm sm:grid-cols-[5rem_5rem_1fr_4rem_7rem]"
          >
            <SplitFlap text={d.time} className="text-white" />
            <SplitFlap text={d.flight} className="hidden text-mint sm:block" />
            <SplitFlap text={d.dest} className="tracking-wider text-white/85" />
            <SplitFlap text={d.gate} className="text-white/50" />
            <span className="text-right">
              <span className={`chip ${STATUS[d.status] || 'text-white/60'}`}>{d.status}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

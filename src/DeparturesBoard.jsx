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

const STATUS = {
  BOARDING: 'text-[#cdd500]',
  'ON TIME': 'text-white/70',
  DELAYED: 'text-[#f5a524]',
  'GATE OPEN': 'text-[#44a5d8]',
}

export default function DeparturesBoard() {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-5 py-3">
        <span className="data text-xs uppercase tracking-[0.2em] text-white/50">
          Departures · Karachi KHI
        </span>
        <span className="data flex items-center gap-2 text-xs text-[#cdd500]">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#cdd500]" /> LIVE
        </span>
      </div>

      <div className="grid grid-cols-[4.5rem_1fr_4rem_6rem] gap-3 px-5 py-2 text-[10px] uppercase tracking-[0.15em] text-white/30 sm:grid-cols-[5rem_5rem_1fr_4rem_7rem]">
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
            <SplitFlap text={d.time} className="font-bold text-white/90" />
            <SplitFlap text={d.flight} className="hidden text-white/60 sm:block" />
            <SplitFlap text={d.dest} className="font-bold tracking-wider text-white/90" />
            <SplitFlap text={d.gate} className="text-white/60" />
            <span className={`data text-right text-xs font-bold ${STATUS[d.status] || 'text-white/60'}`}>
              {d.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

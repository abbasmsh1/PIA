import { useState } from 'react'
import { DESTINATIONS } from './data.js'
import { COORDS, HUB, W, H, px, py } from './geo.js'

// Arcs from Karachi to every destination that has coordinates. The projection
// and its bounds live in geo.js so `npm run check` can assert nothing falls off
// the canvas — the network spans Toronto to Tokyo, so that is a real risk.

const [SX, SY] = [px(COORDS[HUB][0]), py(COORDS[HUB][1])]

// Gulf and domestic ports sit almost on top of each other at this scale, so
// labelling all of them produces a pile of overlapping text. Keep a label only
// where nothing already-labelled is within LABEL_GAP; work outward from the hub
// so the isolated long-haul points win their labels and the dense cluster near
// Karachi is left as dots that name themselves on hover.
const LABEL_GAP = 34

function labelled(dests) {
  const kept = []
  const placed = []
  const byDistance = [...dests].sort((a, b) => {
    const d = (p) => Math.hypot(px(COORDS[p.code][0]) - SX, py(COORDS[p.code][1]) - SY)
    return d(b) - d(a)
  })
  for (const d of byDistance) {
    const x = px(COORDS[d.code][0])
    const y = py(COORDS[d.code][1])
    if (placed.some((p) => Math.hypot(p.x - x, p.y - y) < LABEL_GAP)) continue
    placed.push({ x, y })
    kept.push(d.code)
  }
  return new Set(kept)
}

export default function RouteMap() {
  const [hover, setHover] = useState(null)
  const dests = DESTINATIONS.filter((d) => d.code !== HUB && COORDS[d.code])
  const active = dests.find((d) => d.code === hover)
  const showLabel = labelled(dests)

  return (
    <div className="tablet relative overflow-hidden">
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label="PIA route map from Karachi">
        {dests.map((d, i) => {
          const x = px(COORDS[d.code][0])
          const y = py(COORDS[d.code][1])
          const on = hover === d.code
          // Bow the arc away from the straight line, scaled to sector length so
          // short Gulf hops do not balloon.
          const lift = Math.min(90, Math.hypot(x - SX, y - SY) * 0.28)
          return (
            <path
              key={d.code}
              pathLength="1"
              d={`M${SX},${SY} Q${(SX + x) / 2},${(SY + y) / 2 - lift} ${x},${y}`}
              fill="none"
              stroke={on ? '#d9bc55' : 'rgba(217,188,85,0.30)'}
              strokeWidth={on ? 2.5 : 1}
              className="route-line"
              style={{ animationDelay: `${i * 70}ms` }}
            />
          )
        })}

        {dests.map((d) => {
          const x = px(COORDS[d.code][0])
          const y = py(COORDS[d.code][1])
          const on = hover === d.code
          return (
            <g
              key={d.code}
              onMouseEnter={() => setHover(d.code)}
              onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(d.code)}
              onBlur={() => setHover(null)}
              onTouchStart={() => setHover(d.code)}
              tabIndex={0}
              role="button"
              aria-label={`${d.city} (${d.code})`}
              className="cursor-pointer [&:focus-visible>circle]:stroke-mint"
            >
              <circle
                cx={x}
                cy={y}
                r={on ? 6 : 3.5}
                fill={on ? '#d9bc55' : '#f3eee3'}
                strokeWidth="2"
                className="[stroke:transparent]"
              />
              {(on || showLabel.has(d.code)) && (
                <text
                  x={x}
                  y={y - 10}
                  textAnchor="middle"
                  className={`data ${on ? 'fill-white' : 'fill-white/55'}`}
                  fontSize="11"
                  // a hovered label must sit above its neighbours' dots
                  style={on ? { paintOrder: 'stroke', stroke: 'var(--emerald-deep)', strokeWidth: 4 } : undefined}
                >
                  {d.code}
                </text>
              )}
              <circle cx={x} cy={y} r={14} fill="transparent" />
            </g>
          )
        })}

        {/* Karachi hub */}
        <circle cx={SX} cy={SY} r={13} fill="none" stroke="#d9bc55" strokeWidth="1.5" opacity="0.7" />
        <circle cx={SX} cy={SY} r={6} fill="#d9bc55" />
        <text x={SX} y={SY + 26} textAnchor="middle" className="data fill-white" fontSize="13" fontWeight="bold">
          KARACHI
        </text>
      </svg>

      <div className="pointer-events-none absolute bottom-4 left-4 rounded-md border border-[rgba(217,188,85,0.4)] bg-[#0a2e1e] px-4 py-3">
        {active ? (
          <div className="flex flex-wrap items-center gap-3">
            <span className="data text-sm text-ivory/70">
              {HUB} → {active.code}
            </span>
            <span className="text-sm font-semibold text-ivory">{active.city}</span>
            {active.fare && (
              <span className="data font-bold text-[#d9bc55]">
                from PKR {new Intl.NumberFormat('en-PK').format(active.fare)}
              </span>
            )}
          </div>
        ) : (
          <span className="text-xs font-medium tracking-[0.02em] text-ivory/80">Pick a destination to see its fare</span>
        )}
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'

// Destinations flying a departure arc.
//
// The mechanism is the one 21st.dev publishes as "Marquee Along SVG Path"
// (danielpetho / fancycomponents.dev): items are placed with the CSS
// `offset-path` property and moved by animating `offset-distance` from 0 to
// 100%, wrapping round. Two departures from their build:
//
// - They drive it with framer-motion values. The takeoff canvas here already
//   showed that framer-motion 12 on React 19.2 unmounts the tree when it
//   animates DOM nodes, so one CSS variable per item is driven from a
//   requestAnimationFrame loop instead.
// - `offset-path: path()` resolves in CSS pixels while an SVG with a viewBox
//   scales to its container, so the drawn curve and the travelling items drift
//   apart on any width but one. The stage below is therefore a fixed
//   STAGE_W x STAGE_H box — one coordinate space for both — scaled to whatever
//   width it is given.
//
// For an airline the pattern earns its keep: the path is a departure arc, the
// items are the ports, and an aircraft rides the same curve.

const STAGE_W = 900
const STAGE_H = 260
const PATH = `M -60 210 C 200 30, 700 30, ${STAGE_W + 60} 210`

export default function RouteMarquee({ items = [], seconds = 30 }) {
  const boxRef = useRef(null)
  const stageRef = useRef(null)
  const [scale, setScale] = useState(1)

  // One coordinate space, scaled to the column it is dropped into.
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / STAGE_W))
    ro.observe(box)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const nodes = [...stage.querySelectorAll('[data-offset]')]
    let raf = 0
    let last = performance.now()
    let travelled = 0
    let running = true

    const step = (now) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      if (running) travelled = (travelled + dt / seconds) % 1
      for (const el of nodes) {
        const base = Number(el.dataset.offset)
        el.style.setProperty('--d', `${((base + travelled) % 1) * 100}%`)
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)

    // Holding still on hover is what makes the labels readable rather than
    // decorative; a moving target you cannot click is worse than no motion.
    const stop = () => (running = false)
    const go = () => (running = true)
    stage.addEventListener('pointerenter', stop)
    stage.addEventListener('pointerleave', go)
    stage.addEventListener('focusin', stop)
    stage.addEventListener('focusout', go)
    return () => {
      cancelAnimationFrame(raf)
      stage.removeEventListener('pointerenter', stop)
      stage.removeEventListener('pointerleave', go)
      stage.removeEventListener('focusin', stop)
      stage.removeEventListener('focusout', go)
    }
  }, [items.length, seconds])

  return (
    <div ref={boxRef} className="w-full overflow-hidden" style={{ height: STAGE_H * scale }}>
      <div
        ref={stageRef}
        className="relative isolate select-none"
        style={{
          width: STAGE_W,
          height: STAGE_H,
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          '--path': `path('${PATH}')`,
        }}
      >
        <svg
          width={STAGE_W}
          height={STAGE_H}
          viewBox={`0 0 ${STAGE_W} ${STAGE_H}`}
          className="absolute inset-0"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="routeFade" x1="0" x2="1">
              <stop offset="0" stopColor="#d9bc55" stopOpacity="0" />
              <stop offset="0.5" stopColor="#d9bc55" stopOpacity="0.5" />
              <stop offset="1" stopColor="#d9bc55" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={PATH} fill="none" stroke="url(#routeFade)" strokeWidth="1" strokeDasharray="4 8" />
        </svg>

        {items.map((d, i) => (
          <a
            key={d.code}
            href={`/?from=KHI&to=${d.code}`}
            data-offset={i / items.length}
            style={{
              offsetPath: 'var(--path)',
              offsetRotate: '0deg',
              offsetDistance: 'var(--d)',
              '--d': `${(i / items.length) * 100}%`,
            }}
            className="group absolute left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-baseline gap-2 whitespace-nowrap rounded-full border border-white/10 bg-black/45 px-3.5 py-1.5 backdrop-blur-md transition-colors hover:border-gold/60"
          >
            <span className="data text-xs tracking-[0.12em] text-gold">{d.code}</span>
            <span className="text-sm text-white/75 transition-colors group-hover:text-white">
              {d.city}
            </span>
          </a>
        ))}

        {/* The aircraft rides the same curve, a third of a turn ahead. */}
        <span
          aria-hidden="true"
          data-offset="0.34"
          style={{ offsetPath: 'var(--path)', offsetDistance: 'var(--d)', '--d': '34%' }}
          className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 text-gold"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 16v-2l-8-2.5V6.5a1.5 1.5 0 0 0-3 0v5L2 14v2l8-1.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-4.5L21 16Z" />
          </svg>
        </span>
      </div>
    </div>
  )
}

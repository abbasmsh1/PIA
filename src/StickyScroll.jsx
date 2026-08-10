import { useEffect, useRef, useState } from 'react'
import Scenic from './Scenic.jsx'

// The visual pins while the feature panels scroll past; whichever panel is
// crossing the viewport centre swaps the pinned panel.
const STEPS = [
  {
    title: 'A widebody fleet',
    body: 'Four 777-300ERs, six 777-200ERs and the two 777-200LRs PIA launched — the long-haul backbone to Europe and North America.',
    seed: 'B777',
  },
  {
    title: 'Executive Economy',
    body: 'Twelve kilos of cabin baggage, priority check-in, extra pitch and full meal service — PIA’s premium cabin, not a rebadged business class.',
    seed: 'EXE',
  },
  {
    title: 'Award +Plus',
    body: 'Earn on every sector, pool points across the family, and redeem for award tickets, upgrades, excess baggage and seat pre-allocation.',
    seed: 'AWARD',
  },
  {
    title: 'From the north to the Gulf',
    body: 'Skardu and Gilgit in the Karakoram, Gwadar on the Makran coast, and onward to Dubai, Jeddah, Kuala Lumpur and Toronto.',
    seed: 'KDU',
  },
]

export default function StickyScroll() {
  const [active, setActive] = useState(0)
  const refs = useRef([])

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.i))
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    refs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="snap-start snap-always mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10">
      <span className="data text-xs uppercase tracking-[0.3em] text-[#cdd500]">Why fly with us</span>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white/90 md:text-5xl">
        Great people to fly with
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="hidden md:block">
          <div className="sticky top-28 aspect-[4/5] max-h-[72vh] overflow-hidden rounded-3xl border border-white/10">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  active === i ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Scenic seed={s.seed} label={s.seed} className="h-full w-full" />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="data text-xs tracking-[0.2em] text-[#cdd500]">
                0{active + 1} <span className="text-white/40">/ 0{STEPS.length}</span>
              </span>
              <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">{STEPS[active].title}</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          {STEPS.map((s, i) => (
            <div
              key={s.title}
              data-i={i}
              ref={(el) => {
                refs.current[i] = el
              }}
              className={`flex min-h-[70vh] flex-col justify-center transition-opacity duration-300 md:min-h-[80vh] ${
                active === i ? 'opacity-100' : 'md:opacity-35'
              }`}
            >
              <Scenic seed={s.seed} label={s.seed} className="mb-6 aspect-video w-full rounded-2xl border border-white/10 md:hidden" />
              <span className="data text-xs tracking-[0.2em] text-[#cdd500] md:hidden">
                0{i + 1} / 0{STEPS.length}
              </span>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight text-white/90 md:mt-0 md:text-4xl">
                {s.title}
              </h3>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/60">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

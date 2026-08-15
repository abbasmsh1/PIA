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
    <section className="snap-start snap-always scroll-mt-40 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-start px-6 pb-28 pt-44 md:px-10">
      <h2 className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-[3.25rem] md:leading-[1.05]">
        Great people to fly with
      </h2>

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="hidden md:block">
          <div className="panel sticky top-28 aspect-[4/5] max-h-[72vh] overflow-hidden p-0">
            {STEPS.map((s, i) => (
              <div
                key={s.title}
                className={`absolute inset-0 transition-opacity duration-700 ${
                  active === i ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Scenic
                  seed={s.seed}
                  label={s.seed}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="h-full w-full"
                />
              </div>
            ))}
            <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/25 p-6 backdrop-blur-xl">
              <span className="data text-xs tracking-[0.2em] text-lime">
                0{active + 1} <span className="text-white/60">/ 0{STEPS.length}</span>
              </span>
              <h3 className="mt-1 text-2xl font-semibold tracking-[-0.02em] text-white">{STEPS[active].title}</h3>
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
              <Scenic seed={s.seed} label={s.seed} sizes="100vw" className="panel mb-6 aspect-video w-full overflow-hidden p-0 md:hidden" />
              <span className="data text-xs tracking-[0.2em] text-lime md:hidden">
                0{i + 1} / 0{STEPS.length}
              </span>
              <h3 className="mt-2 text-3xl font-semibold tracking-[-0.02em] text-white md:mt-0 md:text-[2.5rem]">
                {s.title}
              </h3>
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-white/70">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

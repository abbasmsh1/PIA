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
    <section className="snap-start snap-always scroll-mt-36 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-start px-6 pb-24 pt-40 md:px-10">
      <h2 className="text-4xl text-ink md:text-[3.25rem] md:leading-[1.08]">
        Great people to fly with
      </h2>
      <div aria-hidden className="mt-5 h-[5px] w-24 border-y border-[color:var(--gold-line)]" />

      <div className="mt-12 grid gap-12 md:grid-cols-2">
        <div className="hidden md:block">
          <div className="sticky top-32">
            <div
              className="relative aspect-[4/5] max-h-[70vh] w-full overflow-hidden"
              style={{ clipPath: 'url(#jali-arch)' }}
            >
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
              <div className="absolute inset-x-0 bottom-0 p-6">
                <span className="data text-xs tracking-[0.2em] text-[#d9bc55]">
                  0{active + 1} <span className="text-ivory/70">/ 0{STEPS.length}</span>
                </span>
                <h3 className="mt-1 font-display text-2xl text-ivory">{STEPS[active].title}</h3>
              </div>
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
                active === i ? 'opacity-100' : 'md:opacity-60'
              }`}
            >
              <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-lg md:hidden" style={{ clipPath: 'url(#jali-arch)' }}>
                <Scenic seed={s.seed} label={s.seed} sizes="100vw" className="absolute inset-0 h-full w-full" />
              </div>
              <span className="data text-xs tracking-[0.2em] text-gold md:hidden">
                0{i + 1} / 0{STEPS.length}
              </span>
              <h3 className="mt-2 font-display text-3xl text-ink md:mt-0 md:text-[2.5rem]">
                {s.title}
              </h3>
              <div aria-hidden className="mt-4 h-[5px] w-16 border-y border-[color:var(--gold-line)]" />
              <p className="mt-4 max-w-[62ch] text-base leading-relaxed text-ink/75">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

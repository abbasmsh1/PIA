import { useEffect, useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { FlightSearch } from './BookingElements.jsx'

// Scroll-linked canvas playback of a takeoff sequence. useScroll gives progress
// 0..1 and the canvas draws the matching preloaded frame; the text overlays
// fade from that same value.
//
// motion.div + useTransform is deliberately avoided: framer-motion 12 on React
// 19.2 throws a WAAPI animate() offset error that unmounts the tree. useScroll
// and useMotionValueEvent are stable, so plain divs are driven from state.

const FRAME_COUNT = 64
const frameUrl = (i) => `/frames/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

// Story beats keyed to scroll progress. `pos` puts each block in the part of
// the frame the aircraft is not occupying as it climbs.
const SECTIONS = [
  {
    at: 0.0,
    pos: 'justify-start items-center text-center pt-[14vh]',
    kicker: 'Pakistan International Airlines',
    title: 'Great People to Fly With',
    body: 'Cleared for takeoff from Karachi.',
  },
  {
    at: 0.3,
    pos: 'justify-start items-start text-left pt-[16vh]',
    kicker: 'Fifty destinations',
    title: 'Pakistan to the world',
    body: 'From Skardu in the Karakoram to Dubai, Jeddah, Kuala Lumpur, Paris and Toronto.',
  },
  {
    at: 0.6,
    pos: 'justify-end items-start text-left pb-[14vh]',
    kicker: 'Executive Economy',
    title: 'The premium cabin',
    body: '12 kg of cabin baggage, priority check-in, extra legroom and full meal service.',
  },
  {
    at: 0.9,
    pos: 'justify-end items-start text-left pb-[14vh]',
    kicker: 'Award +Plus',
    title: 'Every sector counts',
    body: 'Earn on every flight, pool points across the family, redeem for award tickets and upgrades.',
  },
]

// Triangular fade window centred on the beat.
function beat(progress, at) {
  return Math.max(0, 1 - Math.abs(progress - at) / 0.14)
}

export default function PlaneScroll() {
  const wrapRef = useRef(null)
  const canvasRef = useRef(null)
  const imagesRef = useRef([])
  const [loaded, setLoaded] = useState(0)
  const [ready, setReady] = useState(false)
  const [progress, setProgress] = useState(0)

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end end'],
  })

  useEffect(() => {
    let alive = true
    let done = 0
    const imgs = new Array(FRAME_COUNT)
    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image()
      img.src = frameUrl(i)
      img.onload = img.onerror = () => {
        if (!alive) return
        done++
        setLoaded(done)
        if (done === FRAME_COUNT) setReady(true)
      }
      imgs[i] = img
    }
    imagesRef.current = imgs
    return () => {
      alive = false
    }
  }, [])

  // Cover-fit draw with devicePixelRatio scaling, then a duotone pass.
  //
  // The takeoff frames are stock footage of another carrier's aircraft, so they
  // are pushed through a brand-coloured duotone: `color` keeps the luminosity
  // of the photograph but takes hue and saturation from the fill, which turns
  // the airframe into a graphic silhouette rather than a recognisable livery.
  // See the note in README about replacing the sequence outright.
  const ZOOM = 1.18

  function draw(index) {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.width) return
    const ctx = canvas.getContext('2d')
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const cw = canvas.clientWidth
    const ch = canvas.clientHeight
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr)
      canvas.height = Math.round(ch * dpr)
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    ctx.clearRect(0, 0, cw, ch)

    const scale = Math.max(cw / img.width, ch / img.height) * ZOOM
    const dw = img.width * scale
    const dh = img.height * scale
    ctx.globalCompositeOperation = 'source-over'
    ctx.drawImage(img, (cw - dw) / 2, (ch - dh) / 2, dw, dh)

    // Brand duotone: hue/saturation from the fill, luminosity from the frame.
    ctx.globalCompositeOperation = 'color'
    ctx.fillStyle = '#0a5f78'
    ctx.fillRect(0, 0, cw, ch)

    // Lift the greens back in so it reads as the PIA ramp rather than flat teal.
    ctx.globalCompositeOperation = 'overlay'
    const wash = ctx.createLinearGradient(0, ch, cw, 0)
    wash.addColorStop(0, 'rgba(13,87,45,0.55)')
    wash.addColorStop(0.6, 'rgba(0,125,52,0.28)')
    wash.addColorStop(1, 'rgba(255,229,36,0.16)')
    ctx.fillStyle = wash
    ctx.fillRect(0, 0, cw, ch)

    ctx.globalCompositeOperation = 'source-over'
  }

  const lastIndex = useRef(-1)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setProgress(p)
    if (!ready) return
    const index = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)))
    if (index !== lastIndex.current) {
      draw(index)
      lastIndex.current = index
    }
  })

  useEffect(() => {
    if (!ready) return
    const render = () => {
      const p = scrollYProgress.get()
      const index = Math.min(FRAME_COUNT - 1, Math.round(p * (FRAME_COUNT - 1)))
      lastIndex.current = index
      draw(index)
    }
    render()
    window.addEventListener('resize', render)
    return () => window.removeEventListener('resize', render)
  }, [ready, scrollYProgress])

  return (
    <div ref={wrapRef} className="relative h-[400vh] w-full">
      {/* One snap point per story beat across the 300vh scroll range. */}
      {[0, 90, 180, 270].map((t) => (
        <div
          key={t}
          className="snap-start snap-always pointer-events-none absolute left-0 h-px w-full"
          style={{ top: `${t}vh` }}
        />
      ))}

      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <canvas ref={canvasRef} className="h-full w-full" />

        {/* Booking widget sits in the hero so a fare is reachable without
            scrolling. It fades out as the takeoff scrub begins. */}
        {(() => {
          const o = Math.max(0, Math.min(1, 1 - progress / 0.12))
          return (
            <div
              style={{ opacity: o, pointerEvents: o > 0.6 ? 'auto' : 'none' }}
              className="absolute inset-x-0 bottom-0 z-20 px-4 pb-8 md:pb-12"
            >
              <FlightSearch />
            </div>
          )
        })()}

        {SECTIONS.map((s, i) => {
          const o = beat(progress, s.at)
          return (
            <div
              key={i}
              style={{
                opacity: o,
                transform: `translateY(${(1 - o) * 28}px)`,
                pointerEvents: o > 0.5 ? 'auto' : 'none',
              }}
              className={`absolute inset-0 flex flex-col gap-4 px-8 md:px-20 ${s.pos}`}
            >
              <div
                className="flex max-w-xl flex-col gap-3 rounded-3xl px-6 py-5 [text-shadow:_0_1px_24px_rgba(0,0,0,0.85)]"
                style={{
                  backgroundImage:
                    'radial-gradient(ellipse at center, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 55%, transparent 80%)',
                }}
              >
                <span
                  className="text-xs font-semibold uppercase tracking-[0.35em]"
                  style={{ color: s.at === 0.9 ? '#ffe524' : 'rgba(255,255,255,0.55)' }}
                >
                  {s.kicker}
                </span>
                <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 md:text-6xl">
                  {s.title}
                </h2>
                <p className="text-base leading-relaxed text-white/65 md:text-lg">{s.body}</p>
                {s.at === 0.9 && (
                  <a
                    href="#offers"
                    className="mt-2 w-fit rounded-full bg-[#007d34] px-7 py-3 text-sm font-semibold text-white shadow-lg shadow-[#007d34]/25 transition hover:brightness-110"
                  >
                    See fares
                  </a>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {!ready && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-5 bg-[#060912]">
          <div className="ps-spinner" />
          <span className="text-sm tracking-wide text-white/60">
            Preparing for departure… {Math.round((loaded / FRAME_COUNT) * 100)}%
          </span>
        </div>
      )}
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { useScroll, useMotionValueEvent } from 'framer-motion'
import { FlightSearch } from './BookingElements.jsx'
import { photoUrl } from './Scenic.jsx'

// Scroll-linked canvas playback of a takeoff sequence. useScroll gives progress
// 0..1 and the canvas draws the matching preloaded frame; the text overlays
// fade from that same value.
//
// motion.div + useTransform is deliberately avoided: framer-motion 12 on React
// 19.2 throws a WAAPI animate() offset error that unmounts the tree. useScroll
// and useMotionValueEvent are stable, so plain divs are driven from state.

// 192 frames of a PIA 777 rotating off the runway, 1280x720 each. The source
// renders in `Assets/` are PNG (121 MB, git-ignored); `public/takeoff` holds
// them re-encoded as progressive JPEG at q72 — 8.9 MB for the set, and
// indistinguishable from the PNGs at 1:1. The whole set preloads before the
// hero reveals, so the encode size is the page's first-paint budget.
const FRAME_COUNT = 192
const frameUrl = (i) => `/takeoff/frame_${String(i + 1).padStart(4, '0')}.jpg`

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

  // Cover-fit draw with devicePixelRatio scaling, then a light grade.
  //
  // The sequence is PIA's own livery now, so it is left recognisable: no
  // hue-replacing duotone, just a soft green-to-yellow wash off the brand ramp
  // and a bottom vignette to keep the overlay type legible.
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

    // Brand wash off the PIA ramp, gentle enough to leave the livery readable.
    ctx.globalCompositeOperation = 'overlay'
    const wash = ctx.createLinearGradient(0, ch, cw, 0)
    wash.addColorStop(0, 'rgba(13,87,45,0.30)')
    wash.addColorStop(0.6, 'rgba(0,125,52,0.14)')
    wash.addColorStop(1, 'rgba(255,229,36,0.10)')
    ctx.fillStyle = wash
    ctx.fillRect(0, 0, cw, ch)

    // Bottom vignette: the booking widget and the story copy sit down there.
    ctx.globalCompositeOperation = 'source-over'
    const vignette = ctx.createLinearGradient(0, ch, 0, ch * 0.45)
    vignette.addColorStop(0, 'rgba(6,9,18,0.75)')
    vignette.addColorStop(1, 'rgba(6,9,18,0)')
    ctx.fillStyle = vignette
    ctx.fillRect(0, 0, cw, ch)
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
        {/* 4K still under the canvas: it is what the hero shows while the 64
            frames decode, and what stays if any of them fail to load. */}
        <img
          src={photoUrl('HERO', 3840)}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <canvas ref={canvasRef} className="relative h-full w-full" />

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
          <img
            src={photoUrl('HERO', 2560)}
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="ps-spinner relative" />
          <span className="relative text-sm tracking-wide text-white/60">
            Preparing for departure… {Math.round((loaded / FRAME_COUNT) * 100)}%
          </span>
        </div>
      )}
    </div>
  )
}

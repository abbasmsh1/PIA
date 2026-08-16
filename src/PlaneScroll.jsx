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
// indistinguishable from the PNGs at 1:1. Only a 24-frame subset gates the
// reveal (see the loader below); the rest arrives behind a usable hero.
const FRAME_COUNT = 192
const frameUrl = (i) => `/takeoff/frame_${String(i + 1).padStart(4, '0')}.jpg`

// Story beats keyed to scroll progress. `pos` puts each block in the part of
// the frame the aircraft is not occupying as it climbs.
const SECTIONS = [
  {
    at: 0.0,
    pos: 'justify-start items-center text-center pt-[14vh]',
    title: 'Great People to Fly With',
    body: 'Cleared for takeoff from Karachi.',
  },
  {
    at: 0.3,
    pos: 'justify-start items-start text-left pt-[16vh]',
    title: 'Pakistan to the world',
    body: 'From Skardu in the Karakoram to Dubai, Jeddah, Kuala Lumpur, Paris and Toronto.',
  },
  {
    at: 0.6,
    pos: 'justify-end items-start text-left pb-[14vh]',
    title: 'The premium cabin',
    body: '12 kg of cabin baggage, priority check-in, extra legroom and full meal service.',
  },
  {
    at: 0.9,
    pos: 'justify-end items-start text-left pb-[14vh]',
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

  const lastIndex = useRef(-1)
  const drawRef = useRef(null)

  // Frames arrive coarse-to-fine rather than first-to-last.
  //
  // Waiting on all 192 frames meant an 8.9 MB spinner before anything moved.
  // The first pass takes every 8th frame, which covers the whole takeoff in 24
  // images (~1.1 MB) and is enough to scrub, so the hero reveals there. Later
  // passes fill in the halves, then the quarters, and the scrub sharpens while
  // it is already usable. Phones stop at every 2nd frame — 96 images is smooth
  // at that size and halves what a mobile connection has to carry.
  useEffect(() => {
    let alive = true
    const coarse = []
    const rest = []
    const fine = window.matchMedia('(min-width: 768px)').matches ? 1 : 2
    for (let gap = 8; gap >= fine; gap = gap >> 1) {
      for (let i = 0; i < FRAME_COUNT; i += gap) {
        if (imagesRef.current[i] !== undefined) continue
        imagesRef.current[i] = null // claimed, so a later gap does not requeue it
        ;(gap === 8 ? coarse : rest).push(i)
      }
    }

    let done = 0
    const load = (i) =>
      new Promise((resolve) => {
        const img = new Image()
        img.src = frameUrl(i)
        img.onload = img.onerror = () => {
          if (alive) {
            imagesRef.current[i] = img.width ? img : null
            done++
            setLoaded(done)
            // Repaint if this frame is the one the current scroll position
            // wanted; otherwise a reader who has stopped keeps the coarse frame.
            if (Math.abs(i - lastIndex.current) <= 12) drawRef.current?.(lastIndex.current)
          }
          resolve()
        }
      })

    // Six at a time: enough to saturate a fast link, few enough that the coarse
    // pass is not stuck behind a queue of frames nobody can see yet.
    const drain = async (queue) => {
      const workers = Array.from({ length: 6 }, async () => {
        while (alive && queue.length) await load(queue.shift())
      })
      await Promise.all(workers)
    }

    ;(async () => {
      await drain(coarse)
      if (!alive) return
      setReady(true)
      await drain(rest)
    })()

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

  // The frame for this scroll position may not have arrived yet, so fall back
  // to the closest one that has. Within 8 frames of a 192-frame takeoff the
  // aircraft has barely moved, and the gap closes as the fine passes land.
  function nearestLoaded(index) {
    const imgs = imagesRef.current
    if (imgs[index]) return imgs[index]
    for (let d = 1; d <= 12; d++) {
      if (imgs[index - d]) return imgs[index - d]
      if (imgs[index + d]) return imgs[index + d]
    }
    return null
  }

  function draw(index) {
    const canvas = canvasRef.current
    const img = nearestLoaded(index)
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

    // Vignettes top and bottom: the story beats sit in one or the other, and a
    // scrim across the whole frame holds white type without drawing a box
    // behind it.
    ctx.globalCompositeOperation = 'source-over'
    const bottom = ctx.createLinearGradient(0, ch, 0, ch * 0.42)
    bottom.addColorStop(0, 'rgba(6,9,18,0.80)')
    bottom.addColorStop(1, 'rgba(6,9,18,0)')
    ctx.fillStyle = bottom
    ctx.fillRect(0, 0, cw, ch)

    const top = ctx.createLinearGradient(0, 0, 0, ch * 0.52)
    top.addColorStop(0, 'rgba(6,9,18,0.72)')
    top.addColorStop(1, 'rgba(6,9,18,0)')
    ctx.fillStyle = top
    ctx.fillRect(0, 0, cw, ch)
  }

  drawRef.current = draw

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
              <div className="flex max-w-xl flex-col gap-3 px-6 py-5 [text-shadow:_0_2px_18px_rgba(0,0,0,0.7)]">
                <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white/90 md:text-6xl">
                  {s.title}
                </h2>
                <p className="max-w-[46ch] text-base leading-relaxed text-white/75 md:text-lg">{s.body}</p>
                {s.at === 0.9 && (
                  <a
                    href="#offers"
                    className="mt-3 w-fit rounded-full bg-[#007d34] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#007d34]/25 transition hover:brightness-115"
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
            Preparing for departure… {Math.min(100, Math.round((loaded / 24) * 100))}%
          </span>
        </div>
      )}
    </div>
  )
}

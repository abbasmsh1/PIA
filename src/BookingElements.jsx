import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { DESTINATIONS, FEATURED, FX_PKR_PER_UNIT } from './data.js'
import { money } from './money.js'

// The booking widget, PNR lookup and fare tickets.
//
// Modelled on the real piac.com.pk widget: a Flight tab with One Way / Round
// Trip / Multi City, swappable ports, passengers, cabin class and currency,
// alongside My Booking and Web Check-In tabs that both take PNR + surname.
//
// Two deliberate departures from the original. Currency defaults to PKR — the
// real widget ships it empty, which blocks a price for no reason. And the fare
// cards deep-link into this widget with the ports prefilled, mirroring what
// PIA's own "Book Now" buttons do by jumping straight to the booking engine.
//
// Animations use IntersectionObserver + CSS rather than motion.div: framer
// motion 12 throws a WAAPI offset error on React 19.2 that unmounts the tree.

const PORTS = DESTINATIONS.map((d) => [d.code, d.city])

const CURRENCIES = Object.keys(FX_PKR_PER_UNIT)
const CABINS = [
  ['ALL', 'All cabins'],
  ['ECO', 'Economy'],
  ['EXE', 'Executive Economy'],
]

// Scroll-reveal: fade+rise the first time an element enters the viewport.
export function useReveal(delay = 0) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.transitionDelay = `${delay}ms`
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('reveal-in')
          io.unobserve(el)
        }
      },
      { threshold: 0.15 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])
  return ref
}

const ICONS = {
  book: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z',
  manage: 'M3 7h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4V7Z',
  checkin: 'M8 2v3M16 2v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z',
}
const TABS = [
  ['book', 'Book a flight'],
  ['manage', 'My booking'],
  ['checkin', 'Web check-in'],
]

// Field: label always visible above the value, value in the data face, the
// whole thing inset darker than the panel it sits in.
function Field({ label, value, onChange, options, placeholder }) {
  const active = !!value
  return (
    <div className="group relative flex-1 rounded-md bg-s0 px-3 py-2.5 text-left hairline focus-within:border-mint/50">
      <span className="data pointer-events-none block text-[10px] uppercase tracking-[0.18em] text-white/40 group-focus-within:text-mint">
        {label}
      </span>
      {options ? (
        <select
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`data mt-1 w-full cursor-pointer truncate bg-transparent text-sm outline-none [&>option]:bg-s2 [&>option]:font-sans [&>option]:text-white ${
            active ? 'text-white' : 'text-white/40'
          }`}
        >
          <option value="">{label}</option>
          {options.map(([code, name]) => (
            <option key={code} value={code}>
              {name}
              {name === code ? '' : ` (${code})`}
            </option>
          ))}
        </select>
      ) : (
        <input
          aria-label={label}
          placeholder={placeholder}
          className="data mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35 [color-scheme:dark]"
        />
      )}
    </div>
  )
}

// Date range in a popover built on native date inputs — no calendar library.
function DateField({ round }) {
  const [open, setOpen] = useState(false)
  const [lv, setLv] = useState('')
  const [rt, setRt] = useState('')
  const ref = useRef(null)
  const today = new Date().toISOString().slice(0, 10)

  useEffect(() => {
    const h = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  const active = !!lv
  const text = round ? `${lv} → ${rt || '…'}` : lv

  return (
    <div ref={ref} className="relative flex-1">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full rounded-md border bg-s0 px-3 py-2.5 text-left ${
          open ? 'border-mint/50' : 'border-white/8'
        }`}
      >
        <span className="data block text-[10px] uppercase tracking-[0.18em] text-white/40">Dates</span>
        <span className={`data mt-1 block truncate text-sm ${active ? 'text-white' : 'text-white/35'}`}>
          {active ? text : 'Departure — Return'}
        </span>
      </button>

      {open && (
        <div className="panel absolute left-0 top-full z-30 mt-2 w-64 p-4 shadow-2xl shadow-black/60">
          <label className="block text-xs font-medium text-white/60">
            Departure
            <input
              type="date"
              min={today}
              value={lv}
              onChange={(e) => setLv(e.target.value)}
              className="data mt-1 w-full rounded-md border border-white/8 bg-s0 px-3 py-2 text-sm text-white outline-none [color-scheme:dark] focus:border-mint/50"
            />
          </label>
          {round && (
            <label className="mt-3 block text-xs font-medium text-white/60">
              Return
              <input
                type="date"
                min={lv || today}
                value={rt}
                onChange={(e) => setRt(e.target.value)}
                className="data mt-1 w-full rounded-md border border-white/8 bg-s0 px-3 py-2 text-sm text-white outline-none [color-scheme:dark] focus:border-mint/50"
              />
            </label>
          )}
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="data mt-4 w-full rounded-md bg-brand py-2 text-xs uppercase tracking-[0.15em] text-white hover:brightness-115"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}

// PNR + surname retrieval, shared by the My Booking and Web Check-In tabs and
// reused wholesale by the Manage page.
export function LookupPanel({ mode }) {
  const [pnr, setPnr] = useState('')
  const [ln, setLn] = useState('')
  const [found, setFound] = useState(false)
  const inputCls =
    'flex-1 rounded-md border border-white/8 bg-s0 px-4 py-3.5 text-sm text-white outline-none placeholder:text-white/35 focus:border-mint/50'

  return (
    <div className="mt-5">
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={pnr}
          onChange={(e) => setPnr(e.target.value.toUpperCase())}
          placeholder="PNR number"
          aria-label="PNR number"
          className={`${inputCls} data`}
        />
        <input
          value={ln}
          onChange={(e) => setLn(e.target.value)}
          placeholder="Surname"
          aria-label="Surname"
          className={inputCls}
        />
        <button
          onClick={() => setFound(!!(pnr.trim() && ln.trim()))}
          className="data rounded-md bg-brand px-8 py-3.5 text-xs uppercase tracking-[0.15em] text-white transition hover:brightness-115"
        >
          {mode === 'checkin' ? 'Check in' : 'Find booking'}
        </button>
      </div>

      {found && mode === 'manage' && (
        <div className="panel mt-5 p-5">
          <div className="flex items-center justify-between">
            <span className="data text-sm text-white/90">
              {pnr} · {ln}
            </span>
            <span className="data rounded-full bg-[#007d34]/20 px-3 py-1 text-xs font-bold text-[#cdd500]">
              CONFIRMED
            </span>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="data text-xl font-bold text-white/90">KHI</span>
            <span className="text-[#71af2e]">→</span>
            <span className="data text-xl font-bold text-white/90">DXB</span>
            <span className="data ml-2 text-sm text-white/50">PK 213 · 20 Aug · 09:05</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {['Change date', 'Add baggage', 'Select seat', 'Request refund'].map((a) => (
              <button
                key={a}
                className="rounded-full border border-white/15 px-4 py-2 text-xs text-white/80 hover:bg-white/10"
              >
                {a}
              </button>
            ))}
          </div>
        </div>
      )}

      {found && mode === 'checkin' && (
        <div className="mt-5 flex overflow-hidden rounded-xl hairline bg-s2">
          <div className="ramp w-1.5 shrink-0" />
          <div className="flex-1 p-5">
            <span className="data text-xs uppercase tracking-[0.2em] text-white/40">
              Boarding pass · {ln}
            </span>
            <div className="mt-3 flex items-center gap-3">
              <span className="data text-2xl font-bold text-white/90">KHI</span>
              <span className="text-[#71af2e]">→</span>
              <span className="data text-2xl font-bold text-white/90">DXB</span>
            </div>
            <div className="data mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-white/70">
              <span><span className="text-white/40">FLIGHT </span>PK 213</span>
              <span><span className="text-white/40">SEAT </span>21C</span>
              <span><span className="text-white/40">GATE </span>B1</span>
              <span><span className="text-white/40">BOARDS </span>08:25</span>
            </div>
          </div>
          <div className="flex w-24 shrink-0 items-center justify-center border-l border-dashed border-white/15 p-3">
            <div className="flex h-16 items-end gap-[2px]">
              {'7861955300213'.split('').map((n, i) => (
                <span
                  key={i}
                  className="w-[2px] bg-white/70"
                  style={{ height: `${30 + (Number(n) % 7) * 9}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function FlightSearch() {
  const ref = useReveal()
  const [params] = useSearchParams()
  const [tab, setTab] = useState('book')
  const [trip, setTrip] = useState('round')
  const [miles, setMiles] = useState(false)
  // Prefilled by the fare cards, which link to /?from=XXX&to=YYY.
  const [from, setFrom] = useState(params.get('from') || 'KHI')
  const [to, setTo] = useState(params.get('to') || 'DXB')
  const [cabin, setCabin] = useState('ALL')
  const [currency, setCurrency] = useState('PKR')
  const [spin, setSpin] = useState(false)
  const [results, setResults] = useState(null)

  // Keep the widget in step if another card is clicked while it is on screen.
  useEffect(() => {
    const f = params.get('from')
    const t = params.get('to')
    if (f) setFrom(f)
    if (t) setTo(t)
  }, [params])

  const swap = () => {
    setFrom(to || 'KHI')
    setTo(from)
    setSpin(true)
    setTimeout(() => setSpin(false), 400)
  }

  const portLabel = (c) => (PORTS.find((x) => x[0] === c) || [c, c])[1]

  const runSearch = () => {
    const dest = DESTINATIONS.find((d) => d.code === to)
    const base = dest?.fare || 60000
    setResults(
      [
        ['06:15', '08:05'],
        ['10:45', '12:35'],
        ['15:20', '17:10'],
        ['21:40', '23:30'],
      ].map(([dep, arr], i) => ({
        dep,
        arr,
        flight: 'PK ' + (200 + i * 13),
        dur: '2h 05m',
        eco: base + i * 4500,
        exe: base + i * 4500 + 47000,
      })),
    )
  }

  return (
    <div
      ref={ref}
      className="reveal mx-auto w-full max-w-5xl rounded-xl bg-s2/85 p-6 shadow-2xl shadow-black/60 backdrop-blur-2xl hairline md:p-8"
    >
      <div className="flex flex-wrap gap-6 border-b border-white/10 sm:gap-8">
        {TABS.map(([k, lbl]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`-mb-px flex items-center gap-2 border-b-2 pb-3 text-sm font-medium transition ${
              tab === k
                ? 'border-mint text-mint'
                : 'border-transparent text-white/45 hover:text-white/80'
            }`}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
              <path d={ICONS[k]} />
            </svg>
            {lbl}
          </button>
        ))}
      </div>

      {tab !== 'book' ? (
        <LookupPanel mode={tab} />
      ) : (
        <>
          <div className="mt-5 flex flex-wrap items-center gap-6">
            {[
              ['oneway', 'One Way'],
              ['round', 'Round Trip'],
              ['multi', 'Multi City'],
            ].map(([k, lbl]) => (
              <button key={k} onClick={() => setTrip(k)} className="flex items-center gap-2 text-sm text-white/80">
                <span
                  className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                    trip === k ? 'border-mint' : 'border-white/25'
                  }`}
                >
                  {trip === k && <span className="h-2.5 w-2.5 rounded-full bg-mint" />}
                </span>
                {lbl}
              </button>
            ))}
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => setMiles((m) => !m)}
              aria-label="Buy a ticket with Award +Plus points"
              aria-pressed={miles}
              className={`relative h-6 w-11 rounded-full transition ${miles ? 'bg-brand' : 'bg-white/15'}`}
            >
              <span
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
                  miles ? 'left-[22px]' : 'left-0.5'
                }`}
              />
            </button>
            <span className="text-sm text-white/60">Buy a ticket with Award +Plus points</span>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-stretch">
            <div className="flex items-center gap-2 md:flex-[1.7]">
              <Field label="From" value={from} onChange={setFrom} options={PORTS} />
              <button
                onClick={swap}
                aria-label="Swap ports"
                className="shrink-0 rounded-md border border-white/8 bg-s0 p-2.5 text-mint transition hover:border-mint/50"
                style={{ transform: spin ? 'rotate(180deg)' : 'none', transitionDuration: '400ms' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 16H3m0 0l4-4m-4 4l4 4M17 8h4m0 0l-4-4m4 4l-4 4" />
                </svg>
              </button>
              <Field label="To" value={to} onChange={setTo} options={PORTS} />
            </div>
            <DateField round={trip === 'round'} />
          </div>

          <div className="mt-3 flex flex-col gap-3 md:flex-row">
            <Field label="Passengers (1 Adult)" placeholder="Passengers (1 Adult)" />
            <Field label="Cabin class" value={cabin} onChange={setCabin} options={CABINS} />
            <Field
              label="Currency"
              value={currency}
              onChange={setCurrency}
              options={CURRENCIES.map((c) => [c, c])}
            />
          </div>

          <div className="mt-5 flex justify-end">
            <button
              onClick={runSearch}
              className="data flex items-center gap-2 rounded-md bg-brand px-8 py-3 text-xs uppercase tracking-[0.18em] text-white transition hover:brightness-115"
            >
              Search flights
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12h15m0 0l-5-5m5 5l-5 5" />
              </svg>
            </button>
          </div>

          {results && (
            <div className="mt-6 border-t border-white/10 pt-5">
              <p className="data mb-3 text-xs uppercase tracking-[0.2em] text-white/50">
                {portLabel(from)} → {portLabel(to)} · {results.length} flights ·{' '}
                {trip === 'round' ? 'round trip' : 'one way'}
              </p>
              <div className="flex flex-col gap-2">
                {results.map((f) => (
                  <div
                    key={f.flight}
                    className="panel panel-hover flex flex-wrap items-center justify-between gap-3 px-4 py-3"
                  >
                    <div className="flex items-center gap-4">
                      <span className="data text-lg font-bold text-white/90">
                        {f.dep}
                        <span className="text-white/30"> → </span>
                        {f.arr}
                      </span>
                      <span className="hidden text-xs text-white/40 sm:inline">
                        {f.dur} · {f.flight} · direct
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-right leading-tight">
                        <span className="block text-[10px] uppercase tracking-wide text-white/40">Economy</span>
                        <span className="data font-bold text-mint">{money(f.eco, currency)}</span>
                      </span>
                      <span className="hidden text-right leading-tight sm:block">
                        <span className="block text-[10px] uppercase tracking-wide text-white/40">Executive</span>
                        <span className="data font-bold text-white/80">{money(f.exe, currency)}</span>
                      </span>
                      <button className="data rounded-md bg-brand px-4 py-2 text-[11px] uppercase tracking-[0.12em] text-white transition hover:brightness-115">
                        Select
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

// Boarding-pass styled fare card. Clicking it prefills the widget rather than
// dropping the traveller on a generic search form.
function Ticket({ offer, index }) {
  const ref = useReveal(index * 80)
  return (
    <Link
      ref={ref}
      to={`/?from=${offer.from}&to=${offer.code}`}
      className="reveal panel panel-hover group relative block overflow-hidden p-5"
    >
      {/* Route: codes at the ends, the sector drawn as a dashed line between. */}
      <div className="flex items-center gap-3">
        <span className="data text-base tracking-[0.1em] text-white">{offer.from}</span>
        <span className="relative flex-1">
          <span className="block border-t border-dashed border-white/15" />
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: 'var(--pia-mint)' }}
          >
            <path d="M21 16v-2l-8-2.5V6.5a1.5 1.5 0 0 0-3 0v5L2 14v2l8-1.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L14 19v-4.5L21 16Z" />
          </svg>
        </span>
        <span className="data text-base tracking-[0.1em] text-white">{offer.code}</span>
      </div>

      <div className="mt-5 flex items-end justify-between gap-3">
        <div>
          <span className="data block text-[10px] uppercase tracking-[0.2em] text-lime">
            {offer.real ? 'Published fare' : 'Economy'}
          </span>
          <span className="data mt-1 block text-xl text-white">
            PKR {new Intl.NumberFormat('en-PK').format(offer.fare)}
          </span>
          <span className="mt-1 block text-sm text-white/45">{offer.city}</span>
        </div>
        <span className="data shrink-0 text-[10px] uppercase tracking-[0.15em] text-mint opacity-0 transition group-hover:opacity-100">
          Book →
        </span>
      </div>
    </Link>
  )
}

export function OfferTickets() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {FEATURED.map((o, i) => (
        <Ticket key={o.from + o.code} offer={o} index={i} />
      ))}
    </div>
  )
}

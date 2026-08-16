import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useReveal } from './BookingElements.jsx'
import Scenic from './Scenic.jsx'
import { NAV, CONTACT } from './data.js'

// Fixed backdrop. Near-black ground with two slow drifting glows off the brand
// ramp — the photography and the takeoff canvas are what carry colour now, so
// the page behind them stays quiet.
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-s1">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,#060912 0%,#0a0e17 45%,#0d1420 100%)' }}
      />
      <div
        className="absolute -top-[10%] right-[-6%] h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,125,52,0.16), rgba(0,0,0,0) 65%)' }}
      />
      <div className="cloud" style={{ top: '28%', width: '46vw', height: '30vh', opacity: 0.9, animation: 'ps-drift 140s linear infinite', animationDelay: '-30s' }} />
      <div className="cloud" style={{ top: '68%', width: '38vw', height: '26vh', opacity: 0.7, animation: 'ps-drift 190s linear infinite', animationDelay: '-110s' }} />
    </div>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// The real site stacks five advisory links above the fold, which is the single
// biggest thing between arriving and booking. Here they collapse to one
// rotating line that can be dismissed.
const ADVISORIES = [
  'Mandatory polio vaccination for travellers to the Kingdom of Saudi Arabia',
  'Paris flight operations resumed — Islamabad to Charles de Gaulle',
  'Baku flights now operating from Lahore',
  'Revised Umrah fares are now published',
]

function AdvisoryBar() {
  const [open, setOpen] = useState(true)
  const [i, setI] = useState(0)

  useEffect(() => {
    if (!open) return
    const id = setInterval(() => setI((n) => (n + 1) % ADVISORIES.length), 6000)
    return () => clearInterval(id)
  }, [open])

  if (!open) return null
  return (
    <div className="pointer-events-auto flex w-full items-center justify-center gap-3 border-b border-white/8 bg-black/35 px-4 py-2 text-center text-xs text-white/70 backdrop-blur-xl">
      <span className="data hidden shrink-0 text-[11px] tracking-[0.2em] text-mint sm:inline">NOTICE</span>
      <span className="truncate">{ADVISORIES[i]}</span>
      <a href="#help" className="hidden shrink-0 font-semibold text-lime underline-offset-2 hover:underline sm:inline">
        Read more
      </a>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="shrink-0 rounded-full p-1 text-white/60 hover:bg-white/10 hover:text-white"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>
  )
}

export function Header() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const menuRef = useRef(null)
  const toggleRef = useRef(null)
  useEffect(() => setOpen(false), [pathname])

  // An open full-screen menu owns the keyboard: Escape closes it and returns
  // focus to the button that opened it, Tab cycles inside it rather than
  // wandering into the page behind, and the page underneath stops scrolling.
  useEffect(() => {
    if (!open) return
    const first = menuRef.current?.querySelector('a, button')
    first?.focus()
    document.body.style.overflow = 'hidden'

    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const items = menuRef.current?.querySelectorAll('a, button')
      if (!items?.length) return
      const edge = e.shiftKey ? items[0] : items[items.length - 1]
      if (document.activeElement === edge) {
        e.preventDefault()
        ;(e.shiftKey ? items[items.length - 1] : items[0]).focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-40 w-full">
      <AdvisoryBar />
      <div className="mx-auto mt-3 flex w-[calc(100%-1.5rem)] max-w-7xl items-center justify-between rounded-full px-5 py-3 md:px-7 panel panel-thick">
        <Link to="/" className="pointer-events-auto">
          <img
            src="/pia-logo-reversed.svg"
            alt="PIA — Pakistan International Airlines"
            className="h-8 w-auto md:h-10"
          />
        </Link>

        <nav className="pointer-events-auto hidden gap-7 lg:flex">
          {NAV.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `border-b-2 pb-1 text-sm font-medium tracking-[0.01em] transition ${
                  isActive
                    ? 'border-mint text-white'
                    : 'border-transparent text-white/60 hover:text-white'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-3">
          <button className="hidden rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/40 transition hover:brightness-115 md:block">
            Award +Plus
          </button>
          <button
            ref={toggleRef}
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="site-menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white backdrop-blur lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="pointer-events-auto fixed inset-0 top-0 z-40 flex flex-col bg-black/55 px-6 pt-28 backdrop-blur-2xl lg:hidden"
        >
          <nav className="flex flex-col gap-2">
            {NAV.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `border-b border-white/8 py-4 text-lg font-medium ${
                    isActive ? 'text-mint' : 'text-white/80'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button className="mt-8 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white">
            Award +Plus
          </button>
        </div>
      )}
    </header>
  )
}

export function Section({ id, title, children }) {
  const ref = useReveal()
  return (
    <section
      id={id}
      className="snap-start snap-always scroll-mt-40 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-start px-6 pb-28 pt-44 md:px-10"
    >
      <div ref={ref} className="reveal">
        <h2 className="max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-[3.25rem] md:leading-[1.05]">
          {title}
        </h2>
      </div>
      <div className="mt-14">{children}</div>
    </section>
  )
}

// One 24px stroke glyph per service, keyed by title and drawn inline so no
// icon library ships. Unknown titles fall back to the plane.
const SERVICE_ICONS = {
  'Pre-book Meal': (
    <>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </>
  ),
  'Seat Selection': (
    <>
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <path d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H7v-2a2 2 0 0 0-4 0Z" />
      <path d="M5 18v2M19 18v2" />
    </>
  ),
  'Pre-book Baggage': (
    <>
      <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
      <path d="M8 18V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12" />
      <path d="M10 20h4" />
    </>
  ),
  'Special Assistance': (
    <>
      <circle cx="16" cy="4" r="1" />
      <path d="m18 19 1-7-6 1" />
      <path d="m5 8 3-3 5.5 3-2.36 3.5" />
      <path d="M4.24 14.5a5 5 0 0 0 6.88 6" />
      <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
    </>
  ),
  'Extra Legroom': (
    <>
      <path d="M12 2v20" />
      <path d="m8 18 4 4 4-4" />
      <path d="m8 6 4-4 4 4" />
    </>
  ),
  'Preferred Seat': (
    <path d="M12 3l2.9 5.9 6.5.9-4.7 4.6 1.1 6.5L12 17.8 6.2 20.9l1.1-6.5L2.6 9.8l6.5-.9Z" />
  ),
  'In-Flight Seat Upgrade': (
    <>
      <path d="M12 19V5" />
      <path d="m5 12 7-7 7 7" />
    </>
  ),
  'Sohni Dharti Remittance Program': (
    <>
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <circle cx="12" cy="12" r="2" />
      <path d="M6 12h.01M18 12h.01" />
    </>
  ),
  Humsafar: (
    <>
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h6z" />
    </>
  ),
}

const PLANE_ICON = (
  <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
)

export function ServiceCard({ title, body }) {
  return (
    <div className="panel panel-hover p-6">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.05] text-mint">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {SERVICE_ICONS[title] ?? PLANE_ICON}
        </svg>
      </span>
      <h3 className="mt-4 text-lg font-medium tracking-tight text-white/90">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
    </div>
  )
}

// Destination card. Clicking it prefills the booking widget with this route.
export function DestCard({ city, code, ur, fare, from = 'KHI' }) {
  return (
    <Link
      to={`/?from=${from}&to=${code}`}
      className="panel panel-hover group relative block aspect-[4/3] overflow-hidden p-0"
    >
      <Scenic seed={code} label={code} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 border-t border-white/10 bg-black/25 p-4 backdrop-blur-xl">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="truncate text-lg font-semibold text-ivory">{city}</span>
            {ur && <span className="urdu shrink-0 text-xs text-white/55">{ur}</span>}
          </div>
          <div className="data mt-0.5 text-[11px] tracking-[0.12em] text-gold">
            {from} — {code}
          </div>
        </div>
        {fare && (
          <div className="data shrink-0 rounded-full bg-brand/85 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
            {new Intl.NumberFormat('en-PK').format(fare)}
          </div>
        )}
      </div>
    </Link>
  )
}

export function PageHero({ title, subtitle, seed }) {
  return (
    <section className="snap-start snap-always relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-white/10 px-6 pb-16 pt-40 md:px-10">
      {/* Scenic sets `relative` on itself, and Tailwind emits `.relative` after
          `.absolute`, so the frame is positioned by a wrapper rather than by a
          class handed to it — otherwise it collapses to zero height. */}
      <div className="pointer-events-none absolute inset-0">
        <Scenic seed={seed || title} sizes="100vw" eager className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060912] via-[#060912]/70 to-transparent" />
      {/* The header is transparent over the hero, so keep the top of the frame
          dark enough for the nav to stay readable against a bright sky. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060912]/85 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl">
        {/* The title again, oversized and almost invisible behind itself. */}
        <span
          aria-hidden
          className="ghost-word absolute -top-6 left-0 hidden whitespace-nowrap text-[7rem] md:block"
        >
          {title}
        </span>
        <h1 className="relative max-w-3xl text-5xl font-semibold tracking-[-0.035em] text-white md:text-[4.5rem] md:leading-[1.02]">
          {title}
        </h1>
        {subtitle && <p className="relative mt-6 max-w-[46ch] text-lg leading-relaxed text-white/70">{subtitle}</p>}
      </div>
    </section>
  )
}

function FooterCol({ title, items }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">{title}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map(([label, to]) => (
          <li key={label}>
            {to.startsWith('/') ? (
              <Link to={to} className="text-sm text-white/65 transition hover:text-white">
                {label}
              </Link>
            ) : (
              <a href={to} className="text-sm text-white/65 transition hover:text-white">
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function Footer() {
  return (
    <footer id="help" className="border-t border-white/8 bg-black/25 backdrop-blur-xl">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div>
          <img src="/pia-logo-reversed.svg" alt="PIA" className="h-12 w-auto" />
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-white/60">{CONTACT.address}</p>
          <p className="data mt-3 text-sm text-white/70">{CONTACT.phone}</p>
          <p className="data text-sm text-white/70">{CONTACT.email}</p>
        </div>
        <FooterCol
          title="About Us"
          items={[
            ['Vision & Values', '/about'],
            ['Fleet', '/fleet'],
            ['Careers', '#'],
            ['Press Release', '#'],
            ['Tenders', '#'],
          ]}
        />
        <FooterCol
          title="Facilities"
          items={[
            ['Where we Fly', '/destinations'],
            ['Hajj & Umrah', '/hajj-umrah'],
            ['Digital Check-In', '/manage'],
            ['Conditions of Carriage', '#'],
            ['Track Your Cargo', '#'],
          ]}
        />
        <FooterCol
          title="Help & Contact"
          items={[
            ['Help & Contact', '#'],
            ['Special Assistance', '/services'],
            ['Frequently Asked Questions', '#'],
            ['Air Passenger Rights', '#'],
            ['Privacy Policy', '#'],
          ]}
        />
      </div>
      <div className="ramp h-0.5 w-full opacity-70" />
      <div className="py-6 text-center text-xs text-white/70">
        Fan concept, not affiliated with Pakistan International Airlines · content adapted from piac.com.pk
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full text-white">
      <Backdrop />
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

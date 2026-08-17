import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useReveal } from './BookingElements.jsx'
import Scenic from './Scenic.jsx'
import { NAV, CONTACT } from './data.js'

// Fixed backdrop: the marble ground. A whisper of jali lattice down each edge,
// masked out toward the centre so text columns sit on clean stone.
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ivory">
      <div
        className="jali absolute inset-y-0 left-0 w-64 opacity-[0.06]"
        style={{ maskImage: 'linear-gradient(90deg, black, transparent)', WebkitMaskImage: 'linear-gradient(90deg, black, transparent)' }}
      />
      <div
        className="jali absolute inset-y-0 right-0 w-64 opacity-[0.06]"
        style={{ maskImage: 'linear-gradient(270deg, black, transparent)', WebkitMaskImage: 'linear-gradient(270deg, black, transparent)' }}
      />
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
    <div className="pointer-events-auto flex w-full items-center justify-center gap-3 bg-emerald px-4 py-2 text-center text-xs text-ivory/90">
      <span className="data hidden shrink-0 text-[11px] tracking-[0.2em] text-[#d9bc55] sm:inline">NOTICE</span>
      <span className="truncate">{ADVISORIES[i]}</span>
      <a href="#help" className="hidden shrink-0 font-semibold text-[#d9bc55] underline-offset-2 hover:underline sm:inline">
        Read more
      </a>
      <button
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="shrink-0 rounded-full p-1 text-ivory/70 hover:bg-white/10 hover:text-ivory"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 6l12 12M6 18L18 6" />
        </svg>
      </button>
    </div>
  )
}

// The header is a marble lintel: solid ivory ruled underneath by a gold
// hairline. It never goes translucent — stone does not.
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
      <div className="pointer-events-auto border-b border-[color:var(--gold-line)] bg-ivory shadow-[0_6px_18px_-14px_rgba(29,42,35,0.4)]">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-3 md:px-8">
          <Link to="/">
            <img
              src="/pia-logo.svg"
              alt="PIA — Pakistan International Airlines"
              className="h-9 w-auto md:h-11"
            />
          </Link>

          <nav className="hidden gap-8 lg:flex">
            {NAV.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `border-b-2 pb-1 text-sm font-medium tracking-[0.01em] transition ${
                    isActive
                      ? 'border-[color:var(--pia-gold)] text-ink'
                      : 'border-transparent text-ink/60 hover:text-ink'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-ivory shadow-[inset_0_0_0_1px_rgba(243,238,227,0.25),0_2px_8px_-2px_rgba(0,105,55,0.5)] transition hover:brightness-110 md:block">
              Award +Plus
            </button>
            <button
              ref={toggleRef}
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="site-menu"
              className="flex h-9 w-9 items-center justify-center rounded-md border border-[color:var(--gold-line)] bg-plate text-ink lg:hidden"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          id="site-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="pointer-events-auto fixed inset-0 top-0 z-40 flex flex-col bg-ivory px-6 pt-28 lg:hidden"
        >
          <nav className="flex flex-col gap-2">
            {NAV.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `border-b border-[color:var(--gold-line-soft)] py-4 text-lg font-medium ${
                    isActive ? 'text-brand' : 'text-ink/80'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button className="mt-8 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-ivory">
            Award +Plus
          </button>
        </div>
      )}
    </header>
  )
}

// The engraved double rule: two gold hairlines a stone's width apart, the same
// motif the panels carry. It is the heading's underline and nothing else's.
export function DoubleRule({ className = '' }) {
  return <div aria-hidden className={`h-[5px] border-y border-[color:var(--gold-line)] ${className}`} />
}

// The check glyph, drawn in the page's own stroke system rather than a
// unicode stand-in.
export function Check({ className = 'text-brand' }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={`shrink-0 ${className}`}
    >
      <path d="M4 12.5 9.5 18 20 6.5" />
    </svg>
  )
}

// Section title: inscriptional Marcellus over the engraved double rule.
export function Section({ id, title, children }) {
  const ref = useReveal()
  return (
    <section
      id={id}
      className="snap-start snap-always scroll-mt-36 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-start px-6 pb-24 pt-40 md:px-10"
    >
      <div ref={ref} className="reveal">
        <h2 className="max-w-3xl text-4xl text-ink md:text-[3.25rem] md:leading-[1.08]">
          {title}
        </h2>
        <DoubleRule className="mt-5 w-24" />
      </div>
      <div className="mt-12">{children}</div>
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

// Services read as a ledger of entries divided by engraved rules, not a grid
// of identical tiles: glyph, entry title, body along one rail.
export function ServiceCard({ title, body }) {
  return (
    <div className="flex gap-5 border-b border-[color:var(--gold-line-soft)] py-6 transition-colors last:border-b-0 hover:bg-plate">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[color:var(--gold-line)] text-brand">
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
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-ink">{title}</h3>
        <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-ink/70">{body}</p>
      </div>
    </div>
  )
}

// Destination card. Clicking it prefills the booking widget with this route.
// The photograph hangs inside the plate under the cusped arch — the same clip
// the sticky visual uses, so the arch reads as the site's frame grammar.
export function DestCard({ city, code, ur, fare, from = 'KHI' }) {
  return (
    <Link
      to={`/?from=${from}&to=${code}`}
      className="panel panel-hover group relative block overflow-hidden p-[7px]"
    >
      <div className="relative aspect-[4/3] overflow-hidden" style={{ clipPath: 'url(#jali-arch)' }}>
        <Scenic seed={code} label={code} className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-105" />
      </div>
      <div className="flex items-end justify-between gap-3 px-3 pb-2.5 pt-3.5">
        <div className="min-w-0">
          <div className="flex items-baseline gap-2">
            <span className="truncate font-display text-xl text-ink">{city}</span>
            {ur && <span className="urdu shrink-0 text-xs text-ink/55">{ur}</span>}
          </div>
          <div className="data mt-0.5 text-[11px] tracking-[0.12em] text-gold">
            {from} — {code}
          </div>
        </div>
        {fare && (
          <div className="data shrink-0 rounded-[3px] bg-brand px-3 py-1 text-[11px] font-medium text-ivory">
            {new Intl.NumberFormat('en-PK').format(fare)}
          </div>
        )}
      </div>
    </Link>
  )
}

export function PageHero({ title, subtitle, seed }) {
  return (
    <section className="snap-start snap-always relative flex min-h-[92vh] flex-col justify-center overflow-hidden px-6 pb-16 pt-40 md:px-10">
      {/* Scenic sets `relative` on itself, and Tailwind emits `.relative` after
          `.absolute`, so the frame is positioned by a wrapper rather than by a
          class handed to it — otherwise it collapses to zero height. */}
      <div className="pointer-events-none absolute inset-0">
        <Scenic seed={seed || title} sizes="100vw" eager className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0d3b26]/85 via-[#0d3b26]/45 to-transparent" />
      {/* The gold inlay frame, inset from the edge: the page's pictures hang
          inside ruled stone. Sits below the fixed header's reach. */}
      <div className="pointer-events-none absolute inset-x-4 bottom-4 top-32 border border-[rgba(217,188,85,0.5)] md:inset-x-6 md:bottom-6" />
      <div className="relative mx-auto w-full max-w-6xl">
        {/* The title again, oversized and almost invisible behind itself. */}
        <span
          aria-hidden
          className="ghost-word absolute -top-6 left-0 hidden whitespace-nowrap text-[7rem] md:block"
        >
          {title}
        </span>
        <h1 className="relative max-w-3xl text-5xl text-ivory md:text-[4.25rem] md:leading-[1.05]">
          {title}
        </h1>
        <div aria-hidden className="relative mt-6 h-[5px] w-24 border-y border-[rgba(217,188,85,0.55)]" />
        {subtitle && <p className="relative mt-6 max-w-[46ch] text-lg leading-relaxed text-ivory/85">{subtitle}</p>}
      </div>
    </section>
  )
}

function FooterCol({ title, items }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d9bc55]">{title}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map(([label, to]) => (
          <li key={label}>
            {to.startsWith('/') ? (
              <Link to={to} className="text-sm text-ivory/70 transition hover:text-ivory">
                {label}
              </Link>
            ) : (
              <a href={to} className="text-sm text-ivory/70 transition hover:text-ivory">
                {label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

// The footer is the court's emerald region: deep green stone, gold engraving,
// a jali frieze along its top edge.
export function Footer() {
  return (
    <footer id="help" className="relative bg-emerald text-ivory">
      <div className="ramp h-px w-full opacity-80" aria-hidden />
      <div className="jali h-12 w-full opacity-20" aria-hidden />
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-16 pt-8 md:grid-cols-4 md:px-10">
        <div>
          <img src="/pia-logo-reversed.svg" alt="PIA" className="h-12 w-auto" />
          <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-ivory/70">{CONTACT.address}</p>
          <p className="data mt-3 text-sm text-ivory/85">{CONTACT.phone}</p>
          <p className="data text-sm text-ivory/85">{CONTACT.email}</p>
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
      <div className="border-t border-[rgba(217,188,85,0.25)] py-6 text-center text-xs text-ivory/70">
        Fan concept, not affiliated with Pakistan International Airlines · content adapted from piac.com.pk
      </div>
    </footer>
  )
}

export default function Layout() {
  return (
    <div className="relative min-h-screen w-full text-ink">
      {/* The cusped Mughal arch every photo frame clips to. Normalised
          coordinates, defined once here so any page can reference it. */}
      <svg width="0" height="0" aria-hidden className="absolute">
        <defs>
          <clipPath id="jali-arch" clipPathUnits="objectBoundingBox">
            <path d="M 0,1 L 0,0.34 C 0,0.16 0.10,0.085 0.27,0.055 C 0.40,0.032 0.465,0.028 0.5,0 C 0.535,0.028 0.60,0.032 0.73,0.055 C 0.90,0.085 1,0.16 1,0.34 L 1,1 Z" />
          </clipPath>
        </defs>
      </svg>
      <Backdrop />
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

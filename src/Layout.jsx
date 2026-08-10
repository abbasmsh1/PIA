import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { useReveal } from './BookingElements.jsx'
import Scenic from './Scenic.jsx'
import { NAV, CONTACT } from './data.js'

// Fixed sky backdrop, built on the teal end of the brand ramp so it reads as
// PIA rather than generic aviation blue. The takeoff canvas covers it, so the
// page reads as "depart at night, climb into daylight".
function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg,#061a2e 0%,#005779 42%,#1c7ba6 72%,#44a5d8 100%)' }}
      />
      <div
        className="absolute -top-[10%] right-[-6%] h-[70vh] w-[70vh] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(255,229,36,0.20), rgba(255,255,255,0) 65%)' }}
      />
      <div className="cloud" style={{ top: '16%', width: '32vw', height: '20vh', opacity: 0.55, animation: 'ps-drift 90s linear infinite', animationDelay: '-20s' }} />
      <div className="cloud" style={{ top: '40%', width: '24vw', height: '15vh', opacity: 0.4, animation: 'ps-drift 130s linear infinite', animationDelay: '-70s' }} />
      <div className="cloud" style={{ top: '62%', width: '38vw', height: '22vh', opacity: 0.5, animation: 'ps-drift 110s linear infinite', animationDelay: '-45s' }} />
      <div className="cloud" style={{ top: '82%', width: '28vw', height: '17vh', opacity: 0.35, animation: 'ps-drift 150s linear infinite', animationDelay: '-100s' }} />
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
    <div className="pointer-events-auto flex w-full items-center justify-center gap-3 bg-[#0d572d]/90 px-4 py-2 text-center text-xs text-white/80 backdrop-blur">
      <span className="truncate">{ADVISORIES[i]}</span>
      <a href="#help" className="hidden shrink-0 font-semibold text-[#cdd500] underline-offset-2 hover:underline sm:inline">
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
  useEffect(() => setOpen(false), [pathname])

  return (
    <header className="pointer-events-none fixed top-0 left-0 z-40 w-full">
      <AdvisoryBar />
      <div className="flex w-full items-center justify-between bg-gradient-to-b from-[#060912] via-[#060912]/50 to-transparent px-6 py-4 pb-10 md:px-10">
        <Link to="/" className="pointer-events-auto">
          <img src="/logo.svg" alt="PIA — Pakistan International Airlines" className="h-9 w-auto md:h-11" />
        </Link>

        <nav className="pointer-events-auto hidden gap-6 lg:flex">
          {NAV.map(([label, to]) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.16em] transition ${
                  isActive ? 'text-[#cdd500]' : 'text-white/50 hover:text-white/90'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-3">
          <button className="hidden rounded-full bg-[#007d34] px-5 py-2 text-xs font-semibold tracking-wide text-white transition hover:brightness-110 md:block">
            Award +Plus Login
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="pointer-events-auto fixed inset-0 top-0 z-40 flex flex-col bg-[#060912]/95 px-6 pt-24 backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {NAV.map(([label, to]) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `border-b border-white/10 py-4 text-lg tracking-tight ${
                    isActive ? 'text-[#cdd500]' : 'text-white/80'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <button className="mt-8 rounded-full bg-[#007d34] px-6 py-3 text-sm font-semibold text-white">
            Award +Plus Login
          </button>
        </div>
      )}
    </header>
  )
}

export function Section({ id, eyebrow, title, children }) {
  const ref = useReveal()
  return (
    <section
      id={id}
      className="snap-start snap-always mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-24 md:px-10"
    >
      <div ref={ref} className="reveal">
        {eyebrow && <span className="data text-xs uppercase tracking-[0.3em] text-[#cdd500]">{eyebrow}</span>}
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white/90 md:text-5xl">{title}</h2>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  )
}

// Destination card. Clicking it prefills the booking widget with this route.
export function DestCard({ city, code, fare, from = 'KHI' }) {
  return (
    <Link
      to={`/?from=${from}&to=${code}`}
      className="group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 transition hover:border-white/25"
    >
      <Scenic seed={code} label={code} className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
        <div>
          <div className="text-lg font-semibold tracking-tight text-white">{city}</div>
          <div className="data text-xs tracking-[0.15em] text-white/60">
            {from} → {code}
          </div>
        </div>
        {fare && (
          <div className="data rounded-full bg-[#007d34] px-3 py-1 text-xs font-bold text-white">
            {new Intl.NumberFormat('en-PK').format(fare)}
          </div>
        )}
      </div>
    </Link>
  )
}

export function PageHero({ eyebrow, title, subtitle, seed }) {
  return (
    <section className="snap-start snap-always relative flex min-h-screen flex-col justify-center overflow-hidden border-b border-white/10 px-6 pb-16 pt-40 md:px-10">
      {/* Scenic sets `relative` on itself, and Tailwind emits `.relative` after
          `.absolute`, so the frame is positioned by a wrapper rather than by a
          class handed to it — otherwise it collapses to zero height. */}
      <div className="pointer-events-none absolute inset-0">
        <Scenic seed={seed || title} sizes="100vw" eager className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060912]/95 via-[#060912]/45 to-transparent" />
      {/* The header is transparent over the hero, so keep the top of the frame
          dark enough for the nav to stay readable against a bright sky. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#060912]/85 to-transparent" />
      <div className="relative mx-auto w-full max-w-6xl">
        {eyebrow && <span className="data text-xs uppercase tracking-[0.3em] text-[#cdd500]">{eyebrow}</span>}
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white/90 md:text-6xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-2xl text-lg text-white/60">{subtitle}</p>}
      </div>
    </section>
  )
}

function FooterCol({ title, items }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/40">{title}</p>
      <ul className="mt-4 flex flex-col gap-2">
        {items.map(([label, to]) => (
          <li key={label}>
            {to.startsWith('/') ? (
              <Link to={to} className="text-sm text-white/60 transition hover:text-white/90">
                {label}
              </Link>
            ) : (
              <a href={to} className="text-sm text-white/60 transition hover:text-white/90">
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
    <footer id="help" className="border-t border-white/10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-4 md:px-10">
        <div>
          <img src="/logo.svg" alt="PIA" className="h-11 w-auto" />
          <p className="mt-4 text-sm leading-relaxed text-white/45">{CONTACT.address}</p>
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
      <div className="py-6 text-center text-xs text-white/35">
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

import { Link } from 'react-router-dom'
import PlaneScroll from './PlaneScroll.jsx'
import { OfferTickets } from './BookingElements.jsx'
import DeparturesBoard from './DeparturesBoard.jsx'
import StickyScroll from './StickyScroll.jsx'
import Scenic from './Scenic.jsx'
import { Section, DestCard, ServiceCard } from './Layout.jsx'
import { SERVICES, NEWS, DESTINATIONS, LOYALTY_PERKS, LOYALTY_TIERS, ABOUT_STATS } from './data.js'

const POPULAR = ['DXB', 'JED', 'KDU', 'LHR', 'KUL', 'YYZ']

export default function Home() {
  const popular = POPULAR.map((code) => DESTINATIONS.find((d) => d.code === code)).filter(Boolean)

  return (
    <>
      {/* The hero carries the booking widget, so a fare is one interaction away. */}
      <PlaneScroll />

      <Section id="offers" title="Fares out of Pakistan">
        <p className="mb-8 max-w-2xl text-white/60">
          Every card prefills the search above with that route — no retyping the ports.
        </p>
        <OfferTickets />
      </Section>

      <Section id="board" title="Departures today">
        <DeparturesBoard />
      </Section>

      <Section id="destinations" title="Fifty destinations, one carrier">
        <p className="mb-8 max-w-2xl text-white/60">
          Direct from Karachi, Lahore and Islamabad across Pakistan, the Gulf, Asia, Europe and
          North America.
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((d) => (
            <DestCard key={d.code} {...d} />
          ))}
        </div>
        <Link
          to="/destinations"
          className="data mt-8 inline-block rounded-full bg-brand px-7 py-3.5 text-xs uppercase tracking-[0.15em] text-white shadow-lg shadow-brand/25 transition hover:brightness-115"
        >
          All destinations →
        </Link>

        <div className="panel mt-12 grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-white/8">
          {ABOUT_STATS.map((s) => (
            <div key={s.v} className="p-6 text-center">
              <div className="data text-2xl font-bold text-mint">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/55">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <StickyScroll />

      <Section id="services" title="Add what you need">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.slice(0, 6).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
        <Link to="/services" className="data mt-8 inline-block text-xs uppercase tracking-[0.15em] text-mint transition hover:text-white">
          All services →
        </Link>
      </Section>

      <Section id="news" title="From the newsroom">
        <div className="grid gap-6 md:grid-cols-3">
          {NEWS.slice(0, 6).map((n) => (
            <article
              key={n.title}
              className="group flex flex-col overflow-hidden panel panel-hover"
            >
              {/* Scenic positions itself, so the aspect wrapper sizes the frame
                  — same arrangement as DestCard. */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Scenic
                  seed={n.seed}
                  className="absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col border-t border-white/10 p-6">
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <span className="text-lime">{n.cat}</span>
                  <span>·</span>
                  <span className="data">{n.date}</span>
                </div>
                <h3 className="mt-3 flex-1 text-lg font-medium leading-snug tracking-tight text-white/90">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{n.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-mint transition group-hover:gap-2">
                  Learn more →
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="loyalty" title="Loyalty that takes you further">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <ul className="grid gap-3 sm:grid-cols-2">
            {LOYALTY_PERKS.map((f) => (
              <li key={f} className="flex items-center gap-3 text-white/75">
                <span className="text-mint">✓</span> {f}
              </li>
            ))}
          </ul>
          <button className="data w-fit rounded-full bg-brand px-8 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:brightness-115">
            Join Award +Plus
          </button>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* A+ Individual is the tier a passenger can act on today, so it
              carries the highlight rather than the corporate product. */}
          {LOYALTY_TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`panel panel-hover relative overflow-hidden p-7 ${i === 0 ? 'border-mint/45' : ''}`}
            >
              {i === 0 && <div className="ramp absolute inset-x-0 top-0 h-0.5" />}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-white/90">{t.name}</h3>
                <span className="data text-xs tracking-[0.15em] text-lime">{t.req}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{t.perks}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="app" title="The PIA mobile app">
        <div className="flex flex-col items-center gap-10 panel p-8 md:flex-row md:justify-between md:p-12">
          <div className="max-w-md">
            <ul className="flex flex-col gap-3">
              {[
                'Web and mobile check-in',
                'Manage bookings on the go',
                'Umrah booking from your phone',
                'Award +Plus balance and redemptions',
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 text-white/75">
                  <span className="text-mint">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="data rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-xs tracking-[0.1em] text-white/85 backdrop-blur"> App Store</span>
              <span className="data rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-3 text-xs tracking-[0.1em] text-white/85 backdrop-blur">▶ Google Play</span>
            </div>
          </div>

          <div className="relative h-72 w-40 shrink-0 rounded-[2rem] border-4 border-white/10 bg-gradient-to-b from-s3 to-s0 p-3 shadow-2xl">
            <div className="mx-auto mt-1 h-1.5 w-12 rounded-full bg-white/20" />
            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-white/90">PIA</span>
              <div className="ramp h-1 w-16 rounded-full" />
            </div>
            <div className="mt-6 space-y-2 px-1">
              <div className="data rounded-lg bg-white/[0.06] px-3 py-2 text-[11px] text-white/70">KHI → DXB</div>
              <div className="data rounded-lg bg-white/[0.06] px-3 py-2 text-[11px] text-white/50">Seat 21C · Gate B1</div>
              <div className="rounded-lg bg-brand/90 px-3 py-2 text-center text-[11px] font-semibold text-white">
                Boarding pass
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  )
}

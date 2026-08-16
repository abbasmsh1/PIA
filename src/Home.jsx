import { Link } from 'react-router-dom'
import PlaneScroll from './PlaneScroll.jsx'
import { OfferTickets } from './BookingElements.jsx'
import DeparturesBoard from './DeparturesBoard.jsx'
import StickyScroll from './StickyScroll.jsx'
import Scenic from './Scenic.jsx'
import RouteMarquee from './RouteMarquee.jsx'
import AdmitOneTicket, { TICKET_LAYOUT } from './vendor/admit-one-ticket.jsx'
import { Section, DestCard, ServiceCard } from './Layout.jsx'
import { SERVICES, NEWS, DESTINATIONS, LOYALTY_PERKS, LOYALTY_TIERS, ABOUT_STATS } from './data.js'

const POPULAR = ['DXB', 'JED', 'KDU', 'LHR', 'KUL', 'YYZ']

// The ports that ride the departure arc: the domestic network first, since the
// arc leaves Pakistan, then the long-haul ends of the route map.
const ARC_CODES = ['KHI', 'KDU', 'DXB', 'JED', 'LHR', 'YYZ']

// The vendored 21st.dev ticket ships in an orange; these put it in PIA's green
// and gold, which is the whole reason its texture, gradient and ink are props.
const CARD_TEXTURE = {
  engine: 'generative',
  colorBack: '#0d3b26',
  colorFront: '#a48d29',
  colorHighlight: '#006937',
  shape: 'warp',
  type: 'random',
  size: 0.5,
  colorSteps: 4,
  originalColors: true,
  scale: 1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  speed: 0.4,
}
const CARD_GRADIENT = {
  centreX: 0.62,
  centreY: 0.3,
  radius: 0.58,
  midStop: 0.45,
  colorLight: '#cbb35e',
  colorMid: '#006937',
  colorDark: '#0d3b26',
}
const CARD_LAYOUT = { ...TICKET_LAYOUT, watermarkColor: '#cbb35e', inkColor: '#f3eee3' }

export default function Home() {
  const popular = POPULAR.map((code) => DESTINATIONS.find((d) => d.code === code)).filter(Boolean)
  const ARC = ARC_CODES.map((code) => DESTINATIONS.find((d) => d.code === code)).filter(Boolean)

  return (
    <>
      {/* The hero carries the booking widget, so a fare is one interaction away. */}
      <PlaneScroll />

      <Section id="offers" title="Fares out of Pakistan">
        <p className="mb-8 max-w-2xl text-ink/70">
          Every card prefills the search above with that route — no retyping the ports.
        </p>
        <OfferTickets />
      </Section>

      <Section id="board" title="Departures today">
        <DeparturesBoard />
      </Section>

      <Section id="destinations" title="Fifty destinations, one carrier">
        <p className="mb-8 max-w-2xl text-ink/70">
          Direct from Karachi, Lahore and Islamabad across Pakistan, the Gulf, Asia, Europe and
          North America.
        </p>
        <RouteMarquee items={ARC} />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popular.map((d) => (
            <DestCard key={d.code} {...d} />
          ))}
        </div>
        <Link
          to="/destinations"
          className="data mt-8 inline-block rounded-md bg-brand px-7 py-3.5 text-xs uppercase tracking-[0.15em] text-ivory shadow-[inset_0_0_0_1px_rgba(243,238,227,0.25),0_2px_8px_-2px_rgba(0,105,55,0.5)] transition hover:brightness-110"
        >
          All destinations →
        </Link>

        <div className="panel mt-12 grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-[color:var(--gold-line-soft)]">
          {ABOUT_STATS.map((s) => (
            <div key={s.v} className="p-6 text-center">
              <div className="data text-2xl font-bold text-gold">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-ink/65">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <StickyScroll />

      <Section id="services" title="Add what you need">
        {/* A ledger of entries divided by engraved rules, not a tile grid. */}
        <div className="grid gap-x-14 lg:grid-cols-2">
          {SERVICES.slice(0, 6).map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
        <Link to="/services" className="data mt-8 inline-block text-xs uppercase tracking-[0.15em] text-brand transition hover:text-ink">
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
              <div className="flex flex-1 flex-col border-t border-[color:var(--gold-line-soft)] p-6">
                <div className="flex items-center gap-2 text-xs text-ink/70">
                  <span className="font-semibold uppercase tracking-[0.12em] text-gold">{n.cat}</span>
                  <span>·</span>
                  <span className="data">{n.date}</span>
                </div>
                <h3 className="mt-3 flex-1 text-lg font-medium leading-snug tracking-tight text-ink">
                  {n.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/75">{n.body}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-brand transition group-hover:gap-2">
                  Learn more →
                </span>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="loyalty" title="Loyalty that takes you further">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          {/* The membership card, in PIA's green and gold. */}
          <div className="shrink-0">
            <AdmitOneTicket
              presenter="Pakistan International Airlines"
              event="Award +Plus"
              name={LOYALTY_TIERS[0].name}
              venue={LOYALTY_TIERS[0].req}
              dates="Earn on every sector"
              stubText="Member"
              watermark="A+"
              // The card renders at a fixed pixel width, so cap it to the
              // viewport on phones. ponytail: sized once at mount, no resize
              // listener — add one if rotation ever matters.
              width={Math.min(520, (typeof window === 'undefined' ? 520 : window.innerWidth) - 48)}
              texture={CARD_TEXTURE}
              gradient={CARD_GRADIENT}
              layout={CARD_LAYOUT}
            />
          </div>

          <div className="flex flex-col gap-8">
            <ul className="grid gap-3 sm:grid-cols-2">
              {LOYALTY_PERKS.map((f) => (
                <li key={f} className="flex items-center gap-3 text-ink/80">
                  <span className="text-gold">✓</span> {f}
                </li>
              ))}
            </ul>
            <button className="w-fit rounded-md bg-brand px-8 py-3.5 text-sm font-semibold text-ivory shadow-[inset_0_0_0_1px_rgba(243,238,227,0.25),0_2px_8px_-2px_rgba(0,105,55,0.5)] transition hover:brightness-110">
              Join Award +Plus
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* A+ Individual is the tier a passenger can act on today, so it
              carries the highlight rather than the corporate product. */}
          {LOYALTY_TIERS.map((t, i) => (
            <div
              key={t.name}
              className={`panel panel-hover relative overflow-hidden p-7 ${i === 0 ? 'border-[color:var(--pia-gold)]' : ''}`}
            >
              {i === 0 && <div className="ramp absolute inset-x-0 top-0 h-0.5" />}
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                <span className="data text-xs tracking-[0.15em] text-gold">{t.req}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{t.perks}</p>
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
                <li key={f} className="flex items-center gap-3 text-ink/80">
                  <span className="text-brand">✓</span> {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <span className="data rounded-lg border border-goldline/40 bg-plate px-5 py-3 text-xs tracking-[0.1em] text-ink/80">App Store</span>
              <span className="data rounded-lg border border-goldline/40 bg-plate px-5 py-3 text-xs tracking-[0.1em] text-ink/80">Google Play</span>
            </div>
          </div>

          <div className="relative h-72 w-40 shrink-0 rounded-[2rem] border-4 border-emerald bg-emerald p-3 shadow-[0_18px_40px_-18px_rgba(13,59,38,0.55)]">
            <div className="mx-auto mt-1 h-1.5 w-12 rounded-full bg-ivory/25" />
            <div className="mt-6 flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-ivory">PIA</span>
              <div className="ramp h-1 w-16 rounded-full" />
            </div>
            <div className="mt-6 space-y-2 px-1">
              <div className="data rounded-lg bg-ivory/10 px-3 py-2 text-[11px] text-ivory/85">KHI → DXB</div>
              <div className="data rounded-lg bg-ivory/10 px-3 py-2 text-[11px] text-ivory/60">Seat 21C · Gate B1</div>
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

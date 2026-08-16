import { Link } from 'react-router-dom'
import { PageHero, Section, DestCard, ServiceCard } from './Layout.jsx'
import { FlightSearch, LookupPanel } from './BookingElements.jsx'
import RouteMap from './RouteMap.jsx'
import Scenic from './Scenic.jsx'
import {
  DESTINATIONS,
  SERVICES,
  FLEET,
  ABOUT_STATS,
  BAGGAGE,
  CHECKIN,
  CABINS,
  PILGRIMAGE_STEPS,
  PILGRIMAGE_FACTS,
  MANAGE_ACTIONS,
  LOYALTY_TIERS,
  CONTACT,
} from './data.js'

// The filled action, engraved: green stone with a fine ivory rule just inside
// its edge. One recipe for every primary button on these pages.
const ACTION =
  'data inline-block rounded-md bg-brand px-7 py-3.5 text-xs uppercase tracking-[0.15em] text-ivory shadow-[inset_0_0_0_1px_rgba(243,238,227,0.25),0_2px_8px_-2px_rgba(0,105,55,0.5)] transition hover:brightness-110'

export function DestinationsPage() {
  const intl = DESTINATIONS.filter((d) => d.intl)
  const domestic = DESTINATIONS.filter((d) => !d.intl && !d.hub)

  return (
    <>
      <PageHero
        title="Our network"
        subtitle="Direct from Karachi, Lahore and Islamabad to the Gulf, Asia, Europe and North America."
        seed="NETWORK"
      />
      <div className="mx-auto max-w-6xl px-6 pt-14 md:px-10">
        <FlightSearch />
      </div>

      <Section title="From Karachi, outward">
        <RouteMap />
        <p className="mt-4 text-sm text-ink/70">
          The network runs from Toronto to Tokyo, so the map is deliberately wide — longitudes are
          compressed to fit both ends on one canvas.
        </p>
      </Section>

      <Section title="Every city we serve">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {intl.map((d) => (
            <DestCard key={d.code} {...d} />
          ))}
        </div>
      </Section>

      <Section title="Across Pakistan">
        <div className="flex flex-wrap items-center gap-3">
          {domestic.map((d) => (
            <Link
              key={d.code}
              to={`/?from=KHI&to=${d.code}`}
              className="data rounded-md border border-[color:var(--gold-line)] bg-plate px-4 py-2 text-xs tracking-[0.08em] text-ink/80 transition hover:border-[color:var(--pia-gold)] hover:text-ink"
            >
              {d.city} <span className="data text-gold">{d.code}</span>
              {d.ur && <span className="urdu ml-2 text-[11px] text-ink/60">{d.ur}</span>}
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}

export function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services & extras"
        subtitle="Pre-book a meal, a seat or extra baggage, and arrange assistance before you travel."
        seed="EXPERIENCE"
      />

      <Section title="Everything you can add">
        {/* A ledger of entries divided by engraved rules, not a tile grid. */}
        <div className="grid gap-x-14 lg:grid-cols-2">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Section>

      <Section title="Executive Economy or Economy">
        <p className="mb-8 max-w-2xl text-ink/70">
          PIA markets two cabins. Executive Economy is the premium product — there is no separately
          branded business class.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {CABINS.map((c) => (
            <div
              key={c.name}
              className={`panel relative flex flex-col overflow-hidden p-7 ${
                c.highlight ? 'border-[color:var(--pia-gold)]' : ''
              }`}
            >
              {c.highlight && <div className="ramp absolute inset-x-0 top-0 h-0.5" />}
              <h3 className="font-display text-xl text-ink">{c.name}</h3>
              <p className="data mt-1 text-sm text-gold">{c.price}</p>
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm">
                {c.feats.map(([label, on]) => (
                  <li key={label} className={`flex items-center gap-2 ${on ? 'text-ink/80' : 'text-ink/50'}`}>
                    <span className={on ? 'text-brand' : 'text-ink/40'}>{on ? '✓' : '—'}</span> {label}
                  </li>
                ))}
              </ul>
              <Link
                to="/"
                className={`data mt-6 rounded-md py-3 text-center text-xs uppercase tracking-[0.15em] transition ${
                  c.highlight
                    ? 'bg-brand text-ivory shadow-[inset_0_0_0_1px_rgba(243,238,227,0.25)] hover:brightness-110'
                    : 'border border-[color:var(--gold-line)] bg-plate text-ink/80 hover:border-[color:var(--pia-gold)]'
                }`}
              >
                Search fares
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section title="What you can bring">
        <div className="grid gap-6 md:grid-cols-2">
          {BAGGAGE.map((b) => (
            <div key={b.cls} className="panel p-6">
              <h3 className="text-lg font-semibold text-ink">{b.cls}</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-ink/75">
                <li>
                  <span className="text-ink/60">Cabin</span> · <span className="data text-ink">{b.cabin}</span>
                </li>
                <li className="text-ink/75">{b.personal}</li>
                <li>
                  <span className="text-ink/60">Hold</span> · <span className="text-ink/80">{b.checked}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink/70">
          Checked allowance genuinely differs by region on PIA and is published per route under
          Booking Conditions, so it is not summarised here.
        </p>
      </Section>

      <Section title="Skip the queue">
        <div className="grid gap-6 sm:grid-cols-3">
          {CHECKIN.map((c) => (
            <div key={c.v} className="panel p-6 text-center">
              <div className="data text-3xl font-bold text-brand">{c.k}</div>
              <div className="mt-2 text-sm text-ink/75">{c.v}</div>
            </div>
          ))}
        </div>
        <Link to="/manage" className={`mt-8 ${ACTION}`}>
          Web check-in →
        </Link>
      </Section>
    </>
  )
}

export function FleetPage() {
  const inService = FLEET.filter((a) => !a.ordered).reduce((n, a) => n + a.count, 0)

  return (
    <>
      <PageHero
        title="The fleet"
        subtitle={`${inService} aircraft in service — Boeing 777s on the long haul, A320s and ATRs across the network.`}
        seed="FLEET"
      />
      <Section title="What we fly">
        <div className="grid gap-6 md:grid-cols-2">
          {FLEET.map((a) => (
            <div key={a.type} className="panel overflow-hidden p-[7px]">
              <div className="relative h-44 w-full overflow-hidden rounded-[5px]">
                <Scenic seed={a.type} label={a.type.split(' ').pop()} sizes="(min-width: 768px) 50vw, 100vw" className="absolute inset-0 h-full w-full" />
              </div>
              <div className="px-4 pb-4 pt-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-xl text-ink">{a.type}</h3>
                  <span className="data shrink-0 text-sm font-bold text-gold">
                    {a.ordered ? `${a.count} on order` : `${a.count} in service`}
                  </span>
                </div>
                <p className="mt-2 text-sm text-ink/75">{a.note}</p>
                <div className="mt-4 text-sm">
                  <span className="data text-ink/85">
                    <span className="font-sans text-ink/60">Range </span>
                    {a.range}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-ink/70">
          Counts from the published fleet table, February 2026. Ranges are the manufacturers'
          figures for the type.
        </p>
      </Section>
    </>
  )
}

export function HajjUmrahPage() {
  return (
    <>
      <PageHero
        title="Journeys to the Haramain"
        subtitle="Direct to Jeddah and Medina from cities across Pakistan, with a dedicated baggage policy for the Kingdom."
        seed="HAJJ"
      />

      <Section title="Where you land">
        <div className="grid gap-6 sm:grid-cols-3">
          {PILGRIMAGE_FACTS.map((f) => (
            <div key={f.k} className="panel p-6">
              <div className="data text-2xl font-bold text-brand">{f.k}</div>
              <div className="mt-2 text-sm text-ink/75">{f.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Four steps to your journey">
        <div className="grid gap-5 sm:grid-cols-2">
          {PILGRIMAGE_STEPS.map((s) => (
            <div key={s.k} className="panel p-6">
              <span className="data text-xs tracking-[0.25em] text-gold">{s.k}</span>
              <h3 className="mt-2 text-lg font-semibold text-ink">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Fly to Jeddah or Medina">
        <div className="grid gap-5 sm:grid-cols-2">
          {DESTINATIONS.filter((d) => ['JED', 'MED'].includes(d.code)).map((d) => (
            <DestCard key={d.code} {...d} />
          ))}
        </div>
        <div className="mt-8 panel p-8">
          <h3 className="text-lg font-semibold text-ink">Baggage on Saudi sectors</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink/70">
            Travel to and from the Kingdom follows a dedicated baggage acceptance policy, including
            the Zamzam allowance carried on the return leg. A polio vaccination certificate is
            mandatory for all travellers to Saudi Arabia.
          </p>
          <Link to="/services" className={`mt-6 ${ACTION}`}>
            Baggage guide →
          </Link>
        </div>
      </Section>
    </>
  )
}

export function ManagePage() {
  return (
    <>
      <PageHero
        title="Manage your trip"
        subtitle="Retrieve a booking with your PNR and surname to change dates, add baggage, pick a seat or check in."
        seed="MANAGE"
      />

      <Section title="Find your booking">
        <div className="panel p-6 md:p-8">
          <LookupPanel mode="manage" />
        </div>
      </Section>

      <Section title="Get your boarding pass">
        <div className="panel p-6 md:p-8">
          <LookupPanel mode="checkin" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {CHECKIN.map((c) => (
            <div key={c.v} className="panel p-6 text-center">
              <div className="data text-3xl font-bold text-brand">{c.k}</div>
              <div className="mt-2 text-sm text-ink/75">{c.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="After you have booked">
        <div className="grid gap-6 sm:grid-cols-2">
          {MANAGE_ACTIONS.map((a) => (
            <div key={a.title} className="panel p-6">
              <h3 className="text-lg font-semibold tracking-tight text-ink">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{a.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-ink/70">
          Change charges, fare differences and refund eligibility follow the fare rules for your
          route and booking class.
        </p>
      </Section>
    </>
  )
}

export function AboutPage() {
  return (
    <>
      <PageHero
        title="The flag carrier of Pakistan"
        subtitle="Flying from Karachi since 1955, connecting Pakistan to the Gulf, Asia, Europe and North America."
        seed="ABOUT"
      />

      <Section title="PIA in numbers">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_STATS.map((s) => (
            <div key={s.v} className="panel p-6 text-center">
              <div className="data text-4xl font-bold text-brand">{s.k}</div>
              <div className="mt-2 text-sm text-ink/75">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Great people to fly with">
        <div className="max-w-3xl space-y-4 text-ink/75">
          <p>
            Pakistan International Airlines grew out of Orient Airways and became the national flag
            carrier in 1955. Its main hub is Jinnah International Airport in Karachi, with secondary
            hubs at Lahore and Islamabad.
          </p>
          <p>
            The airline flies a fleet built around the Boeing 777 for long haul, the Airbus A320 for
            the domestic and Gulf network, and ATR turboprops on short regional sectors, with sixteen
            Boeing 787s on order.
          </p>
          <p>
            Passengers earn through Award +Plus, with individual, family, children's and corporate
            programmes, redeemable for award tickets, upgrades, excess baggage and seat
            pre-allocation.
          </p>
        </div>
      </Section>

      <Section title="Programmes">
        <div className="grid gap-5 md:grid-cols-3">
          {LOYALTY_TIERS.map((t) => (
            <div key={t.name} className="panel p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-ink">{t.name}</h3>
                <span className="data text-xs tracking-[0.15em] text-gold">{t.req}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink/75">{t.perks}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Get in touch">
        <div className="panel p-8">
          <p className="text-ink/75">{CONTACT.address}</p>
          <p className="data mt-4 text-lg text-brand">{CONTACT.phone}</p>
          <p className="data text-ink/75">{CONTACT.email}</p>
        </div>
      </Section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <PageHero title="Page not found" subtitle="This gate does not exist." seed="404" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Link to="/" className={ACTION}>
          Back to home
        </Link>
      </div>
    </>
  )
}

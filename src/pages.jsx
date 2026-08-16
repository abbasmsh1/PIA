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
        <p className="mt-4 text-sm text-white/65">
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
              className="data rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs tracking-[0.08em] text-white/70 backdrop-blur transition hover:border-mint/40 hover:text-white"
            >
              {d.city} <span className="data text-gold">{d.code}</span>
              {d.ur && <span className="urdu ml-2 text-[11px] text-white/55">{d.ur}</span>}
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </Section>

      <Section title="Executive Economy or Economy">
        <p className="mb-8 max-w-2xl text-white/60">
          PIA markets two cabins. Executive Economy is the premium product — there is no separately
          branded business class.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {CABINS.map((c) => (
            <div
              key={c.name}
              className={`panel flex flex-col p-7 ${
                c.highlight ? 'border-mint/45 shadow-brand/10' : ''
              }`}
            >
              <h3 className="text-xl font-semibold text-white/90">{c.name}</h3>
              <p className="data mt-1 text-sm text-gold">{c.price}</p>
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm">
                {c.feats.map(([label, on]) => (
                  <li key={label} className={`flex items-center gap-2 ${on ? 'text-white/75' : 'text-white/55'}`}>
                    <span className={on ? 'text-lime' : 'text-white/55'}>{on ? '✓' : '—'}</span> {label}
                  </li>
                ))}
              </ul>
              <Link
                to="/"
                className={`data mt-6 rounded-full py-3 text-center text-xs uppercase tracking-[0.15em] transition ${
                  c.highlight
                    ? 'bg-brand text-white shadow-lg shadow-brand/25 hover:brightness-115'
                    : 'border border-white/12 bg-white/[0.04] text-white/75 hover:border-mint/40'
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
              <h3 className="text-lg font-semibold text-white/90">{b.cls}</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
                <li>
                  <span className="text-white/60">Cabin</span> · <span className="data text-white/90">{b.cabin}</span>
                </li>
                <li className="text-white/70">{b.personal}</li>
                <li>
                  <span className="text-white/60">Hold</span> · <span className="text-white/80">{b.checked}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-white/65">
          Checked allowance genuinely differs by region on PIA and is published per route under
          Booking Conditions, so it is not summarised here.
        </p>
      </Section>

      <Section title="Skip the queue">
        <div className="grid gap-6 sm:grid-cols-3">
          {CHECKIN.map((c) => (
            <div key={c.v} className="panel p-6 text-center">
              <div className="data text-3xl font-bold text-gold">{c.k}</div>
              <div className="mt-2 text-sm text-white/70">{c.v}</div>
            </div>
          ))}
        </div>
        <Link
          to="/manage"
          className="data mt-8 inline-block rounded-full bg-brand px-7 py-3.5 text-xs uppercase tracking-[0.15em] text-white shadow-lg shadow-brand/25 transition hover:brightness-115"
        >
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
            <div key={a.type} className="panel overflow-hidden">
              <Scenic seed={a.type} label={a.type.split(' ').pop()} sizes="(min-width: 768px) 50vw, 100vw" className="h-44 w-full" />
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-white/90">{a.type}</h3>
                  <span className="data shrink-0 text-sm font-bold text-gold">
                    {a.ordered ? `${a.count} on order` : `${a.count} in service`}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/70">{a.note}</p>
                <div className="mt-4 text-sm">
                  <span className="data text-white/80">
                    <span className="font-sans text-white/60">Range </span>
                    {a.range}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/65">
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
              <div className="data text-2xl font-bold text-lime">{f.k}</div>
              <div className="mt-2 text-sm text-white/70">{f.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Four steps to your journey">
        <div className="grid gap-5 sm:grid-cols-2">
          {PILGRIMAGE_STEPS.map((s) => (
            <div key={s.k} className="panel p-6">
              <span className="data text-xs tracking-[0.25em] text-lime">{s.k}</span>
              <h3 className="mt-2 text-lg font-semibold text-white/90">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{s.body}</p>
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
          <h3 className="text-lg font-semibold text-white/90">Baggage on Saudi sectors</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
            Travel to and from the Kingdom follows a dedicated baggage acceptance policy, including
            the Zamzam allowance carried on the return leg. A polio vaccination certificate is
            mandatory for all travellers to Saudi Arabia.
          </p>
          <Link
            to="/services"
            className="mt-6 inline-block data rounded-md bg-brand px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:brightness-115"
          >
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
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
          <LookupPanel mode="manage" />
        </div>
      </Section>

      <Section title="Get your boarding pass">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
          <LookupPanel mode="checkin" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {CHECKIN.map((c) => (
            <div key={c.v} className="panel p-6 text-center">
              <div className="data text-3xl font-bold text-gold">{c.k}</div>
              <div className="mt-2 text-sm text-white/70">{c.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="After you have booked">
        <div className="grid gap-6 sm:grid-cols-2">
          {MANAGE_ACTIONS.map((a) => (
            <div key={a.title} className="panel p-6">
              <h3 className="text-lg font-medium tracking-tight text-white/90">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{a.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-white/65">
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
              <div className="data text-4xl font-bold text-lime">{s.k}</div>
              <div className="mt-2 text-sm text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Great people to fly with">
        <div className="max-w-3xl space-y-4 text-white/60">
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
                <h3 className="text-lg font-semibold text-white/90">{t.name}</h3>
                <span className="data text-xs tracking-[0.15em] text-lime">{t.req}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{t.perks}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Get in touch">
        <div className="panel p-8">
          <p className="text-white/70">{CONTACT.address}</p>
          <p className="data mt-4 text-lg text-lime">{CONTACT.phone}</p>
          <p className="data text-white/70">{CONTACT.email}</p>
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
        <Link
          to="/"
          className="data rounded-md bg-brand px-8 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:brightness-115"
        >
          Back to home
        </Link>
      </div>
    </>
  )
}

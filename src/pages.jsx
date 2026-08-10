import { Link } from 'react-router-dom'
import { PageHero, Section, DestCard } from './Layout.jsx'
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
        eyebrow="Where we Fly"
        title="Our network"
        subtitle="Direct from Karachi, Lahore and Islamabad to the Gulf, Asia, Europe and North America."
        seed="NETWORK"
      />
      <div className="mx-auto max-w-6xl px-6 pt-14 md:px-10">
        <FlightSearch />
      </div>

      <Section eyebrow="The map" title="From Karachi, outward">
        <RouteMap />
        <p className="mt-4 text-sm text-white/45">
          The network runs from Toronto to Tokyo, so the map is deliberately wide — longitudes are
          compressed to fit both ends on one canvas.
        </p>
      </Section>

      <Section eyebrow="International" title="Every city we serve">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {intl.map((d) => (
            <DestCard key={d.code} {...d} />
          ))}
        </div>
      </Section>

      <Section eyebrow="Domestic" title="Across Pakistan">
        <div className="flex flex-wrap items-center gap-3">
          {domestic.map((d) => (
            <Link
              key={d.code}
              to={`/?from=KHI&to=${d.code}`}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/75 transition hover:border-white/25 hover:text-white"
            >
              {d.city} <span className="data text-white/40">{d.code}</span>
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
        eyebrow="Experience"
        title="Services & extras"
        subtitle="Pre-book a meal, a seat or extra baggage, and arrange assistance before you travel."
        seed="EXPERIENCE"
      />

      <Section eyebrow="Our Services" title="Everything you can add">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-white/20 hover:bg-white/[0.05]"
            >
              <h3 className="text-lg font-medium tracking-tight text-white/90">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Cabins" title="Executive Economy or Economy">
        <p className="mb-8 max-w-2xl text-white/60">
          PIA markets two cabins. Executive Economy is the premium product — there is no separately
          branded business class.
        </p>
        <div className="grid gap-5 md:grid-cols-2">
          {CABINS.map((c) => (
            <div
              key={c.name}
              className={`flex flex-col rounded-2xl border p-6 ${
                c.highlight ? 'border-[#007d34]/50 bg-[#007d34]/[0.08]' : 'border-white/10 bg-white/[0.03]'
              }`}
            >
              <h3 className="text-xl font-semibold text-white/90">{c.name}</h3>
              <p className="data mt-1 text-sm text-[#cdd500]">{c.price}</p>
              <ul className="mt-4 flex flex-1 flex-col gap-2 text-sm">
                {c.feats.map(([label, on]) => (
                  <li key={label} className={`flex items-center gap-2 ${on ? 'text-white/75' : 'text-white/30'}`}>
                    <span className={on ? 'text-[#cdd500]' : 'text-white/30'}>{on ? '✓' : '—'}</span> {label}
                  </li>
                ))}
              </ul>
              <Link
                to="/"
                className={`mt-5 rounded-full py-2.5 text-center text-sm font-semibold transition ${
                  c.highlight
                    ? 'bg-[#007d34] text-white hover:brightness-110'
                    : 'border border-white/15 text-white/80 hover:bg-white/10'
                }`}
              >
                Search fares
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Baggage" title="What you can bring">
        <div className="grid gap-6 md:grid-cols-2">
          {BAGGAGE.map((b) => (
            <div key={b.cls} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-semibold text-white/90">{b.cls}</h3>
              <ul className="mt-4 flex flex-col gap-2 text-sm text-white/70">
                <li>
                  <span className="text-white/40">Cabin</span> · <span className="data text-white/90">{b.cabin}</span>
                </li>
                <li className="text-white/55">{b.personal}</li>
                <li>
                  <span className="text-white/40">Hold</span> · <span className="text-white/80">{b.checked}</span>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-white/45">
          Checked allowance genuinely differs by region on PIA and is published per route under
          Booking Conditions, so it is not summarised here.
        </p>
      </Section>

      <Section eyebrow="Check-in" title="Skip the queue">
        <div className="grid gap-6 sm:grid-cols-3">
          {CHECKIN.map((c) => (
            <div key={c.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="data text-3xl font-bold text-[#cdd500]">{c.k}</div>
              <div className="mt-2 text-sm text-white/55">{c.v}</div>
            </div>
          ))}
        </div>
        <Link
          to="/manage"
          className="mt-8 inline-block rounded-full bg-[#007d34] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
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
        eyebrow="Our aircraft"
        title="The fleet"
        subtitle={`${inService} aircraft in service — Boeing 777s on the long haul, A320s and ATRs across the network.`}
        seed="FLEET"
      />
      <Section eyebrow="Aircraft types" title="What we fly">
        <div className="grid gap-6 md:grid-cols-2">
          {FLEET.map((a) => (
            <div key={a.type} className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
              <Scenic seed={a.type} label={a.type.split(' ').pop()} className="h-44 w-full" />
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-xl font-semibold tracking-tight text-white/90">{a.type}</h3>
                  <span className="data shrink-0 text-sm font-bold text-[#cdd500]">
                    {a.ordered ? `${a.count} on order` : `${a.count} in service`}
                  </span>
                </div>
                <p className="mt-2 text-sm text-white/55">{a.note}</p>
                <div className="mt-4 text-sm">
                  <span className="data text-white/80">
                    <span className="font-sans text-white/40">Range </span>
                    {a.range}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-white/45">
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
        eyebrow="Hajj & Umrah"
        title="Journeys to the Haramain"
        subtitle="Direct to Jeddah and Medina from cities across Pakistan, with a dedicated baggage policy for the Kingdom."
        seed="JED"
      />

      <Section eyebrow="Airports" title="Where you land">
        <div className="grid gap-6 sm:grid-cols-3">
          {PILGRIMAGE_FACTS.map((f) => (
            <div key={f.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="data text-2xl font-bold text-[#cdd500]">{f.k}</div>
              <div className="mt-2 text-sm text-white/55">{f.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Before you go" title="Four steps to your journey">
        <div className="grid gap-5 sm:grid-cols-2">
          {PILGRIMAGE_STEPS.map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="data text-xs tracking-[0.25em] text-[#cdd500]">{s.k}</span>
              <h3 className="mt-2 text-lg font-semibold text-white/90">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Fares" title="Fly to Jeddah or Medina">
        <div className="grid gap-5 sm:grid-cols-2">
          {DESTINATIONS.filter((d) => ['JED', 'MED'].includes(d.code)).map((d) => (
            <DestCard key={d.code} {...d} />
          ))}
        </div>
        <div className="mt-8 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-8">
          <h3 className="text-lg font-semibold text-white/90">Baggage on Saudi sectors</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
            Travel to and from the Kingdom follows a dedicated baggage acceptance policy, including
            the Zamzam allowance carried on the return leg. A polio vaccination certificate is
            mandatory for all travellers to Saudi Arabia.
          </p>
          <Link
            to="/services"
            className="mt-6 inline-block rounded-full bg-[#007d34] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-110"
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
        eyebrow="My booking"
        title="Manage your trip"
        subtitle="Retrieve a booking with your PNR and surname to change dates, add baggage, pick a seat or check in."
        seed="MANAGE"
      />

      <Section eyebrow="Retrieve" title="Find your booking">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
          <LookupPanel mode="manage" />
        </div>
      </Section>

      <Section eyebrow="Web check-in" title="Get your boarding pass">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.10] to-white/[0.03] p-6 backdrop-blur-2xl md:p-8">
          <LookupPanel mode="checkin" />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {CHECKIN.map((c) => (
            <div key={c.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="data text-3xl font-bold text-[#cdd500]">{c.k}</div>
              <div className="mt-2 text-sm text-white/55">{c.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="What you can change" title="After you have booked">
        <div className="grid gap-6 sm:grid-cols-2">
          {MANAGE_ACTIONS.map((a) => (
            <div key={a.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <h3 className="text-lg font-medium tracking-tight text-white/90">{a.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{a.body}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-2xl text-sm text-white/45">
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
        eyebrow="Who we are"
        title="The flag carrier of Pakistan"
        subtitle="Flying from Karachi since 1955, connecting Pakistan to the Gulf, Asia, Europe and North America."
        seed="ABOUT"
      />

      <Section eyebrow="At a glance" title="PIA in numbers">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_STATS.map((s) => (
            <div key={s.v} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center">
              <div className="data text-4xl font-bold text-[#cdd500]">{s.k}</div>
              <div className="mt-2 text-sm text-white/55">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Our story" title="Great people to fly with">
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

      <Section eyebrow="Award +Plus" title="Programmes">
        <div className="grid gap-5 md:grid-cols-3">
          {LOYALTY_TIERS.map((t) => (
            <div key={t.name} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-semibold text-white/90">{t.name}</h3>
                <span className="data text-xs tracking-[0.15em] text-[#cdd500]">{t.req}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{t.perks}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section eyebrow="Contact" title="Get in touch">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <p className="text-white/70">{CONTACT.address}</p>
          <p className="data mt-4 text-lg text-[#cdd500]">{CONTACT.phone}</p>
          <p className="data text-white/70">{CONTACT.email}</p>
        </div>
      </Section>
    </>
  )
}

export function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="Page not found" subtitle="This gate does not exist." seed="404" />
      <div className="mx-auto max-w-6xl px-6 py-16 md:px-10">
        <Link
          to="/"
          className="rounded-full bg-[#007d34] px-8 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Back to home
        </Link>
      </div>
    </>
  )
}

# PRODUCT.md

Durable product truth for this build. Visual decisions live in DESIGN.md; this
file records what the thing is for and what it may not do.

## What it is

An unaffiliated concept redesign of piac.com.pk, the site of Pakistan
International Airlines. It is an argument, not a portfolio piece: it claims the
national carrier's site could work like this, and it has to be credible enough
that an airline reader believes it is buildable.

That framing decides arguments. When expression and buildability disagree,
buildability wins — a technique nobody could ship in an airline's real stack is
a weaker argument than a plainer one that survives contact with a booking
engine, a CMS and a compliance review.

## Who it is for

**The primary visitor is a passenger booking a flight.** Someone leaving
Karachi, Lahore or Islamabad who wants a fare and a date. Every page is judged
by whether it moves that person forward.

Consequences that hold across passes:

- A fare is reachable without scrolling: the booking widget sits in the hero.
- Every fare card and destination card prefills the search rather than dropping
  the visitor on an empty form.
- Cabin names, baggage rules and check-in times use PIA's own words, not
  invented marketing terms. "Executive Economy" is the premium cabin; there is
  no business class.
- A designer or recruiter reading it is a welcome second audience, never the
  reason to make the booking path worse.

## Content rules

Content is adapted from the public piac.com.pk (captured 14 Apr 2025 via the
Internet Archive, since the live host 403s non-browser requests) and from
Wikipedia for fleet and network data.

- Anything not verifiable against a source is marked `illustrative` in
  `src/data.js`. Award +Plus tier thresholds and checked-baggage allowance by
  region are the two current cases.
- Five fares are quoted verbatim from the archived BEST OFFERS rail; the rest
  are illustrative. Do not present an illustrative number as published.
- Never add a claim about PIA — a service, a policy, a statistic — that no
  source supports. Ask instead.

## Constraints

- **The takeoff hero stays.** The scroll-driven canvas playback of a PIA 777
  rotating off the runway is the piece's centre. Later passes may restyle
  everything around it; they do not replace it.
- Static site: Vite, React and react-router, no server, no real booking engine,
  no keys in the client. Search results, PNR lookup and check-in are honest
  mock-ups, and nothing pretends to be a live transaction.
- Real PIA branding is used — the actual logo from the airline's own asset, the
  green and gold identity — under a visible unaffiliated-concept disclaimer.
  It is a registered trademark and appears here on that basis alone.
- Photography is hotlinked from Unsplash rather than committed, and must not
  show another airline's livery beside PIA's name.

## Where things live

| File | Role |
| --- | --- |
| `src/data.js` | Every string, fare and airport, with its sourcing note |
| `src/PlaneScroll.jsx` | The hero: frame loader, canvas scrub, story beats |
| `src/BookingElements.jsx` | Booking widget, PNR lookup, fare cards |
| `src/Scenic.jsx` | Image frame: photo per seed, brand-gradient fallback |
| `src/check.mjs` | Self-checks: map projection, currency, photo coverage |
| `DESIGN.md` | The visual system, derived from the shipped code |

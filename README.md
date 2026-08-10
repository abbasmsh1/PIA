# PIA — fan concept

A single-page concept site for Pakistan International Airlines, built with Vite,
React 19, Tailwind 4 and react-router. Not affiliated with PIA.

Content is adapted from the public piac.com.pk site (captured 14 Apr 2025 via the
Internet Archive, since the live site is behind a bot check) and from Wikipedia
for fleet and network data. Anything that could not be verified against a source
is marked with an `illustrative` comment in `src/data.js` — see the header there.

## Commands

```bash
npm install
npm run dev      # local dev server
npm run check    # asserts every mapped airport projects inside the route-map canvas
npm run lint
npm run build
```

## Layout

| File | Role |
| --- | --- |
| `src/data.js` | Every string, fare and airport on the site |
| `src/geo.js` | Equirectangular projection for the route map |
| `src/PlaneScroll.jsx` | Scroll-scrubbed takeoff canvas + hero booking widget |
| `src/BookingElements.jsx` | Booking widget, PNR lookup, fare tickets |
| `src/Scenic.jsx` | Brand-gradient stand-in used everywhere a photo would go |

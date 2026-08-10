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
| `public/takeoff/` | 240-frame PIA 777 takeoff sequence the hero canvas scrubs |
| `src/BookingElements.jsx` | Booking widget, PNR lookup, fare tickets |
| `src/Scenic.jsx` | Image frame: Unsplash photo per seed, brand-gradient fallback |

The hero scrubs `public/takeoff/`, 240 frames of a PIA 777 rotating off the
runway. It replaced a 64-frame 4K sequence of another carrier's A320 (still in
git history), which is why the canvas grade is now a light brand wash instead of
a duotone that hid the livery.

Photography is from [Unsplash](https://unsplash.com), hotlinked off their CDN
(`images.unsplash.com`) at the size each frame needs, up to 4K on the heroes.
The seed-to-photo map lives at the top of `src/Scenic.jsx`; any seed missing from
it renders the original brand-gradient wash instead.

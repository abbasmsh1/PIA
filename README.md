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
| `public/takeoff/` | 192-frame PIA 777 takeoff sequence the hero canvas scrubs |
| `src/BookingElements.jsx` | Booking widget, PNR lookup, fare tickets |
| `src/Scenic.jsx` | Image frame: Unsplash photo per seed, brand-gradient fallback |

The hero scrubs `public/takeoff/`, 192 frames of a PIA 777 rotating off the
runway. It replaced a 64-frame 4K sequence of another carrier's A320 (still in
git history), which is why the canvas grade is now a light brand wash instead of
a duotone that hid the livery.

The PNG renders live in a git-ignored `Assets/` folder. To re-encode after
changing them:

```bash
python3 - <<'ENCODE'
import glob, os
from PIL import Image, ImageFilter
for p in sorted(glob.glob('Assets/frame_*.png')):
    n = os.path.basename(p).replace('.png', '.jpg')
    im = Image.open(p).convert('RGB')
    # Acutance is baked in here because the canvas draws these above 1:1.
    # Measured against the PNGs, q72 already keeps all the detail a 720p source
    # has, so quality is not the lever; 45% is the point just before halos.
    im = im.filter(ImageFilter.UnsharpMask(radius=1.1, percent=45, threshold=3))
    im.save('public/takeoff/' + n, 'JPEG', quality=72, optimize=True, progressive=True)
ENCODE
```

Then set `FRAME_COUNT` in `src/PlaneScroll.jsx` to the new frame count.

The sequence is 1280x720, so the hero is drawn at roughly 1.5x on a 1x display.
If a higher-resolution export of the same footage exists, dropping it into
`Assets/` and re-running the command above is the only change that adds real
detail — everything else in the pipeline is acutance, not resolution.

The logo is PIA's own `images/assets/pia-logo.svg`, retrieved from the Internet
Archive capture of 4 Jun 2024 because the live host 403s any non-browser request.
`public/pia-logo.svg` is that file with the indentation stripped and nothing else
touched; `public/pia-logo-reversed.svg` is the same geometry with the green
wordmark set to white and the gold lifted to `#D9BC55`, which is what the header
and footer use over the near-black ground. The real mark is two flat colours —
green `#006937` and gold `#A48D29`. It is a registered trademark and appears here
only because this is an unaffiliated fan concept.

Photography is from [Unsplash](https://unsplash.com), hotlinked off their CDN
(`images.unsplash.com`) at the size each frame needs, up to 4K on the heroes.
The seed-to-photo map lives at the top of `src/Scenic.jsx`; any seed missing from
it renders the original brand-gradient wash instead.

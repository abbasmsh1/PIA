---
name: PIA — Pakistan International Airlines (concept)
description: The booking hall as a Mughal marble court — ivory stone, emerald regions, engraved gold inlay.
colors:
  ivory: "#f3eee3"
  plate: "#faf6ec"
  well: "#fffdf6"
  ink: "#1d2a23"
  pia-emerald: "#006937"
  emerald-deep: "#0d3b26"
  gold-inlay: "#a48d29"
  gold-text: "#7d6a1d"
  gold-on-emerald: "#d9bc55"
  mint: "#75dc86"
  lime: "#cdd500"
typography:
  display:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(3rem, 6vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Marcellus, 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 4vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0.005em"
  body:
    fontFamily: "Albert Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Albert Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    letterSpacing: "0.16em"
  data:
    fontFamily: "Spline Sans Mono, ui-monospace, 'SF Mono', Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    letterSpacing: "0"
  urdu:
    fontFamily: "Noto Nastaliq Urdu, serif"
    lineHeight: 2.1
rounded:
  chip: "3px"
  focus: "4px"
  field: "6px"
  panel: "10px"
spacing:
  gutter: "1.5rem"
  gutter-md: "2.5rem"
  section-top: "10rem"
  section-bottom: "6rem"
components:
  button-primary:
    backgroundColor: "{colors.pia-emerald}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.field}"
    padding: "10px 20px"
  chip:
    textColor: "currentColor"
    typography: "{typography.data}"
    rounded: "{rounded.chip}"
    padding: "3px 10px"
  card-panel:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
  field-well:
    backgroundColor: "{colors.well}"
    textColor: "{colors.ink}"
    rounded: "{rounded.field}"
    padding: "10px 14px"
  tablet:
    backgroundColor: "{colors.emerald-deep}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.panel}"
---

# Design System: PIA — Pakistan International Airlines (concept)

## Overview

**Creative North Star: "The Marble Court"**

The booking hall is a Mughal marble court. The page is an ivory stone ground
structured by inlaid cartouche borders and pierced jali screens; it refuses the
dark-glass photo-hero airline default and the white-minimal opposite alike.
Everything is stone: raised surfaces are inlaid plates, form fields are recessed
carvings, the dark regions are carved emerald tablets with gold engraving. The
two brand colors are the ones PIA's own logo already carries — the wordmark's
emerald and the calligraphic mark's gold — and each has one job: emerald fills
whole regions, gold draws lines.

Density is architectural rather than busy: full-height snap sections, one
inscriptional headline per section over an engraved double rule, generous ivory
around every plate. Motion is stone motion — surfaces settle (a short damped
rise), inlay threads draw in; nothing flies, blurs, or goes translucent.
`prefers-reduced-motion` disables all of it.

**Key Characteristics:**
- Ivory marble ground with jali-lattice watermarks at the page edges (6% opacity)
- Gold is engraved line-work only: double rules, hairlines, inlay threads
- Emerald commits at region scale: departures tablet, footer, filled actions
- Cusped ogee arch clips every featured photograph
- Inscriptional Marcellus display, Albert Sans body, Spline Sans Mono ticket data
- Crisp offset shadows for depth; no blur materials, no glass, no translucency

## Colors

An ivory-and-ink ground carrying exactly two voices from the airline's own
mark: emerald that fills and gold that draws.

### Primary
- **PIA Emerald** (#006937): the wordmark's green. Filled buttons, fare-price
  tags, focus outlines, caret color. The only fill color besides stone.
- **Emerald Deep** (#0d3b26): the carved green stone of the dark regions —
  departures tablet, footer, page-hero wash. Always paired with gold engraving
  and ivory text.

### Secondary
- **Gold Inlay** (#a48d29): the mark's gold, used as line-work at partial
  opacity — borders at `rgba(164,141,41,0.45)`, soft rules at `0.28`. Never a
  text color, never a fill.
- **Gold Text** (#7d6a1d): gold darkened until small text clears 4.5:1 on
  ivory. The only gold that may set type on light grounds.
- **Gold on Emerald** (#d9bc55): the brighter engraving gold used on dark
  grounds — footer column labels, the NOTICE tag, the hero's inset inlay frame
  (`rgba(217,188,85,0.5)` as a line).

### Tertiary
- **Mint** (#75dc86) and **Lime** (#cdd500): status accents that read on the
  emerald tablets only (departures board states). They never appear on ivory.

### Neutral
- **Ivory** (#f3eee3): the page ground, and the text color on emerald.
- **Plate** (#faf6ec): raised surfaces, one step lighter than the ground.
- **Well** (#fffdf6): recessed form-field interiors.
- **Ink** (#1d2a23): a green-cast near-black; all body text, at /70 and /60
  alpha steps for secondary and muted text.

### Named Rules
**The Line, Never a Fill Rule.** Gold never fills an area. It is the engraved
line: double-rule borders, hairlines, the `.ramp` inlay thread, route-map arcs.
If a surface needs a fill, it is stone (ivory/plate) or emerald.

**The Region Commit Rule.** Emerald commits at region scale or not at all: a
whole tablet, the whole footer, a whole filled button. No emerald tints,
washes, or pale-green backgrounds on ivory.

## Typography

**Display Font:** Marcellus (with Times New Roman, serif)
**Body Font:** Albert Sans (with system-ui sans stack)
**Data Font:** Spline Sans Mono (with ui-monospace stack)
**Urdu Font:** Noto Nastaliq Urdu (RTL, isolated bidi, line-height 2.1)

**Character:** Inscriptional, not typographic. Marcellus carries one weight
(400) because carving is not bolded; the sans does the working text; the mono
is the ticket counter's stamp.

### Hierarchy
- **Display** (400, 3rem → 4.25rem, lh 1.05): page-hero H1 in ivory over the
  emerald wash, doubled behind itself as a ghost word (7rem, 10% ivory,
  uppercase).
- **Headline** (400, 2.25rem → 3.25rem, lh 1.08): section H2 in ink, always
  followed by the 24px-wide engraved double rule.
- **Title** (600, 1.125rem, tracking-tight): card and ledger-entry titles in
  Albert Sans semibold.
- **Body** (400, 0.875rem, lh 1.625): ink at /70; long copy capped near 62ch.
- **Label** (600, 11px, 0.16em, UPPERCASE): footer column titles and the
  NOTICE tag; on dark grounds it takes Gold on Emerald.
- **Data** (Spline Sans Mono, tabular numerals via `tnum`): airport codes,
  fares, flight numbers, times, PNRs, chips, field values. Route pairs track
  at 0.12em.

### Named Rules
**The Two-Level Inscription Rule.** Only h1 and h2 wear Marcellus. Everything
below the section title stays in Albert Sans.

**The Ticket Face Rule.** The mono face is reserved for ticket data (codes,
fares, times, statuses). It never sets prose or headings.

## Layout

A single centered column: `max-w-6xl` for sections (`max-w-7xl` for the header
bar), gutters of 1.5rem mobile / 2.5rem desktop. Sections are full-height
(`min-h-screen`, page heroes `min-h-[92vh]`) with y-proximity scroll snap and
`scroll-padding-top: 8rem` so snapped sections stop below the fixed header.
Section rhythm is pt-40 / pb-24 with a mt-12 gap between the ruled heading and
its content. The fixed backdrop lays the jali lattice down both page edges
(16rem wide, 6% opacity, masked toward the center) so text columns sit on
clean stone. The header is a fixed ivory lintel — solid, gold-hairline ruled
underneath, never translucent — topped by a dismissible one-line advisory bar
on emerald. Content enters with the `.reveal` settle (14px rise, 0.8s,
`cubic-bezier(0.16,1,0.3,1)`) triggered once per element by
IntersectionObserver.

## Elevation & Depth

Depth is stone depth: crisp lines over shallow offset shadows, never blur
materials, never translucency, never glass. A raised plate reads as inlaid
(hairline border plus an inner rule engraved 3px inside); a form field reads
as recessed (inset shadow); the dark tablets throw a deeper colored shadow.

### Shadow Vocabulary
- **Contact** (`0 2px 10px -4px rgba(29,42,35,0.22)`): the resting `.panel`
  shadow, paired with the inset double rule.
- **Mounted** (`0 24px 48px -18px rgba(6,18,12,0.6)`): `.panel-thick`, for the
  ivory plate set over the takeoff film or a photograph.
- **Recessed** (`inset 0 1px 3px 0 rgba(29,42,35,0.10)`): the `.well` field
  interior.
- **Tablet** (`0 8px 24px -10px rgba(13,59,38,0.55)`): the emerald stone
  regions, shadow tinted with their own green.
- **Hover lift** (`translateY(-2px)` + `0 10px 24px -10px rgba(29,42,35,0.30)`
  + border brightening to full gold): `.panel-hover`, 0.5s expo-out.

### Named Rules
**The Stone Depth Rule.** Nothing blurs and nothing is translucent — no
backdrop-filter, no glass, no frosted header. Depth comes from offset shadows
and engraved inset rules only.

## Shapes

The form language is the cartouche and the pierced screen. Rectangles carry
soft 10px corners on plates and tablets, 6px on fields and buttons, 3px on
chips — quiet radii that defer to the line-work. The signature silhouette is
the cusped ogee arch (`#jali-arch`, a normalized SVG clipPath defined once in
Layout), which clips every featured photograph: destination cards, the pinned
sticky visual. The recurring surface texture is the jali lattice — a hexagonal
pierced-screen SVG tile (56px) drawn in gold — used at whisper contrast (6%)
on ivory edges and as a 20%-opacity frieze along the footer's top. Borders are
1px gold hairlines; the double rule (two gold hairlines 3px apart, or the 5px
`border-y` element) is the engraved motif shared by panels, heading
underlines, and the hero's rule.

### Named Rules
**The Arch Frame Rule.** The cusped ogee arch is the photo-frame grammar.
Featured photography hangs inside a plate, clipped to `#jali-arch`; bare
rectangular hero photos are off-world.

**The Double Rule Rule.** The engraved gold double rule is the heading grammar
and the panel border grammar. It underlines section titles (24px wide, 5px
tall) and rings every plate 3px inside its edge; it is not a generic divider.

## Components

### Buttons
- **Shape:** softly squared (6px radius)
- **Primary:** PIA Emerald fill, ivory semibold 0.875rem text, padding
  10px 20px, an inner ivory keyline (`inset 0 0 0 1px rgba(243,238,227,0.25)`)
  and a green-tinted offset shadow
- **Hover / Focus:** `brightness(1.10)` on hover; global focus is a 2px
  PIA-Emerald outline offset 3px
- **Secondary:** plate background with a gold hairline border and ink text
  (the mobile menu toggle pattern)

### Chips
- **Style:** mono face, 11px, 0.1em tracking, 3px radius, 1px border in
  `currentColor`, padding 3px 10px; color comes from the status (mint/lime on
  emerald tablets, brand/ink on ivory)
- **State:** status pills (BOARDING / ON TIME / DELAYED) and fare-class tags

### Cards / Containers
- **Corner Style:** 10px
- **Background:** Plate (#faf6ec) with the gold double rule inset 3px
- **Shadow Strategy:** Contact at rest; Mounted over photography; hover lifts
  2px and brightens the border to full gold (see Elevation & Depth)
- **Internal Padding:** destination cards pad 7px so the arch-clipped photo
  hangs tight inside the frame; text blocks pad ~12-14px
- **Variants:** `.tablet` is the emerald counterpart — emerald-deep stone
  under a subtle vertical sheen, gold engraving at 0.55 alpha, ivory text

### Inputs / Fields
- **Style:** the recessed well — #fffdf6 interior, 1px ink-alpha border, 6px
  radius, inset shadow; the label sits permanently above the value (11px,
  ink/60), the value sets in the data face
- **Focus:** border and a 1px ring turn PIA Emerald; the label turns brand;
  caret is emerald
- **Date fields:** popovers built on native date inputs, styled as wells

### Navigation
- **Style:** 0.875rem medium Albert Sans in the ivory lintel; inactive links
  ink/60, hover ink, active marked by a 2px gold underline border
- **Mobile:** full-screen ivory sheet with gold-soft ruled rows; focus-trapped,
  Escape closes and returns focus

### Ledger Rows (services)
Services read as a ledger, not a tile grid: a 40px gold-bordered glyph plate
(24px inline stroke icon, 1.8 stroke, brand color), entry title, and body
along one rail, rows divided by soft gold rules, hover washes the row plate.

### Departures Tablet (signature)
The emerald stone tablet carrying split-flap departures in the mono face, gold
engraving, mint/lime status chips — always labeled illustrative.

### Page Hero (signature)
Full-bleed Scenic photograph under an emerald-deep gradient wash (85% → 45% →
transparent, left to right), an inset gold inlay frame (1px, gold-on-emerald
at 0.5, inset 1rem from edges and below the header), the ghost word behind the
ivory Marcellus H1, and a gold double rule beneath.

## Do's and Don'ts

### Do:
- **Do** keep gold as line-work: hairlines at `rgba(164,141,41,0.45)` /
  `0.28`, the double rule, the `.ramp` thread; use #7d6a1d when gold must be
  read as small text on ivory.
- **Do** commit emerald at region scale: whole tablets, the footer, filled
  buttons — with gold engraving and ivory text.
- **Do** clip featured photography with the `#jali-arch` ogee clipPath inside
  a `.panel` plate.
- **Do** set every airport code, fare, time, and PNR in Spline Sans Mono with
  tabular numerals.
- **Do** use the settle-and-draw motion grammar (0.5-0.8s,
  `cubic-bezier(0.16,1,0.3,1)`; `.route-line` draw 1.6s) and honor
  `prefers-reduced-motion` on every animation.
- **Do** label the departures board and any unverifiable figure illustrative;
  never present mock data as live or published.

### Don't:
- **Don't** use kickers or eyebrows above headings. The heading grammar is the
  Marcellus title over the engraved double rule; small uppercase labels exist
  only as footer column titles and data tags.
- **Don't** use blur, glass, translucency, or backdrop-filter anywhere — the
  header stays solid ivory; depth is offset shadow and engraved rule.
- **Don't** fill any surface with gold, tint ivory with pale green, or put
  mint/lime accents on light grounds.
- **Don't** bold Marcellus or use it below h2; don't set prose in the mono
  face.
- **Don't** ship icon fonts or icon libraries; glyphs are inline 24px stroke
  SVGs in the page's own stroke system.

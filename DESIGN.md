---
name: PIA Concept
description: A Mughal marble court for the flag carrier — ivory stone, deep green ink, emerald regions and gold engraved as line, never as fill.
colors:
  ivory: "#f3eee3"
  plate: "#faf6ec"
  paper: "#fffdf6"
  ink: "#1d2a23"
  brand: "#006937"
  emerald: "#0d3b26"
  goldline: "#a48d29"
  gold: "#7d6a1d"
  gold-lit: "#d9bc55"
  mint: "#75dc86"
  status-delayed: "#f5a524"
  status-gate: "#8fc7e8"
typography:
  display:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(3rem, 6vw, 4.25rem)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "0.005em"
  headline:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(2.25rem, 5vw, 3.25rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "0.005em"
  step:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "clamp(1.875rem, 3vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "0.005em"
  title:
    fontFamily: "Albert Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Albert Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Albert Sans, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
  data:
    fontFamily: "Spline Sans Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0"
    fontFeature: "tnum 1"
  code:
    fontFamily: "Spline Sans Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "2rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0"
    fontFeature: "tnum 1"
  urdu:
    fontFamily: "Noto Nastaliq Urdu, serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 2.1
    letterSpacing: "normal"
  ghost:
    fontFamily: "Marcellus, Times New Roman, serif"
    fontSize: "7rem"
    fontWeight: 400
    lineHeight: 0.8
    letterSpacing: "0.02em"
rounded:
  chip: "3px"
  inlay: "5px"
  control: "6px"
  badge: "8px"
  plate: "10px"
  pill: "9999px"
  focus: "4px"
spacing:
  hair: "4px"
  tight: "12px"
  grid-gap: "20px"
  plate-pad: "24px"
  block: "48px"
  section-top: "160px"
  header-reserve: "144px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.control}"
    padding: "14px 32px"
    typography: "{typography.title}"
  button-quiet:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "8px 16px"
  field-well:
    backgroundColor: "#fffdf6"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "10px 14px"
    typography: "{typography.data}"
  card-plate:
    backgroundColor: "{colors.plate}"
    textColor: "{colors.ink}"
    rounded: "{rounded.plate}"
    padding: "{spacing.plate-pad}"
  tablet:
    backgroundColor: "{colors.emerald}"
    textColor: "{colors.ivory}"
    rounded: "{rounded.plate}"
    padding: "12px 20px"
  chip-status:
    backgroundColor: "transparent"
    textColor: "{colors.mint}"
    rounded: "{rounded.chip}"
    padding: "3px 10px"
    typography: "{typography.label}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "0 0 4px"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
---

# Design System: PIA Concept

## Overview

**Creative North Star: "The Mughal Jali World"**

The page is a marble court. The ground is warm ivory stone, the text is a deep
green ink cut into it, and the structure comes from inlaid plates ruled twice in
gold — the pietra dura double rule — rather than from boxes, cards or panels of
translucent glass. Where the world needs weight it commits a whole region to
carved emerald: the advisory strip, the departures tablet, the footer, the wash
behind a hero photograph. Where it needs an edge it draws a gold hairline. Gold
is never a fill; it is the engraved line.

Depth is stone depth. A raised surface is lighter than the ground it sits on, is
bordered by a gold hairline with a second rule engraved three pixels inside it,
and casts a short offset shadow that reads as contact rather than float. Nothing
blurs and nothing is translucent, because stone is neither. The one blurred edge
in the world is a photograph's own dark wash, applied so ivory type stays legible
over it.

Type carries the register. Marcellus is inscriptional and ships at a single
weight, so hierarchy is made by size and never by boldness; Albert Sans does all
the reading; Spline Sans Mono with tabular figures does everything that would be
printed on a ticket; and Noto Nastaliq Urdu carries the Pakistani ports' own
names beside the Latin ones. Motion is short and damped — arcs draw in, sections
settle up fourteen pixels, plates lift two — and every piece of it is switched
off under `prefers-reduced-motion`.

**Key Characteristics:**
- Ivory marble ground (`#f3eee3`) with plates one step lighter (`#faf6ec`)
- Emerald commits at region scale; brand green fills actions only
- Gold is line, rule and inlay thread, never a surface fill
- Opaque stone materials: hairline, double rule, shallow offset shadow, no blur
- Four typefaces with four non-overlapping jobs, display at one weight
- Small radii (3–10px); pills reserved for objects that travel

## Colors

Two stones and two metals: ivory and emerald as grounds, PIA's green for
committed action and the mark's gold as the engraved line between them.

### Primary
- **PIA Emerald** (`{colors.brand}`): The committing action. Search flights, Find
  booking, Check in, Join Award +Plus, Select, Done, the fare badge on a
  destination card, the active booking tab, the radio and toggle marks, the
  focus ring and the caret. It fills; it is not used as a hairline on its own.
- **Deep Green Stone** (`{colors.emerald}`): Whole regions, not accents. The
  advisory strip, the departures tablet, the footer, the phone mock, the gradient
  wash over every photograph and the fallback stone gradient behind a photo-less
  frame.

### Secondary
- **Inlay Gold** (`{colors.goldline}`): The engraved line. Plate borders at 45%,
  the second rule inside them at 28%, the inlay thread (`.ramp`), the jali
  lattice strokes, the route arc's dashed curve and the aircraft riding it, and
  the hover border on a lifted plate.
- **Gold Text** (`{colors.gold}`): The same gold darkened until small text clears
  4.5:1 on ivory. Sector labels, fare figures, tier requirements, news
  categories, the ledger's dividing marks, the scrollbar thumb.
- **Lit Gold** (`{colors.gold-lit}`): Gold as it reads on emerald rather than on
  ivory. Footer column headings, the departures board header and flight numbers,
  the advisory NOTICE marker, the sticky step counter and the hero's inlay frame.

### Tertiary
- **Signal Mint** (`{colors.mint}`): Live state on emerald only — the pulsing
  LIVE dot and the ON TIME status. It is not legible on ivory and does not
  appear there.
- **Delay Amber** (`{colors.status-delayed}`) and **Gate Sky**
  (`{colors.status-gate}`): The two remaining departures-board statuses. They
  exist inside that component's status vocabulary and nowhere else.

### Neutral
- **Marble Ground** (`{colors.ivory}`): The page floor, the header lintel, the
  mobile menu, the scrollbar track, and all type set on emerald.
- **Plate** (`{colors.plate}`): Every raised surface, and the 3px inset rule that
  makes the double border read as carved.
- **Green Ink** (`{colors.ink}`): All body text. Its alpha steps are the real
  neutral ramp: full for headings and figures, 80% for list text, 75%/70% for
  paragraphs, 65%/60% for captions and labels, 50%/30% for placeholders and
  separators.

### Named Rules
**The Gold Never Fills Rule.** Gold is a line: a border, a rule, a thread, a
lattice stroke or small engraved text. The single fill in the whole build is the
BOARDING chip's 15% wash, and only because it sits on emerald where a hairline
alone would not catch the eye.

**The Three Golds Rule.** One gold, three jobs by ground. `#a48d29` draws lines
on any ground; `#7d6a1d` is the only gold allowed to carry small text on ivory;
`#d9bc55` is the only gold that reads on emerald. Using the line gold as text on
ivory fails contrast, and using the text gold on emerald disappears.

**The Region Scale Rule.** Emerald arrives as a whole region — a bar, a tablet, a
footer, a wash — or not at all. Brand green arrives as a filled control. Neither
is used as a tint, a border colour or a body-text colour on ivory.

## Typography

**Display Font:** Marcellus (with `Times New Roman`, serif)
**Body Font:** Albert Sans (with `ui-sans-serif`, `system-ui`)
**Label/Mono Font:** Spline Sans Mono (with `ui-monospace`, `SF Mono`, Menlo)
**Urdu Font:** Noto Nastaliq Urdu

**Character:** Marcellus is drawn from Roman inscriptional capitals and ships in
one weight only, so a title carries by size and letterform rather than by
thickness — the same way a carved line carries. Albert Sans is even and quiet
underneath it and holds at eleven pixels in a field label. Spline Sans Mono with
tabular figures makes a column of times, gates and fares align down the page the
way a departures board does. Nastaliq is set on its own baseline with the line
height it needs, never squeezed into a Latin one.

### Hierarchy
- **Display** (Marcellus 400, 3rem rising to 4.25rem, line-height 1.05): The page
  hero title, one per page, echoed behind itself as a 7rem ghost word at 10%
  ivory on desktop.
- **Headline** (Marcellus 400, 2.25rem rising to 3.25rem, line-height 1.08): The
  single title of a full-viewport section, always followed by a 24px gold inlay
  rule.
- **Step** (Marcellus 400, 1.875rem rising to 2.5rem): Feature titles inside the
  sticky-scroll section and the caption on the pinned frame. Display type is also
  used at 1.25rem for a destination's city name, where it is the object being
  named rather than a heading.
- **Title** (Albert Sans 600, 1.125rem): Card, service and tier headings.
  Headings inside a surface drop the display face.
- **Body** (Albert Sans 400, 0.875rem to 1rem, line-height 1.625): Paragraphs and
  interface language, measure capped at 46ch for lead paragraphs and 62ch for
  running text.
- **Label** (Albert Sans 600, 11px, tracking 0.16em, uppercase): Footer column
  headings and category markers. Tracking runs 0.12em to 0.2em when the label is
  set in the data face instead.
- **Data** (Spline Sans Mono, tabular figures, 11px to 2rem): Airport codes,
  times, fares, flight numbers, gates, dates, PNRs, seat numbers and statistic
  figures. Sector codes on a boarding-pass card are set at 2rem, line-height 1.
- **Urdu** (Noto Nastaliq Urdu 400, 0.75rem, line-height 2.1, rtl, isolated):
  A Pakistani or regional port's own name, set beside the Latin one.

### Named Rules
**The Ticket Data Rule.** Spline Sans Mono is what would be printed on a ticket:
codes, times, fares, flight numbers, gates, dates, seats, PNRs and counted
figures. It is never used for navigation, headings or running text.

**The One Weight Rule.** Marcellus ships at 400 and only 400. A display line that
needs more presence gets more size, more space or a rule beneath it — never a
heavier weight and never a synthetic bold.

**The Own Name Rule.** A Pakistani or regional port carries its Nastaliq name
alongside the Latin one wherever there is room, at its own line height and
direction. It is content, not decoration, and is never faked with a transformed
Latin face.

## Layout

Content sits in a centred column capped at 72rem (`max-w-6xl`), with the header
lintel running wider at 80rem and the booking widget narrower at 64rem. Gutters
are 24px, rising to 40px from the medium breakpoint.

Sections are full-viewport (`min-h-screen`) and top-aligned, not centred: 160px
of top padding, 96px of bottom padding, and a 48px gap between the section title
and its content. Vertical scroll snapping is `proximity` on the y axis so a fast
scroll is not trapped; every section carries `snap-start snap-always` and a 144px
scroll margin so it settles below the fixed header.

Grids are consistent. Fare tickets and destination cards run one column, two at
640px, three at 1024px, with a 20px gutter; news runs three columns at 768px with
a 24px gutter; the services ledger runs two columns at 1024px with a 56px
horizontal gap and no vertical gap, because its rows are divided by engraved
rules rather than by space. The sticky-scroll section pins its arched frame 128px
from the top while the text panels scroll past it, and collapses on mobile to a
per-panel image above each block of text.

### Named Rules
**The Reserved Lintel Rule.** The header is fixed, opaque and can carry a
dismissible advisory strip above it. Every scroll target clears it: 144px of
scroll margin on each section and 128px of `scroll-padding-top` on the root.
Both move with the header or a snapped section lands underneath it.

**The Top-Aligned Rule.** A full-height section starts its content at the top.
Centring at this height leaves the title floating and the first fold empty.

## Elevation & Depth

This is a stone system. Depth comes from a lighter plate, a crisp engraved edge
and a short offset shadow — never from blur, translucency or a backdrop filter.
The signature is the double rule: a 1px gold hairline border, a 3px inset ring in
the plate colour, and a 4px inset ring in soft gold, so the eye reads a border
carved into the surface rather than drawn around it. The emerald tablet uses the
same construction with the plate colour swapped for emerald and the inner gold
raised to 55%, over a subtle vertical gradient that gives the stone its face.

Form fields invert the model. A well is slightly lighter than white, bordered in
ink at 22%, and carries a 3px inset shadow so it reads as recessed carving rather
than floating chrome.

### Shadow Vocabulary
- **Plate contact** (`0 2px 10px -4px rgba(29,42,35,0.22)`): The resting shadow
  on every plate. A short, tight offset — contact with stone, not a halo.
- **Plate mounted** (`0 24px 48px -18px rgba(6,18,12,0.6)`): The thick variant,
  used only where a plate sits over a photograph or the takeoff film.
- **Plate lifted** (`0 10px 24px -10px rgba(29,42,35,0.30)`): Hover, paired with
  a 2px rise, the border going full gold and the inner rule brightening.
- **Tablet** (`0 8px 24px -10px rgba(13,59,38,0.55)`): Under an emerald region,
  tinted with its own green.
- **Well press** (`inset 0 1px 3px 0 rgba(29,42,35,0.10)`): Inputs and controls
  that should read as cut into the plate holding them.
- **Lintel** (`0 6px 18px -14px rgba(29,42,35,0.4)`): Under the fixed header, so
  the page passes beneath rather than through it.
- **Action** (`inset 0 0 0 1px rgba(243,238,227,0.25), 0 2px 8px -2px rgba(0,105,55,0.5)`):
  Under a filled green button; an ivory inner rule plus a shadow tinted with the
  button's own green.

### Named Rules
**The Stone Depth Rule.** A raised surface is opaque, lighter than its ground,
edged with a hairline and settled by a short offset shadow. No `backdrop-filter`,
no alpha fill, no glass.

**The Double Rule Rule.** Every plate and tablet carries the second rule engraved
3px inside its border. A surface with a single border reads as a sticker in this
world.

## Shapes

Corners are small and deliberate, because carved stone does not round generously:
10px on plates and tablets, 8px on soft badges, 6px on controls, wells, buttons
and the focus ring, 5px on a photograph inlaid inside a plate's double rule, and
3px on chips and fare badges. Fully round is reserved for things that travel or
toggle — the ports riding the route arc, the miles toggle, the radio marks, the
advisory dismiss, the scrollbar thumb.

Borders are hairlines and they are structural, not decorative: 1px of gold at 45%
for a plate edge or a divider, 28% for a soft rule, dashed where the
boarding-pass idiom calls for a tear line or a perforation. A photograph mounted
in a plate sits inside a 7px stone margin so the double rule frames it.

Two recurring silhouettes belong to the world. The **cusped Mughal arch** clips
the pinned feature frame, drawn once as a normalised `clipPath` so a single path
fits any size. The **jali lattice** is a 56px pierced-screen tile drawn in gold,
used at 6% down each edge of the page and at 20% as a frieze along the footer's
top edge.

## Components

### Buttons
- **Shape:** 6px radius (`{rounded.control}`) on every button in the world.
- **Primary:** Filled brand green, ivory semibold text, 14px by 32px, with an
  ivory inner rule and a green-tinted contact shadow.
- **Hover / Focus:** Brightness to 110%, no movement. Focus is the global 2px
  brand-green outline at 3px offset with a 4px radius.
- **Quiet:** Ink text on a gold hairline border, filling to plate on hover. Used
  for the secondary actions on a retrieved booking.
- **Text action:** Brand green with a trailing arrow that gains gap on hover, set
  in the data face at 12px uppercase when it ends a section.

### Chips
- **Style:** Data face at 11px, 0.1em tracking, 3px radius, 1px border in
  `currentColor`, 3px by 10px padding. A chip is defined by a single colour.
- **State:** Flight status on the emerald tablet. BOARDING is the only filled
  variant (lit gold on a 15% wash); ON TIME is mint, DELAYED amber, GATE OPEN
  sky, all unfilled. CONFIRMED on a retrieved booking is brand green on ivory.

### Cards / Containers
- **Corner Style:** 10px.
- **Background:** Plate, opaque; the thick variant where it sits over an image.
- **Shadow Strategy:** Plate contact at rest, plate lifted on hover with a 2px
  rise on a 0.5s decelerating curve, suppressed under reduced motion.
- **Border:** 1px gold at 45%, plus the engraved second rule.
- **Internal Padding:** 24px, rising to 28px on tier plates and 32px on feature
  panels; 7px when the plate is a frame around a photograph.

### Inputs / Fields
- **Style:** The well — `#fffdf6`, 6px radius, 1px ink border at 22%, inset press
  shadow. The label sits above the value at 11px in 60% ink and is always
  visible; the value is set in the data face.
- **Focus:** `:focus-within` turns the border brand green, adds a 1px green ring
  and turns the label green. Native date inputs are used directly inside a plate
  popover; there is no calendar library.
- **Placeholder:** 50% ink, never lower.

### Navigation
- **Style:** A solid ivory lintel ruled underneath in gold, holding the logo, the
  link row and one filled action. It never goes translucent.
- **Links:** 14px medium Albert Sans at 60% ink, rising to full ink on hover; the
  active link takes full ink plus a 2px gold bottom border.
- **Mobile:** Below 1024px the links collapse into a full-screen ivory dialog,
  stacked at 18px with soft gold dividers, the active link in brand green. The
  dialog traps Tab, closes on Escape, returns focus to the toggle and locks body
  scroll.
- **Advisory strip:** One rotating notice on emerald above the lintel, 12px ivory
  with a lit-gold NOTICE marker, dismissible.

### Departures Board
The signature emerald surface. A full-width tablet with a lit-gold header strip,
an 11px uppercase column rule at 60% ivory, and rows divided by 10% white
hairlines. Every cell scrambles through a fixed character set and locks left to
right on mount — deterministic, no randomness, and skipped entirely under reduced
motion. Times are ivory, flight numbers lit gold, destinations 85% ivory, gates
60%, status a chip.

### Fare Ticket
The boarding-pass plate. Two 2rem sector codes in the data face at either end of
a dashed gold rule with a gold aircraft centred on it, city names at 11px
underneath, then a gold rule and the fare on its own baseline. Clicking one
prefills the booking widget with that route rather than dropping the traveller on
an empty search.

### Route Marquee
Destination ports riding a departure arc, with an aircraft a third of a turn
ahead. Implements 21st.dev's "Marquee Along SVG Path" technique (danielpetho /
fancycomponents.dev), with two deliberate departures from the published build:
motion is driven by a `requestAnimationFrame` loop writing one CSS custom
property per item rather than by framer-motion values, because framer-motion 12
unmounts the tree on React 19.2 when it animates DOM nodes; and it renders into a
fixed 900×260 stage scaled to its container, because `offset-path: path()`
resolves in CSS pixels while a viewBox SVG scales, so a curve and the items on it
otherwise drift apart at every width but one. It holds still on hover and focus,
and does not start at all under reduced motion.

### Scenic Frame
The image primitive. A seed resolves to an Unsplash photograph and a photograph
gets nothing but the emerald bottom wash. A seed with no photograph falls back to
a deterministic two-stop gradient drawn from a six-stop emerald-and-gold ramp,
and only that fallback carries the faint contour lines and the 7rem ghost code.

### Membership Card (vendored)
`src/vendor/admit-one-ticket.jsx` is a third-party component vendored unmodified
from 21st.dev (larsen66 / admit-one-ticket, id 22433). It is not house code and
its internals are not part of this design system. It is themed entirely through
props at its single call site in `Home.jsx`: a generative texture in emerald,
inlay gold and brand green, a radial gradient from a light gold through brand
green into deep green stone, and a layout override putting the watermark in light
gold and the ink in ivory. Restyle it by changing those props; do not edit the
vendored file.

### Named Rules
**The Fallback-Only Ornament Rule.** Contour lines and the oversized ghost code
belong to the gradient fallback alone. Over a photograph they read as scratches
across the subject.

**The Held Marquee Rule.** Anything that moves along a path stops on hover and on
focus. A moving target that cannot be clicked is worse than no motion.

## Do's and Don'ts

### Do:
- **Do** build every raised surface as an opaque plate: plate fill, 1px gold
  hairline, the 3px engraved second rule, a short offset contact shadow, 10px
  radius.
- **Do** let emerald take a whole region — a bar, a tablet, a footer, a wash —
  and let brand green fill the one committing control.
- **Do** pick the gold by its ground: `#a48d29` for lines, `#7d6a1d` for small
  text on ivory, `#d9bc55` for anything on emerald.
- **Do** set ticket data in Spline Sans Mono with tabular figures, and give a
  Pakistani port its Nastaliq name beside the Latin one.
- **Do** start full-height sections at the top and reserve the fixed lintel's
  height in both padding and scroll margin.
- **Do** guard every animation with `prefers-reduced-motion`, as the reveal,
  route draw, split-flap, marquee and plate lift already do.
- **Do** keep radii small: 10px plates, 6px controls, 3px chips; pills only for
  things that travel or toggle.

### Don't:
- **Don't** put a `backdrop-filter`, a translucent white fill or a soft glow on a
  raised surface. Depth here is a line and a short shadow.
- **Don't** fill anything with gold. It is a border, a rule, a thread or small
  engraved text.
- **Don't** set the line gold (`#a48d29`) as small text on ivory, or mint or lit
  gold as anything on ivory; none of them clear 4.5:1 there.
- **Don't** give Marcellus a second weight or a synthetic bold, and don't set
  body copy, navigation or interface labels in it.
- **Don't** set navigation, buttons, headings or running text in the mono face.
- **Don't** put the contour lines or the ghost code over a photograph.
- **Don't** edit `src/vendor/admit-one-ticket.jsx`; theme it through its texture,
  gradient and layout props.

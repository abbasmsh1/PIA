---
name: PIA Concept
description: A dark, glass-material booking site for Pakistan International Airlines, where colour comes from photography and the aeroplane rather than from the interface.
colors:
  s0: "#060912"
  s1: "#0a0e17"
  s2: "#10131d"
  s3: "#181b25"
  s4: "#22262f"
  brand: "#007d34"
  mint: "#75dc86"
  lime: "#cdd500"
  official-green: "#006937"
  official-gold: "#a48d29"
  ramp-yellow: "#ffe524"
  ramp-leaf: "#71af2e"
  ramp-teal: "#005779"
  gold: "#d9bc55"
  ivory: "#f2ece0"
  white: "#ffffff"
  glass-fill-top: "rgba(255, 255, 255, 0.085)"
  glass-fill-bottom: "rgba(255, 255, 255, 0.035)"
  glass-edge: "rgba(255, 255, 255, 0.10)"
  glass-edge-top: "rgba(255, 255, 255, 0.18)"
  glass-highlight: "rgba(255, 255, 255, 0.09)"
  glass-edge-hover: "rgba(255, 255, 255, 0.18)"
  glass-edge-top-hover: "rgba(255, 255, 255, 0.28)"
  hairline: "rgba(255, 255, 255, 0.08)"
  well-ground: "rgba(0, 0, 0, 0.28)"
  well-ground-focus: "rgba(0, 0, 0, 0.34)"
  well-inset: "rgba(0, 0, 0, 0.45)"
  scrollbar-thumb: "rgba(255, 255, 255, 0.16)"
  scrollbar-thumb-hover: "rgba(255, 255, 255, 0.26)"
  drift-mint: "rgba(117, 220, 134, 0.10)"
  drift-sky: "rgba(68, 165, 216, 0.10)"
typography:
  display:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 6vw, 4.5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 4.5vw, 3.25rem)"
    fontWeight: 600
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  step:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "2.5rem"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  code:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "2rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0"
    fontFeature: "tnum 1"
  title:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  data:
    fontFamily: "JetBrains Mono, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0"
    fontFeature: "tnum 1"
  ghost:
    fontFamily: "Chivo, ui-sans-serif, system-ui, sans-serif"
    fontSize: "7rem"
    fontWeight: 900
    lineHeight: 0.8
    letterSpacing: "-0.04em"
  urdu:
    fontFamily: "Noto Nastaliq Urdu, serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 2.1
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
rounded:
  field: "14px"
  panel: "22px"
  pill: "9999px"
  focus: "6px"
spacing:
  tight: "12px"
  card-gap: "20px"
  panel-pad: "24px"
  block: "56px"
  section-top: "176px"
  header-reserve: "144px"
components:
  button-primary:
    backgroundColor: "{colors.brand}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "14px 32px"
    typography: "{typography.title}"
  button-primary-hover:
    backgroundColor: "{colors.brand}"
    textColor: "#ffffff"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "rgba(255,255,255,0.8)"
    rounded: "{rounded.pill}"
    padding: "8px 16px"
  field-well:
    backgroundColor: "rgba(0,0,0,0.28)"
    textColor: "#ffffff"
    rounded: "{rounded.field}"
    padding: "10px 14px"
    typography: "{typography.data}"
  card-panel:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "#ffffff"
    rounded: "{rounded.panel}"
    padding: "{spacing.panel-pad}"
  chip-status:
    backgroundColor: "transparent"
    textColor: "{colors.lime}"
    rounded: "{rounded.pill}"
    padding: "3px 10px"
    typography: "{typography.data}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "rgba(255,255,255,0.6)"
    padding: "0 0 4px"
  nav-link-active:
    backgroundColor: "transparent"
    textColor: "#ffffff"
---

# Design System: PIA Concept

## Overview

**Creative North Star: "The Lit Cabin Window"**

The page is a dark aircraft at night and the interface is the glass you read
through. Nothing in the chrome is an opaque plate: every panel is a low-alpha
white fill over a backdrop blur, so the photograph, the route map or the
takeoff film behind it stays partly visible. Depth is therefore not a stack of
grey boxes but a single sheet of material catching light from above, and the
whole system is legible only because the ground underneath is close to black.

Colour is rationed on purpose. The surfaces carry none of it. What colour
exists arrives from three places: the photographs, the brand ramp used as a
hairline rule or a stripe, and three accents that each own one job. The result
reads institutional rather than promotional, which is what an airline booking
path needs; a passenger looking for a fare should meet numbers and dates, not
a colour scheme competing with them.

Density is generous vertically and tight horizontally. Sections run a full
viewport, top-aligned rather than centred, so the eye starts at the headline
and travels down through the content instead of hunting for it in the middle
of empty space. Type does the hierarchy work: a heavy, tightly tracked display
face for headlines, a newsroom grotesk for everything a person reads, and a
monospace face reserved strictly for the things printed on a boarding pass.

**Key Characteristics:**
- Near-black ground (`#0a0e17`) with a five-step surface stack behind the glass
- Translucent panels: blurred, gradient-filled, top-edge lit, never flat
- Three fonts with three non-overlapping jobs
- Green for filled actions only; mint for accent type and focus; lime for small
  labels and live status
- Full-viewport, top-aligned sections with the floating header's height reserved
- Motion is entry and state only: reveal, draw, hover lift, all reduced-motion aware

## Colors

A near-black ground under white-alpha glass, with one green for action, one
mint for emphasis and one lime for status; every other hue comes from the
photography.

### Primary
- **PIA Green** (`{colors.brand}`): Filled actions only. Search flights, Find
  booking, Check in, Join, Select, and the fare badge on a destination card.
  It never appears as text, as a border on its own, or as a page background.
  Its lower-alpha form (`brand/25`) is the shadow colour under those buttons.

### Secondary
- **Signal Mint** (`{colors.mint}`): Accent type and interaction feedback.
  Active nav underline, active tab, radio and toggle marks, the focus outline,
  the text caret, selection highlight, the "Economy" fare on a results row, and
  footer column headings. It is the readable green: brand green fails on
  near-black at small sizes, mint does not.

### Tertiary
- **Runway Lime** (`{colors.lime}`): Small uppercase labels, step counters,
  tier requirements, fare-class markers and the BOARDING status pill, which is
  the only filled status so the eye lands on the flight actually leaving.

### Neutral
- **Deepest Ground** (`{colors.s0}`): Page floor, scrollbar track, the top of
  the backdrop gradient, and the dark wash under every photograph.
- **Ground** (`{colors.s1}`): The body background and the colour of the browser
  theme bar.
- **Raised Surfaces** (`{colors.s2}`, `{colors.s3}`, `{colors.s4}`): Opaque
  fallbacks for the few places glass cannot go, chiefly native `<option>` menus
  and the phone-mock gradient.
- **White at alpha**: The real neutral ramp. Text runs `#fff` for headlines,
  `white/90` for card titles, `white/70` for body, `white/60` for captions,
  `white/40` for muted data prefixes. Borders run `white/8` to `white/18`.

### Named Rules
**The One Green Rule.** `{colors.brand}` fills buttons and nothing else. If a
green needs to be read as type, it is mint; if it needs to be read as a small
label, it is lime.

**The Borrowed Colour Rule.** Surfaces contribute no hue. Any colour on screen
must come from a photograph, the brand ramp, or one of the three accents doing
its assigned job.

**The Ramp Is A Rule Rule.** The five-stop brand gradient (yellow, lime, leaf,
green, teal) appears only as a line or a stripe: the 2px footer rule, the
1.5rem boarding-pass edge, the 4px app-mock underline, and the deterministic
wash behind a photo-less scenic frame. It is never a button, a panel or a text
fill on a body paragraph.

## Typography

**Display Font:** Chivo (with `ui-sans-serif`, `system-ui`)
**Body Font:** Schibsted Grotesk (with `ui-sans-serif`, `system-ui`)
**Label/Mono Font:** JetBrains Mono (with `ui-monospace`, `SF Mono`, Menlo)

**Character:** Chivo is heavy and geometric, set tight so a headline reads as a
solid block rather than a line of words. Schibsted Grotesk was drawn for
newsrooms, so it holds at 11px in a fare label and its numerals sit level with
the mono face. JetBrains Mono, with tabular figures on, makes a column of
times and fares align down the page the way a departures board does.

### Hierarchy
- **Display** (Chivo, 600, 3rem to 4.5rem, line-height 1.02, tracking -0.035em):
  Page hero titles only, one per page. On desktop it is echoed behind itself as
  an oversized 900-weight watermark at 4.5% white.
- **Headline** (Chivo, 600, 2.25rem to 3.25rem, line-height 1.05, tracking
  -0.03em): The single title of a full-viewport section.
- **Title** (Schibsted Grotesk, 600, 1.125rem to 1.25rem): Card and panel
  headings. Headings below the section level drop the display face; Chivo is
  reserved for the two levels that carry the page.
- **Body** (Schibsted Grotesk, 400, 0.875rem to 1rem, line-height 1.625):
  Paragraphs and all interface language. Measure is capped at 46 to 62
  characters on long prose.
- **Label** (Schibsted Grotesk, 600, 11px, tracking 0.16em, uppercase): Footer
  column headings and fare-class markers.
- **Data** (JetBrains Mono, tabular numerals, 10px to 2rem): Fares, times,
  flight numbers, airport codes, dates, PNRs, gates and seats.

### Named Rules
**The Boarding Pass Rule.** JetBrains Mono is reserved for what would be
printed on a ticket: fares, times, flight numbers, airport codes, dates,
seats, gates. It is never used for navigation, button text, headings or
generic interface labels.

**The Two-Level Display Rule.** Chivo appears at exactly two levels, the page
hero and the section title. A third level in the display face flattens the
hierarchy the whole page depends on.

**The No Eyebrow Rule.** Nothing sits above a headline. No category kicker, no
"Introducing", no decorative label. A heading begins its own block.

## Layout

Content sits in a centred column capped at 72rem (`max-w-6xl`) with 1.5rem
gutters rising to 2.5rem from the medium breakpoint; the booking widget uses a
narrower 64rem cap and the header a wider 80rem.

Sections are full-viewport (`min-h-screen`) and **top-aligned, not centred**:
176px of top padding, 112px of bottom padding, and a 56px gap between the
section title and its content. Vertical scroll snapping is set to `proximity`
on the y axis, so a section settles into place without trapping a fast scroll.

The header floats over everything, so its height is reserved twice: 144px of
`scroll-padding-top` on the root and a 160px scroll margin on each section.
Both numbers must move together with the header, or a snapped section lands
underneath it.

Grids are consistent: cards run one column, two at 640px, three at 1024px, with
a 20px gutter; text-and-panel splits run two columns from 768px with a 24px
gutter. The sticky-scroll section pins its visual at 112px from the top while
the text panels scroll past it, and collapses to a stacked, per-panel image on
mobile.

### Named Rules
**The Reserved Header Rule.** The header is fixed and translucent, so every
scroll target must clear it. Any new snapped section carries the same top
padding and scroll margin as `Section`.

**The Top-Aligned Rule.** A full-height section starts its content at the top.
Vertical centring at this height leaves the headline floating and the fold
empty.

## Elevation & Depth

This is a material system, not a shadow system. Depth comes from translucency
and from where light falls on an edge. Every raised surface is a single glass
recipe: a white gradient from 8.5% to 3.5% alpha, a 1px border at 10% white
that brightens to 18% along the top edge only, an inset 1px highlight just
inside that top edge, a 24px backdrop blur with 160% saturation, and one soft
drop shadow. The brightened top edge is the entire lighting model: light comes
from above, so the top of a panel catches it and the bottom does not.

Two variants exist. The **thick** material swaps the white fill for a
near-opaque dark gradient and doubles the blur to 40px; it is used only where a
panel sits over a photograph or the takeoff film and the content underneath
would otherwise fight the text. The **well** inverts the model: a 28% black
fill with an inset dark shadow, so a form field reads as pressed into the panel
holding it rather than floating on it.

### Shadow Vocabulary
- **Panel lift** (`0 18px 40px -20px rgba(0,0,0,0.75)`): The resting shadow on
  every glass surface. Heavily negative spread, so it reads as contact shadow
  rather than a halo.
- **Panel lift, raised** (`0 26px 50px -22px rgba(0,0,0,0.8)`): The hover state,
  paired with a 2px rise and brighter edges.
- **Inner top highlight** (`inset 0 1px 0 0 rgba(255,255,255,0.09)`): Always
  present on glass, 0.14 on hover.
- **Well press** (`inset 0 1px 2px 0 rgba(0,0,0,0.45)`): Inputs and any control
  that should read as recessed.
- **Action shadow** (`0 10px 15px -3px rgba(0,125,52,0.25)`): Under filled green
  buttons only, tinting the shadow with the button's own colour.

### Named Rules
**The No Flat Fill Rule.** A raised surface is never a solid colour. If a
backdrop blur is unavailable, the fallback is the same gradient at higher
alpha, not an opaque grey plate.

**The Light From Above Rule.** The top border of a panel is always brighter
than its other three. Any new surface that omits this reads as a sticker.

## Shapes

Corners are large and consistent: 22px on panels and cards, 14px on inset
fields, and fully round on anything that acts (buttons, chips, status pills,
the header bar, toggles, the scrollbar thumb). The header is a full pill, which
is what makes it read as a floating object rather than a bar attached to the
page.

Borders are hairlines, never structure: 1px at 8% to 18% white, with the same
value used for dividers and section rules. Dashed hairlines are reserved for
the boarding-pass idiom, where they mark the tear line between a fare card's
route and the perforation on a check-in stub.

Photographic frames clip to their container's radius and always carry a dark
gradient wash from the bottom so overlaid type stays legible.

## Components

### Buttons
- **Shape:** Fully round (`{rounded.pill}`); one exception in the build uses a
  6px radius and should be brought into line.
- **Primary:** Solid brand green, white semibold text, 14px by 32px, with a
  green-tinted drop shadow.
- **Hover / Focus:** Brightness lifted to 115%, no colour change and no
  movement. Focus is the global 2px mint outline at 3px offset.
- **Ghost:** Transparent with a 1px white/15 hairline, 80% white text, filling
  to white/10 on hover. Used for secondary actions inside a found booking.
- **Text action:** Mint or white body text with a trailing arrow that gains gap
  on hover, no background at all.

### Chips
- **Style:** Mono at 11px, 0.1em tracking, fully round, 1px border in
  `currentColor`, 3px by 10px padding. The border and text are always the same
  colour, so a chip is defined by one value.
- **State:** Status only. Boarding is the sole filled chip (lime text on a 20%
  lime fill, 40% lime border); on time is mint, delayed amber, gate open sky,
  all unfilled.

### Cards / Containers
- **Corner Style:** 22px.
- **Background:** The glass recipe; the thick variant over photography.
- **Shadow Strategy:** Panel lift at rest, raised on hover with a 2px translate
  on a 0.4s decelerating curve, suppressed under reduced motion.
- **Border:** 1px white/10, top edge white/18.
- **Internal Padding:** 24px, rising to 28px or 32px on feature panels; zero
  when the card is a photographic frame with an overlaid caption bar.

### Inputs / Fields
- **Style:** The well: 28% black, 14px radius, 1px white/8 border, inset press
  shadow. The label sits above the value, always visible, at 11px in 65% white;
  the value is in the data face.
- **Focus:** `:focus-within` shifts the border to 45% mint and deepens the fill;
  the label turns mint. Native date inputs are used directly, with
  `color-scheme: dark` so the browser's own picker matches.
- **Placeholder:** 35% to 55% white, never lower.

### Navigation
- **Style:** A floating pill of thick glass, 12px below the top edge, holding
  the reversed logo, the link row and the primary action.
- **Links:** 13px medium Schibsted Grotesk at 60% white, rising to full white on
  hover; the active link takes full white plus a 2px mint bottom border.
- **Mobile:** Below 1024px the links collapse into a full-screen dialog at 55%
  black with a heavy blur, links stacked at 18px with hairline dividers, active
  in mint. The dialog traps Tab, closes on Escape, returns focus to the toggle,
  and locks body scroll.
- **Advisory bar:** A single rotating notice above the header pill, 12px at 70%
  white on 35% black, dismissible.

### Departures Board
The signature data surface. A panel with a mono header strip, a 10px uppercase
column rule at 55% white, and rows divided by white/5 hairlines. Every cell
scrambles through a character set and locks left to right on mount, which is
deterministic and skipped entirely under reduced motion. Times are white,
flight numbers mint, destinations 85% white, gates 50%, status a chip.

### Fare Ticket
The boarding-pass card. Two 2rem airport codes in the data face at either end
of a dashed rule, an aeroplane glyph centred on that rule in lime, city names
at 11px underneath, then a hairline and the fare on its own baseline. It links
into the booking widget with both ports prefilled.

### Scenic Frame
The image primitive. A seed resolves to an Unsplash photograph, and a
photograph gets nothing but the dark bottom wash. A seed with no photograph
falls back to a deterministic two-stop brand-ramp gradient at 55% opacity, and
only that fallback carries the faint contour lines and the 5rem airport code at
10% white.

### Named Rules
**The Fallback-Only Ornament Rule.** Contour lines and the oversized airport
code belong to the gradient fallback alone. Over a photograph they read as
scratches across the subject and as a collision with it.

## Do's and Don'ts

### Do:
- **Do** build every raised surface from the glass recipe: gradient fill,
  backdrop blur, hairline border with a brighter top edge, inset highlight,
  panel-lift shadow, 22px radius.
- **Do** reserve JetBrains Mono for ticket data and give it tabular figures.
- **Do** use brand green for filled actions, mint for accent type and focus,
  lime for small labels and live status.
- **Do** start full-height sections at the top and reserve the floating
  header's height in both padding and scroll position.
- **Do** guard every animation with `prefers-reduced-motion`, as the reveal,
  drift, route draw, split-flap and hover lift already do.
- **Do** let photography carry the colour and keep the interface around it grey.

### Don't:
- **Don't** put an opaque flat fill on a raised surface; if blur is
  unsupported, raise the gradient's alpha instead.
- **Don't** set navigation, buttons, headings or generic labels in the mono
  face.
- **Don't** use brand green as text or as a standalone border colour; mint is
  the readable green on this ground.
- **Don't** place a kicker, eyebrow or category label above a heading.
- **Don't** apply the brand ramp as a fill on a panel, a button or body text;
  it exists as a line, a stripe or the photo fallback.
- **Don't** put the contour lines or the oversized airport code over a
  photograph.
- **Don't** introduce a third display level in Chivo, or a fourth typeface.

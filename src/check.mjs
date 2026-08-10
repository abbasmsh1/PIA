// Self-checks for the two bits of non-obvious logic on this site: the route-map
// projection and the fare currency conversion. Run with `npm run check`.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { COORDS, HUB, W, H, MARGIN, px, py } from './geo.js'
import { DESTINATIONS, FLEET, FX_PKR_PER_UNIT } from './data.js'
import { money } from './money.js'

// --- route map -------------------------------------------------------------
// The network spans Toronto to Tokyo, so a new destination can easily project
// off the edge of the canvas without anyone noticing.
let checked = 0
for (const [code, lonlat] of Object.entries(COORDS)) {
  assert.equal(lonlat.length, 2, `${code}: expected [lon, lat]`)
  const [lon, lat] = lonlat
  assert.ok(lon >= -180 && lon <= 180, `${code}: longitude ${lon} out of range`)
  assert.ok(lat >= -90 && lat <= 90, `${code}: latitude ${lat} out of range`)

  const x = px(lon)
  const y = py(lat)
  assert.ok(x >= MARGIN && x <= W - MARGIN, `${code}: x=${x.toFixed(1)} outside canvas 0..${W}`)
  assert.ok(y >= MARGIN && y <= H - MARGIN, `${code}: y=${y.toFixed(1)} outside canvas 0..${H}`)
  checked++
}

assert.ok(COORDS[HUB], `hub ${HUB} is missing from COORDS`)

const missing = DESTINATIONS.filter((d) => d.intl && !COORDS[d.code]).map((d) => d.code)
assert.deepEqual(missing, [], `international destinations with no coordinates: ${missing.join(', ')}`)

console.log(`geo ok    — ${checked} airports project inside ${W}x${H}, hub ${HUB}`)

// --- fares -----------------------------------------------------------------
// The bug this guards: relabelling PKR as USD without dividing by the rate,
// which quotes a 20,830 rupee ticket as 20,830 dollars.
assert.equal(money(20830, 'PKR'), 'PKR 20,830')

const usd = money(20830, 'USD')
assert.ok(usd.startsWith('USD '), `expected a USD prefix, got ${usd}`)
assert.notEqual(usd, 'USD 20,830', 'currency switch relabelled without converting')
assert.equal(usd, 'USD 74.93', `unexpected USD conversion: ${usd}`)

// Every currency offered in the widget must have a rate, or the fare silently
// falls back to PKR while the label says otherwise.
for (const cur of Object.keys(FX_PKR_PER_UNIT)) {
  const out = money(100000, cur)
  assert.ok(out.startsWith(cur + ' '), `${cur}: label mismatch (${out})`)
  if (cur !== 'PKR') {
    assert.notEqual(out, money(100000, 'PKR').replace('PKR', cur), `${cur}: not converted`)
  }
}

// An unknown currency must not produce a wrong number under a real-looking label.
assert.ok(money(20830, 'XXX').startsWith('PKR '), 'unknown currency should fall back to PKR')

console.log(`fares ok  — ${Object.keys(FX_PKR_PER_UNIT).length} currencies convert, PKR 20,830 = ${usd}`)

// --- photography -----------------------------------------------------------
// Scenic.jsx is JSX, so the map is read as text rather than imported. The bug
// this guards: adding an international city or an aircraft type and shipping a
// gradient placeholder next to twenty real photographs. Offline on purpose —
// it checks coverage and id shape, not that the CDN is up.
const scenic = readFileSync(new URL('./Scenic.jsx', import.meta.url), 'utf8')
const map = scenic.slice(scenic.indexOf('const PHOTOS = {'), scenic.indexOf('const WIDTHS'))
const seeds = [...map.matchAll(/^\s*'?([\w .-]+?)'?:\s*'((?:premium_)?photo-[\w-]+)'/gm)].map((m) => m[1])
assert.ok(seeds.length > 25, `only ${seeds.length} photo seeds parsed — did PHOTOS move?`)

for (const seed of ['HERO', 'NETWORK', 'EXPERIENCE', 'FLEET', 'MANAGE', 'ABOUT', 'HAJJ', 'B777', 'EXE', 'AWARD']) {
  assert.ok(seeds.includes(seed), `page/panel seed ${seed} has no photo`)
}

const noPhoto = DESTINATIONS.filter((d) => d.intl && !seeds.includes(d.code)).map((d) => d.code)
assert.deepEqual(noPhoto, [], `international destinations with no photo: ${noPhoto.join(', ')}`)

const noFleetPhoto = FLEET.filter((a) => !seeds.includes(a.type)).map((a) => a.type)
assert.deepEqual(noFleetPhoto, [], `aircraft types with no photo: ${noFleetPhoto.join(', ')}`)

console.log(`photos ok — ${seeds.length} seeds mapped, every international city and aircraft covered`)

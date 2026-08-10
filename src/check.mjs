// Self-checks for the two bits of non-obvious logic on this site: the route-map
// projection and the fare currency conversion. Run with `npm run check`.
import assert from 'node:assert/strict'
import { COORDS, HUB, W, H, MARGIN, px, py } from './geo.js'
import { DESTINATIONS, FX_PKR_PER_UNIT } from './data.js'
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

// The image frame used everywhere the layout wants a photograph.
//
// Photography comes from Unsplash, hotlinked off their CDN so no binaries live
// in the repo: `?w=` asks the CDN for the size the browser actually needs, up to
// 4K on the full-bleed heroes. Every id below was opened and eyeballed against
// its seed, so the picture matches the place or the aircraft it sits behind.
//
// Seeds without a photo (a domestic port, the 404 page) fall back to the
// original deterministic brand wash, so nothing renders as an empty box. That
// wash, its contour lines and the oversized code are the fallback's own
// treatment; a photograph gets none of them, only the dark gradient that keeps
// overlaid type readable.

const CDN = 'https://images.unsplash.com/'

// seed -> Unsplash photo id. Airport codes, then the concept seeds the page
// heroes and the sticky panels use, then the fleet types as spelled in data.js.
const PHOTOS = {
  KHI: 'photo-1606511490662-b2c5be7d95a1', // Quaid-e-Azam mausoleum, Karachi
  LHE: 'photo-1622546758596-f1f06ba11f58', // Minar-e-Pakistan, Lahore
  ISB: 'photo-1608020932658-d0e19a69580b', // Faisal Mosque, Islamabad
  KDU: 'photo-1602147557719-1d65f9e58a24', // Karakoram peaks over a lake
  DXB: 'photo-1512453979798-5ea266f8880c',
  AUH: 'photo-1512632578888-169bbbc64f33', // Sheikh Zayed Grand Mosque
  SHJ: 'photo-1566555108172-f8a02274a3d3',
  JED: 'photo-1699954669485-812988f5c2db', // Jeddah corniche
  MED: 'photo-1572358899655-f63ece97bfa5', // Al-Masjid an-Nabawi, Medina
  RUH: 'photo-1694018359679-49465b4c0d61', // Kingdom Centre, Riyadh
  DMM: 'photo-1578895101408-1a36b834405b',
  ELQ: 'photo-1780657541971-80112a50862a', // Al Qassim farmland
  DOH: 'photo-1647252262017-582a7dbb73d0',
  KWI: 'photo-1621647017805-7d08d0a38c8a',
  BAH: 'photo-1748066768504-99532da7d1e9', // Bahrain World Trade Center
  MCT: 'photo-1606813332135-228593b6e201', // Muttrah corniche, Muscat
  GYD: 'photo-1596306499398-8d88944a5ec4', // Flame Towers, Baku
  KUL: 'photo-1508062878650-88b52897f298', // Petronas Towers
  BKK: 'photo-1563492065599-3520f775eeed',
  PEK: 'photo-1508804185872-d7badad00f7d', // Great Wall
  NRT: 'photo-1513407030348-c983a97b98d8', // Tokyo Tower
  LHR: 'photo-1513635269975-59663e0ac1ad', // Tower Bridge from the air
  MAN: 'photo-1619284518317-85b1ab8c7723',
  CDG: 'photo-1511739001486-6bfe10ce785f', // Eiffel Tower
  YYZ: 'photo-1543962226-818f4301073f', // CN Tower

  // Domestic ports, where Unsplash has a photograph that is actually of the
  // city. The others keep the brand wash rather than borrow a stand-in.
  PEW: 'photo-1644262941814-dffef47ac1f3', // old bazaar street, Peshawar
  MUX: 'photo-1600434890250-44df6e4c0d05', // Shah Rukn-e-Alam shrine, Multan
  GIL: 'photo-1646514323421-094bb563cd37', // Karakoram highway above Gilgit

  HERO: 'photo-1565614873782-ec6ef19e18f1', // airliner into the sun
  NETWORK: 'photo-1565444007614-6b38c78224df', // wing over cloud
  EXPERIENCE: 'photo-1641447093043-241f064568fb', // cabin, seatback screens
  FLEET: 'photo-1687885461404-5ab0c1aa4ad9', // twin-jet into the sun
  MANAGE: 'photo-1490430657723-4d607c1503fc', // split-flap departure board
  ABOUT: 'photo-1570970580763-7993ca30d726', // airliner silhouette, golden sky
  HAJJ: 'photo-1513072064285-240f87fa81e8', // the Kaaba, Masjid al-Haram
  B777: 'photo-1785735011417-d85ff3998a70', // engine and wing above cloud
  EXE: 'photo-1636699811128-1a83547b76d5', // cabin under mood lighting
  AWARD: 'photo-1746020681437-bb0a721cf2fa', // passengers in a terminal
  SUITE: 'photo-1690935986319-c11e6cae84f7', // hotel room over a city at dusk
  DINE: 'photo-1777113310112-d4f115599921', // an airline meal tray
  404: 'photo-1762818084167-5124352f667b', // an empty check-in hall

  // A concept site should not put a competitor's livery next to PIA's own name,
  // so the aircraft frames are silhouettes, engines and unmarked airframes
  // rather than the Emirates 777 / Lufthansa 747 / United A320 / ANA 787 shots
  // an Unsplash type search hands you first.
  'Boeing 777-300ER': 'photo-1571306603861-20c055ab2e5c', // widebody nose at a jetbridge
  'Boeing 777-200ER': 'photo-1696238628662-e820babaf1e3', // engine and wing on the apron
  'Boeing 777-200LR': 'photo-1629221731259-4f0760e3ee89', // widebody at the gate at night
  'Airbus A320-200': 'photo-1772965490826-45f77a1d441f', // narrowbody engine, mono
  'ATR 42-500': 'photo-1659232246974-d35664b0bea8', // turboprop on approach
  'Boeing 787': 'photo-1780739978396-a0c834d5b501', // fan close-up
}

const WIDTHS = [640, 1280, 1920, 2560, 3840]

// `sharp=10` is imgix's unsharp pass, applied by the CDN after it resizes.
// Measured on the Karachi frame at 1:1, it lifts edge energy 14% at no
// meaningful cost in bytes, where raising quality to 85 changed nothing at all
// (45.04 -> 45.08): these photographs are resize-soft, not compression-soft.
// 20 starts to halo on masonry, so 10 is the ceiling.
export function photoUrl(seed, w = 3840) {
  const id = PHOTOS[seed]
  return id ? `${CDN}${id}?auto=format&fit=crop&q=80&sharp=10&w=${w}` : null
}

// The fallback's stone palette: emeralds and golds off the logo's own two
// colours, so a photo-less frame reads as inlaid green stone, not a rainbow.
const RAMP = ['#0d3b26', '#0f4a2e', '#006937', '#1d5c3c', '#7d6a1d', '#a48d29']

// Cheap stable hash so a given code always picks the same pair of stops.
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export function scenicColors(seed = '') {
  const h = hash(seed)
  const a = RAMP[h % RAMP.length]
  const b = RAMP[(h + 2 + (h % 3)) % RAMP.length]
  return [a, b]
}

export default function Scenic({
  seed = '',
  label,
  className = '',
  // Cards are the common case, so the default asks for a third of the viewport.
  // Full-bleed frames pass their own so the CDN is not sent for a 4K file to
  // paint a 320 px card.
  sizes = '(min-width: 768px) 33vw, 100vw',
  eager = false,
  children,
}) {
  const [a, b] = scenicColors(seed)
  const angle = 120 + (hash(seed) % 90)
  const photo = PHOTOS[seed]

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden={!label}>
      {photo && (
        <img
          src={photoUrl(seed, 1920)}
          srcSet={WIDTHS.map((w) => `${photoUrl(seed, w)} ${w}w`).join(', ')}
          sizes={sizes}
          alt=""
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {/* The stone wash belongs to the fallback. Over a photograph it turned
          skylines green and cost the picture its own colour. */}
      {!photo && (
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(${angle}deg, ${a}, ${b})` }}
        />
      )}
      {/* Dark wash so ivory type stays legible. A photograph needs far less of
          it than a full-strength gradient does, or it turns to mud. */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          photo
            ? 'from-[#0d3b26]/90 via-[#0d3b26]/25 to-transparent'
            : 'from-[#0d3b26]/80 via-transparent to-transparent'
        }`}
      />
      {/* Faint contour lines, a nod to a route chart. Only over a gradient — on
          a photograph they read as scratches across the subject. */}
      {!photo && (
        <svg
          className="absolute inset-0 h-full w-full opacity-25"
          viewBox="0 0 200 150"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M-10 ${40 + i * 28} Q 60 ${10 + i * 26} 120 ${45 + i * 24} T 210 ${30 + i * 27}`}
              fill="none"
              stroke="white"
              strokeWidth="0.6"
            />
          ))}
        </svg>
      )}
      {/* The code is set large as texture on a fallback; over a photograph it
          just collides with the subject. */}
      {label && !photo && (
        <span className="data ghost-word pointer-events-none absolute -bottom-3 right-2 text-[7rem] leading-none">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}

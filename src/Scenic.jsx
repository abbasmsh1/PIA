// The image frame used everywhere the layout wants a photograph.
//
// Photography comes from Unsplash, hotlinked off their CDN so no binaries live
// in the repo: `?w=` asks the CDN for the size the browser actually needs, up to
// 4K on the full-bleed heroes. Every id below was opened and eyeballed against
// its seed, so the picture matches the place or the aircraft it sits behind.
//
// Seeds without a photo (a domestic port, the 404 page) fall back to the
// original deterministic brand wash, so nothing renders as an empty box. The
// wash is also kept as a faint tint over the photographs, which is what holds
// the page together as one palette.

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

  HERO: 'photo-1565614873782-ec6ef19e18f1', // airliner into the sun
  NETWORK: 'photo-1565444007614-6b38c78224df', // wing over cloud
  EXPERIENCE: 'photo-1641447093043-241f064568fb', // cabin, seatback screens
  FLEET: 'photo-1565614873782-ec6ef19e18f1',
  MANAGE: 'photo-1490430657723-4d607c1503fc', // split-flap departure board
  ABOUT: 'photo-1543903905-cee4ab46985c',
  HAJJ: 'photo-1513072064285-240f87fa81e8', // the Kaaba, Masjid al-Haram
  B777: 'photo-1601544564660-98f64a967a9a',
  EXE: 'photo-1636699811128-1a83547b76d5', // cabin under mood lighting
  AWARD: 'photo-1746020681437-bb0a721cf2fa', // passengers in a terminal

  'Boeing 777-300ER': 'photo-1601544564660-98f64a967a9a',
  'Boeing 777-200ER': 'photo-1504723246034-0977641ea907',
  'Boeing 777-200LR': 'photo-1571306603861-20c055ab2e5c',
  'Airbus A320-200': 'photo-1677795664119-f3b70cacb18c',
  'ATR 42-500': 'photo-1659232246974-d35664b0bea8',
  'Boeing 787': 'photo-1623319780202-5579777bdf82',
}

const WIDTHS = [640, 1280, 1920, 2560, 3840]

export function photoUrl(seed, w = 3840) {
  const id = PHOTOS[seed]
  return id ? `${CDN}${id}?auto=format&fit=crop&q=80&w=${w}` : null
}

const RAMP = ['#ffe524', '#cdd500', '#71af2e', '#007d34', '#0d572d', '#005779', '#1e1246']

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
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${angle}deg, ${a}, ${b})`,
          opacity: photo ? 0.16 : 0.55,
          mixBlendMode: photo ? 'soft-light' : 'normal',
        }}
      />
      {/* Dark wash so white type stays legible. A photograph needs far less of
          it than a full-strength gradient does, or it turns to mud. */}
      <div
        className={`absolute inset-0 bg-gradient-to-t ${
          photo
            ? 'from-[#060912] via-[#060912]/35 to-transparent'
            : 'from-[#060912] via-[#060912]/55 to-[#060912]/20'
        }`}
      />
      {/* faint contour lines, a nod to a route chart */}
      <svg
        className={`absolute inset-0 h-full w-full ${photo ? 'opacity-10' : 'opacity-25'}`}
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
      {label && (
        <span className="data pointer-events-none absolute -bottom-3 right-2 text-[5rem] font-bold leading-none text-white/10">
          {label}
        </span>
      )}
      {children}
    </div>
  )
}

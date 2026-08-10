// Stands in for a photograph everywhere the layout wants one.
//
// This build ships no destination or aircraft photography, so instead of empty
// boxes each card gets a deterministic wash drawn from the brand ramp, with the
// airport code set large behind the content. Same code always yields the same
// colours, so a destination looks consistent across the home page, the network
// page and the map tooltip.

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

export default function Scenic({ seed = '', label, className = '', children }) {
  const [a, b] = scenicColors(seed)
  const angle = 120 + (hash(seed) % 90)

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden={!label}>
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(${angle}deg, ${a}, ${b})`, opacity: 0.55 }}
      />
      {/* dark wash so white type stays legible over any pairing */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#060912] via-[#060912]/55 to-[#060912]/20" />
      {/* faint contour lines, a nod to a route chart */}
      <svg className="absolute inset-0 h-full w-full opacity-25" viewBox="0 0 200 150" preserveAspectRatio="none" aria-hidden="true">
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

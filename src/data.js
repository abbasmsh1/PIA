// Content for the PIA concept site.
//
// SOURCING. The live piac.com.pk is behind a bot check, so page content was read
// from the Internet Archive capture of 14 Apr 2025, and fleet/network figures
// from Wikipedia (Feb 2026 fleet table). Two things could NOT be verified from
// any source — Award +Plus tier thresholds and checked-baggage allowance by
// region (that page 403s on the archive). Both are marked `illustrative` below.
// Everything else is quoted or adapted from a real source.

// ---------------------------------------------------------------------------
// Network. `hub: true` marks Karachi. Entries without `intl` are domestic and
// render as chips rather than cards.
export const DESTINATIONS = [
  { city: 'Karachi', code: 'KHI', country: 'Pakistan', hub: true },
  { city: 'Lahore', code: 'LHE', country: 'Pakistan' },
  { city: 'Islamabad', code: 'ISB', country: 'Pakistan' },
  { city: 'Peshawar', code: 'PEW', country: 'Pakistan' },
  { city: 'Quetta', code: 'UET', country: 'Pakistan' },
  { city: 'Multan', code: 'MUX', country: 'Pakistan' },
  { city: 'Faisalabad', code: 'LYP', country: 'Pakistan' },
  { city: 'Sialkot', code: 'SKT', country: 'Pakistan' },
  { city: 'Sukkur', code: 'SKZ', country: 'Pakistan' },
  { city: 'Gwadar', code: 'GWD', country: 'Pakistan' },
  { city: 'Turbat', code: 'TUK', country: 'Pakistan' },
  { city: 'Skardu', code: 'KDU', country: 'Pakistan', intl: true, fare: 20830 },
  { city: 'Gilgit', code: 'GIL', country: 'Pakistan' },
  { city: 'Bahawalpur', code: 'BHV', country: 'Pakistan' },
  { city: 'Rahim Yar Khan', code: 'RYK', country: 'Pakistan' },
  { city: 'Dera Ghazi Khan', code: 'DEA', country: 'Pakistan' },

  { city: 'Dubai', code: 'DXB', country: 'United Arab Emirates', intl: true, fare: 62500 },
  { city: 'Abu Dhabi', code: 'AUH', country: 'United Arab Emirates', intl: true, fare: 61000 },
  { city: 'Sharjah', code: 'SHJ', country: 'United Arab Emirates', intl: true, fare: 59900 },
  { city: 'Jeddah', code: 'JED', country: 'Saudi Arabia', intl: true, fare: 98000 },
  { city: 'Medina', code: 'MED', country: 'Saudi Arabia', intl: true, fare: 99500 },
  { city: 'Riyadh', code: 'RUH', country: 'Saudi Arabia', intl: true, fare: 92000 },
  { city: 'Dammam', code: 'DMM', country: 'Saudi Arabia', intl: true, fare: 89000 },
  { city: 'Al Qassim', code: 'ELQ', country: 'Saudi Arabia', intl: true, fare: 94000 },
  { city: 'Doha', code: 'DOH', country: 'Qatar', intl: true, fare: 71000 },
  { city: 'Kuwait City', code: 'KWI', country: 'Kuwait', intl: true, fare: 76000 },
  { city: 'Manama', code: 'BAH', country: 'Bahrain', intl: true, fare: 74000 },
  { city: 'Muscat', code: 'MCT', country: 'Oman', intl: true, fare: 58000 },
  { city: 'Baku', code: 'GYD', country: 'Azerbaijan', intl: true, fare: 88499 },
  { city: 'Kuala Lumpur', code: 'KUL', country: 'Malaysia', intl: true, fare: 160000 },
  { city: 'Bangkok', code: 'BKK', country: 'Thailand', intl: true, fare: 152000 },
  { city: 'Beijing', code: 'PEK', country: 'China', intl: true, fare: 178000 },
  { city: 'Tokyo', code: 'NRT', country: 'Japan', intl: true, fare: 235000 },
  { city: 'London', code: 'LHR', country: 'United Kingdom', intl: true, fare: 289000 },
  { city: 'Manchester', code: 'MAN', country: 'United Kingdom', intl: true, fare: 284000 },
  { city: 'Paris', code: 'CDG', country: 'France', intl: true, fare: 300380 },
  { city: 'Toronto', code: 'YYZ', country: 'Canada', intl: true, fare: 381595 },
]

// Fares quoted verbatim from the BEST OFFERS rail on the archived homepage.
// These five are real; the other fares above are illustrative.
export const FEATURED = [
  { from: 'LHE', city: 'Skardu', code: 'KDU', fare: 20830, real: true },
  { from: 'LHE', city: 'Baku', code: 'GYD', fare: 88499, real: true },
  { from: 'ISB', city: 'Kuala Lumpur', code: 'KUL', fare: 160000, real: true },
  { from: 'ISB', city: 'Paris', code: 'CDG', fare: 300380, real: true },
  { from: 'ISB', city: 'Toronto', code: 'YYZ', fare: 381595, real: true },
  { from: 'KHI', city: 'Dubai', code: 'DXB', fare: 62500 },
]

// ---------------------------------------------------------------------------
// The four cards under "OUR SERVICES" on the real homepage, plus the seat and
// loyalty products that live under Experience in the real nav.
export const SERVICES = [
  { title: 'Pre-book Meal', body: 'Indulge in anticipation with our pre-booked meals — a culinary journey designed to elevate your dining experience.' },
  { title: 'Seat Selection', body: 'Tailor your travel with Seat Selection, where comfort meets choice. Pick your preferred seat before you fly.' },
  { title: 'Pre-book Baggage', body: 'Reserve your luggage space in advance for a seamless journey from check-in to arrival.' },
  { title: 'Special Assistance', body: 'Personalised wheelchair support and accessible travel, so your journey is smooth from kerb to gate.' },
  { title: 'Extra Legroom', body: 'Stretch out in a seat with additional pitch on longer sectors.' },
  { title: 'Preferred Seat', body: 'Choose a seat further forward in the cabin for a quicker exit on arrival.' },
  { title: 'In-Flight Seat Upgrade', body: 'Move up to Executive Economy on board, subject to availability.' },
  { title: 'Sohni Dharti Remittance Program', body: 'Earn loyalty points on remittances sent home through the State Bank scheme.' },
  { title: 'Humsafar', body: "PIA's in-flight magazine, alongside the Air Safety publication." },
]

// Cabins as PIA actually brands them — Executive Economy and Economy. There is
// no cabin marketed as "Business Class" on the site.
export const CABINS = [
  {
    name: 'Executive Economy',
    highlight: true,
    price: 'Premium cabin',
    feats: [
      ['12 kg cabin baggage total', true],
      ['1 × 7 kg bag + 5 kg briefcase', true],
      ['Priority check-in', true],
      ['Extra legroom and recline', true],
      ['Full meal service', true],
    ],
  },
  {
    name: 'Economy',
    price: 'Main cabin',
    feats: [
      ['7 kg cabin baggage', true],
      ['55 × 38 × 22 cm', true],
      ['Priority check-in', false],
      ['Extra legroom (paid add-on)', false],
      ['Meal service', true],
    ],
  },
]

// Real, from the Baggage Guide page. Checked allowance genuinely varies by
// region on PIA and is published per-route under Booking Conditions, so it is
// linked rather than invented.
export const BAGGAGE = [
  { cls: 'Economy', cabin: '1 × 7 kg — 55 × 38 × 22 cm', personal: 'Total 115 cm, domestic and international', checked: 'Varies by region — see Booking Conditions' },
  { cls: 'Executive Economy', cabin: '12 kg max — 1 × 7 kg (55 × 38 × 22 cm)', personal: '+ one small briefcase, 5 kg', checked: 'Varies by region — see Booking Conditions' },
]

export const CHECKIN = [
  { k: '24 h', v: 'Web and mobile check-in opens' },
  { k: '4 h', v: 'Recommended airport arrival, international' },
  { k: '60 min', v: 'Counters close, international' },
]

// illustrative — Award +Plus publishes A+ Individual and A+ Benefits, but the
// tier thresholds are not stated on any page reachable from the archive.
export const LOYALTY_TIERS = [
  { name: 'A+ Individual', req: 'Join free', perks: 'Earn Award +Plus points on every PIA sector you fly.' },
  { name: 'A+ Family', req: 'Household', perks: 'Pool points across the family, including a dedicated Children Program.' },
  { name: 'Corporate Club', req: 'Business', perks: 'Company-wide earning, redeemable for upgrades, excess baggage and seat pre-allocation.' },
]

export const LOYALTY_PERKS = [
  'Redeem points for award tickets',
  'Upgrade to Executive Economy',
  'Excess baggage allowance',
  'Pre-allocation of seats',
]

// ---------------------------------------------------------------------------
// Fleet counts from the Wikipedia fleet table (Feb 2026). Ranges are the
// manufacturers' published figures for the type.
export const FLEET = [
  { type: 'Boeing 777-300ER', count: 4, range: '13,650 km', note: 'Flagship widebody on the Europe and North America routes.' },
  { type: 'Boeing 777-200ER', count: 6, range: '13,080 km', note: 'Long-haul workhorse across the Gulf, Asia and Europe.' },
  { type: 'Boeing 777-200LR', count: 2, range: '15,840 km', note: 'PIA was the launch customer for the type.' },
  { type: 'Airbus A320-200', count: 20, range: '6,100 km', note: 'Backbone of the domestic and Gulf network.' },
  { type: 'ATR 42-500', count: 3, range: '1,555 km', note: 'Short regional sectors, including the northern airfields.' },
  { type: 'Boeing 787', count: 16, range: 'On order', note: 'Sixteen aircraft on order; not yet in service.', ordered: true },
]

export const ABOUT_STATS = [
  { k: '1955', v: 'Flag carrier since' },
  { k: 'KHI', v: 'Karachi hub' },
  { k: '35', v: 'Aircraft in service' },
  { k: '50', v: 'Destinations' },
]

// ---------------------------------------------------------------------------
// Headlines from the OUR NEWS rail on the archived homepage.
export const NEWS = [
  { date: 'January 10, 2025', cat: 'Network', title: 'Connecting dreams, families, and destinations', body: "PIA resumes flights to Paris after four years, reconnecting families, dreams and destinations with Pakistan's national airline." },
  { date: 'April 20, 2025', cat: 'Network', title: 'Baku awaits you', body: 'Discover the Europe of Asia, where history, culture and affordability come together.' },
  { date: 'March 2025', cat: 'Comfort', title: 'Corporate Executive Suite', body: "The blend of business and leisure at PIA's Airport Hotel Corporate Club Executive Suite." },
  { date: 'August 14, 2024', cat: 'Pakistan', title: 'Independence Day', body: 'For 77 years we have proudly served this nation. Flying high with pride, from the heart of Pakistan to the skies above.' },
  { date: '2024', cat: 'Destinations', title: 'Unveiling Skardu with PIA', body: 'A gem in the Karakoram Range — towering mountains, serene lakes, vibrant bazaars and rich cultural heritage.' },
  { date: '2024', cat: 'Onboard', title: 'Dining with Luxury', body: 'Every meal a celebration of taste and tradition, offering a luxurious blend of flavours from around the world.' },
]

// Sample board. Flight numbers follow the real PK numbering but the times and
// gates are illustrative.
export const DEPARTURES = [
  { time: '06:15', flight: 'PK 300', dest: 'ISLAMABAD', gate: 'A2', status: 'BOARDING' },
  { time: '07:40', flight: 'PK 304', dest: 'LAHORE', gate: 'A5', status: 'ON TIME' },
  { time: '09:05', flight: 'PK 213', dest: 'DUBAI', gate: 'B1', status: 'ON TIME' },
  { time: '10:30', flight: 'PK 731', dest: 'JEDDAH', gate: 'B4', status: 'GATE OPEN' },
  { time: '12:10', flight: 'PK 185', dest: 'KUALA LUMPUR', gate: 'C2', status: 'DELAYED' },
  { time: '14:45', flight: 'PK 785', dest: 'LONDON', gate: 'C6', status: 'ON TIME' },
]

// ---------------------------------------------------------------------------
// Hajj and Umrah. PIA runs a dedicated Hajj operation and publishes a Baggage
// Acceptance Policy for KSA; the archived site also carried a "Revised UMRAH
// Fares" announcement. Step copy below is written for this concept.
export const PILGRIMAGE_STEPS = [
  { k: '01', title: 'Choose your sector', body: 'Fly to Jeddah for Makkah, or Medina for Madinah — direct from Karachi, Lahore, Islamabad, Peshawar, Multan, Quetta and Sialkot.' },
  { k: '02', title: 'Book your fare', body: 'Umrah fares are published separately from regular economy and are revised each season.' },
  { k: '03', title: 'Prepare your documents', body: 'A valid visa and the mandatory polio vaccination certificate are required for travel to the Kingdom of Saudi Arabia.' },
  { k: '04', title: 'Pack to the KSA policy', body: 'Baggage on Saudi sectors follows a dedicated acceptance policy, including the Zamzam allowance carried on your return.' },
]

export const PILGRIMAGE_FACTS = [
  { k: 'JED', v: 'Jeddah — King Abdulaziz International' },
  { k: 'MED', v: 'Medina — Prince Mohammad bin Abdulaziz' },
  { k: 'Polio', v: 'Vaccination certificate mandatory for KSA' },
]

// ---------------------------------------------------------------------------
// Manage-booking policy grid. Written for this concept; PIA publishes the real
// terms under Conditions of Carriage.
export const MANAGE_ACTIONS = [
  { title: 'Change your date', body: 'Amend a booking online with the applicable change charge and any fare difference.' },
  { title: 'Add baggage', body: 'Advance-purchase excess baggage is cheaper online than at the airport counter.' },
  { title: 'Select a seat', body: 'Pick a preferred seat or extra legroom before you reach the gate.' },
  { title: 'Request a refund', body: 'Refunds follow the fare rules for your route and booking class.' },
]

// ---------------------------------------------------------------------------
export const NAV = [
  ['Where we Fly', '/destinations'],
  ['Experience', '/services'],
  ['Fleet', '/fleet'],
  ['Hajj & Umrah', '/hajj-umrah'],
  ['Manage', '/manage'],
  ['About', '/about'],
]

// illustrative — indicative PKR per unit of currency, so the widget's currency
// selector actually converts instead of relabelling. Not a live FX feed.
export const FX_PKR_PER_UNIT = {
  PKR: 1,
  USD: 278,
  GBP: 355,
  EUR: 302,
  AED: 76,
  SAR: 74,
}

export const CONTACT = {
  address: 'PIA Building, Jinnah International Airport, Karachi, 75200, Pakistan.',
  phone: '(+92-21)-111-786-786',
  email: 'contact@piac.aero',
}

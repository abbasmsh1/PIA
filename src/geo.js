// Equirectangular projection for the route map.
//
// PIA's network runs from Toronto (-79.6 E) to Tokyo (140.4 E), so the
// longitude window is very wide and the map is deliberately squashed
// horizontally. That is a stylistic choice, not a bug — but it does mean a new
// destination can silently land outside the canvas, so `npm run check` asserts
// every entry in COORDS projects inside the viewBox with a margin.

export const W = 900
export const H = 460
export const MARGIN = 10

const LON0 = -88
const LON_SPAN = 235
const LAT_TOP = 62
const LAT_SPAN = 64

export const px = (lng) => ((lng - LON0) / LON_SPAN) * W
export const py = (lat) => ((LAT_TOP - lat) / LAT_SPAN) * H

export const HUB = 'KHI'

// [longitude, latitude] per IATA code.
export const COORDS = {
  KHI: [67.16, 24.9],
  LHE: [74.4, 31.52],
  ISB: [72.82, 33.55],
  PEW: [71.51, 33.99],
  UET: [66.94, 30.25],
  KDU: [75.54, 35.34],
  GWD: [62.33, 25.23],

  DXB: [55.36, 25.25],
  AUH: [54.65, 24.43],
  SHJ: [55.52, 25.33],
  JED: [39.16, 21.68],
  MED: [39.71, 24.55],
  RUH: [46.7, 24.96],
  DMM: [49.8, 26.47],
  ELQ: [43.77, 26.3],
  DOH: [51.61, 25.27],
  KWI: [47.97, 29.23],
  BAH: [50.63, 26.27],
  MCT: [58.28, 23.59],
  GYD: [50.05, 40.47],

  KUL: [101.71, 2.75],
  BKK: [100.75, 13.69],
  PEK: [116.6, 40.08],
  NRT: [140.39, 35.76],

  LHR: [-0.46, 51.47],
  MAN: [-2.27, 53.35],
  CDG: [2.55, 49.01],
  YYZ: [-79.63, 43.68],
}

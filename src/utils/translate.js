export function changeStyleWithScale(value, scale) {
  return (value * parseInt(scale)) / 100;
}

export function mod360(deg) {
  return (deg + 360) % 360
}
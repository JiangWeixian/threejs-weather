export const getWeatherType = (loc: string) => {
  return loc.replace('/prod/', '')
}

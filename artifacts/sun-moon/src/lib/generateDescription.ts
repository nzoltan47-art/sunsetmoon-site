export function generateDescription(
  city: string,
  country: string,
  type: string
): string {
  if (type === "sunset") {
    return `Planning a sunset photo or evening out in ${city}? Today's exact sunset time, golden hour window, and dusk are shown below — all in ${city} local time. Perfect for photographers, couples, and travelers who don't want to miss the light.`;
  }
  if (type === "golden-hour") {
    return `Golden hour in ${city} happens twice today — shortly after sunrise and just before sunset. Below you'll find the exact times for both windows, so you can plan your shoot or outdoor activity down to the minute. Ideal for travel photography and romantic outings in ${city}, ${country}.`;
  }
  if (type === "moon") {
    return `Tonight's moon phase in ${city} is shown below, along with moonrise and moonset times in ${city} local time. Whether you're planning a night shoot, stargazing, or just curious — this is today's live lunar data for ${city}, ${country}.`;
  }
  return `Today's sun and moon data for ${city}, ${country}. All times shown in ${city} local time.`;
}

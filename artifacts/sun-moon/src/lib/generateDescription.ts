export function generateDescription(
  city: string,
  country: string,
  type: string
) {
  if (type === "sunset") {
    return `Check today's exact sunset time in ${city}, ${country}. Sunset varies throughout the year due to seasonal daylight changes. During summer, the sun sets later, while winter brings earlier sunsets. Knowing today's sunset time in ${city} helps plan outdoor activities, travel, and photography sessions.`;
  }

  if (type === "golden-hour") {
    return `Discover today's golden hour in ${city}, ${country}. Golden hour occurs shortly after sunrise and before sunset, providing warm, soft lighting ideal for photography and outdoor experiences. The timing changes throughout the year, so checking today's golden hour in ${city} ensures perfect lighting conditions.`;
  }

  if (type === "moon") {
    return `Track the current moon phase in ${city}, ${country}. The moon changes appearance daily as it orbits Earth, from crescent to full moon. Moonrise and moonset times vary, making it important to check today's moon phase in ${city} for stargazing, night photography, and evening planning.`;
  }

  return `Astronomical data for ${city}, ${country}.`;
}
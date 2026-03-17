export function generateDescription(
  city: string,
  country: string,
  type: string
) {
  if (type === "sunset") {
    return `Sunset times in ${city}, ${country} change throughout the year due to seasonal daylight variation. During summer months, daylight lasts longer and sunset occurs later in the evening, while in winter the days are shorter and sunset happens earlier. The golden hour in ${city} is especially popular among photographers, as the sun sits low on the horizon and creates warm, soft lighting conditions. Checking the sunset time today helps plan outdoor activities, photography sessions, and travel schedules.`;
  }

  if (type === "moon") {
    return `The moon phase in ${city}, ${country} changes daily as the moon orbits the Earth. Depending on the phase, the moon may appear as a crescent, half moon, or full moon. Moonrise and moonset times vary throughout the month, making it important to check the current phase for night photography, stargazing, or planning evening activities. Observing the moon phase in ${city} can provide insights into lunar cycles and natural nighttime illumination.`;
  }

  if (type === "golden-hour") {
    return `Golden hour in ${city}, ${country} occurs shortly after sunrise and before sunset, when the sunlight is softer and warmer. This time of day is ideal for photography, filming, and outdoor experiences due to the low angle of the sun. Golden hour timing changes throughout the year depending on the season and geographic location. Knowing the golden hour in ${city} today can help you capture the best natural lighting conditions.`;
  }

  return "";
}
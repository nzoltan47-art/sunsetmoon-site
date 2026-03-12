import { useMemo } from 'react';
import SunCalc from 'suncalc';

export interface AstroData {
  sun: {
    dawn: Date;
    sunrise: Date;
    sunriseEnd: Date;
    goldenHourEnd: Date;
    solarNoon: Date;
    goldenHour: Date;
    sunsetStart: Date;
    sunset: Date;
    dusk: Date;
    nauticalDusk: Date;
    night: Date;
    nauticalDawn: Date;
    nightEnd: Date;
  };
  moon: {
    fraction: number;
    phase: number;
    phaseName: string;
    angle: number;
    rise: Date | null;
    set: Date | null;
    alwaysUp: boolean;
    alwaysDown: boolean;
  };
  currentPhase: 'night' | 'dawn' | 'sunrise' | 'day' | 'goldenHour' | 'sunset' | 'dusk';
  nextEvent: { name: string; time: Date } | null;
}

function getPhaseName(phase: number): string {
  if (phase === 0 || phase === 1) return 'New Moon';
  if (phase > 0 && phase < 0.25) return 'Waxing Crescent';
  if (phase === 0.25) return 'First Quarter';
  if (phase > 0.25 && phase < 0.5) return 'Waxing Gibbous';
  if (phase === 0.5) return 'Full Moon';
  if (phase > 0.5 && phase < 0.75) return 'Waning Gibbous';
  if (phase === 0.75) return 'Last Quarter';
  if (phase > 0.75 && phase < 1) return 'Waning Crescent';
  return 'Unknown';
}

function getCurrentSkyPhase(now: Date, times: Record<string, Date>) {
  const t = now.getTime();
  if (t < times.dawn.getTime()) return 'night';
  if (t < times.sunrise.getTime()) return 'dawn';
  if (t < times.sunriseEnd.getTime()) return 'sunrise';
  if (t < times.goldenHour.getTime()) return 'day';
  if (t < times.sunsetStart.getTime()) return 'goldenHour';
  if (t < times.sunset.getTime()) return 'sunset';
  if (t < times.dusk.getTime()) return 'dusk';
  return 'night';
}

export function useAstroData(lat: number | undefined, lng: number | undefined, date: Date = new Date()): AstroData | null {
  return useMemo(() => {
    if (lat === undefined || lng === undefined) return null;

    // We use midday for moon phase to get a stable daily value, but exact time for position
    const noon = new Date(date);
    noon.setHours(12, 0, 0, 0);

    const sunTimes = SunCalc.getTimes(date, lat, lng);
    const moonTimes = SunCalc.getMoonTimes(date, lat, lng);
    const moonIllum = SunCalc.getMoonIllumination(noon);

    // Calculate next event
    const now = new Date();
    const events = [
      { name: 'Dawn', time: sunTimes.dawn },
      { name: 'Sunrise', time: sunTimes.sunrise },
      { name: 'Golden Hour', time: sunTimes.goldenHour },
      { name: 'Sunset', time: sunTimes.sunset },
      { name: 'Dusk', time: sunTimes.dusk },
    ].filter(e => e.time && e.time.getTime() > now.getTime())
     .sort((a, b) => a.time.getTime() - b.time.getTime());

    const nextEvent = events.length > 0 ? events[0] : null;
    const currentPhase = getCurrentSkyPhase(now, sunTimes);

    return {
      sun: sunTimes as any,
      moon: {
        fraction: moonIllum.fraction,
        phase: moonIllum.phase,
        phaseName: getPhaseName(moonIllum.phase),
        angle: moonIllum.angle,
        rise: moonTimes.rise || null,
        set: moonTimes.set || null,
        alwaysUp: moonTimes.alwaysUp || false,
        alwaysDown: moonTimes.alwaysDown || false,
      },
      currentPhase,
      nextEvent
    };
  }, [lat, lng, date]);
}

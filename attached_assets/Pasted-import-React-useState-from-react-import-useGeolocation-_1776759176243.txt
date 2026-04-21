import React, { useState } from "react";
import { useGeolocation } from "@/hooks/use-location";
import { useAstroData } from "@/hooks/use-astro";
import { SkyBackground } from "@/components/SkyBackground";
import { LocationSearch } from "@/components/LocationSearch";
import { EventCountdown } from "@/components/EventCountdown";
import { SunDetailsCard } from "@/components/SunDetailsCard";
import { MoonDetailsCard } from "@/components/MoonDetailsCard";
import { formatDate } from "@/lib/utils";
import {
  Compass,
  Calendar as CalendarIcon,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GlassButton } from "@/components/ui/glass-button";

export default function Home() {
  const {
    location,
    loading: geoLoading,
    requestLocation,
    updateLocation,
  } = useGeolocation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const astroData = useAstroData(
    location?.latitude,
    location?.longitude,
    selectedDate,
    browserTimezone
  );

  const handlePrevDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() - 1);
    setSelectedDate(d);
  };

  const handleNextDay = () => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + 1);
    setSelectedDate(d);
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  const isToday = new Date().toDateString() === selectedDate.toDateString();

  return (
    <div className="min-h-screen w-full relative flex flex-col">
      <SkyBackground phase={astroData?.currentPhase || "night"} />

      {/* HEADER */}
      <header className="w-full p-4 sm:p-6 lg:p-8 flex flex-col md:flex-row justify-between items-center gap-4 z-10 relative">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}images/celestial-ornament.png`}
              alt="Logo"
              className="w-6 h-6 object-contain"
            />
          </div>
          <div>
            <h1 className="text-xl font-display font-bold text-white tracking-widest">
              LUMINARY
            </h1>
            <p className="text-white/40 text-xs tracking-wide">Golden hour planner for travelers</p>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center max-w-2xl px-4">
          <LocationSearch
            onSelect={updateLocation}
            onUseGPS={requestLocation}
            loadingGPS={geoLoading}
          />
        </div>

        <div className="flex items-center bg-black/20 backdrop-blur-md rounded-2xl border border-white/10 p-1 shadow-lg">
          <GlassButton variant="ghost" size="icon" onClick={handlePrevDay}>
            <ChevronLeft className="w-5 h-5" />
          </GlassButton>

          <div
            className="px-4 py-2 flex items-center justify-center min-w-[180px] cursor-pointer hover:bg-white/5 rounded-xl transition-colors"
            onClick={handleToday}
          >
            <CalendarIcon className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-white">
              {isToday ? "Today" : formatDate(selectedDate)}
            </span>
          </div>

          <GlassButton variant="ghost" size="icon" onClick={handleNextDay}>
            <ChevronRight className="w-5 h-5" />
          </GlassButton>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col z-10 relative">

        {/* LOADING */}
        {!location && geoLoading && (
          <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
            <Compass className="w-16 h-16 text-white/50 mb-4 animate-spin-slow" />
            <p className="text-white/70 text-lg font-display tracking-widest">
              Locating your position...
            </p>
          </div>
        )}

        {/* EMPTY */}
        {!location && !geoLoading && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
              <MapPin className="w-10 h-10 text-white/50" />
            </div>

            <h2 className="text-3xl font-display text-white mb-3">
              Plan the perfect shot
            </h2>
            <p className="text-white/60 mb-3 leading-relaxed">
              Golden hour times, sunset countdowns and moon phases — for any city in the world. Built for travelers and photographers who refuse to miss the light.
            </p>
            <p className="text-white/40 text-sm mb-8">
              Search any destination above, or use your current location.
            </p>

            <GlassButton variant="primary" size="lg" onClick={requestLocation}>
              Use Current Location
            </GlassButton>
          </div>
        )}

        {/* DATA */}
        {location && astroData && (
          <div className="flex flex-col flex-1">

            {/* HERO */}
            <div className="w-full flex flex-col items-center justify-center py-8 lg:py-16">
              <div className="flex items-center space-x-2 text-white/70 bg-black/20 px-4 py-1.5 rounded-full mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium tracking-wide">
                  {location.name}
                </span>
              </div>

              {isToday ? (
                <EventCountdown nextEvent={astroData.nextEvent} />
              ) : (
                <div className="text-center p-8">
                  <h2 className="text-4xl font-display text-white mb-4">
                    {formatDate(selectedDate)}
                  </h2>
                </div>
              )}
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-auto">
              <SunDetailsCard data={astroData} timezone={browserTimezone} />
              <MoonDetailsCard data={astroData} timezone={browserTimezone} />
            </div>

            {/* CITY LINK */}
            <div className="mt-10 text-center text-white/60 text-sm flex flex-col items-center gap-3">
              <a href="/cities" className="hover:text-white transition underline">
                Browse Sunset Times by City
              </a>
              <a href="/countries" className="hover:text-white transition underline">
                Browse by Country
              </a>
            </div>

            {/* FEATURE GRID */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-3xl mb-3">🌅</p>
                <p className="text-white font-medium mb-2">Sunset & Golden Hour</p>
                <p className="text-white/50 text-sm leading-relaxed">Exact times for every city. Never miss the window for that perfect travel photo.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-3xl mb-3">🌙</p>
                <p className="text-white font-medium mb-2">Moon Phase Planner</p>
                <p className="text-white/50 text-sm leading-relaxed">Plan night shoots and romantic evenings around the lunar cycle at your destination.</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-3xl mb-3">📍</p>
                <p className="text-white font-medium mb-2">50,000+ Cities</p>
                <p className="text-white/50 text-sm leading-relaxed">From major capitals to hidden gems — accurate astronomical data for wherever you're headed.</p>
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
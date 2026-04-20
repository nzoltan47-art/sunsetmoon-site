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
import { getTopCountries } from "@/lib/getTopCountries";

export default function Home() {
  const {
    location,
    loading: geoLoading,
    error: geoError,
    requestLocation,
    updateLocation,
  } = useGeolocation();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const astroData = useAstroData(
    location?.latitude,
    location?.longitude,
    selectedDate
  );

  // ✅ NEW: countries list
  const countries = getTopCountries(12);

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
          <h1 className="text-xl font-display font-bold text-white tracking-widest">
            LUMINARY
          </h1>
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

            <h2 className="text-3xl font-display text-white mb-4">
              Where are you?
            </h2>

            <p className="text-white/60 mb-8 leading-relaxed">
              {geoError ||
                "To calculate accurate celestial data, we need your location."}
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
              <SunDetailsCard data={astroData} />
              <MoonDetailsCard data={astroData} />
            </div>

            {/* CITY LINK */}
            <div className="mt-10 text-center text-white/60 text-sm flex flex-col items-center gap-3">

              <a
                href="/cities"
                className="hover:text-white transition underline"
              >
                Browse Sunset Times by City
              </a>

              <a
                href="/countries"
                className="hover:text-white transition underline"
              >
                Browse by Country
              </a>

            </div>

            {/* ✅ NEW: COUNTRY LINKS */}
            <div className="mt-12 text-center">
              <h2 className="text-lg font-semibold mb-4 text-white/80">
                Browse by Country
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {countries.map((country) => {
                  const slug = country.toLowerCase().replace(/\s+/g, "-");

                  return (
                    <a
                      key={slug}
                      href={`/country/${slug}`}
                      className="px-3 py-2 rounded-lg border border-white/10 bg-black/10 hover:bg-white/10 transition text-sm"
                    >
                      {country}
                    </a>
                  );
                })}
              </div>
            </div>

          </div>
        )}
      </main>
    </div>
  );
}
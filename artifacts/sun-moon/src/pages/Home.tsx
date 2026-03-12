import React, { useState } from "react";
import { useGeolocation, AppLocation } from "@/hooks/use-location";
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
    error: geoError,
    requestLocation,
    updateLocation,
  } = useGeolocation();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const astroData = useAstroData(
    location?.latitude,
    location?.longitude,
    selectedDate,
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
      {/* Background handles its own state internally if we have astro data, else default to night */}
      <SkyBackground phase={astroData?.currentPhase || "night"} />

      {/* Header / Nav */}
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

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 flex flex-col z-10 relative">
        {/* Loading / Empty States */}
        {!location && geoLoading && (
          <div className="flex-1 flex flex-col items-center justify-center animate-pulse">
            <Compass
              className="w-16 h-16 text-white/50 mb-4 animate-spin-slow"
              style={{ animationDuration: "4s" }}
            />
            <p className="text-white/70 text-lg font-display tracking-widest">
              Locating your position...
            </p>
          </div>
        )}

        {!location && !geoLoading && (
          <div className="flex-1 flex flex-col items-center justify-center max-w-md mx-auto text-center">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
              <MapPin className="w-10 h-10 text-white/50" />
            </div>
            <h2 className="text-3xl font-display text-white mb-4">
              Where are you?
            </h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              {geoError ||
                "To calculate accurate celestial phases and times, we need your location. Please search for a city or enable GPS above."}
            </p>
            <GlassButton variant="primary" size="lg" onClick={requestLocation}>
              Use Current Location
            </GlassButton>
          </div>
        )}

        {/* Data Dash */}
        {location && astroData && (
          <div className="flex flex-col flex-1">
            {/* Hero Section: Countdown & Current Location Info */}
            <div className="w-full flex flex-col items-center justify-center py-8 lg:py-16">
              <div className="flex items-center space-x-2 text-white/70 bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/5 mb-6">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium tracking-wide">
                  {location.name}
                </span>
              </div>

              {isToday ? (
                <EventCountdown nextEvent={astroData.nextEvent} />
              ) : (
                <div className="text-center p-8">
                  <h2 className="text-4xl sm:text-5xl font-display text-white mb-4 drop-shadow-lg">
                    {formatDate(selectedDate)}
                  </h2>
                  <p className="text-white/60 uppercase tracking-widest">
                    Viewing historical/future data
                  </p>
                </div>
              )}
            </div>

            {/* Grid layout for Details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-auto">
              <SunDetailsCard data={astroData} />
              <MoonDetailsCard data={astroData} />
            </div>
            <div className="mt-10 text-center text-white/60 text-sm">
              <a
                href="/cities"
                className="underline hover:text-white transition"
              >
                Browse Sunset Times by City
              </a>
            </div>
            <footer className="text-center text-white/50 text-sm mt-16 pb-8">
              <div className="flex justify-center gap-6 flex-wrap">
                <a href="/about" className="hover:text-white">
                  About
                </a>
                <a href="/privacy" className="hover:text-white">
                  Privacy
                </a>
                <a href="/terms" className="hover:text-white">
                  Terms
                </a>
                <a href="/contact" className="hover:text-white">
                  Contact
                </a>
              </div>
            </footer>
          </div>
        )}
      </main>
    </div>
  );
}

import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, Loader2, X } from "lucide-react";
import { useCitySearch, AppLocation } from "@/hooks/use-location";
import { GlassButton } from "./ui/glass-button";

interface LocationSearchProps {
  onSelect: (location: AppLocation) => void;
  onUseGPS: () => void;
  loadingGPS: boolean;
}

export function LocationSearch({
  onSelect,
  onUseGPS,
  loadingGPS,
}: LocationSearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { data: results, isLoading } = useCitySearch(query);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-full max-w-md z-50" ref={wrapperRef}>
      <div className="relative flex items-center">
        <Search className="absolute left-4 text-white/50 w-5 h-5" />
        <input
          type="text"
          className="w-full bg-black/20 hover:bg-black/30 focus:bg-black/40 backdrop-blur-xl border border-white/20 text-white rounded-2xl py-3 pl-12 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-white/40 shadow-lg"
          placeholder="Search city..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-14 text-white/50 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        <div className="absolute right-2">
          <GlassButton
            size="icon"
            variant="ghost"
            onClick={onUseGPS}
            disabled={loadingGPS}
            title="Use Current Location"
          >
            {loadingGPS ? (
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
            ) : (
              <MapPin className="w-5 h-5 text-white/80" />
            )}
          </GlassButton>
        </div>
      </div>

      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center text-white/50">
              <Loader2 className="w-5 h-5 animate-spin mr-2" /> Searching...
            </div>
          ) : results && results.length > 0 ? (
            <ul className="max-h-60 overflow-y-auto py-2">
              {results.map((item) => (
                <li key={item.id}>
                  <button
                    className="w-full text-left px-4 py-4 hover:bg-white/10 text-white transition-colors flex flex-col cursor-pointer"
                    style={{ display: "block" }}
                    onClick={() => {
                      onSelect({
                        latitude: item.latitude,
                        longitude: item.longitude,
                        name: `${item.name}${item.admin1 ? `, ${item.admin1}` : ""}${item.country ? `, ${item.country}` : ""}`,
                      });
                      setIsOpen(false);
                      setQuery("");
                    }}
                  >
                    <span className="font-medium text-base">{item.name}</span>
                    <span className="text-xs text-white/50">
                      {item.admin1 ? `${item.admin1}, ` : ""}
                      {item.country}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-white/50 text-sm">
              No cities found for "{query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}

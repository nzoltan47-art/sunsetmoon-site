import React from 'react';
import { AstroData } from '@/hooks/use-astro';
import { formatTime } from '@/lib/utils';
import { Sunrise, Sunset, Sun, Haze, CloudSun } from 'lucide-react';

interface SunDetailsCardProps {
  data: AstroData;
}

export function SunDetailsCard({ data }: SunDetailsCardProps) {
  const events = [
    { label: 'Dawn', time: data.sun.dawn, icon: Haze, color: 'text-purple-400' },
    { label: 'Sunrise', time: data.sun.sunrise, icon: Sunrise, color: 'text-orange-400' },
    { label: 'Golden Hour', time: data.sun.goldenHour, icon: Sun, color: 'text-amber-400' },
    { label: 'Solar Noon', time: data.sun.solarNoon, icon: Sun, color: 'text-yellow-200' },
    { label: 'Sunset', time: data.sun.sunset, icon: Sunset, color: 'text-red-400' },
    { label: 'Dusk', time: data.sun.dusk, icon: CloudSun, color: 'text-indigo-400' },
  ];

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col h-full glass-panel-hover group relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700 pointer-events-none" />
      
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
          <Sun className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl text-white font-display">Solar Rhythm</h2>
      </div>

      <div className="grid grid-cols-2 gap-4 flex-grow content-center">
        {events.map((ev, idx) => {
          const Icon = ev.icon;
          return (
            <div key={idx} className="bg-black/20 rounded-2xl p-4 border border-white/5 flex flex-col">
              <div className="flex items-center space-x-2 mb-2">
                <Icon className={`w-4 h-4 ${ev.color}`} />
                <span className="text-xs sm:text-sm text-white/60 font-medium uppercase tracking-wider">{ev.label}</span>
              </div>
              <span className="text-lg sm:text-xl text-white font-medium">{formatTime(ev.time)}</span>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 pt-6 border-t border-white/10 flex justify-between items-center">
        <div>
          <p className="text-xs text-white/50 uppercase tracking-widest mb-1">Day Length</p>
          <p className="text-white font-medium">
            {Math.floor((data.sun.sunset.getTime() - data.sun.sunrise.getTime()) / (1000 * 60 * 60))}h {' '}
            {Math.floor(((data.sun.sunset.getTime() - data.sun.sunrise.getTime()) % (1000 * 60 * 60)) / (1000 * 60))}m
          </p>
        </div>
      </div>
    </div>
  );
}

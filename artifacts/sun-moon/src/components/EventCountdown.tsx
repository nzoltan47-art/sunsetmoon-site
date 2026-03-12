import React, { useState, useEffect } from 'react';
import { formatTimeWithSeconds } from '@/lib/utils';
import { Clock } from 'lucide-react';

interface EventCountdownProps {
  nextEvent: { name: string; time: Date } | null;
}

export function EventCountdown({ nextEvent }: EventCountdownProps) {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!nextEvent) return null;

  const diffMs = nextEvent.time.getTime() - now.getTime();
  if (diffMs < 0) return null; // Event passed, hook will recalculate soon

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diffMs % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-700">
      <div className="inline-flex items-center space-x-2 text-primary/90 font-display font-medium tracking-widest uppercase text-sm mb-4">
        <Clock className="w-4 h-4" />
        <span>Time to {nextEvent.name}</span>
      </div>
      
      <div className="flex items-baseline space-x-2 sm:space-x-4">
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tabular-nums">
            {hours.toString().padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-widest mt-2">Hours</span>
        </div>
        <span className="text-4xl sm:text-6xl lg:text-7xl text-white/30 font-light mb-8">:</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] tabular-nums">
            {mins.toString().padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm text-white/50 uppercase tracking-widest mt-2">Mins</span>
        </div>
        <span className="text-4xl sm:text-6xl lg:text-7xl text-white/30 font-light mb-8">:</span>
        <div className="flex flex-col items-center">
          <span className="text-5xl sm:text-7xl lg:text-8xl font-display font-bold text-primary drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] tabular-nums">
            {secs.toString().padStart(2, '0')}
          </span>
          <span className="text-xs sm:text-sm text-primary/50 uppercase tracking-widest mt-2">Secs</span>
        </div>
      </div>
      
      <div className="mt-8 text-white/70 bg-black/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/5">
        Current Time: <span className="text-white font-medium ml-1">{formatTimeWithSeconds(now)}</span>
      </div>
    </div>
  );
}

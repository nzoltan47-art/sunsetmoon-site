import React from 'react';
import { AstroData } from '@/hooks/use-astro';
import { formatTime } from '@/lib/utils';
import { Moon, ArrowUpFromLine, ArrowDownToLine } from 'lucide-react';

interface MoonDetailsCardProps {
  data: AstroData;
}

export function MoonDetailsCard({ data }: MoonDetailsCardProps) {
  const { fraction, phaseName, rise, set } = data.moon;
  
  // Create a visual representation of the moon phase
  // Phase is 0 to 1. 0 = new, 0.5 = full, 1 = new.
  const illumPercent = Math.round(fraction * 100);
  
  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 flex flex-col h-full glass-panel-hover group relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-slate-300/10 rounded-full blur-3xl group-hover:bg-slate-300/20 transition-all duration-700 pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-white/5 rounded-2xl border border-white/10">
            <Moon className="w-6 h-6 text-slate-300" />
          </div>
          <h2 className="text-2xl text-white font-display">Lunar Cycle</h2>
        </div>
        <div className="text-right">
          <p className="text-3xl font-display text-white font-bold">{illumPercent}%</p>
          <p className="text-xs text-white/50 uppercase tracking-widest">Illuminated</p>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center py-6">
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.1)] mb-6 overflow-hidden bg-slate-900 border border-white/10 flex items-center justify-center">
          {/* Base Moon Texture */}
          <img 
            src={`${import.meta.env.BASE_URL}images/moon-texture.png`} 
            alt="Moon surface" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen"
          />
          
          {/* Shadow Overlay to simulate phase */}
          <div 
            className="absolute inset-0 bg-black/90 transition-all duration-1000 mix-blend-multiply"
            style={{
               // Very rough css approximation of moon phase shadow using radial gradient
               // Real implementation would use SVG paths or canvas for exact curves, 
               // but this gives a decent vibe for a CSS-only approach
               background: `linear-gradient(${data.moon.phase > 0.5 ? '270deg' : '90deg'}, transparent ${illumPercent}%, rgba(0,0,0,0.9) ${illumPercent + 10}%)`
            }}
          />
          
          {/* Inner Glow */}
          <div className="absolute inset-0 rounded-full shadow-[inset_0_0_20px_rgba(255,255,255,0.4)] pointer-events-none" />
        </div>
        
        <h3 className="text-2xl text-white font-display text-center">{phaseName}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-auto pt-6 border-t border-white/10">
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 flex flex-col">
          <div className="flex items-center space-x-2 mb-1">
            <ArrowUpFromLine className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Moonrise</span>
          </div>
          <span className="text-lg text-white font-medium">{rise ? formatTime(rise) : '--:--'}</span>
        </div>
        <div className="bg-black/20 rounded-2xl p-4 border border-white/5 flex flex-col">
          <div className="flex items-center space-x-2 mb-1">
            <ArrowDownToLine className="w-4 h-4 text-slate-400" />
            <span className="text-xs text-white/60 font-medium uppercase tracking-wider">Moonset</span>
          </div>
          <span className="text-lg text-white font-medium">{set ? formatTime(set) : '--:--'}</span>
        </div>
      </div>
    </div>
  );
}

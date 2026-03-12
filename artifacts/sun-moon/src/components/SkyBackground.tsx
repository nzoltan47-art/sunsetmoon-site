import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SkyBackgroundProps {
  phase: 'night' | 'dawn' | 'sunrise' | 'day' | 'goldenHour' | 'sunset' | 'dusk';
}

const gradients = {
  night: 'linear-gradient(to bottom, #020111, #20124d, #000022)',
  dawn: 'linear-gradient(to bottom, #020111, #20124d, #491d88, #862776)',
  sunrise: 'linear-gradient(to bottom, #20124d, #692a71, #c84e68, #e7825b, #f2c174)',
  day: 'linear-gradient(to bottom, #2980b9, #6dd5fa, #ffffff)',
  goldenHour: 'linear-gradient(to bottom, #4e54c8, #8f94fb, #ff9966, #ffb266)',
  sunset: 'linear-gradient(to bottom, #190a42, #53114a, #991c49, #cc3b3f, #ec7c44)',
  dusk: 'linear-gradient(to bottom, #020111, #120930, #321356, #5c2070)'
};

export const SkyBackground: React.FC<SkyBackgroundProps> = ({ phase }) => {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#020111]">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={phase}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 4, ease: "easeInOut" }}
          className="absolute inset-0"
          style={{ background: gradients[phase] }}
        />
      </AnimatePresence>
      
      {/* Subtle animated stars for night and twilight */}
      {(phase === 'night' || phase === 'dawn' || phase === 'dusk') && (
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDBweCIgaGVpZ2h0PSI0MDBweCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTEwMCAxMDBoMXYxaC0xem0yMDAgMTUwaDF2MWgtMXptLTUwLTUwaDF2MWgtMXptLTE1MC01MGgxdjFoLTF6bTEwMCAxNTBoMXYxaC0xeiIvPjwvc3ZnPg==')] opacity-30 mix-blend-screen" />
      )}
      
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
    </div>
  );
};

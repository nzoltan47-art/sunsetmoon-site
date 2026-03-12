import { Link } from "wouter";
import { GlassButton } from "@/components/ui/glass-button";
import { SkyBackground } from "@/components/SkyBackground";
import { Telescope } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center relative">
      <SkyBackground phase="night" />
      
      <div className="glass-panel max-w-md w-full p-10 rounded-3xl text-center z-10 flex flex-col items-center">
        <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-6">
           <Telescope className="w-10 h-10 text-white/50" />
        </div>
        
        <h1 className="text-4xl font-display font-bold text-white mb-4">404</h1>
        <p className="text-white/60 mb-8 leading-relaxed">
          The stars have not aligned. We couldn't find the page you're looking for in this galaxy.
        </p>
        
        <Link href="/" className="w-full">
          <GlassButton variant="primary" className="w-full">
            Return to Dashboard
          </GlassButton>
        </Link>
      </div>
    </div>
  );
}

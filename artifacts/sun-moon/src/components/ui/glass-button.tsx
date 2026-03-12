import * as React from "react";
import { cn } from "@/lib/utils";

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'primary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50 disabled:pointer-events-none active:scale-95 backdrop-blur-md",
          {
            'bg-white/10 hover:bg-white/20 border border-white/10 text-white shadow-lg': variant === 'default',
            'bg-gradient-to-r from-primary/80 to-amber-500/80 hover:from-primary hover:to-amber-500 border border-primary/50 text-white shadow-[0_0_20px_rgba(251,191,36,0.3)]': variant === 'primary',
            'hover:bg-white/10 text-white/80 hover:text-white': variant === 'ghost',
            'h-10 px-4 py-2': size === 'default',
            'h-8 px-3 text-sm': size === 'sm',
            'h-12 px-8 text-lg': size === 'lg',
            'h-10 w-10': size === 'icon',
          },
          className
        )}
        {...props}
      />
    );
  }
);
GlassButton.displayName = "GlassButton";

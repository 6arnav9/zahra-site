"use client";

import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  bg?: "ink" | "black" | "transparent";
  showGrid?: boolean;
  gridSize?: "sm" | "md" | "lg";
  showGlow?: boolean;
  glowPosition?: "center" | "right" | "bottom" | "top-right";
  glowColor?: "green" | "gold";
  paddingSize?: "none" | "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

export const Section = React.forwardRef<HTMLElement, SectionProps>(
  (
    {
      id,
      bg = "ink",
      showGrid = false,
      gridSize = "md",
      showGlow = false,
      glowPosition = "center",
      glowColor = "green",
      paddingSize = "lg",
      className = "",
      children,
      ...props
    },
    ref
  ) => {
    const bgClasses = {
      ink: "bg-brand-ink text-white",
      black: "bg-black text-white",
      transparent: "bg-transparent text-white",
    };

    const paddingClasses = {
      none: "py-0",
      sm: "py-8 sm:py-12",
      md: "py-12 sm:py-16 lg:py-24",
      lg: "py-16 sm:py-24 lg:py-44",
      xl: "py-24 lg:py-64",
    };

    // Grid background sizes
    const gridSizes = {
      sm: "48px 48px",
      md: "60px 60px",
      lg: "80px 80px",
    };

    // Glow position classes
    const glowPositions = {
      center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[40dvh]",
      right: "top-0 right-0 w-1/2 h-full",
      bottom: "bottom-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[40dvh]",
      "top-right": "top-1/3 right-1/4 w-80 h-80",
    };

    const glowColors = {
      green: "bg-brand-green/10 blur-[140px]",
      gold: "bg-brand-gold/5 blur-[120px]",
    };

    return (
      <section
        ref={ref}
        id={id}
        className={`relative w-full overflow-hidden font-body ${bgClasses[bg]} ${paddingClasses[paddingSize]} ${className}`}
        {...props}
      >
        {/* Subtle Architectural Dot Grid Background */}
        {showGrid && (
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
            style={{
              backgroundImage: "radial-gradient(var(--color-brand-green) 1px, transparent 1px)",
              backgroundSize: gridSizes[gridSize],
            }}
          />
        )}

        {/* Glow Effects for Editorial Depth */}
        {showGlow && (
          <div
            className={`absolute pointer-events-none rounded-full z-0 transition-all duration-[1500ms] ease-out-expo ${glowPositions[glowPosition]} ${glowColors[glowColor]}`}
            aria-hidden="true"
          />
        )}

        {/* Content wrapper */}
        <div className="relative z-10 w-full">
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;

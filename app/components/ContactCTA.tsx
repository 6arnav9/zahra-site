"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ─── VIEWPORT TIER ───────────────────────────────────────────────────────────
type ViewportTier = "watch" | "landscapePhone" | "smallPhone" | "normal";
function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return "normal";
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 250) return "watch"; // Adjusted threshold for better watch detection
  if (h < 520 && w > h) return "landscapePhone";
  if (w <= 380) return "smallPhone";
  return "normal";
}

const ContactCTA = () => {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<ViewportTier>("normal");

  useEffect(() => {
    setMounted(true);
    const update = () => setTier(getViewportTier());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isLandscapePhone = tier === "landscapePhone";
  const isSmallPhone = tier === "smallPhone";

  return (
    <section className={`relative w-full bg-[#050505] text-white overflow-hidden font-[family-name:var(--font-open-sans)] ${
      isWatch ? 'py-12' : isLandscapePhone ? 'py-12' : 'py-32 lg:py-64'
    }`}>
      
      {/* ── BACKGROUND IMAGE & ARCHITECTURE ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="https://images.pexels.com/photos/8860492/pexels-photo-8860492.jpeg?auto=compress&cs=tinysrgb&w=1920" 
          alt="Strategic Infrastructure" 
          fill 
          className="object-cover grayscale opacity-[0.07] scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none z-1" 
        style={{ backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />
      
      {/* Decorative center line */}
      {!isWatch && (
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5 -translate-x-1/2 z-1" />
      )}

      {/* Subtle Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-[40dvh] bg-[#006837]/10 blur-[160px] pointer-events-none z-1" />

      <div className={`relative z-10 max-w-7xl mx-auto ${isWatch ? 'px-4' : 'px-6 sm:px-12 lg:px-24'} text-center`}>
        
        {/* Eyebrow */}
        <div className="overflow-hidden mb-6 lg:mb-8">
          <span className={`block font-black tracking-[0.6em] uppercase text-[#006837] animate-in fade-in slide-in-from-bottom-4 duration-1000 ${
            isWatch ? 'text-[6px]' : 'text-[10px] lg:text-xs'
          }`}>
            Global Mobilization
          </span>
        </div>

        {/* Headline */}
        <h2 className={`font-medium font-[family-name:var(--font-cormorant)] italic text-white leading-[1.1] tracking-tight mb-8 lg:mb-20 max-w-5xl mx-auto ${
          isWatch ? 'text-2xl' : isLandscapePhone ? 'text-4xl' : 'text-5xl lg:text-7xl xl:text-8xl'
        }`}>
          Architecting the future of <br />
          <span className="text-[#006837] opacity-90">Human Resources.</span>
        </h2>

        {/* Action Area */}
        <div className={`flex ${isWatch || isSmallPhone ? 'flex-col' : 'flex-row'} items-center justify-center gap-4 lg:gap-8 w-full`}>
          
          {/* Primary CTA: Clients */}
          <Link 
            href="/contact/hire" 
            className={`group relative bg-[#006837] overflow-hidden transition-all duration-500 ease-out-expo hover:scale-105 hover:shadow-[0_0_40px_rgba(0,104,55,0.3)] whitespace-nowrap flex items-center justify-center ${isWatch || isSmallPhone ? 'w-full max-w-[280px]' : ''}`}
            style={{
              padding: isWatch
                ? "10px 16px"
                : isSmallPhone || isLandscapePhone
                ? "clamp(12px, 2.5vh, 14px) 24px" 
                : "clamp(16px, 2vw, 22px) clamp(40px, 6vw, 64px)",
            }}
          >
            <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
            <span className={`relative z-10 font-black uppercase tracking-[0.25em] text-white`} style={{ fontSize: isWatch ? '8px' : isSmallPhone || isLandscapePhone ? '10px' : 'clamp(10px, 1vw, 11px)' }}>
              Get Started
            </span>
          </Link>

          {/* Secondary CTA: Suppliers */}
          <Link 
            href="/contact/partner" 
            className={`group relative border border-white/10 overflow-hidden transition-all duration-500 ease-out-expo hover:border-[#006837]/50 whitespace-nowrap flex items-center justify-center ${isWatch || isSmallPhone ? 'w-full max-w-[280px]' : ''}`}
            style={{
              padding: isWatch
                ? "10px 16px"
                : isSmallPhone || isLandscapePhone
                ? "clamp(12px, 2.5vh, 14px) 24px" 
                : "clamp(16px, 2vw, 22px) clamp(40px, 6vw, 64px)",
            }}
          >
            <div className="absolute inset-0 bg-white/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out-expo" />
            <span className={`relative z-10 font-black uppercase tracking-[0.25em] text-white/70 group-hover:text-white transition-colors duration-500`} style={{ fontSize: isWatch ? '8px' : isSmallPhone || isLandscapePhone ? '10px' : 'clamp(10px, 1vw, 11px)' }}>
              Partner With Us
            </span>
          </Link>
        </div>

        {/* Bottom Detail */}
        <div className={`${isWatch ? 'mt-8' : 'mt-16 lg:mt-40'} flex flex-col items-center gap-4 opacity-30`}>
          <div className={`w-[1px] ${isWatch ? 'h-6' : 'h-12'} bg-gradient-to-b from-transparent to-white/50`} />
          <p className={`font-medium tracking-[0.4em] uppercase ${isWatch ? 'text-[5px]' : 'text-[9px]'}`}>
            EST. 2001 — Al Zahra Human Resources
          </p>
        </div>

      </div>

      {/* Edge Architectural Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 z-1" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 z-1" />
    </section>
  );
};

export default ContactCTA;

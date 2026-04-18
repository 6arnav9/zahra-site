"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

/**
 * PRODUCTION-GRADE HERO COMPONENT
 * ------------------------------
 * Features: 
 * - Automated background slideshow (Images/Video ready)
 * - Dynamic padding for fixed global Navbar
 * - Performance-optimized marquee for client logos
 * - Fully responsive for mobile landscape (iPhone SE) and large desktops
 */

// 1. Types & Constants
interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

const BACKGROUND_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1613914011280-fc80bd159816?q=80&w=1831&auto=format&fit=crop',
    alt: 'Dubai Skyline Recruitment Background',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2000&auto=format&fit=crop',
    alt: 'European Infrastructure and Modern Development',
  }
];

const CLIENT_NAMES = [
  "MERCURY ENG", "STRABAG SE", "REDCO INFRA", "PORR AG", "GULF CIVIL"
];

const Hero = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // 2. Component Lifecycle
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % BACKGROUND_MEDIA.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Prevent hydration mismatch (Next.js Best Practice)
  if (!mounted) return null;

  return (
    <section className="relative h-[100dvh] w-full flex flex-col font-sans text-white overflow-hidden bg-black">
      
      {/* 3. Global Marquee Styles (Injected for performance) */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 25s linear infinite;
          display: flex;
          width: max-content;
        }
      `}} />

      {/* 4. Background Media Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {BACKGROUND_MEDIA.map((media, index) => (
          <div
            key={media.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image
              src={media.src}
              alt={media.alt}
              fill
              priority={index === 0} 
              className="object-cover object-center scale-105 animate-pulse-slow"
              unoptimized 
            />
          </div>
        ))}
        {/* Layered brand overlays for readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#006837]/90 via-black/40 to-transparent z-10" />
      </div>

      {/* 5. Main Hero Content Container
          Note: pt-24-32 accounts for the fixed global navbar to ensure perfect optical centering.
      */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 mx-auto max-w-5xl min-h-0 pt-24 sm:pt-32 [@media(max-height:450px)]:pt-16">
        
        <div className="flex flex-col items-center justify-center w-full text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-bold leading-[1.1] mb-4 sm:mb-6 tracking-tight font-[family-name:var(--font-montserrat)] drop-shadow-2xl [@media(max-height:450px)]:text-2xl [@media(max-height:450px)]:mb-2">
                Bridging Global Employers <br className="hidden md:block [@media(max-height:450px)]:hidden"/> with Exceptional Talent.
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug sm:leading-relaxed max-w-3xl mb-8 sm:mb-10 font-[family-name:var(--font-open-sans)] drop-shadow-md [@media(max-height:450px)]:hidden">
                Delivering high-quality, transparent, and efficient recruitment solutions. 
                We connect unskilled, skilled and semi-skilled professionals from to critical roles across the Middle East and Europe.
            </p>

            {/* Call to Action Group */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto [@media(max-height:450px)]:flex-row [@media(max-height:450px)]:gap-2">
                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-[#39B54A] hover:bg-[#006837] text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(57,181,74,0.3)] hover:shadow-[0_0_30px_rgba(57,181,74,0.5)] text-sm sm:text-base md:text-lg font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:py-1.5 [@media(max-height:450px)]:px-4 [@media(max-height:450px)]:text-[10px]">
                    Find Talent
                </button>
                <button className="w-full sm:w-auto px-8 sm:px-10 py-3 sm:py-4 bg-transparent hover:bg-white hover:text-[#1B2B21] border border-white/50 hover:border-white text-white font-bold rounded-full transition-all duration-300 shadow-xl text-sm sm:text-base md:text-lg font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:py-1.5 [@media(max-height:450px)]:px-4 [@media(max-height:450px)]:text-[10px]">
                    Submit CV
                </button>
            </div>
        </div>
      </div>

      {/* 6. Client Marquee Bar (Bottom Anchor) */}
      <div className="relative z-30 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-4 sm:py-8 flex-none [@media(max-height:450px)]:py-1.5">
        <div className="flex flex-col items-center justify-center w-full overflow-hidden">
          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white/50 uppercase tracking-[0.3em] text-center mb-4 sm:mb-6 font-[family-name:var(--font-open-sans)] [@media(max-height:450px)]:hidden">
            Trusted by Industry Leaders
          </p>
          
          <div className="relative w-full overflow-hidden max-w-7xl mx-auto">
            {/* The animated track - Duplicated for seamless looping */}
            <div className="animate-scroll gap-12 sm:gap-16 md:gap-32 pr-12 sm:pr-16 md:pr-32 pointer-events-none">
                <LogoTrack logos={CLIENT_NAMES} />
                <LogoTrack logos={CLIENT_NAMES} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Reusable Sub-component for the Marquee Track
 */
const LogoTrack = ({ logos }: { logos: string[] }) => (
  <div className="flex items-center gap-12 sm:gap-16 md:gap-32 opacity-40 grayscale contrast-125 transition-all duration-500 hover:opacity-100">
    {logos.map((logo, i) => (
      <span 
        key={`${logo}-${i}`} 
        className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap tracking-tighter [@media(max-height:450px)]:text-xs"
      >
        {logo}
      </span>
    ))}
  </div>
);

export default Hero;
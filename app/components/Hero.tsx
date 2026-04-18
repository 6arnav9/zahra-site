"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

const mediaItems = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1613914011280-fc80bd159816?q=80&w=1831&auto=format&fit=crop',
    alt: 'Dubai Skyline',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2000&auto=format&fit=crop',
    alt: 'European Infrastructure',
  }
];

const Hero = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  // Hydration fix: Only start rendering the dynamic parts after the component mounts on the client
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
    // STRICT CONSTRAINT: h-[100dvh] forces it to never scroll or push content off-screen
    <section className="relative h-[100dvh] w-full flex flex-col font-sans text-white overflow-hidden bg-black">
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
          display: flex;
          width: max-content;
        }
      `}} />

      {/* 1. Dynamic Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {mediaItems.map((media, index) => {
          const isActive = index === currentMediaIndex;
          return (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={media.src}
                alt={media.alt || 'Background'}
                fill
                priority={index === 0} 
                className="object-cover object-center"
                unoptimized 
              />
            </div>
          );
        })}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#006837]/90 via-black/40 to-transparent z-10" />
      </div>

      {/* 2. Top Navigation */}
      {/* HARD OVERRIDE: [@media(max-height:450px)] specifically targets landscape phones like the SE */}
      <header className="relative z-50 w-full flex-none px-4 sm:px-6 lg:px-12 py-4 [@media(max-height:450px)]:py-1 flex justify-between items-center">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="brightness-0 invert relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 [@media(max-height:450px)]:w-6 [@media(max-height:450px)]:h-6">
            <Image src="/logo.png" alt="Al Zahra Logo" fill className="object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-[family-name:var(--font-cinzel)] font-bold text-lg sm:text-xl md:text-2xl leading-none tracking-wide text-white [@media(max-height:450px)]:text-base">
              Al Zahra
            </span>
            <span className="text-[7px] sm:text-[8px] md:text-[9px] font-bold tracking-[0.2em] uppercase mt-0.5 sm:mt-1 text-white/80 [@media(max-height:450px)]:text-[5px]">
              Human Resources
            </span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wide font-[family-name:var(--font-open-sans)]">
          <a href="#" className="hover:text-[#39B54A] transition-colors">About Us</a>
          <a href="#" className="hover:text-[#39B54A] transition-colors">Services</a>
          <button className="px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full transition-all backdrop-blur-md [@media(max-height:450px)]:py-1.5">
            Contact Us
          </button>
        </nav>

        <button 
          className="md:hidden flex flex-col gap-1.5 p-2 z-50 [@media(max-height:450px)]:scale-75"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-t border-white/10 p-6 flex flex-col items-center gap-6 md:hidden shadow-2xl z-50 max-h-screen overflow-y-auto">
            <a href="#" className="text-lg font-semibold hover:text-[#39B54A]">About Us</a>
            <a href="#" className="text-lg font-semibold hover:text-[#39B54A]">Services</a>
            <button className="w-full max-w-[200px] py-3 bg-[#39B54A] rounded-full font-bold">Contact Us</button>
          </div>
        )}
      </header>

      {/* 3. Main Hero Content */}
      {/* flex-1 and min-h-0 are critical here so this container strictly stays within the leftover space */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 mx-auto max-w-5xl min-h-0">
        
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-bold leading-[1.1] mb-2 sm:mb-6 tracking-tight font-[family-name:var(--font-montserrat)] drop-shadow-2xl text-center w-full [@media(max-height:450px)]:text-2xl [@media(max-height:450px)]:mb-2">
            Bridging Global Employers <br className="hidden md:block [@media(max-height:450px)]:hidden"/> with Exceptional Talent.
            </h1>

            {/* Completely vanishes on short horizontal viewports to save space */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug sm:leading-relaxed max-w-3xl mb-6 sm:mb-10 font-[family-name:var(--font-open-sans)] drop-shadow-md text-center [@media(max-height:450px)]:hidden">
            Delivering high-quality, transparent, and efficient recruitment solutions. We connect skilled professionals from India and Nepal to critical roles across the Middle East and Europe.
            </p>

            {/* Forces inline row and tiny padding on SE Landscape */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 w-full sm:w-auto [@media(max-height:450px)]:flex-row [@media(max-height:450px)]:gap-2">
            <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-[#39B54A] hover:bg-[#006837] text-white font-bold rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(57,181,74,0.3)] text-sm sm:text-base md:text-lg tracking-wide font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:py-1.5 [@media(max-height:450px)]:px-4 [@media(max-height:450px)]:text-[10px]">
                Find Talent
            </button>
            <button className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-transparent hover:bg-white hover:text-[#1B2B21] border border-white/50 hover:border-white text-white font-bold rounded-full transition-all duration-300 shadow-xl text-sm sm:text-base md:text-lg tracking-wide font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:py-1.5 [@media(max-height:450px)]:px-4 [@media(max-height:450px)]:text-[10px]">
                Submit CV
            </button>
            </div>
        </div>
      </div>

      {/* 4. Bottom Client Bar */}
      <div className="relative z-30 w-full bg-black/40 backdrop-blur-md border-t border-white/10 py-3 sm:py-6 flex-none [@media(max-height:450px)]:py-1.5">
        <div className="flex flex-col items-center justify-center w-full overflow-hidden">
          {/* Hides 'Trusted Worldwide' entirely on SE Landscape */}
          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-[0.3em] text-center mb-2 sm:mb-4 font-[family-name:var(--font-open-sans)] [@media(max-height:450px)]:hidden">
            Trusted Worldwide
          </p>
          
          <div className="relative w-full overflow-hidden max-w-7xl mx-auto">
            {/* The gradient masks have been completely removed as requested */}
            
            <div className="animate-scroll gap-8 sm:gap-16 md:gap-32 pr-8 sm:pr-16 md:pr-32 pointer-events-none">
                <div className="flex items-center gap-8 sm:gap-16 md:gap-32 opacity-40 grayscale contrast-150">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">MERCURY ENG</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">STRABAG SE</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">REDCO INFRA</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">PORR AG</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">GULF CIVIL</span>
                </div>
                <div className="flex items-center gap-8 sm:gap-16 md:gap-32 opacity-40 grayscale contrast-150">
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">MERCURY ENG</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">STRABAG SE</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">REDCO INFRA</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">PORR AG</span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap [@media(max-height:450px)]:text-xs">GULF CIVIL</span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
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
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentMediaIndex((prevIndex) => (prevIndex + 1) % mediaItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  return (
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

      {/* 3. Main Hero Content */}
      {/* THE FIX: Added pt-24 sm:pt-32 to account for the fixed global navbar, pushing the text down to true center */}
      <div className="relative z-20 flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 mx-auto max-w-5xl min-h-0 pt-24 sm:pt-32 [@media(max-height:450px)]:pt-16">
        
        <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.5rem] font-bold leading-[1.1] mb-2 sm:mb-6 tracking-tight font-[family-name:var(--font-montserrat)] drop-shadow-2xl text-center w-full [@media(max-height:450px)]:text-2xl [@media(max-height:450px)]:mb-2">
            Bridging Global Employers <br className="hidden md:block [@media(max-height:450px)]:hidden"/> with Exceptional Talent.
            </h1>

            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 leading-snug sm:leading-relaxed max-w-3xl mb-6 sm:mb-10 font-[family-name:var(--font-open-sans)] drop-shadow-md text-center [@media(max-height:450px)]:hidden">
            Delivering high-quality, transparent, and efficient recruitment solutions. We connect skilled professionals from India and Nepal to critical roles across the Middle East and Europe.
            </p>

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
          <p className="text-[9px] sm:text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-[0.3em] text-center mb-2 sm:mb-4 font-[family-name:var(--font-open-sans)] [@media(max-height:450px)]:hidden">
            Trusted Worldwide
          </p>
          
          <div className="relative w-full overflow-hidden max-w-7xl mx-auto">
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
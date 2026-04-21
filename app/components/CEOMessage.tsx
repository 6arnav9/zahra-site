"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';

type ViewportTier = "watch" | "phone" | "landscape" | "tablet" | "desktop";
function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return "desktop";
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 250) return "watch";
  if (h < 500 && w > h) return "landscape";
  if (w < 640) return "phone";
  if (w < 1024) return "tablet";
  return "desktop";
}

const CEOMessage = () => {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<ViewportTier>("desktop");

  useEffect(() => {
    setMounted(true);
    const update = () => setTier(getViewportTier());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isPhone = tier === "phone";
  const isLandscape = tier === "landscape";

  if (isWatch) {
    return (
      <section className="w-full bg-[#050505] text-white py-12 px-4 flex flex-col items-center text-center">
        <h2 className="font-medium font-[family-name:var(--font-cormorant)] italic text-lg leading-tight mb-4">
          Architecting the <span className="text-[#006837]">Future.</span>
        </h2>
        <div className="relative w-24 h-32 mb-4 rounded-sm overflow-hidden">
          <Image src="/ceo-headshot.png" alt="CEO" fill className="object-cover" />
        </div>
        <p className="text-[7px] text-white/50 leading-relaxed">
          Delivering reliability at scale since 2001.
        </p>
      </section>
    );
  }

  return (
    <section className={`relative w-full bg-[#050505] overflow-hidden font-[family-name:var(--font-open-sans)] text-white ${
      isLandscape ? 'py-12' : isPhone ? 'py-16' : 'py-20 lg:py-44'
    }`}>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#006837]/5 blur-[120px] pointer-events-none" />
      
      <div className={`relative z-10 max-w-7xl mx-auto ${isWatch ? 'px-4' : 'px-6 sm:px-12 lg:px-20'}`}>
        <div className={`flex ${isLandscape ? 'flex-row items-center' : 'flex-col lg:flex-row items-center lg:items-start'} gap-8 lg:gap-28`}>
          
          {/* Headshot Area */}
          <div className={`relative ${isLandscape ? 'w-[200px]' : isPhone ? 'w-1/2 max-w-[280px]' : 'w-full max-w-[420px]'} aspect-[4/5] flex-shrink-0 group`}>
            <div className="absolute -inset-4 border border-white/5 translate-x-3 translate-y-3 transition-transform duration-1000 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
            
            <div className="relative w-full h-full overflow-hidden rounded-sm transition-all duration-1000 shadow-2xl">
              <Image 
                src="/ceo-headshot.png" 
                alt="Ashish Kumar Singh - CEO" 
                fill 
                className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out-expo"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />
            </div>
            
            <div className={`absolute ${isLandscape ? '-bottom-1 -right-1 p-3' : isPhone ? '-bottom-4 -right-2 p-4' : '-bottom-10 -right-4 lg:-right-16 p-8 lg:p-10'} bg-[#0a0a0a]/90 backdrop-blur-xl border-l-[1px] border-[#006837] shadow-2xl z-20`}>
              <h4 className={`font-bold text-white tracking-[0.2em] uppercase ${isLandscape || isPhone ? 'text-[8px]' : 'text-xs lg:text-sm'} mb-1 font-[family-name:var(--font-cinzel)]`}>
                Ashish Singh
              </h4>
              <p className={`text-[#006837] font-black uppercase tracking-[0.4em] ${isLandscape || isPhone ? 'text-[7px]' : 'text-[9px] lg:text-[10px]'}`}>
                Founder & CEO
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className={`flex-1 flex flex-col justify-center ${isLandscape ? 'text-left items-start' : isPhone ? 'pt-8 text-center items-center' : 'pt-12 lg:pt-6 text-center lg:text-left items-center lg:items-start'}`}>
            {!isLandscape && (
              <div className="overflow-hidden mb-6 lg:mb-12">
                <span className={`block font-black tracking-[0.5em] uppercase text-[#006837]/80 ${isPhone ? 'text-[9px]' : 'text-[10px] lg:text-xs'}`}>
                  Leadership
                </span>
              </div>
            )}

            <blockquote className={`relative ${isLandscape ? 'mb-4' : isPhone ? 'mb-6' : 'mb-8 lg:mb-20'} max-w-3xl`}>
              {!isLandscape && !isPhone && <span className="absolute -top-16 -left-10 text-9xl text-white/5 font-serif leading-none select-none">“</span>}
              <h2 className={`font-medium font-[family-name:var(--font-cormorant)] italic text-white/95 leading-[1.15] tracking-tight ${isLandscape || isPhone ? 'text-lg sm:text-2xl' : 'text-2xl lg:text-5xl xl:text-6xl'} drop-shadow-2xl`}>
                We are not just moving people; we are <span className="text-[#006837]">architecting the future</span> of global infrastructure.
              </h2>
            </blockquote>

            <div className={`space-y-4 lg:space-y-8 text-white/50 font-medium leading-relaxed ${isLandscape || isPhone ? 'text-[10px] sm:text-sm' : 'text-sm lg:text-lg'} max-w-2xl`}>
              <p>
                Since 2001, Al Zahra has operated at the intersection of traditional integrity and modern global ambition. Every soaring skyline rests on the shoulders of human excellence.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CEOMessage;

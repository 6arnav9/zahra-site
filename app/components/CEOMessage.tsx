"use client";

import Image from "next/image";
import { useViewport } from "../hooks/useViewport";
import { Section, SectionHeader } from "./ui";

const CEOMessage = () => {
  const { mounted, isWatch, isPhone, isLandscape, navHeight } = useViewport();

  if (!mounted) return null;

  if (isWatch) {
    return (
      <Section bg="ink" paddingSize="sm" className="flex flex-col items-center text-center">
        <SectionHeader
          isWatch
          title={
            <>
              Architecting the <span className="text-brand-green">Future.</span>
            </>
          }
        />
        <div className="relative w-24 h-32 mb-4 mt-4 rounded-brand-sm overflow-hidden">
          <Image src="/ceo-headshot.png" alt="CEO" fill className="object-cover" />
        </div>
        <p className="text-[7px] text-white/50 leading-relaxed">
          Delivering reliability at scale since 2001.
        </p>
      </Section>
    );
  }

  return (
    <Section
      bg="ink"
      showGlow
      glowPosition="right"
      glowColor="green"
      paddingSize={isLandscape ? "sm" : isPhone ? "md" : "lg"}
    >
      <div className={`relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20`}>
        <div className={`flex ${isLandscape ? "flex-row items-center" : "flex-col lg:flex-row items-center lg:items-start"} gap-8 lg:gap-28`}>
          
          {/* Headshot Area */}
          <div className={`relative ${isLandscape ? "w-[200px]" : isPhone ? "w-1/2 max-w-[280px]" : "w-full max-w-[420px]"} aspect-[4/5] flex-shrink-0 group`}>
            <div className="absolute -inset-4 border border-white/5 translate-x-3 translate-y-3 transition-transform duration-1000 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0" />
            
            <div className="relative w-full h-full overflow-hidden rounded-brand-sm transition-all duration-1000 shadow-2xl">
              <Image 
                src="/ceo-headshot.png" 
                alt="Ashish Kumar Singh - CEO" 
                fill 
                className="object-cover object-center scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out-expo"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-30" />
            </div>
            
            <div className={`absolute ${isLandscape ? "-bottom-1 -right-1 p-3" : isPhone ? "-bottom-4 -right-2 p-4" : "-bottom-10 -right-4 lg:-right-16 p-8 lg:p-10"} bg-[#0a0a0a]/90 backdrop-blur-xl border-l-[1px] border-brand-green shadow-2xl z-20`}>
              <h4 className={`font-bold text-white tracking-[0.2em] uppercase ${isLandscape || isPhone ? "text-[8px]" : "text-xs lg:text-sm"} mb-1 font-display`}>
                Ashish Singh
              </h4>
              <p className={`text-brand-green-light font-black uppercase tracking-[0.4em] ${isLandscape || isPhone ? "text-[7px]" : "text-[9px] lg:text-[10px]"}`}>
                Founder & CEO
              </p>
            </div>
          </div>

          {/* Content Area */}
          <div className={`flex-1 flex flex-col justify-center ${isLandscape ? "text-left items-start" : isPhone ? "pt-8 text-center items-center" : "pt-12 lg:pt-6 text-center lg:text-left items-center lg:items-start"}`}>
            <SectionHeader
              isPhone={isPhone}
              isLandscape={isLandscape}
              eyebrow={!isLandscape ? "Leadership" : undefined}
              title={
                <>
                  We are not just moving people; we are <span className="text-brand-green-light">architecting the future</span> of global infrastructure.
                </>
              }
            />

            <div className={`space-y-4 lg:space-y-8 text-white/70 font-medium leading-relaxed mt-6 lg:mt-8 ${isLandscape || isPhone ? "text-[10px] sm:text-sm" : "text-sm lg:text-lg"} max-w-2xl`}>
              <p>
                Since 2001, Al Zahra has operated at the intersection of traditional integrity and modern global ambition. Every soaring skyline rests on the shoulders of human excellence.
              </p>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
};

export default CEOMessage;

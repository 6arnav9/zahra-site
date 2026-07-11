"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useViewport } from "../../../hooks/useViewport";
import { Section, AnimatedCounter } from "../../ui";

const SECTORS = [
  {
    name: "Construction & Civil",
    code: "CON",
    metric: "8,500+ Deployed",
    badge: "Infrastructure & Heavy Build",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    desc: "Supplying civil engineers, steel fixers, masonry leads, and heavy concrete specialists for monumental builds."
  },
  {
    name: "Luxury Hospitality",
    code: "HSP",
    metric: "3,200+ Mobilized",
    badge: "5-Star Resorts & Hotels",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
    desc: "Providing front-of-house ambassadors, culinary chefs, guest relations stars, and facility teams."
  },
  {
    name: "Healthcare & Medical",
    code: "MED",
    metric: "1,100+ Placed",
    badge: "Clinics & Medical Centers",
    image: "https://images.unsplash.com/photo-1584515901387-a7a1a63376b6?q=80&w=2070&auto=format&fit=crop",
    desc: "Sourcing certified general nurses, clinical laboratory technicians, and emergency medical specialists."
  },
  {
    name: "Security Services",
    code: "SEC",
    metric: "1,800+ Deployed",
    badge: "High-Integrity Guarding",
    image: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?q=80&w=2070&auto=format&fit=crop",
    desc: "Vetted security commanders, corporate access watch officers, and high-profile event teams."
  },
  {
    name: "Office & Admin",
    code: "ADM",
    metric: "950+ Professionals",
    badge: "Corporate Support",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
    desc: "Bilingual administrative heads, executive assistants, office managers, and HR dispatchers."
  },
  {
    name: "Transportation & Logistics",
    code: "LOG",
    metric: "2,500+ Operators",
    badge: "Supply Chain & Ports",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop",
    desc: "Heavy machinery pilots, terminal transport dispatchers, warehouse directors, and cargo supervisors."
  }
];

export default function AboutStory() {
  const [activeSector, setActiveSector] = useState<number>(0);
  
  // Intersection Observer for Stats Counters
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setStatsVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Keyboard navigation for Sector Showcase
  const handleSectorKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSector((index + 1) % SECTORS.length);
      const nextButton = document.getElementById(`sector-btn-${(index + 1) % SECTORS.length}`);
      nextButton?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSector((index - 1 + SECTORS.length) % SECTORS.length);
      const prevButton = document.getElementById(`sector-btn-${(index - 1 + SECTORS.length) % SECTORS.length}`);
      prevButton?.focus();
    }
  };

  return (
    <Section
      bg="ink"
      showGrid
      gridSize="md"
      showGlow
      glowPosition="bottom"
      glowColor="gold"
      paddingSize="lg"
      className="border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20">
        <div className="flex flex-col lg:flex-row-reverse gap-16 lg:gap-32 items-start">
          
           {/* Left Story Column */}
          <div className={`w-full lg:w-[45%] flex flex-col items-start gap-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div>
              <span className="font-label font-black text-[10px] tracking-[0.4em] uppercase text-brand-gold block mb-4">
                The Genesis
              </span>
              <h2 className="font-headline italic text-4xl sm:text-5xl lg:text-6xl text-white leading-tight">
                Over two decades of <span className="text-brand-gold/60">uncompromising alignment.</span>
              </h2>
            </div>

            <div className="text-white/75 font-body text-sm sm:text-base leading-relaxed space-y-6 max-w-[55ch]">
              <p>
                Founded in Dubai in 2001, Al Zahra HR began with a singular premise: large-scale human infrastructure requires professional, high-integrity delivery, not just volume recruitment.
              </p>
              <p>
                As the skyline of the UAE expanded, we matured alongside the region&apos;s leading builders. By establishing direct, fully compliant recruitment pipelines and state-of-the-art vetting offices in India and Nepal, we secured absolute control over sourcing ethics and candidate quality.
              </p>
              <p>
                Today, we bridge the gap between technical complexity and candidate readiness, mobilizing vetted workforces that sustain soaring skylines, vital infrastructure networks, and luxury hospitality operations.
              </p>
            </div>

            {/* Stat Pairs block */}
            <div ref={statsRef} className="grid grid-cols-2 gap-8 w-full border-t border-white/5 pt-8 mt-4">
              <div className="flex flex-col">
                <AnimatedCounter target={25} suffix="+" isActive={statsVisible} fontSize="clamp(2rem, 4vw, 3rem)" className="text-brand-gold" />
                <span className="font-label font-black text-[9px] uppercase tracking-[0.25em] text-white/60 mt-2">
                  Years of Integrity
                </span>
              </div>
              <div className="flex flex-col">
                <AnimatedCounter target={3} suffix=" Sourcing Hubs" isActive={statsVisible} fontSize="clamp(2rem, 4vw, 3rem)" className="text-brand-gold" />
                <span className="font-label font-black text-[9px] uppercase tracking-[0.25em] text-white/60 mt-2">
                  Direct Jurisdictions
                </span>
              </div>
            </div>
          </div>

          {/* Right Sectors & Expansion Column (Interactive Showcase Portal) */}
          <div className={`w-full lg:w-[55%] flex flex-col gap-6 sm:gap-8 transition-all duration-[800ms] ease-[cubic-bezier(0.16,1,0.3,1)] delay-150 ${statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            {/* Dynamic Showcase Image Card */}
            <div 
              id="sector-panel"
              role="tabpanel"
              aria-labelledby={`sector-btn-${activeSector}`}
              className="relative w-full h-[180px] xs:h-[240px] sm:h-[350px] landscape:h-[200px] lg:landscape:h-[350px] rounded-brand-md overflow-hidden border border-white/5 bg-[#0a0a0a] group"
            >
              {SECTORS.map((sector, idx) => (
                <Image
                  key={sector.code}
                  src={sector.image}
                  alt={sector.name}
                  fill
                  className={`object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    activeSector === idx ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                  }`}
                  unoptimized
                />
              ))}
              
              {/* Visual Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent z-10" />

              {/* Floating Sector Details Card */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 animate-slide-up">
                <div className="flex justify-between items-end gap-2">
                  <div>
                    <p className="font-label font-black text-[8px] sm:text-[9px] tracking-[0.25em] uppercase text-brand-gold mb-0.5 sm:mb-1">
                      {SECTORS[activeSector].badge}
                    </p>
                    <h4 className="font-headline italic text-lg sm:text-2xl text-white leading-tight">
                      {SECTORS[activeSector].name}
                    </h4>
                  </div>
                  <span className="font-mono text-[8px] sm:text-[9px] font-bold text-brand-green-light bg-brand-green-light/10 border border-brand-green-light/20 px-2 py-0.5 sm:py-1 rounded flex-shrink-0">
                    {SECTORS[activeSector].metric}
                  </span>
                </div>
                <p className="text-white/60 text-[10px] sm:text-xs mt-1 sm:mt-2 max-w-[95%] sm:max-w-[90%] leading-relaxed">
                  {SECTORS[activeSector].desc}
                </p>
              </div>
            </div>

            {/* Interactive Selector Buttons Grid */}
            <div>
              <span className="font-label font-black text-[10px] tracking-[0.25em] uppercase text-brand-green-light block mb-4 sm:mb-6">
                Mobilization Capability
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4" role="tablist" aria-label="Mobilization sectors">
                {SECTORS.map((sector, idx) => {
                  const isSelected = activeSector === idx;
                  return (
                    <button 
                      key={sector.name}
                      id={`sector-btn-${idx}`}
                      role="tab"
                      aria-selected={isSelected}
                      aria-controls="sector-panel"
                      onClick={() => setActiveSector(idx)}
                      onKeyDown={(e) => handleSectorKeyDown(e, idx)}
                      className={`group/sector text-left border p-3 sm:p-5 rounded-brand-md flex items-center justify-between transition-all duration-500 ease-out-expo active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none ${
                        isSelected
                          ? "border-brand-gold/60 bg-brand-gold/[0.03]"
                          : "border-white/5 bg-[#0a0a0a]/40 hover:border-white/20 hover:bg-white/[0.005]"
                      }`}
                    >
                      <span className={`font-body text-xs sm:text-sm font-semibold transition-colors duration-500 ${isSelected ? "text-brand-gold" : "text-white/60 group-hover/sector:text-white/90"}`}>
                        {sector.name}
                      </span>
                      <span className={`font-label font-black text-[10px] tracking-[0.25em] transition-colors duration-500 ${isSelected ? "text-brand-gold" : "text-brand-green-light/70 group-hover/sector:text-brand-green-light"}`}>
                        //{sector.code}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

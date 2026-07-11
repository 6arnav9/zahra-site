"use client";

import { useState } from "react";
import { useViewport } from "../../../hooks/useViewport";
import { Section, SectionHeader, Button } from "../../ui";

export default function AboutHero() {
  const { isPhone, isLandscape, isDesktop, navHeight } = useViewport();
  const [activePillar, setActivePillar] = useState<number>(0);

  // Keyboard navigation for Accordion Tabs
  const handlePillarKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      setActivePillar((index + 1) % 3);
      const nextTab = document.getElementById(`pillar-tab-${(index + 1) % 3}`);
      nextTab?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      setActivePillar((index - 1 + 3) % 3);
      const prevTab = document.getElementById(`pillar-tab-${(index - 1 + 3) % 3}`);
      prevTab?.focus();
    }
  };

  return (
    <Section
      bg="ink"
      showGrid
      gridSize="sm"
      showGlow
      glowPosition="center"
      glowColor="green"
      paddingSize="none"
      style={{ minHeight: isLandscape && isDesktop ? "100dvh" : isLandscape ? "auto" : "85dvh" }}
    >
      <div
        className="relative z-10 w-full flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-12 lg:px-20"
        style={{
          paddingTop: navHeight + 48,
          paddingBottom: isPhone ? 48 : 80,
        }}
      >
        <div
          className={`w-full flex gap-12 lg:gap-24 ${
            isDesktop ? "flex-row items-center" : "flex-col"
          }`}
        >
          {/* Left Content Column */}
          <div className={`flex flex-col items-start ${isDesktop ? "w-[43%]" : "w-full"}`}>
            <div className="animate-slide-up opacity-0">
              <SectionHeader
                isPhone={isPhone}
                isLandscape={isLandscape}
                eyebrow="Est. 2001 — Dubai"
                title={
                  <>
                    Mobilizing the workforce <br className="hidden sm:inline" />
                    <span className="text-brand-green-light"> that builds nations.</span>
                  </>
                }
                description="Al Zahra HR is a strategic partner to the world's most ambitious construction, engineering, and facilities management enterprises across the Middle East and Eastern Europe."
              />
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center w-full sm:w-auto animate-slide-up opacity-0" style={{ animationDelay: "150ms" }}>
              <Button href="/contact/hire" variant="primary" className="text-center w-full sm:w-auto">
                Partner with Us
              </Button>
              <Button href="/contact/partner" variant="outline" className="text-center w-full sm:w-auto">
                Submit Talent Request
              </Button>
            </div>
          </div>

          {/* Right Visual Accordion Column */}
          <div
            className={`relative ${
              isDesktop ? "w-[52%] flex-shrink-0 lg:aspect-[5/3.2]" : "w-full h-auto"
            } max-w-[600px] mx-auto`}
          >
            {/* Outer Decorative Gold Frame */}
            <div className="absolute inset-0 border border-brand-gold/20 translate-x-3 translate-y-3 rounded-brand-md pointer-events-none" />

            {/* Accordion Container */}
            <div className="relative w-full lg:h-full flex flex-col lg:flex-row gap-3 lg:gap-4">
              {[
                {
                  num: "01",
                  metric: "15,000+",
                  metricLabel: "Candidates Deployed",
                  title: "Sourcing Scale",
                  desc: "Direct access to our proprietary selection centers in Mumbai and Kathmandu. Vetted, ready-to-deploy personnel pools.",
                  details: ["Vetted Skills Hubs", "Direct Recruitment Rights", "Regional Talent Pools"]
                },
                {
                  num: "02",
                  metric: "100%",
                  metricLabel: "Compliance Check",
                  title: "Vetting & Integrity",
                  desc: "Rigorous vetting including bio-security clearance, medical screening, and verified trade testing at Al Zahra HQ.",
                  details: ["Credential Vetting", "Medical Diagnostics", "Practical Trade Tests"]
                },
                {
                  num: "03",
                  metric: "24 Days",
                  metricLabel: "Average Mobilization",
                  title: "Operational Speed",
                  desc: "High-speed logistics network to selection lists, visa approvals, and direct-to-site workforce deployment.",
                  details: ["Accelerated Visas", "Logistic Flight Sync", "Direct On-Site Handoff"]
                }
              ].map((pillar, idx) => {
                const isActive = activePillar === idx;
                return (
                  <button
                    key={idx}
                    id={`pillar-tab-${idx}`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`pillar-panel-${idx}`}
                    onClick={() => setActivePillar(idx)}
                    onKeyDown={(e) => handlePillarKeyDown(e, idx)}
                    className={`relative flex-1 text-left rounded-brand-md border bg-[#0a0a0a]/90 backdrop-blur-xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden flex flex-col justify-between p-4 sm:p-6 focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:outline-none animate-slide-up opacity-0 ${
                      isActive
                        ? "border-brand-gold/40 lg:flex-[2.2] flex-[2] bg-white/[0.02]"
                        : "border-white/5 lg:flex-[0.8] flex-[0.8] hover:border-white/20 hover:bg-white/[0.01]"
                    }`}
                    style={{
                      minHeight: isDesktop ? "auto" : isActive ? "180px" : "64px",
                      animationDelay: `${idx * 100 + 300}ms`
                    }}
                  >
                    {/* Accent Corner Line */}
                    {isActive && (
                      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-brand-gold/30 rounded-tr-brand-md pointer-events-none" />
                    )}

                    {/* Top Metric Header */}
                    <div className="flex justify-between items-start w-full">
                      {isActive ? (
                        <div className="animate-fade-in" id={`pillar-panel-${idx}`} role="tabpanel" aria-labelledby={`pillar-tab-${idx}`}>
                          <span className="font-mono text-brand-gold font-bold text-3xl tracking-tight block">
                            {pillar.metric}
                          </span>
                          <span className="text-[9px] font-label uppercase tracking-widest text-white/50">
                            {pillar.metricLabel}
                          </span>
                        </div>
                      ) : (
                        <span className="font-headline italic text-brand-gold/30 text-2xl font-bold">
                          {pillar.num}
                        </span>
                      )}
                      
                      {/* Status Pulse */}
                      {isActive && (
                        <span className="flex h-1.5 w-1.5 mt-2">
                          <span className="animate-ping absolute inline-flex h-1.5 w-1.5 rounded-full bg-brand-green-light opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-green-light"></span>
                        </span>
                      )}
                    </div>

                    {/* Middle Description */}
                    {isActive && (
                      <div className="mt-4 animate-fade-in flex-grow flex flex-col justify-center">
                        <p className="text-white/70 text-xs leading-relaxed max-w-[90%]">
                          {pillar.desc}
                        </p>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {pillar.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 text-white/60 uppercase tracking-[0.25em]">
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Footer Title */}
                    <div className="mt-4 w-full">
                      <div className="flex items-center gap-2">
                        {/* Active Arrow Indicator */}
                        {isActive && (
                          <span className="text-brand-green-light font-mono text-[9px] animate-pulse">→</span>
                        )}
                        <h4 className={`font-label uppercase tracking-[0.25em] text-[10px] transition-colors duration-300 ${isActive ? "text-white font-bold" : "text-white/60 group-hover:text-white/80"}`}>
                          {pillar.title}
                        </h4>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

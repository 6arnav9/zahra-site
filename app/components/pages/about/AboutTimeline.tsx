"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import { useViewport } from "../../../hooks/useViewport";

interface Milestone {
  id: string;
  year: string;
  tagline: string;
  headline: string;
  description: string;
  metric: string;
  metricLabel: string;
  accentColor: string;
  highlights: string[];
}

const MILESTONES: Milestone[] = [
  {
    id: "2001",
    year: "2001",
    tagline: "CORPORATE GENESIS",
    headline: "Inception of Al Zahra HR",
    description: "Founded in New Delhi with a singular vision: establishing an ethical, institutional bridge between skilled workforce hubs in Asia and key infrastructure sectors across the GCC.",
    metric: "2001",
    metricLabel: "FOUNDING YEAR",
    accentColor: "#D4AF37", // Gold
    highlights: [
      "Incorporated in New Delhi Regional Hub",
      "Pioneered Structured Skilled Trade Vetting",
      "First Strategic Enterprise Partnership",
    ],
  },
  {
    id: "2005",
    year: "2005",
    tagline: "ETHICAL EXPANSION",
    headline: "Regional Sourcing Hub Network",
    description: "Expanded operational presence across India, Nepal, and South Asia by opening fully owned, compliant recruitment and trade testing centers.",
    metric: "3+",
    metricLabel: "REGIONAL OFFICES",
    accentColor: "#E6A100", // Amber Gold
    highlights: [
      "Owned Technical Trade Assessment Hubs",
      "Direct Recruitment License Accreditation",
      "15,000+ Skilled Workers Mobilized",
    ],
  },
  {
    id: "2013",
    year: "2013",
    tagline: "GCC INFRASTRUCTURE",
    headline: "Tier-1 GCC Manpower Deployment",
    description: "Mobilized large-scale specialized workforce cohorts for landmark infrastructure, energy, and civil development projects across the UAE, Qatar, and Saudi Arabia.",
    metric: "50,000+",
    metricLabel: "SPECIALISTS DEPLOYED",
    accentColor: "#006837", // Emerald
    highlights: [
      "Turnkey Manpower Advisory for GCC Mega-Projects",
      "99.4% Contract Completion Rate",
      "Institutional Government Compliance Standard",
    ],
  },
  {
    id: "2019",
    year: "2019",
    tagline: "COMPLIANCE PIONEER",
    headline: "Zero-Fee Ethical Mobility Framework",
    description: "Formalized zero-cost worker recruitment protocols, setting the gold standard for fair labor standards and human rights compliance in regional mobility.",
    metric: "100%",
    metricLabel: "ETHICAL RECRUITMENT",
    accentColor: "#D4AF37", // Gold
    highlights: [
      "Employer-Pays Ethical Model Enforced",
      "International Human Rights Compliance Audit",
      "Zero-Fee Worker Protection Guarantee",
    ],
  },
  {
    id: "2023",
    year: "2023",
    tagline: "DIGITAL INNOVATION",
    headline: "Tech-Enabled Verification Platform",
    description: "Launched proprietary digital biometric vetting, background verification, and skill tracking systems to accelerate enterprise recruitment pipelines.",
    metric: "48 HRS",
    metricLabel: "VERIFICATION SPEED",
    accentColor: "#E6A100", // Amber
    highlights: [
      "Biometric Trade Vetting Pipeline",
      "Real-Time Employer Dashboard Tracking",
      "Automated Visa & Compliance Processing",
    ],
  },
  {
    id: "2025",
    year: "2025",
    tagline: "GLOBAL FOOTPRINT",
    headline: "European & Asian Operations Expansion",
    description: "Expanded recruitment networks into Eastern Europe and South-East Asia, servicing institutional logistics, healthcare, and engineering sectors globally.",
    metric: "12+",
    metricLabel: "SOCIETY CORRIDORS",
    accentColor: "#006837", // Emerald
    highlights: [
      "Eastern European Mobility Corridors",
      "Cross-Border Healthcare & Tech Trade Hubs",
      "Multi-National Institutional Partnerships",
    ],
  },
  {
    id: "2026",
    year: "2026",
    tagline: "SOVEREIGN LEADERSHIP",
    headline: "200,000+ Deployed Milestone",
    description: "Surpassed 200,000 total trade specialists and engineers deployed globally, cementing Al Zahra HR as a premier sovereign human capital advisory.",
    metric: "200,000+",
    metricLabel: "TOTAL MOBILIZED TALENT",
    accentColor: "#D4AF37", // Gold
    highlights: [
      "200,000+ Cumulative Global Deployments",
      "Tier-1 GCC Sovereign Infrastructure Advisory",
      "25-Year Operational Excellence Legacy",
    ],
  },
];

export default function AboutTimeline() {
  const { mounted, height, isPhone, isWatch, isPhoneLandscape } = useViewport();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  const isMobileLayout = isPhone || isWatch || isPhoneLandscape;
  const isShortViewport = height <= 740;

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.clientHeight;
      const windowHeight = window.innerHeight;

      // Scroll progress relative to section top & bottom
      const scrolled = windowHeight / 2 - rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / sectionHeight));
      setScrollProgress(progress);

      // Active milestone step calculation
      const step = Math.min(
        Math.floor(progress * MILESTONES.length),
        MILESTONES.length - 1
      );
      setActiveStep(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [mounted]);

  if (!mounted) return null;

  const activeMilestone = MILESTONES[activeStep];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white py-12 xs:py-20 sm:py-32 border-t border-white/10 overflow-hidden"
    >
      {/* ── AMBIENT BACKGROUND SHADER GRID & PARALLAX GLOW ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04] transition-transform duration-500 ease-out"
          style={{
            backgroundImage: `radial-gradient(${activeMilestone?.accentColor || "#D4AF37"} 1.2px, transparent 1.2px)`,
            backgroundSize: "44px 44px",
            transform: `translateY(${-scrollProgress * 120}px)`,
          }}
        />

        {/* Dynamic Ambient Role Light Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] xs:w-[750px] h-[320px] xs:h-[750px] rounded-full blur-[280px] transition-all duration-700 ease-out"
          style={{
            backgroundColor: activeMilestone?.accentColor || "#D4AF37",
            opacity: 0.14,
          }}
        />

        {/* Central Vertical Timeline Axis Line (Visible on ALL devices: mobile portrait, landscape, desktop, Apple Watch) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-white/10 -translate-x-1/2 z-10 pointer-events-none">
          <div
            className="w-full bg-brand-gold transition-all duration-300 shadow-[0_0_16px_rgba(212,175,55,0.95)]"
            style={{
              height: `${scrollProgress * 100}%`,
            }}
          />
        </div>
      </div>

      {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-3 xs:px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center mb-8 xs:mb-14 sm:mb-20">
        <span className="font-label font-bold uppercase tracking-[0.2em] text-brand-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] text-[8.5px] xs:text-[11px] sm:text-xs mb-1 xs:mb-2">
          Institutional Journey (2001 — 2026)
        </span>

        <h2 className="font-headline italic text-white font-bold tracking-[-0.02em] leading-tight text-lg xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
          25 Years of <span className="text-brand-gold font-normal">Excellence.</span>
        </h2>
      </div>

      {/* ── CONTINUOUS VERTICAL PARALLAX STREAM ───────────────────────── */}
      <div className="relative z-20 max-w-5xl mx-auto px-2.5 xs:px-6 sm:px-8 lg:px-12 flex flex-col gap-10 xs:gap-20 sm:gap-32">
        {MILESTONES.map((milestone, idx) => (
          <div
            id={`milestone-${milestone.id}`}
            key={milestone.id}
            className="scroll-mt-24 xs:scroll-mt-32"
          >
            <OverdriveParallaxMilestoneRow
              milestone={milestone}
              index={idx}
              isMobileLayout={isMobileLayout}
              isPhoneLandscape={isPhoneLandscape}
              isShortViewport={isShortViewport}
              isWatch={isWatch}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

{/* ── OVERDRIVE PARALLAX MILESTONE ROW COMPONENT ── */}
function OverdriveParallaxMilestoneRow({
  milestone,
  index,
  isMobileLayout,
  isPhoneLandscape,
  isShortViewport,
  isWatch,
}: {
  milestone: Milestone;
  index: number;
  isMobileLayout?: boolean;
  isPhoneLandscape?: boolean;
  isShortViewport?: boolean;
  isWatch?: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const [inViewProgress, setInViewProgress] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightSpot, setLightSpot] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!rowRef.current) return;
      const rect = rowRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Vertical distance from center of screen
      const distanceFromCenter = windowHeight / 2 - (rect.top + rect.height / 2);
      const normalized = Math.max(-1, Math.min(1, distanceFromCenter / (windowHeight / 2)));
      setInViewProgress(normalized);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isMobileLayout || isWatch || !rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    const rX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setLightSpot({ x: mouseXPercent, y: mouseYPercent });
  };

  const handleMouseEnter = () => !isMobileLayout && !isWatch && setIsHovered(true);
  const handleMouseLeave = () => {
    if (isMobileLayout || isWatch) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Parallax Y Translate offset (-35px to +35px based on scroll depth)
  const translateYOffset = isMobileLayout ? 0 : inViewProgress * -35;
  const isEven = index % 2 === 0;

  // APPLE WATCH LAYOUT
  if (isWatch) {
    return (
      <div className="relative w-full max-w-[120px] overflow-hidden rounded-brand-md bg-black/90 backdrop-blur-2xl border border-white/15 p-1.5 shadow-xl flex flex-col text-center items-center mx-auto shrink-0">
        <span
          className="font-headline font-bold italic text-[16px] leading-none mb-0.5"
          style={{ color: milestone.accentColor }}
        >
          {milestone.year}
        </span>
        <h3 className="font-headline text-[8.5px] font-bold text-white mb-1 leading-none">
          {milestone.headline}
        </h3>
        <div className="px-1 py-0.5 rounded bg-black/60 border border-brand-gold/30">
          <span className="font-mono text-[7.5px] font-bold text-brand-gold block">
            {milestone.metric}
          </span>
        </div>
      </div>
    );
  }

  // PHONE LANDSCAPE LAYOUT (iPhone 5 / SE / All Phone Landscape Viewports)
  if (isPhoneLandscape) {
    return (
      <div className="relative w-full max-w-[620px] overflow-hidden rounded-brand-lg bg-black/85 backdrop-blur-2xl border border-white/15 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.85)] mx-auto shrink-0">
        <div className="grid grid-cols-12 gap-3 items-center text-left">
          {/* Left Column: Big Year & Metric Stat */}
          <div className="col-span-4 flex flex-col items-center justify-center text-center p-2.5 rounded-brand-md bg-black/60 border border-white/10">
            <span
              className="font-headline font-bold italic text-3xl xs:text-4xl leading-none mb-1"
              style={{ color: milestone.accentColor }}
            >
              {milestone.year}
            </span>
            <span className="font-mono text-[8px] xs:text-[9px] font-bold uppercase tracking-wider text-brand-gold">
              {milestone.tagline}
            </span>
            <div className="mt-2 pt-1 border-t border-white/10 w-full">
              <span className="font-mono font-bold text-xs xs:text-sm text-white block">
                {milestone.metric}
              </span>
              <span className="text-[7.5px] xs:text-[8.5px] text-white/70 uppercase">
                {milestone.metricLabel}
              </span>
            </div>
          </div>

          {/* Right Column: Narrative & Key Achievements */}
          <div className="col-span-8 flex flex-col text-left">
            <h3 className="font-headline italic text-xs xs:text-sm font-bold text-white mb-1 leading-tight">
              {milestone.headline}
            </h3>
            <p className="text-white/90 font-body text-[9px] xs:text-[10px] leading-snug mb-1.5 line-clamp-2">
              {milestone.description}
            </p>

            <div className="p-1.5 rounded-brand-md bg-black/60 border border-white/10 shadow-inner">
              <div className="grid grid-cols-1 gap-0.5">
                {milestone.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center text-[8px] xs:text-[9px] text-white/90">
                    <span className="font-bold mr-1 text-brand-gold">&#10003;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={rowRef}
      className={`relative grid grid-cols-1 ${
        isMobileLayout ? "gap-3 xs:gap-4" : "sm:grid-cols-12 gap-8 items-center"
      }`}
    >
      {/* Main Milestone Card */}
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`relative overflow-hidden rounded-brand-lg bg-black/80 backdrop-blur-2xl border border-white/15 hover:border-brand-gold/60 shadow-[0_24px_60px_rgba(0,0,0,0.85)] group transition-all duration-300 ease-out ${
          isMobileLayout ? "p-3 xs:p-4" : "sm:col-span-12 p-6 lg:p-8 xl:p-10"
        }`}
        style={{
          transform: isMobileLayout
            ? undefined
            : `perspective(1000px) translateY(${translateYOffset}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
                isHovered ? "scale3d(1.01, 1.01, 1.01)" : "scale3d(1, 1, 1)"
              }`,
          transition: isHovered ? "transform 0.15s ease-out" : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {/* Dynamic Specular Light Sweep Spotlight */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle 450px at ${lightSpot.x}% ${lightSpot.y}%, rgba(212, 175, 55, 0.25), transparent 70%)`,
          }}
        />

        <div className="relative z-20 grid grid-cols-1 sm:grid-cols-12 gap-3 xs:gap-4 sm:gap-6 items-center">
          {/* Left/Right Column Alignment according to alternation */}
          <div
            className={`sm:col-span-4 flex flex-col items-center justify-center text-center p-2.5 xs:p-4 rounded-brand-md bg-black/60 border border-white/10 ${
              isEven ? "sm:order-1" : "sm:order-2"
            }`}
          >
            <span
              className={`font-headline font-bold italic leading-none mb-0.5 xs:mb-1 ${
                isShortViewport
                  ? "text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                  : "text-3xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl"
              }`}
              style={{ color: milestone.accentColor }}
            >
              {milestone.year}
            </span>
            <span className="font-mono text-[9px] xs:text-xs font-bold uppercase tracking-widest text-brand-gold mb-1.5 xs:mb-3">
              {milestone.tagline}
            </span>
            <div className="w-full pt-1.5 xs:pt-3 border-t border-white/10">
              <span className="font-mono font-bold text-sm xs:text-lg sm:text-xl lg:text-2xl text-white block">
                {milestone.metric}
              </span>
              <span className="text-[8.5px] xs:text-[10px] sm:text-xs text-white/70 uppercase tracking-wider">
                {milestone.metricLabel}
              </span>
            </div>
          </div>

          <div
            className={`sm:col-span-8 flex flex-col text-left ${
              isEven ? "sm:order-2" : "sm:order-1"
            }`}
          >
            <div className="flex items-center justify-between mb-1 xs:mb-2">
              <h3
                className={`font-headline italic font-bold text-white transition-colors duration-300 ${
                  isShortViewport
                    ? "text-sm xs:text-lg sm:text-xl md:text-2xl lg:text-3xl"
                    : "text-base xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                }`}
              >
                {milestone.headline}
              </h3>
            </div>

            <p
              className={`text-white/90 font-body leading-relaxed mb-2 xs:mb-3 [text-wrap:pretty] ${
                isShortViewport ? "text-[10.5px] xs:text-xs lg:text-sm" : "text-xs xs:text-sm lg:text-base"
              }`}
            >
              {milestone.description}
            </p>

            <div
              className={`rounded-brand-md bg-black/60 border border-white/10 shadow-inner ${
                isShortViewport ? "p-2.5 xs:p-3 mb-1.5 xs:mb-2" : "p-2.5 xs:p-4 mb-2 xs:mb-3"
              }`}
            >
              <h4
                className="font-mono text-[9px] xs:text-xs font-bold uppercase tracking-wider mb-1 xs:mb-2"
                style={{ color: milestone.accentColor }}
              >
                KEY MILESTONE ACHIEVEMENTS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 xs:gap-2">
                {milestone.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center text-[10.5px] xs:text-xs text-white/80">
                    <span className="font-bold mr-1.5 xs:mr-2 text-brand-gold">&#10003;</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

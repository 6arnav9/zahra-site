"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useViewport } from "../../../hooks/useViewport";
import { Section, Button } from "../../ui";

const HERO_BACKGROUND_IMAGE =
  "https://images.unsplash.com/photo-1600965581129-eef8a214ec9d?q=80&w=2070&auto=format&fit=crop";

export default function AboutHero() {
  const { navHeight, isWatch, isPhone, isPhoneLandscape, isTabletLandscape, isLandscape, height } = useViewport();
  const [scrollY, setScrollY] = useState<number>(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  // Reduced motion preference tracking
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Hardware-accelerated parallax scroll tracking
  useEffect(() => {
    if (prefersReducedMotion) return;
    let animationFrameId: number;

    const handleScroll = () => {
      animationFrameId = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  // Parallax transform calculations (bypassed if user prefers reduced motion)
  const bgTranslateY = prefersReducedMotion ? 0 : scrollY * 0.35;
  const bgScale = prefersReducedMotion ? 1 : 1 + Math.min(scrollY * 0.0004, 0.15);
  const contentTranslateY = prefersReducedMotion ? 0 : scrollY * 0.12;
  const contentOpacity = prefersReducedMotion ? 1 : Math.max(1 - scrollY / 700, 0.15);

  const isShortScreen = height < 900;

  // Watch Viewport Specific Layout (Apple Watch Series 1-9 & Ultra)
  if (isWatch) {
    return (
      <section className="relative w-full bg-brand-ink text-white min-h-[100dvh] flex flex-col justify-center items-center px-1.5 py-2 text-center overflow-hidden">
        {/* Background Image Layer for Apple Watch */}
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <Image
            src={HERO_BACKGROUND_IMAGE}
            alt="Al Zahra Global Infrastructure Headquarters"
            fill
            priority
            className="object-cover object-center opacity-60"
            unoptimized
          />
          <div className="absolute inset-0 bg-black/60 z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-brand-ink z-10" />
        </div>

        {/* Watch Content Container */}
        <div className="relative z-20 flex flex-col items-center max-w-[155px] my-auto">
          <h1 className="font-headline italic text-[11px] font-bold text-white mb-1 leading-tight [text-wrap:balance]">
            Architects of <span className="text-brand-gold">Human Infrastructure</span>
          </h1>
          <p className="text-[8.5px] text-white/90 leading-tight line-clamp-2 mb-1.5 max-w-[135px]">
            25+ years of elite global workforce mobilization across GCC & EU.
          </p>

          {/* Watch Micro Stat Badges */}
          <div className="flex gap-1 mb-2">
            <span className="text-[7.5px] font-mono font-bold text-brand-gold bg-black/80 px-1 py-0.5 rounded border border-white/10 shadow-sm">
              25+ YRS
            </span>
            <span className="text-[7.5px] font-mono font-bold text-brand-gold bg-black/80 px-1 py-0.5 rounded border border-white/10 shadow-sm">
              200K+
            </span>
          </div>

          <Button href="/contact/hire" size="sm" className="w-full text-[8.5px] py-1 h-6 shadow-md tracking-wider">
            Explore
          </Button>
        </div>
      </section>
    );
  }

  return (
    <Section
      bg="ink"
      showGrid
      gridSize="sm"
      showGlow
      glowPosition="center"
      glowColor="gold"
      paddingSize="none"
      className="relative overflow-hidden w-full flex flex-col justify-center"
      style={{
        minHeight: "100dvh",
      }}
    >
      {/* ─── Smooth Parallax Background Media Layer ────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 w-full h-full transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(0, ${bgTranslateY}px, 0) scale(${bgScale})`,
            willChange: "transform",
          }}
        >
          <Image
            src={HERO_BACKGROUND_IMAGE}
            alt="Al Zahra Global Infrastructure Headquarters"
            fill
            priority
            className="object-cover object-center opacity-80"
            unoptimized
          />
        </div>

        {/* Multi-Layered Soft Vignette Gradients for Luxury Aesthetic & High Text Contrast */}
        <div className="absolute inset-0 bg-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-brand-ink z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

        {/* Floating Ambient Parallax Glow Orbs (Gold & Al Zahra Emerald) */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] max-w-5xl h-[50dvh] rounded-full blur-[160px] bg-brand-gold/20 transition-transform duration-100 ease-out z-10 pointer-events-none"
          style={{
            transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))`,
            willChange: "transform",
          }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-[50vw] max-w-3xl h-[40dvh] rounded-full blur-[180px] bg-brand-green/25 transition-transform duration-100 ease-out z-10 pointer-events-none"
          style={{
            transform: `translate3d(0, ${-scrollY * 0.15}px, 0)`,
            willChange: "transform",
          }}
        />
      </div>

      {/* ─── Hero Content Container (Custom Viewport Layouts for Phone Landscape, Tablet Landscape & Portrait) ─── */}
      <div
        className="relative z-20 w-full flex-grow flex flex-col justify-center items-center max-w-7xl 2xl:max-w-[1500px] mx-auto px-4 xs:px-6 sm:px-12 lg:px-20 h-full min-h-[100dvh]"
        style={{
          paddingTop: isPhoneLandscape
            ? (navHeight || 44) + 4
            : isTabletLandscape
            ? (navHeight || 56) + 8
            : isShortScreen
            ? (navHeight || 64) + 6
            : (navHeight || 64) + 16,
          paddingBottom: isPhoneLandscape ? 6 : isTabletLandscape ? 12 : isShortScreen ? 12 : 36,
          transform: `translate3d(0, ${contentTranslateY}px, 0)`,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        {isPhoneLandscape ? (
          /* ─── Dedicated Phone Landscape Layout (Guaranteed 100% Viewport Fit for 320px–500px Height) ─── */
          <div className="flex flex-col items-center text-center w-full max-w-xl mx-auto my-auto py-1">
            {/* Display Headline */}
            <h1 className="font-headline italic text-lg xs:text-xl sm:text-2xl text-white font-bold tracking-[-0.02em] leading-tight mb-1.5 [text-wrap:balance]">
              Architects of <span className="text-brand-gold font-normal">Human Infrastructure.</span>
            </h1>

            {/* Narrative Paragraph */}
            <p className="text-white/90 font-body text-xs leading-snug line-clamp-2 mb-3 max-w-[46ch]">
              Quarter-century of monumental civil engineering, luxury hospitality, and healthcare workforce mobilization across the GCC & EU.
            </p>

            {/* Action Buttons Side-by-Side with Generous Padding & Readable 12px Text */}
            <div className="flex flex-row gap-3 items-center justify-center w-full max-w-md mb-3">
              <Button
                href="/contact/hire"
                variant="primary"
                size="sm"
                className="shadow-md text-center flex-1 px-4 py-2 text-xs h-8"
              >
                Explore Governance
              </Button>
              <Button
                href="/contact/partner"
                variant="outline"
                size="sm"
                className="shadow-md text-center flex-1 px-4 py-2 text-xs h-8 border-white/20 hover:border-brand-gold/60"
              >
                Request Deployment
              </Button>
            </div>

            {/* Horizontal 3-Stat Pill Bar at Bottom */}
            <div className="grid grid-cols-3 gap-2 w-full pt-2 border-t border-white/10">
              {[
                { metric: "25+ Yrs", label: "Governance" },
                { metric: "200K+", label: "Mobilized" },
                { metric: "3 Hubs", label: "Global" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="px-2 py-1 rounded bg-black/60 backdrop-blur-xl border border-white/10 flex flex-col items-center text-center"
                >
                  <span className="font-mono font-bold text-xs text-brand-gold tracking-tight tabular-nums">
                    {stat.metric}
                  </span>
                  <span className="font-label font-bold text-[8.5px] uppercase tracking-wider text-white/80">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : isTabletLandscape ? (
          /* ─── Tablet Landscape 2-Column Split Viewport (Fits 100% On-Screen for Tablets 520px–900px Height) ─── */
          <div className="grid grid-cols-12 gap-6 lg:gap-8 items-center w-full my-auto py-2">
            {/* Left Column: Narrative & Action CTAs */}
            <div className="col-span-7 flex flex-col items-start text-left pr-2">
              <h1 className="font-headline italic text-2xl sm:text-4xl lg:text-5xl text-white font-bold tracking-[-0.02em] leading-tight mb-2 sm:mb-4 [text-wrap:balance]">
                Architects of <span className="text-brand-gold font-normal">Human Infrastructure.</span>
              </h1>

              <p className="text-white/90 font-body text-xs sm:text-sm lg:text-base leading-relaxed line-clamp-3 sm:line-clamp-4 mb-4 sm:mb-6 max-w-[50ch]">
                For a quarter-century, Al Zahra HR has operated at the nexus of monumental civil engineering, luxury hospitality, and healthcare—mobilizing elite workforce teams across the Middle East and Eastern Europe with unyielding precision.
              </p>

              {/* Action Buttons with Generous Responsive Padding & Zero-Overflow Wrapping */}
              <div className="flex flex-wrap lg:flex-nowrap gap-2.5 sm:gap-3 items-center w-full max-w-full">
                <Button
                  href="/contact/hire"
                  variant="primary"
                  size="md"
                  className="shadow-lg text-center flex-1 min-w-[140px] px-3.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.14em]"
                >
                  Explore Governance
                </Button>
                <Button
                  href="/contact/partner"
                  variant="outline"
                  size="md"
                  className="shadow-lg text-center flex-1 min-w-[140px] px-3.5 sm:px-4 lg:px-6 py-2 sm:py-2.5 text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.14em] border-white/20 hover:border-brand-gold/60"
                >
                  Request Deployment
                </Button>
              </div>
            </div>

            {/* Right Column: 3 Vertical Glass Metric Cards */}
            <div className="col-span-5 flex flex-col gap-2.5 sm:gap-3.5 pl-3 border-l border-white/10">
              {[
                {
                  metric: "25+ Years",
                  label: "Executive Governance",
                  desc: "Quarter-century of trusted regional authority",
                },
                {
                  metric: "200,000+",
                  label: "Specialists Mobilized",
                  desc: "Civil build, hospitality & healthcare personnel",
                },
                {
                  metric: "3 Global Hubs",
                  label: "Owned Sourcing Networks",
                  desc: "Direct ethical recruitment rights in Asia & EU",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-4 rounded-brand-md bg-black/60 backdrop-blur-xl border border-white/10 flex flex-col items-start hover:border-brand-gold/50 transition-colors duration-300 shadow-md group"
                >
                  <span className="font-mono font-bold text-base sm:text-xl text-brand-gold tracking-tight tabular-nums group-hover:text-white transition-colors duration-300">
                    {stat.metric}
                  </span>
                  <span className="font-label font-bold text-[9px] sm:text-[10.5px] uppercase tracking-wider text-white/90 mt-0.5">
                    {stat.label}
                  </span>
                  <span className="text-white/70 font-body text-xs leading-normal hidden sm:block mt-1">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* ─── Portrait Viewport (Mobile, Tablet, Desktop, 4K Display) ─── */
          <div className="max-w-4xl 2xl:max-w-5xl flex flex-col items-center text-center sm:items-start sm:text-left w-full my-auto">
            {/* Luxury Display Headline */}
            <h1 className="font-headline italic text-2xl xs:text-3xl sm:text-4xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-white font-bold tracking-[-0.02em] leading-[1.08] mb-2 sm:mb-3 lg:mb-6 drop-shadow-2xl [text-wrap:balance]">
              Architects of <br className="hidden sm:inline" />
              <span className="text-brand-gold font-normal drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">Human Infrastructure.</span>
            </h1>

            {/* Refined Narrative Paragraph */}
            <p className="text-white/90 font-body text-xs xs:text-sm sm:text-base lg:text-xl 2xl:text-2xl leading-[1.5] sm:leading-[1.6] max-w-[65ch] mb-2.5 sm:mb-4 lg:mb-8 drop-shadow-md [text-wrap:pretty]">
              For a quarter-century, Al Zahra HR has operated at the nexus of monumental civil engineering, luxury hospitality, and healthcare—mobilizing elite workforce teams across the Middle East and Eastern Europe with unyielding precision.
            </p>

            {/* Primary Action Buttons (Centered on Small Phones in Portrait, Left-Aligned on Desktop) */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 lg:gap-4 items-center justify-center sm:justify-start w-full sm:w-auto mb-2.5 sm:mb-4 lg:mb-12">
              <Button
                href="/contact/hire"
                variant="primary"
                size={isShortScreen || isPhone ? "sm" : "lg"}
                className="shadow-2xl text-center w-full max-w-[280px] sm:max-w-none sm:w-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3.5 text-xs sm:text-sm lg:text-base tracking-[0.12em] sm:tracking-[0.16em] lg:tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Explore Governance
              </Button>
              <Button
                href="/contact/partner"
                variant="outline"
                size={isShortScreen || isPhone ? "sm" : "lg"}
                className="shadow-2xl text-center w-full max-w-[280px] sm:max-w-none sm:w-auto px-4 xs:px-5 sm:px-6 lg:px-8 py-2 sm:py-2.5 lg:py-3.5 text-xs sm:text-sm lg:text-base tracking-[0.12em] sm:tracking-[0.16em] lg:tracking-[0.2em] border-white/20 hover:border-brand-gold/60 hover:bg-brand-gold/5 transition-all duration-300"
              >
                Request Deployment
              </Button>
            </div>

            {/* Luxury Metric Highlights Bar */}
            <div className="grid grid-cols-3 gap-2 xs:gap-3 sm:gap-5 lg:gap-10 w-full pt-2 sm:pt-3 lg:pt-8 border-t border-white/10">
              {[
                {
                  metric: "25+ Years",
                  label: "Governance",
                  fullLabel: "Executive Governance",
                  desc: "Quarter-century of trusted regional authority",
                },
                {
                  metric: "200,000+",
                  label: "Mobilized",
                  fullLabel: "Specialists Mobilized",
                  desc: "Civil build, hospitality & healthcare personnel",
                },
                {
                  metric: "3 Hubs",
                  label: "Global Hubs",
                  fullLabel: "Owned Sourcing Networks",
                  desc: "Direct ethical recruitment rights in Asia & EU",
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden flex flex-col items-center sm:items-start text-center sm:text-left p-2 xs:p-2.5 sm:p-3.5 lg:p-5 rounded-brand-md bg-black/50 backdrop-blur-xl border border-white/10 shadow-xl hover:border-brand-gold/60 hover:bg-black/70 hover:-translate-y-1 hover:scale-[1.015] active:scale-[0.99] hover:shadow-[0_12px_30px_rgba(212,175,55,0.15)] transition-all duration-500 ease-out group"
                  style={
                    prefersReducedMotion
                      ? undefined
                      : {
                          animation: "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
                          animationDelay: `${idx * 150}ms`,
                        }
                  }
                >
                  {/* Subtle Glass Light Ray Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out pointer-events-none" />

                  <span className="font-mono font-bold text-sm xs:text-base sm:text-xl lg:text-3xl text-brand-gold tracking-tight tabular-nums group-hover:text-white group-hover:scale-105 transform origin-left transition-all duration-300 drop-shadow-[0_0_15px_rgba(212,175,55,0.25)]">
                    {stat.metric}
                  </span>
                  <span className="font-label font-bold text-[8.5px] xs:text-[9.5px] sm:text-[10px] uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/90 mt-0.5 sm:mt-1 mb-0.5">
                    <span className="sm:hidden">{stat.label}</span>
                    <span className="hidden sm:inline">{stat.fullLabel}</span>
                  </span>
                  <span className="text-white/70 font-body text-xs sm:text-sm leading-tight sm:leading-snug hidden xs:line-clamp-2 sm:line-clamp-none">
                    {stat.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Scroll-Down Hint (Only displays when height budget allows) ─ */}
      {!isLandscape && height >= 780 && (
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none transition-opacity duration-300"
          style={{ opacity: Math.max(1 - scrollY / 200, 0) }}
        >
          <span className="font-label font-black text-[9px] uppercase tracking-[0.3em] text-white/50">
            SCROLL TO EXPLORE
          </span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex justify-center p-1 backdrop-blur-sm">
            <div className="w-1.5 h-2 rounded-full bg-brand-gold animate-pulse" />
          </div>
        </div>
      )}
    </Section>
  );
}

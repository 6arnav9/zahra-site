"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Section, Button, AnimatedCounter } from "../../ui";
import { Globe, ShieldCheck, Zap, CheckCircle2, ChevronRight } from "lucide-react";

export default function AboutCTA() {
  const sectionRef = useRef<HTMLElement>(null);

  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // 1. Accessibility Media Query Check & Viewport Intersection Observer
  useEffect(() => {
    if (typeof window === "undefined") return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    // Viewport Intersection Observer for triggering counters & staggered reveals
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  // 2. Hardware-Accelerated 60fps Scroll-Driven Parallax Tracking
  useEffect(() => {
    if (prefersReducedMotion) return;

    let rafId: number;

    const handleScroll = () => {
      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) return;
        const rect = sectionRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate normalized position relative to viewport (-1 when above, 0 at center, 1 when below)
        const progress = (rect.top - viewportHeight / 2) / (viewportHeight / 2);
        setScrollY(progress);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Smooth Y-offset translate factor for parallax background (moves 55px across viewport scroll)
  const bgTranslateY = prefersReducedMotion ? 0 : scrollY * -55;

  return (
    <Section
      ref={sectionRef}
      bg="ink"
      showGrid
      gridSize="md"
      showGlow
      glowPosition="right"
      glowColor="green"
      paddingSize="none"
      className="border-t border-white/10 relative overflow-hidden"
    >
      {/* 🌌 SCROLL-DRIVEN PARALLAX ARCHITECTURAL BACKGROUND */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="absolute inset-[-12%] transition-transform duration-75 ease-out will-change-transform"
          style={{
            transform: `translate3d(0, ${bgTranslateY}px, 0) scale(1.12)`,
          }}
        >
          <Image
            src="/about-cta-bg.jpg"
            alt="Al Zahra Architectural Heritage Skyline"
            fill
            sizes="100vw"
            priority={false}
            className="object-cover object-center opacity-35 mix-blend-luminosity brightness-90 contrast-125"
          />
        </div>

        {/* Multi-layered Cinematic Gradients for Pristine Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-ink via-brand-ink/80 to-brand-ink/90 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-ink via-transparent to-brand-ink/95 z-10" />
        <div className="absolute inset-0 bg-radial-at-c from-brand-green/10 via-transparent to-transparent z-10" />
      </div>

      {/* 🏛️ FOREGROUND CONTENT WITH STAGGERED REVEALS */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-16 sm:py-28 lg:py-32 max-[350px]:py-3 max-[260px]:py-1.5 max-[260px]:px-1.5 max-h-[600px]:py-3 [@media(orientation:landscape)_and_(max-height:500px)]:py-3 [@media(orientation:landscape)_and_(max-height:500px)]:px-4 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:py-10 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:px-8 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:py-12 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 [@media(orientation:landscape)_and_(max-height:500px)]:grid-cols-12 gap-10 sm:gap-12 lg:gap-14 xl:gap-16 max-[350px]:gap-2.5 max-[260px]:gap-1.5 max-h-[600px]:gap-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:gap-3 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:gap-6 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:gap-8 items-center">
          
          {/* Left Column: Narrative & High-Status Statement */}
          <div className="lg:col-span-7 [@media(orientation:landscape)_and_(max-height:500px)]:col-span-6 text-left">
            
            {/* Headline with Reveal Animation */}
            <h2
              className={`font-headline italic text-3xl sm:text-6xl lg:text-7xl max-[350px]:text-[1.25rem] max-[260px]:text-[0.88rem] max-h-[600px]:text-[1.25rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[1.1rem] sm:[@media(orientation:landscape)_and_(max-height:500px)]:text-[1.25rem] [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:!text-[2.65rem] [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:text-4xl lg:[@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:text-5xl text-white font-bold leading-[1.12] sm:leading-[1.08] [@media(orientation:landscape)_and_(max-height:500px)]:leading-tight [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:leading-[1.12] mb-6 max-[350px]:mb-1.5 max-[260px]:mb-1 max-h-[600px]:mb-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:mb-1 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:mb-4 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:mb-4 [letter-spacing:-0.02em] [text-wrap:balance] break-words transition-all duration-700 ease-out-expo ${
                prefersReducedMotion || isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              Ready to scale your next landmark project with{" "}
              <span className="text-brand-gold">
                vetted global talent?
              </span>
            </h2>

            {/* Paragraph with Staggered Reveal Animation */}
            <p
              className={`font-body text-white/80 text-base sm:text-lg max-[350px]:text-[0.7rem] max-[260px]:text-[0.58rem] max-h-[600px]:text-[0.7rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.68rem] [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:text-[0.95rem] [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:text-base leading-relaxed max-[350px]:leading-tight max-[260px]:leading-tight max-h-[600px]:leading-tight [@media(orientation:landscape)_and_(max-height:500px)]:leading-snug max-w-[62ch] mb-8 max-[350px]:mb-2 max-[260px]:mb-1 max-h-[600px]:mb-2 [@media(orientation:landscape)_and_(max-height:500px)]:mb-1.5 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:mb-5 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:mb-6 [text-wrap:pretty] transition-all duration-700 delay-150 ease-out-expo ${
                prefersReducedMotion || isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              From civil infrastructure to large-scale facility management, we source, vet, and mobilize thousands of skilled personnel across international borders with uncompromised operational integrity.
            </p>

            {/* Micro-metrics with Dynamic Animated Counter & Staggered Reveal */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-3 max-[350px]:grid-cols-3 max-h-[600px]:grid-cols-3 [@media(orientation:landscape)_and_(max-height:500px)]:grid-cols-3 gap-6 max-[350px]:gap-1 max-[260px]:gap-0.5 max-h-[600px]:gap-1 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1 pt-6 max-[350px]:pt-1.5 max-[260px]:pt-1 max-h-[600px]:pt-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:pt-1 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:pt-4 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:pt-4 mt-8 max-[350px]:mt-1.5 max-[260px]:mt-1 max-h-[600px]:mt-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:mt-1 [@media(min-width:740px)_and_(max-width:775px)_and_(orientation:portrait)]:mt-5 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:mt-6 border-t border-white/10 transition-all duration-700 delay-300 ease-out-expo ${
                prefersReducedMotion || isInView
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Metric 1 */}
              <div className="flex items-start gap-3.5 max-[350px]:gap-1 max-[260px]:gap-0.5 max-h-[600px]:gap-1 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1 group/metric">
                <div className="p-1.5 max-[350px]:p-0.5 max-[260px]:p-[1px] max-h-[600px]:p-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-0.5 rounded-full bg-brand-green/15 text-brand-green-light shrink-0 mt-0.5 group-hover/metric:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <AnimatedCounter
                      target={100}
                      suffix="+"
                      isActive={isInView}
                      fontSize="1.4rem"
                      className="font-mono text-white font-bold leading-none tracking-tight max-[350px]:!text-[0.8rem] max-[260px]:!text-[0.65rem] max-h-[600px]:!text-[0.8rem] [@media(orientation:landscape)_and_(max-height:500px)]:!text-[0.8rem]"
                    />
                  </div>
                  <span className="font-label text-[0.7rem] max-[350px]:text-[0.52rem] max-[260px]:text-[0.42rem] max-h-[600px]:text-[0.52rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.52rem] tracking-[0.18em] max-[350px]:tracking-[0.06em] max-[260px]:tracking-tight max-h-[600px]:tracking-[0.06em] [@media(orientation:landscape)_and_(max-height:500px)]:tracking-[0.06em] text-white/70 uppercase font-semibold block mt-1.5 max-[350px]:mt-0.5 max-[260px]:mt-[1px] max-h-[600px]:mt-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:mt-0.5">
                    Enterprise Clients
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-start gap-3.5 max-[350px]:gap-1 max-[260px]:gap-0.5 max-h-[600px]:gap-1 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1 group/metric">
                <div className="p-1.5 max-[350px]:p-0.5 max-[260px]:p-[1px] max-h-[600px]:p-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-0.5 rounded-full bg-brand-gold/15 text-brand-gold shrink-0 mt-0.5 group-hover/metric:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5" />
                </div>
                <div>
                  <div className="flex items-baseline">
                    <AnimatedCounter
                      target={14}
                      suffix="-Day"
                      isActive={isInView}
                      fontSize="1.4rem"
                      className="font-mono text-brand-gold font-bold leading-none tracking-tight max-[350px]:!text-[0.8rem] max-[260px]:!text-[0.65rem] max-h-[600px]:!text-[0.8rem] [@media(orientation:landscape)_and_(max-height:500px)]:!text-[0.8rem]"
                    />
                  </div>
                  <span className="font-label text-[0.7rem] max-[350px]:text-[0.52rem] max-[260px]:text-[0.42rem] max-h-[600px]:text-[0.52rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.52rem] tracking-[0.18em] max-[350px]:tracking-[0.06em] max-[260px]:tracking-tight max-h-[600px]:tracking-[0.06em] [@media(orientation:landscape)_and_(max-height:500px)]:tracking-[0.06em] text-white/70 uppercase font-semibold block mt-1.5 max-[350px]:mt-0.5 max-[260px]:mt-[1px] max-h-[600px]:mt-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:mt-0.5">
                    Mobilization
                  </span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-start gap-3.5 max-[350px]:gap-1 max-[260px]:gap-0.5 max-h-[600px]:gap-1 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1 group/metric">
                <div className="p-1.5 max-[350px]:p-0.5 max-[260px]:p-[1px] max-h-[600px]:p-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-0.5 rounded-full bg-brand-green/15 text-brand-green-light shrink-0 mt-0.5 group-hover/metric:scale-110 transition-transform duration-300">
                  <CheckCircle2 className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5" />
                </div>
                <div>
                  <span className="font-mono text-[1.4rem] max-[350px]:text-[0.8rem] max-[260px]:text-[0.65rem] max-h-[600px]:text-[0.8rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.8rem] text-white font-bold leading-none tracking-tight block">
                    Zero
                  </span>
                  <span className="font-label text-[0.7rem] max-[350px]:text-[0.52rem] max-[260px]:text-[0.42rem] max-h-[600px]:text-[0.52rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.52rem] tracking-[0.18em] max-[350px]:tracking-[0.06em] max-[260px]:tracking-tight max-h-[600px]:tracking-[0.06em] [@media(orientation:landscape)_and_(max-height:500px)]:tracking-[0.06em] text-white/70 uppercase font-semibold block mt-1.5 max-[350px]:mt-0.5 max-[260px]:mt-[1px] max-h-[600px]:mt-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:mt-0.5">
                    Breaches
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Action Card & Strategic Commitment Pillars */}
          <div
            className={`lg:col-span-5 [@media(orientation:landscape)_and_(max-height:500px)]:col-span-6 transition-all duration-700 delay-400 ease-out-expo ${
              prefersReducedMotion || isInView
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative rounded-2xl bg-white/[0.03] border border-white/10 p-7 sm:p-9 max-[350px]:p-2.5 max-[260px]:p-1.5 max-h-[600px]:p-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-2.5 [@media(min-width:1020px)_and_(max-width:1140px)_and_(max-height:775px)_and_(orientation:landscape)]:p-7 backdrop-blur-md shadow-2xl overflow-hidden group hover:border-brand-green/50 transition-all duration-500">
              
              {/* Ambient Background Glow inside Card */}
              <div className="absolute -top-24 -right-24 w-56 h-56 bg-brand-green/20 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-green/35 transition-all duration-700" />
              <div className="absolute -bottom-24 -left-24 w-56 h-56 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <span className="font-label text-[0.7rem] max-[350px]:text-[0.52rem] max-[260px]:text-[0.45rem] max-h-[600px]:text-[0.52rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.52rem] tracking-[0.25em] max-[350px]:tracking-[0.1em] max-[260px]:tracking-tight max-h-[600px]:tracking-[0.1em] [@media(orientation:landscape)_and_(max-height:500px)]:tracking-[0.1em] text-brand-gold uppercase font-bold block mb-1.5 max-[350px]:mb-0.5 max-[260px]:mb-[2px] max-h-[600px]:mb-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:mb-0.5">
                  Bespoke Consultation
                </span>
                <h3 className="font-display text-xl sm:text-2xl max-[350px]:text-xs max-[260px]:text-[0.7rem] max-h-[600px]:text-xs [@media(orientation:landscape)_and_(max-height:500px)]:text-xs text-white font-bold mb-7 max-[350px]:mb-2 max-[260px]:mb-1 max-h-[600px]:mb-2 [@media(orientation:landscape)_and_(max-height:500px)]:mb-1.5 [text-wrap:balance]">
                  Mobilize Your Workforce
                </h3>

                {/* Primary & Secondary Action Buttons */}
                <div className="flex flex-col gap-3.5 mb-7 max-[375px]:gap-2 max-[375px]:mb-3 max-[350px]:gap-1.5 max-[260px]:gap-1 max-[350px]:mb-2 max-[260px]:mb-1 [@media(orientation:landscape)_and_(max-height:500px)]:grid [@media(orientation:landscape)_and_(max-height:500px)]:grid-cols-2 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:mb-1.5">
                  <Button
                    href="/contact"
                    variant="primary"
                    size="md"
                    fullWidthOnMobile
                    className="w-full justify-center shadow-lg py-3.5 px-6 text-xs sm:text-sm tracking-[0.18em] max-[375px]:py-2.5 max-[375px]:px-3.5 max-[375px]:text-[0.68rem] max-[375px]:tracking-[0.06em] max-[350px]:py-2 max-[350px]:px-2.5 max-[350px]:text-[0.62rem] max-[350px]:tracking-[0.03em] max-[260px]:py-1 max-[260px]:px-1.5 max-[260px]:text-[0.55rem] max-[260px]:tracking-tight max-[260px]:min-h-[26px] [@media(orientation:landscape)_and_(max-height:500px)]:py-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:px-2 [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.6rem] [@media(orientation:landscape)_and_(max-height:500px)]:tracking-[0.04em] [@media(orientation:landscape)_and_(max-height:500px)]:min-h-[32px]"
                  >
                    <span className="[@media(orientation:landscape)_and_(max-height:500px)]:hidden">Request Consultation</span>
                    <span className="hidden [@media(orientation:landscape)_and_(max-height:500px)]:inline">Hire</span>
                  </Button>

                  <Button
                    href="/partner"
                    variant="outline"
                    size="md"
                    fullWidthOnMobile
                    className="w-full justify-center py-3.5 px-6 text-xs sm:text-sm tracking-[0.18em] max-[375px]:py-2.5 max-[375px]:px-3.5 max-[375px]:text-[0.68rem] max-[375px]:tracking-[0.06em] max-[350px]:py-2 max-[350px]:px-2.5 max-[350px]:text-[0.62rem] max-[350px]:tracking-[0.03em] max-[260px]:py-1 max-[260px]:px-1.5 max-[260px]:text-[0.55rem] max-[260px]:tracking-tight max-[260px]:min-h-[26px] [@media(orientation:landscape)_and_(max-height:500px)]:py-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:px-2 [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.6rem] [@media(orientation:landscape)_and_(max-height:500px)]:tracking-[0.04em] [@media(orientation:landscape)_and_(max-height:500px)]:min-h-[32px]"
                  >
                    <span className="[@media(orientation:landscape)_and_(max-height:500px)]:hidden">Partner with us</span>
                    <span className="hidden [@media(orientation:landscape)_and_(max-height:500px)]:inline">Partner</span>
                  </Button>
                </div>

                <div className="h-px w-full bg-white/10 mb-7 max-[350px]:mb-2 max-[260px]:mb-1 max-h-[600px]:mb-2 [@media(orientation:landscape)_and_(max-height:500px)]:mb-1.5" />

                {/* 3 Strategic Commitment Pillars */}
                <div className="space-y-3.5 max-[350px]:space-y-1 max-[260px]:space-y-0.5 max-h-[600px]:space-y-1 [@media(orientation:landscape)_and_(max-height:500px)]:space-y-1">
                  
                  {/* Pillar 1 */}
                  <div className="group/pillar flex items-center justify-between p-3.5 rounded-xl max-[350px]:p-1 max-[260px]:p-0.5 max-h-[600px]:p-1 [@media(orientation:landscape)_and_(max-height:500px)]:p-1 bg-white/[0.02] border border-white/5 hover:bg-brand-green/10 hover:border-brand-green/30 active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[44px] max-[350px]:min-h-[32px] max-[260px]:min-h-[24px] max-h-[600px]:min-h-[32px] [@media(orientation:landscape)_and_(max-height:500px)]:min-h-[30px]">
                    <div className="flex items-start max-[350px]:items-center max-h-[600px]:items-center [@media(orientation:landscape)_and_(max-height:500px)]:items-center gap-3.5 max-[350px]:gap-1.5 max-[260px]:gap-1 max-h-[600px]:gap-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1.5">
                      <div className="p-2 max-[350px]:p-0.5 max-[260px]:p-[1px] max-h-[600px]:p-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-0.5 rounded-lg bg-brand-green/15 border border-brand-green/30 text-brand-green-light shrink-0 mt-0.5 max-[350px]:mt-0 max-h-[600px]:mt-0 [@media(orientation:landscape)_and_(max-height:500px)]:mt-0 group-hover/pillar:bg-brand-green group-hover/pillar:text-white transition-colors duration-300">
                        <Globe className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5" />
                      </div>
                      <div>
                        <h4 className="font-label text-xs max-[350px]:text-[0.55rem] max-[260px]:text-[0.48rem] max-h-[600px]:text-[0.55rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.55rem] tracking-wider max-[260px]:tracking-tight uppercase text-white font-bold group-hover/pillar:text-brand-pearl transition-colors">
                          Global Sourcing Hubs
                        </h4>
                        <p className="text-xs text-white/75 leading-relaxed mt-0.5 max-[350px]:hidden max-h-[600px]:hidden [@media(orientation:landscape)_and_(max-height:500px)]:hidden">
                          India, Nepal, Bangladesh, Vietnam & Eastern Europe
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5 text-white/40 group-hover/pillar:text-brand-green-light group-hover/pillar:translate-x-1 transition-all duration-300 shrink-0" />
                  </div>

                  {/* Pillar 2 */}
                  <div className="group/pillar flex items-center justify-between p-3.5 rounded-xl max-[350px]:p-1 max-[260px]:p-0.5 max-h-[600px]:p-1 [@media(orientation:landscape)_and_(max-height:500px)]:p-1 bg-white/[0.02] border border-white/5 hover:bg-brand-gold/10 hover:border-brand-gold/30 active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[44px] max-[350px]:min-h-[32px] max-[260px]:min-h-[24px] max-h-[600px]:min-h-[32px] [@media(orientation:landscape)_and_(max-height:500px)]:min-h-[30px]">
                    <div className="flex items-start max-[350px]:items-center max-h-[600px]:items-center [@media(orientation:landscape)_and_(max-height:500px)]:items-center gap-3.5 max-[350px]:gap-1.5 max-[260px]:gap-1 max-h-[600px]:gap-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1.5">
                      <div className="p-2 max-[350px]:p-0.5 max-[260px]:p-[1px] max-h-[600px]:p-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-0.5 rounded-lg bg-brand-gold/15 border border-brand-gold/30 text-brand-gold shrink-0 mt-0.5 max-[350px]:mt-0 max-h-[600px]:mt-0 [@media(orientation:landscape)_and_(max-height:500px)]:mt-0 group-hover/pillar:bg-brand-gold group-hover/pillar:text-brand-ink transition-colors duration-300">
                        <ShieldCheck className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5" />
                      </div>
                      <div>
                        <h4 className="font-label text-xs max-[350px]:text-[0.55rem] max-[260px]:text-[0.48rem] max-h-[600px]:text-[0.55rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.55rem] tracking-wider max-[260px]:tracking-tight uppercase text-white font-bold group-hover/pillar:text-brand-gold transition-colors">
                          100% Bilateral Compliance
                        </h4>
                        <p className="text-xs text-white/75 leading-relaxed mt-0.5 max-[350px]:hidden max-h-[600px]:hidden [@media(orientation:landscape)_and_(max-height:500px)]:hidden">
                          Certified ethical recruitment & labor standard alignment
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5 text-white/40 group-hover/pillar:text-brand-gold group-hover/pillar:translate-x-1 transition-all duration-300 shrink-0" />
                  </div>

                  {/* Pillar 3 */}
                  <div className="group/pillar flex items-center justify-between p-3.5 rounded-xl max-[350px]:p-1 max-[260px]:p-0.5 max-h-[600px]:p-1 [@media(orientation:landscape)_and_(max-height:500px)]:p-1 bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-white/20 active:scale-[0.98] transition-all duration-300 cursor-pointer min-h-[44px] max-[350px]:min-h-[32px] max-[260px]:min-h-[24px] max-h-[600px]:min-h-[32px] [@media(orientation:landscape)_and_(max-height:500px)]:min-h-[30px]">
                    <div className="flex items-start max-[350px]:items-center max-h-[600px]:items-center [@media(orientation:landscape)_and_(max-height:500px)]:items-center gap-3.5 max-[350px]:gap-1.5 max-[260px]:gap-1 max-h-[600px]:gap-1.5 [@media(orientation:landscape)_and_(max-height:500px)]:gap-1.5">
                      <div className="p-2 max-[350px]:p-0.5 max-[260px]:p-[1px] max-h-[600px]:p-0.5 [@media(orientation:landscape)_and_(max-height:500px)]:p-0.5 rounded-lg bg-white/10 border border-white/20 text-white shrink-0 mt-0.5 max-[350px]:mt-0 max-h-[600px]:mt-0 [@media(orientation:landscape)_and_(max-height:500px)]:mt-0 group-hover/pillar:bg-white group-hover/pillar:text-brand-ink transition-colors duration-300">
                        <Zap className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5" />
                      </div>
                      <div>
                        <h4 className="font-label text-xs max-[350px]:text-[0.55rem] max-[260px]:text-[0.48rem] max-h-[600px]:text-[0.55rem] [@media(orientation:landscape)_and_(max-height:500px)]:text-[0.55rem] tracking-wider max-[260px]:tracking-tight uppercase text-white font-bold">
                          Turnkey Deployment
                        </h4>
                        <p className="text-xs text-white/75 leading-relaxed mt-0.5 max-[350px]:hidden max-h-[600px]:hidden [@media(orientation:landscape)_and_(max-height:500px)]:hidden">
                          Trade testing, medical clearance & fast-track visas
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 max-[350px]:w-2.5 max-[350px]:h-2.5 max-[260px]:w-2 max-[260px]:h-2 max-h-[600px]:w-2.5 max-h-[600px]:h-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:w-2.5 [@media(orientation:landscape)_and_(max-height:500px)]:h-2.5 text-white/40 group-hover/pillar:text-white group-hover/pillar:translate-x-1 transition-all duration-300 shrink-0" />
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </Section>
  );
}

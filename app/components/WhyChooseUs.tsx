"use client";

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

// ─── NAVBAR HEIGHT ────────────────────────────────────────────────────────────
// Match this to your actual sticky navbar height in px.
const NAVBAR_HEIGHT = 64;

const FEATURES = [
  {
    id: "01",
    title: "Global Reach, Local Expertise",
    description:
      "With established strategic offices in Dubai, India, and Nepal, we command a vast, active network of skilled professionals across Asia, ready to deploy to the Middle East and Europe.",
    image:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "02",
    title: "100% Ethical Sourcing",
    description:
      "We believe in uncompromising transparency. Our stringent screening process ensures that every candidate is treated ethically and every client receives thoroughly vetted, highly compliant talent.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "03",
    title: "Rapid & Compliant Deployment",
    description:
      "Time is money on major projects. Our dedicated visa and mobilization teams handle complex immigration logistics swiftly, ensuring your workforce arrives on-site, perfectly on schedule.",
    image:
      "https://images.pexels.com/photos/6169052/pexels-photo-6169052.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "04",
    title: "Deep Industry Specialization",
    description:
      "We don't just supply bodies; we supply exact expertise. From heavy civil engineering to specialized healthcare and hospitality, we understand the technical demands of your frontline.",
    image:
      "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "05",
    title: "Proven Track Record",
    description:
      "Numbers speak louder than promises. For over two decades, we have consistently delivered scale, quality, and reliability to the world's most demanding sectors.",
    image: "",
    isStats: true,
  },
];

// ─── ANIMATED COUNTER ────────────────────────────────────────────────────────
const AnimatedCounter = ({
  target,
  duration = 2000,
  suffix = "",
  isActive,
  compact = false,
}: {
  target: number;
  duration?: number;
  suffix?: string;
  isActive: boolean;
  compact?: boolean;
}) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) { setCount(0); return; }
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      if (progress < 1) rafRef.current = window.requestAnimationFrame(step);
    };
    rafRef.current = window.requestAnimationFrame(step);
    return () => { if (rafRef.current) window.cancelAnimationFrame(rafRef.current); };
  }, [target, duration, isActive]);

  return (
    <span
      className="font-black font-[family-name:var(--font-montserrat)] text-white drop-shadow-xl leading-none"
      style={{ fontSize: compact ? "clamp(1.5rem, 4.5vw, 2.2rem)" : undefined }}
    >
      {/* Portrait/desktop uses Tailwind scale; compact (landscape-mobile) uses clamp via style */}
      {!compact && (
        <span className="text-4xl sm:text-5xl md:text-6xl">{count}{suffix}</span>
      )}
      {compact && <>{count}{suffix}</>}
    </span>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // isShortViewport: true when viewport height < 520px (landscape phones)
  const [isShortViewport, setIsShortViewport] = useState(false);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const check = () => setIsShortViewport(window.innerHeight < 520);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Landscape mobile navbars are typically shorter; clamp so we don't waste space
  const effectiveNav = isShortViewport ? Math.min(NAVBAR_HEIGHT, 48) : NAVBAR_HEIGHT;

  useEffect(() => {
    const handleScroll = () => {
      const usableH = window.innerHeight - effectiveNav;
      const viewCentre = effectiveNav + usableH / 2;
      let closestIdx = 0, minDist = Infinity;
      sectionRefs.current.forEach((ref, i) => {
        if (!ref) return;
        const rect = ref.getBoundingClientRect();
        const dist = Math.abs(viewCentre - (rect.top + rect.height / 2));
        if (dist < minDist) { minDist = dist; closestIdx = i; }
      });
      setActiveIndex(closestIdx);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [effectiveNav]);

  return (
    <section className="relative w-full bg-[#050505] text-white font-[family-name:var(--font-open-sans)]">

      {/* ── STICKY BACKGROUND ──────────────────────────────────────────────── */}
      <div className="sticky top-0 left-0 w-full overflow-hidden pointer-events-none" style={{ height: "100dvh" }}>
        <div className="absolute inset-0 bg-[#050505] z-0" />

        {FEATURES.map((feature, index) => {
          if (feature.isStats) return null;
          const isActive = activeIndex === index;
          return (
            <div
              key={`bg-${feature.id}`}
              className={`absolute inset-0 transition-all duration-[1000ms] ease-in-out origin-center ${
                isActive ? "opacity-50 z-10 scale-100" : "opacity-0 z-0 scale-105"
              }`}
            >
              <Image src={feature.image} alt={feature.title} fill className="object-cover" unoptimized priority={index === 0} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/40 to-[#050505]/90" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/50 to-transparent" />
            </div>
          );
        })}

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl rounded-full blur-[120px] transition-colors duration-1000 z-20 ${
            FEATURES[activeIndex]?.isStats ? "bg-[#39B54A]/20" : "bg-transparent"
          }`}
          style={{ height: "80dvh" }}
        />
      </div>

      {/* ── SCROLLING CONTENT ──────────────────────────────────────────────── */}
      <div className="relative z-10" style={{ marginTop: "-100dvh" }}>

        {/* ── Sticky Header ────────────────────────────────────────────── */}
        {/*
          In landscape-mobile (isShortViewport) we hide the large headline
          to recover ~70–80px of precious vertical space. The eyebrow label
          stays so the section label is still present.
        */}
        <div
          className="sticky left-0 w-full px-4 sm:px-6 lg:px-12 z-30 pointer-events-none"
          style={{ top: `${effectiveNav}px`, paddingTop: isShortViewport ? 4 : 24 }}
        >
          <div className="max-w-7xl mx-auto">
            <p className="text-[#39B54A] font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.3em] leading-none drop-shadow-md">
              The Al Zahra Advantage
            </p>
            {!isShortViewport && (
              <p className="mt-1 sm:mt-2 text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-[family-name:var(--font-montserrat)] text-white/95 drop-shadow-2xl leading-tight">
                Why Partner With Us.
              </p>
            )}
          </div>
        </div>

        {/* ── Feature Blocks ───────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          {FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;

            // How much top-padding the card needs to clear the sticky header
            // Portrait: nav + header text ≈ nav + 80px
            // Landscape-mobile: nav (short) + tiny eyebrow ≈ effectiveNav + 20px
            const cardPaddingTop = isShortViewport
              ? effectiveNav + 20
              : effectiveNav + 72;

            return (
              <div
                key={feature.id}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="w-full flex items-center"
                style={{
                  minHeight: "100dvh",
                  paddingTop: cardPaddingTop,
                  paddingBottom: isShortViewport ? 8 : 32,
                }}
              >
                <div
                  className={`w-full transition-all duration-[800ms] ease-out ${
                    isActive ? "opacity-100 translate-y-0 blur-none" : "opacity-10 translate-y-12 blur-md pointer-events-none"
                  }`}
                >
                  {!feature.isStats ? (

                    /* ── Regular feature slide ──────────────────────── */
                    <div className="max-w-2xl">
                      {/* Number + decorative line */}
                      <div className="flex items-center gap-3 mb-2 sm:mb-5">
                        <span
                          className="font-black text-transparent bg-clip-text bg-gradient-to-b from-[#39B54A] to-[#006837] font-[family-name:var(--font-montserrat)] drop-shadow-2xl leading-none"
                          style={{ fontSize: isShortViewport ? "clamp(2rem, 6vw, 2.8rem)" : undefined }}
                        >
                          {isShortViewport
                            ? feature.id
                            : <span className="text-5xl sm:text-7xl lg:text-8xl">{feature.id}</span>
                          }
                        </span>
                        <div className="w-10 sm:w-20 h-[2px] bg-[#39B54A]/80 shadow-[0_0_15px_#39B54A]" />
                      </div>

                      {/* Title */}
                      <h3
                        className="font-bold font-[family-name:var(--font-montserrat)] leading-[1.15] drop-shadow-xl mb-2 sm:mb-5"
                        style={{ fontSize: isShortViewport ? "clamp(1rem, 3.2vw, 1.5rem)" : undefined }}
                      >
                        {isShortViewport
                          ? feature.title
                          : <span className="text-xl sm:text-3xl md:text-4xl lg:text-5xl">{feature.title}</span>
                        }
                      </h3>

                      {/* Description — truncated on landscape to avoid overflow */}
                      <p
                        className="text-white/85 leading-relaxed drop-shadow-md max-w-xl"
                        style={{
                          fontSize: isShortViewport ? "11px" : undefined,
                          lineHeight: isShortViewport ? "1.4" : undefined,
                          // Show only 2 lines on very short screens
                          display: isShortViewport ? "-webkit-box" : undefined,
                          WebkitLineClamp: isShortViewport ? 2 : undefined,
                          WebkitBoxOrient: isShortViewport ? "vertical" : undefined,
                          overflow: isShortViewport ? "hidden" : undefined,
                        } as React.CSSProperties}
                      >
                        <span className={isShortViewport ? "" : "text-sm sm:text-base lg:text-lg"}>
                          {feature.description}
                        </span>
                      </p>
                    </div>

                  ) : (

                    /* ── Stats slide ────────────────────────────────── */
                    <div className="w-full">
                      {/* 05 + divider */}
                      <div className="flex items-center gap-3 mb-2 sm:mb-5">
                        <span
                          className="font-black text-[#39B54A] font-[family-name:var(--font-montserrat)] drop-shadow-[0_0_20px_rgba(57,181,74,0.4)] leading-none"
                          style={{ fontSize: isShortViewport ? "1.25rem" : undefined }}
                        >
                          {isShortViewport
                            ? feature.id
                            : <span className="text-3xl sm:text-5xl">{feature.id}</span>
                          }
                        </span>
                        <div className="flex-1 h-[1px] bg-white/20" />
                      </div>

                      {/* Title */}
                      <h3
                        className="font-black font-[family-name:var(--font-montserrat)] leading-[1.1] drop-shadow-2xl mb-4 sm:mb-10"
                        style={{ fontSize: isShortViewport ? "clamp(0.95rem, 3vw, 1.35rem)" : undefined }}
                      >
                        {isShortViewport
                          ? feature.title
                          : <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">{feature.title}</span>
                        }
                      </h3>

                      {/*
                        Stats grid:
                        - Portrait + tablet + desktop → 2×2 (grid-cols-2), large numbers
                        - Landscape-mobile → 4 columns in one row, compact numbers + labels
                          This way all 4 stats are visible without ANY additional scroll
                          within the slide.
                      */}
                      <div
                        className={`grid w-full ${
                          isShortViewport
                            ? "grid-cols-4 gap-x-3 gap-y-1"
                            : "grid-cols-2 gap-x-8 gap-y-8 sm:gap-x-16 sm:gap-y-12 max-w-2xl"
                        }`}
                      >
                        {[
                          { target: 20,   suffix: "+", duration: 2000, label: "Years of Excellence" },
                          { target: 5000, suffix: "+", duration: 2500, label: "Global Deployments" },
                          { target: 40,   suffix: "+", duration: 1500, label: "Industries Served" },
                          { target: 100,  suffix: "%", duration: 1000, label: "Ethical Compliance" },
                        ].map((stat) => (
                          <div key={stat.label} className="flex flex-col gap-1">
                            <AnimatedCounter
                              target={stat.target}
                              suffix={stat.suffix}
                              duration={stat.duration}
                              isActive={isActive}
                              compact={isShortViewport}
                            />
                            <span
                              className="text-[#39B54A] font-bold uppercase tracking-[0.12em] drop-shadow-md leading-tight"
                              style={{ fontSize: isShortViewport ? "8px" : undefined }}
                            >
                              {isShortViewport
                                ? stat.label
                                : <span className="text-[9px] sm:text-xs">{stat.label}</span>
                              }
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom breathing room */}
      <div style={{ height: isShortViewport ? "2rem" : "6rem" }} />
    </section>
  );
};

export default WhyChooseUs;
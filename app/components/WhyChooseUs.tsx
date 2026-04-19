"use client";

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

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
  fontSize = "clamp(1.8rem, 4vw, 3.5rem)",
}: {
  target: number;
  duration?: number;
  suffix?: string;
  isActive: boolean;
  fontSize?: string;
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
      style={{ fontSize }}
    >
      {count}{suffix}
    </span>
  );
};

// ─── VIEWPORT TIER ───────────────────────────────────────────────────────────
type ViewportTier = "watch" | "landscapePhone" | "normal";
function getViewportTier(): ViewportTier {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 220) return "watch";
  if (h < 520 && w < 1024) return "landscapePhone";
  return "normal";
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tier, setTier] = useState<ViewportTier>("normal");
  // KEY FIX: measure the actual navbar height dynamically.
  // A hardcoded constant like 64px was wrong for iPad landscape where the
  // desktop navbar + utility bar totals ~90-100px.
  // We read the real rendered height from the DOM on every resize.
  const [navHeight, setNavHeight] = useState(64);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      setTier(getViewportTier());
      // Measure the navbar. Navbar.tsx adds id="site-navbar" to the header.
      const nav = document.getElementById('site-navbar');
      if (nav) {
        setNavHeight(nav.getBoundingClientRect().height);
      }
    };
    update();
    window.addEventListener('resize', update);
    // Also re-measure after a short delay in case the navbar hydrates late
    const t = setTimeout(update, 300);
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(t);
    };
  }, []);

  const isWatch = tier === "watch";
  const isLandscapePhone = tier === "landscapePhone";

  // On landscape phones the mobile nav is shorter (~48px)
  const effectiveNav = isWatch
    ? 28   // matches the watch navbar height in Navbar.tsx
    : navHeight;

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

  // ── Shared glowing green line (all slides 01–05) ──────────────────────────
  const GreenLine = () => (
    <div
      className="h-[2px] bg-[#39B54A]/80 shadow-[0_0_12px_#39B54A] flex-shrink-0"
      style={{
        width: isWatch
          ? "16px"
          : isLandscapePhone
          ? "28px"
          : "clamp(28px, 4vw, 72px)",
      }}
    />
  );

  // ── Font sizes by tier ────────────────────────────────────────────────────
  const fs = {
    // Eyebrow "THE AL ZAHRA ADVANTAGE"
    // KEY FIX: was clamp(9px,0.75vw,12px) which at 1024px = 7.68px → invisible.
    // Now minimum is 10px on normal, always legible.
    eyebrow:    isWatch ? "7px"  : isLandscapePhone ? "8px"  : "clamp(10px, 0.85vw, 12px)",
    // Main headline "Why Partner With Us."
    headline:   isWatch ? "10px" : isLandscapePhone ? "clamp(0.85rem, 3.5vw, 1.2rem)" : "clamp(1.4rem, 3vw, 3.25rem)",
    slideNum:   isWatch ? "1rem" : isLandscapePhone ? "clamp(1.4rem, 5vw, 2.4rem)"    : "clamp(2.25rem, 5.5vw, 4.75rem)",
    slideTitle: isWatch ? "9px"  : isLandscapePhone ? "clamp(0.85rem, 3vw, 1.4rem)"   : "clamp(1rem, 2.75vw, 2.75rem)",
    slideBody:  isWatch ? "7px"  : isLandscapePhone ? "11px"                           : "clamp(0.8rem, 1.1vw, 1rem)",
    statNum:    isWatch ? "clamp(0.9rem, 5.5vw, 1.35rem)" : isLandscapePhone ? "clamp(1.2rem, 3.5vw, 1.8rem)" : "clamp(1.6rem, 3.5vw, 3.25rem)",
    statLabel:  isWatch ? "6px"  : isLandscapePhone ? "8px"                            : "clamp(8px, 0.7vw, 11px)",
  };

  const hPad = isWatch ? "6px" : "clamp(1rem, 4vw, 3rem)";

  // Padding to push slide content below the sticky header
  // = navbar height + header block height (eyebrow + headline) + gap
  // On watch: nav is 28px + tiny header block ~20px
  // On landscapePhone: compact header ~32px
  // On normal: full header ~80-100px (varies by nav height)
  const cardPaddingTop = isWatch
    ? effectiveNav + 28
    : isLandscapePhone
    ? effectiveNav + 36
    : effectiveNav + 88;

  return (
    <section className="relative w-full bg-[#050505] text-white font-[family-name:var(--font-open-sans)]">

      {/* ── STICKY BACKGROUND ──────────────────────────────────────────────── */}
      <div
        className="sticky top-0 left-0 w-full overflow-hidden pointer-events-none"
        style={{ height: "100dvh" }}
      >
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
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
                unoptimized
                priority={index === 0}
              />
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

        {/* ── Sticky Section Header ─────────────────────────────────────── */}
        {/*
          z-30 beats the background blob at z-20 — this was the other
          reason the eyebrow disappeared on iPad.

          top = effectiveNav so it always sits flush below the navbar,
          using the MEASURED height not a hardcoded guess.
        */}
        <div
          className="sticky left-0 w-full z-30 pointer-events-none"
          style={{
            top: `${effectiveNav}px`,
            paddingTop: isWatch ? 4 : isLandscapePhone ? 6 : 16,
            paddingLeft: hPad,
            paddingRight: hPad,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-[#39B54A] font-bold uppercase leading-none drop-shadow-md"
              style={{
                fontSize: fs.eyebrow,
                letterSpacing: isWatch ? "0.12em" : "0.28em",
              }}
            >
              The Al Zahra Advantage
            </p>
            <p
              className="font-black font-[family-name:var(--font-montserrat)] text-white/95 drop-shadow-2xl leading-tight"
              style={{
                marginTop: isWatch ? 2 : 4,
                fontSize: fs.headline,
              }}
            >
              Why Partner With Us.
            </p>
          </div>
        </div>

        {/* ── Feature Blocks ───────────────────────────────────────────── */}
        <div
          className="max-w-7xl mx-auto"
          style={{ paddingLeft: hPad, paddingRight: hPad }}
        >
          {FEATURES.map((feature, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={feature.id}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className="w-full flex items-center"
                style={{
                  minHeight: "100dvh",
                  paddingTop: cardPaddingTop,
                  paddingBottom: isWatch ? 8 : isLandscapePhone ? 8 : 32,
                }}
              >
                <div
                  className={`w-full transition-all duration-[800ms] ease-out ${
                    isActive
                      ? "opacity-100 translate-y-0 blur-none"
                      : "opacity-10 translate-y-12 blur-md pointer-events-none"
                  }`}
                >
                  {!feature.isStats ? (

                    /* ── Regular Feature Slide ────────────────────────── */
                    <div style={{ maxWidth: "42rem" }}>
                      {/* Number + green line */}
                      <div
                        className="flex items-center gap-2"
                        style={{ marginBottom: isWatch ? 3 : isLandscapePhone ? 5 : 12 }}
                      >
                        <span
                          className="font-black text-transparent bg-clip-text bg-gradient-to-b from-[#39B54A] to-[#006837] font-[family-name:var(--font-montserrat)] drop-shadow-2xl leading-none"
                          style={{ fontSize: fs.slideNum }}
                        >
                          {feature.id}
                        </span>
                        <GreenLine />
                      </div>

                      {/* Title */}
                      <h3
                        className="font-bold font-[family-name:var(--font-montserrat)] leading-[1.15] drop-shadow-xl"
                        style={{
                          fontSize: fs.slideTitle,
                          marginBottom: isWatch ? 3 : isLandscapePhone ? 5 : 14,
                        }}
                      >
                        {feature.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-white/85 drop-shadow-md"
                        style={{
                          fontSize: fs.slideBody,
                          lineHeight: isWatch ? 1.35 : isLandscapePhone ? 1.4 : 1.7,
                          maxWidth: "34rem",
                          ...(isWatch || isLandscapePhone
                            ? {
                                display: "-webkit-box",
                                WebkitLineClamp: isWatch ? 3 : 2,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }
                            : {}),
                        } as React.CSSProperties}
                      >
                        {feature.description}
                      </p>
                    </div>

                  ) : (

                    /* ── Stats Slide (#05) ───────────────────────────── */
                    <div className="w-full">
                      {/* 05 + same green line as all other slides */}
                      <div
                        className="flex items-center gap-2"
                        style={{ marginBottom: isWatch ? 3 : isLandscapePhone ? 6 : 14 }}
                      >
                        <span
                          className="font-black text-transparent bg-clip-text bg-gradient-to-b from-[#39B54A] to-[#006837] font-[family-name:var(--font-montserrat)] drop-shadow-2xl leading-none"
                          style={{ fontSize: fs.slideNum }}
                        >
                          {feature.id}
                        </span>
                        <GreenLine />
                      </div>

                      {/* Title */}
                      <h3
                        className="font-black font-[family-name:var(--font-montserrat)] leading-[1.1] drop-shadow-2xl"
                        style={{
                          fontSize: fs.slideTitle,
                          marginBottom: isWatch ? 8 : isLandscapePhone ? 12 : 28,
                        }}
                      >
                        {feature.title}
                      </h3>

                      {/*
                        Stats grid layout:
                          Watch         → 1 column (stacked), scrollable
                          LandscapePhone→ 2×2 grid
                          Normal        → 2×2 grid
                      */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: isWatch ? "1fr" : "1fr 1fr",
                          gap: isWatch
                            ? "6px 0"
                            : isLandscapePhone
                            ? "12px 20px"
                            : "clamp(20px, 3.5vw, 44px) clamp(28px, 5.5vw, 72px)",
                          maxWidth: isWatch ? "100%" : "38rem",
                        }}
                      >
                        {[
                          { target: 20,   suffix: "+", duration: 2000, label: "Years of Excellence" },
                          { target: 5000, suffix: "+", duration: 2500, label: "Global Deployments" },
                          { target: 40,   suffix: "+", duration: 1500, label: "Industries Served" },
                          { target: 100,  suffix: "%", duration: 1000, label: "Ethical Compliance" },
                        ].map((stat) => (
                          <div key={stat.label} className="flex flex-col" style={{ gap: isWatch ? 1 : 3 }}>
                            <AnimatedCounter
                              target={stat.target}
                              suffix={stat.suffix}
                              duration={stat.duration}
                              isActive={isActive}
                              fontSize={fs.statNum}
                            />
                            <span
                              className="text-[#39B54A] font-bold uppercase leading-tight drop-shadow-md"
                              style={{
                                fontSize: fs.statLabel,
                                letterSpacing: isWatch ? "0.08em" : "0.13em",
                              }}
                            >
                              {stat.label}
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
      <div style={{ height: isWatch ? "1rem" : isLandscapePhone ? "1.5rem" : "5rem" }} />
    </section>
  );
};

export default WhyChooseUs;
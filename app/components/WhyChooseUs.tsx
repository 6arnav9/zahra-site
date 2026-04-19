"use client";

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

/**
 * FEATURES DATA
 * Sourced from Al Zahra Company Profile 2025 [cite: 1, 3]
 */
const FEATURES = [
  {
    id: "01",
    title: "Global Reach, Local Expertise",
    description:
      "With established strategic offices in Dubai, India, and Nepal, we command a vast, active network of skilled professionals across Asia, ready to deploy to the Middle East and Europe[cite: 15, 26].",
    image:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "02",
    title: "100% Ethical Sourcing",
    description:
      "We believe in uncompromising transparency[cite: 27, 42]. Our stringent screening process ensures that every candidate is treated ethically and every client receives thoroughly vetted, highly compliant talent[cite: 17, 18].",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "03",
    title: "Rapid & Compliant Deployment",
    description:
      "Time is money on major projects. Our dedicated visa and mobilization teams handle complex immigration logistics swiftly, ensuring your workforce arrives on-site, perfectly on schedule[cite: 62, 65].",
    image:
      "https://images.pexels.com/photos/6169052/pexels-photo-6169052.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "04",
    title: "Deep Industry Specialization",
    description:
      "We don't just supply bodies; we supply exact expertise[cite: 16]. From heavy civil engineering to specialized healthcare and hospitality, we understand the technical demands of your frontline[cite: 69, 71].",
    image:
      "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "05",
    title: "Proven Track Record",
    description:
      "Numbers speak louder than promises. Founded in 2001 [cite: 14], we have consistently delivered scale, quality, and reliability to the world's most demanding sectors for over two decades[cite: 24, 25].",
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
  // landscapePhone covers short viewports typical of rotated mobile devices
  if (h < 520 && w < 1024) return "landscapePhone";
  return "normal";
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tier, setTier] = useState<ViewportTier>("normal");
  const [navHeight, setNavHeight] = useState(64);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const update = () => {
      setTier(getViewportTier());
      const nav = document.getElementById('site-navbar');
      if (nav) {
        setNavHeight(nav.getBoundingClientRect().height);
      }
    };
    update();
    window.addEventListener('resize', update);
    const t = setTimeout(update, 300);
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(t);
    };
  }, []);

  const isWatch = tier === "watch";
  const isLandscapePhone = tier === "landscapePhone";

  const effectiveNav = isWatch ? 28 : navHeight;

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

  const GreenLine = () => (
    <div
      className="h-[2px] bg-[#39B54A]/80 shadow-[0_0_12px_#39B54A] flex-shrink-0"
      style={{
        width: isWatch
          ? "16px"
          : isLandscapePhone
          ? "32px"
          : "clamp(28px, 4vw, 72px)",
      }}
    />
  );

  const fs = {
    eyebrow:    isWatch ? "7px"  : isLandscapePhone ? "9px"  : "clamp(10px, 0.85vw, 12px)",
    headline:   isWatch ? "10px" : isLandscapePhone ? "clamp(1rem, 4vw, 1.4rem)" : "clamp(1.4rem, 3vw, 3.25rem)",
    slideNum:   isWatch ? "1rem" : isLandscapePhone ? "clamp(1.6rem, 6vw, 2.6rem)"    : "clamp(2.25rem, 5.5vw, 4.75rem)",
    slideTitle: isWatch ? "9px"  : isLandscapePhone ? "clamp(1rem, 3.5vw, 1.6rem)"   : "clamp(1rem, 2.75vw, 2.75rem)",
    slideBody:  isWatch ? "7px"  : isLandscapePhone ? "12px"                           : "clamp(0.8rem, 1.1vw, 1rem)",
    statNum:    isWatch ? "clamp(0.9rem, 5.5vw, 1.35rem)" : isLandscapePhone ? "clamp(1.4rem, 4vw, 2rem)" : "clamp(1.6rem, 3.5vw, 3.25rem)",
    statLabel:  isWatch ? "6px"  : isLandscapePhone ? "9px"                            : "clamp(8px, 0.7vw, 11px)",
  };

  // RESPONSIVITY FIX: Increased padding for landscape to avoid "cornered" look
  const hPad = isWatch 
    ? "6px" 
    : isLandscapePhone 
    ? "clamp(2rem, 8vw, 4rem)" 
    : "clamp(1.5rem, 5vw, 3rem)";

  const cardPaddingTop = isWatch
    ? effectiveNav + 28
    : isLandscapePhone
    ? effectiveNav + 48 
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
        <div
          className="sticky left-0 w-full z-30 pointer-events-none"
          style={{
            top: `${effectiveNav}px`,
            paddingTop: isWatch ? 4 : isLandscapePhone ? 16 : 24, // Fixed: more top room for landscape
            paddingLeft: hPad,
            paddingRight: hPad,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-[#39B54A] font-bold uppercase leading-none drop-shadow-md"
              style={{
                fontSize: fs.eyebrow,
                letterSpacing: isWatch ? "0.12em" : "0.3em",
              }}
            >
              The Al Zahra Advantage
            </p>
            <p
              className="font-black font-[family-name:var(--font-montserrat)] text-white/95 drop-shadow-2xl leading-tight"
              style={{
                marginTop: isWatch ? 2 : 6,
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
                  paddingBottom: isWatch ? 8 : isLandscapePhone ? 12 : 32,
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

                    <div style={{ maxWidth: "42rem" }}>
                      <div
                        className="flex items-center gap-2"
                        style={{ marginBottom: isWatch ? 3 : isLandscapePhone ? 8 : 12 }}
                      >
                        <span
                          className="font-black text-transparent bg-clip-text bg-gradient-to-b from-[#39B54A] to-[#006837] font-[family-name:var(--font-montserrat)] drop-shadow-2xl leading-none"
                          style={{ fontSize: fs.slideNum }}
                        >
                          {feature.id}
                        </span>
                        <GreenLine />
                      </div>

                      <h3
                        className="font-bold font-[family-name:var(--font-montserrat)] leading-[1.15] drop-shadow-xl"
                        style={{
                          fontSize: fs.slideTitle,
                          marginBottom: isWatch ? 3 : isLandscapePhone ? 8 : 14,
                        }}
                      >
                        {feature.title}
                      </h3>

                      <p
                        className="text-white/85 drop-shadow-md"
                        style={{
                          fontSize: fs.slideBody,
                          lineHeight: isWatch ? 1.35 : isLandscapePhone ? 1.5 : 1.7,
                          maxWidth: "34rem",
                        } as React.CSSProperties}
                      >
                        {feature.description}
                      </p>
                    </div>

                  ) : (

                    /* ── Stats Slide (#05) ───────────────────────────── */
                    <div className="w-full">
                      <div
                        className="flex items-center gap-2"
                        style={{ marginBottom: isWatch ? 3 : isLandscapePhone ? 8 : 14 }}
                      >
                        <span
                          className="font-black text-transparent bg-clip-text bg-gradient-to-b from-[#39B54A] to-[#006837] font-[family-name:var(--font-montserrat)] drop-shadow-2xl leading-none"
                          style={{ fontSize: fs.slideNum }}
                        >
                          {feature.id}
                        </span>
                        <GreenLine />
                      </div>

                      <h3
                        className="font-black font-[family-name:var(--font-montserrat)] leading-[1.1] drop-shadow-2xl"
                        style={{
                          fontSize: fs.slideTitle,
                          marginBottom: isWatch ? 8 : isLandscapePhone ? 14 : 28,
                        }}
                      >
                        {feature.title}
                      </h3>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: isWatch ? "1fr" : "1fr 1fr",
                          gap: isWatch
                            ? "6px 0"
                            : isLandscapePhone
                            ? "16px 24px"
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
                          <div key={stat.label} className="flex flex-col" style={{ gap: isWatch ? 1 : 4 }}>
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
                                letterSpacing: isWatch ? "0.08em" : "0.15em",
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
      <div style={{ height: isWatch ? "1rem" : isLandscapePhone ? "2rem" : "5rem" }} />
    </section>
  );
};

export default WhyChooseUs;
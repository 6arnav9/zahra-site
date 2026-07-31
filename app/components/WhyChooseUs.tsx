"use client";

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

/**
 * FEATURES DATA
 * Refined for high-impact sales and brand storytelling.
 */
const FEATURES = [
  {
    id: "01",
    title: "Global Reach, Local Expertise",
    description:
      "We bridge continents to bring you the best. With strategic hubs in Dubai, India, and Nepal, Al Zahra commands a vast, elite network of professionals ready to deploy across the Middle East and Europe at a moment's notice.",
    image:
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "02",
    title: "100% Ethical Sourcing",
    description:
      "Integrity is our foundation. Our uncompromising screening process ensures that every candidate is treated with dignity and every partner receives vetted, highly compliant talent that reflects your company's values.",
    image:
      "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "03",
    title: "Rapid & Compliant Deployment",
    description:
      "In global infrastructure, timing is everything. Our specialized mobilization teams navigate complex logistics and immigration with surgical precision, ensuring your workforce is on-site and operational exactly when you need them.",
    image:
      "https://images.pexels.com/photos/6169052/pexels-photo-6169052.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "04",
    title: "Deep Industry Specialization",
    description:
      "We don't just fill roles; we solve technical challenges. From heavy civil engineering to luxury hospitality, we provide the exact expertise required to drive your project's success and maintain your competitive edge.",
    image:
      "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1920",
    isStats: false,
  },
  {
    id: "05",
    title: "Proven Track Record",
    description:
      "Experience that speaks for itself. Since 2001, we have consistently delivered scale, quality, and unwavering reliability to the world's most demanding sectors, building a legacy of trust that spans over two decades.",
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

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const WhyChooseUs = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [tier, setTier] = useState<ViewportTier>("desktop");
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
  const isPhone = tier === "phone";
  const isLandscape = tier === "landscape";

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
      className="h-[1px] bg-[#006837] opacity-60 flex-shrink-0"
      style={{
        width: isWatch
          ? "16px"
          : isPhone || isLandscape
          ? "28px"
          : "clamp(32px, 4vw, 72px)",
      }}
    />
  );

  const fs = {
    eyebrow:    isWatch ? "7px"  : isPhone || isLandscape ? "9px"  : "clamp(10px, 0.8vw, 11px)",
    headline:   isWatch ? "10px" : isPhone || isLandscape ? "clamp(1rem, 4vw, 1.4rem)" : "clamp(1.5rem, 3.5vw, 3.5rem)",
    slideNum:   isWatch ? "1rem" : isPhone || isLandscape ? "clamp(1.4rem, 6vw, 2.2rem)"    : "clamp(2.5rem, 5vw, 4.5rem)",
    slideTitle: isWatch ? "9px"  : isPhone || isLandscape ? "clamp(1rem, 3.5vw, 1.5rem)"   : "clamp(1.5rem, 3vw, 3rem)",
    slideBody:  isWatch ? "7px"  : isPhone || isLandscape ? "11px"                           : "clamp(0.85rem, 1.2vw, 1.1rem)",
    statNum:    isWatch ? "clamp(0.9rem, 5.5vw, 1.35rem)" : isPhone || isLandscape ? "clamp(1.4rem, 4vw, 2rem)" : "clamp(2.5rem, 4vw, 3.5rem)",
    statLabel:  isWatch ? "6px"  : isPhone || isLandscape ? "8px"                            : "clamp(8px, 0.7vw, 10px)",
  };

  const hPad = isWatch 
    ? "8px" 
    : isPhone || isLandscape 
    ? "clamp(1.2rem, 5vw, 3rem)" 
    : "clamp(2rem, 8vw, 6rem)";

  const cardPaddingTop = isWatch
    ? effectiveNav + 16
    : isPhone || isLandscape
    ? effectiveNav + 32 
    : effectiveNav + 80;

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
              className={`absolute inset-0 transition-all duration-[1500ms] ease-out-expo origin-center ${
                isActive ? "opacity-40 z-10 scale-100" : "opacity-0 z-0 scale-110"
              }`}
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover grayscale"
                unoptimized
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-black/40 to-transparent" />
            </div>
          );
        })}

        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl rounded-full blur-[140px] transition-colors duration-[1500ms] ease-out-expo z-20 ${
            FEATURES[activeIndex]?.isStats ? "bg-[#006837]/15" : "bg-transparent"
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
            paddingTop: isWatch ? 4 : isPhone || isLandscape ? 12 : 24,
            paddingLeft: hPad,
            paddingRight: hPad,
          }}
        >
          <div className="max-w-7xl mx-auto">
            <p
              className="text-[#006837] font-black uppercase leading-none tracking-[0.4em]"
              style={{ fontSize: fs.eyebrow }}
            >
              Excellence
            </p>
            <p
              className="font-medium font-[family-name:var(--font-cormorant)] italic text-white/95 drop-shadow-2xl leading-tight"
              style={{
                marginTop: isWatch ? 2 : 8,
                fontSize: fs.headline,
              }}
            >
              The Al Zahra Advantage.
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
                  paddingBottom: isWatch ? 8 : isPhone || isLandscape ? 24 : 48,
                }}
              >
                <div
                  className={`w-full transition-all duration-[1200ms] ease-out-expo ${
                    isActive
                      ? "opacity-100 translate-y-0 blur-none"
                      : "opacity-0 translate-y-16 blur-xl pointer-events-none"
                  }`}
                >
                  {!feature.isStats ? (

                    <div style={{ maxWidth: "48rem" }}>
                      <div
                        className="flex items-center gap-3"
                        style={{ marginBottom: isWatch ? 4 : isPhone || isLandscape ? 10 : 20 }}
                      >
                        <span
                          className="font-black text-[#006837] font-[family-name:var(--font-open-sans)] drop-shadow-2xl leading-none tracking-tighter"
                          style={{ fontSize: fs.slideNum }}
                        >
                          {feature.id}
                        </span>
                        <GreenLine />
                      </div>

                      <h3
                        className="font-medium font-[family-name:var(--font-cormorant)] italic leading-[1.1] text-white"
                        style={{
                          fontSize: fs.slideTitle,
                          marginBottom: isWatch ? 4 : isPhone || isLandscape ? 10 : 20,
                        }}
                      >
                        {feature.title}
                      </h3>

                      <p
                        className="text-white/70 font-medium leading-relaxed"
                        style={{
                          fontSize: fs.slideBody,
                          maxWidth: "38rem",
                        } as React.CSSProperties}
                      >
                        {feature.description}
                      </p>
                    </div>

                  ) : (

                    /* ── Stats Slide (#05) ───────────────────────────── */
                    <div className="w-full">
                      <div
                        className="flex items-center gap-4"
                        style={{ marginBottom: isWatch ? 4 : isPhone || isLandscape ? 12 : 24 }}
                      >
                        <span
                          className="font-black text-[#006837] font-[family-name:var(--font-open-sans)] drop-shadow-2xl leading-none tracking-tighter"
                          style={{ fontSize: fs.slideNum }}
                        >
                          {feature.id}
                        </span>
                        <GreenLine />
                      </div>

                      <h3
                        className="font-medium font-[family-name:var(--font-cormorant)] italic leading-[1.1] text-white"
                        style={{
                          fontSize: fs.slideTitle,
                          marginBottom: isWatch ? 8 : isPhone || isLandscape ? 20 : 48,
                        }}
                      >
                        {feature.title}
                      </h3>

                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: isWatch ? "1fr" : "1fr 1fr",
                          gap: isWatch
                            ? "8px 0"
                            : isPhone || isLandscape
                            ? "16px 24px"
                            : "clamp(32px, 5vw, 64px) clamp(40px, 8vw, 96px)",
                          maxWidth: isWatch ? "100%" : "44rem",
                        }}
                      >
                        {[
                          { target: 20,   suffix: "+", duration: 2000, label: "Years of Human Resources" },
                          { target: 5000, suffix: "+", duration: 2500, label: "Strategic Deployments" },
                          { target: 40,   suffix: "+", duration: 1500, label: "Specialized Sectors" },
                          { target: 100,  suffix: "%", duration: 1000, label: "Compliant Ethics" },
                        ].map((stat) => (
                          <div key={stat.label} className="flex flex-col" style={{ gap: isWatch ? 1 : 6 }}>
                            <AnimatedCounter
                              target={stat.target}
                              suffix={stat.suffix}
                              duration={stat.duration}
                              isActive={isActive}
                              fontSize={fs.statNum}
                            />
                            <span
                              className="text-[#006837] font-black uppercase leading-tight tracking-[0.2em]"
                              style={{
                                fontSize: fs.statLabel,
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
      <div style={{ height: isWatch ? "2rem" : isPhone || isLandscape ? "3rem" : "8rem" }} />
    </section>
  );
};

export default WhyChooseUs;
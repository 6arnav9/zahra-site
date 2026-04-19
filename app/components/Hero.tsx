"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  alt: string;
}

const BACKGROUND_MEDIA: MediaItem[] = [
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1613914011280-fc80bd159816?q=80&w=1831&auto=format&fit=crop',
    alt: 'Dubai Skyline Recruitment Background',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2000&auto=format&fit=crop',
    alt: 'European Infrastructure and Modern Development',
  },
];

const CLIENT_NAMES = [
  "MERCURY ENG", "STRABAG SE", "REDCO INFRA", "PORR AG", "GULF CIVIL",
];

type ViewportTier = "watch" | "landscapePhone" | "normal";
function getViewportTier(): ViewportTier {
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 220) return "watch";
  if (h < 520 && w < 1024) return "landscapePhone";
  return "normal";
}

const Hero = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<ViewportTier>("normal");
  const [navHeight, setNavHeight] = useState(64);

  useEffect(() => {
    setMounted(true);

    const update = () => {
      setTier(getViewportTier());
      const nav = document.getElementById('site-navbar');
      if (nav) setNavHeight(nav.getBoundingClientRect().height);
    };
    update();
    window.addEventListener('resize', update);
    setTimeout(update, 300);

    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % BACKGROUND_MEDIA.length);
    }, 5000);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isLandscapePhone = tier === "landscapePhone";

  // ─── Apple Watch layout ───────────────────────────────────────────────────
  // Navbar on watch is 28px and logo-only. Hero shows a minimal card below it.
  if (isWatch) {
    return (
      <section
        className="relative w-full flex flex-col items-center justify-center text-center text-white bg-[#050505]"
        style={{ minHeight: "100dvh", paddingTop: navHeight, padding: `${navHeight}px 8px 8px` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#006837]/50 via-[#050505] to-[#050505]" />
        <div className="relative z-10 flex flex-col items-center" style={{ gap: "6px" }}>
          <p className="text-[#39B54A] font-bold uppercase" style={{ fontSize: "7px", letterSpacing: "0.18em" }}>
            Al Zahra Human Resources
          </p>
          <h1
            className="font-black font-[family-name:var(--font-montserrat)] text-white leading-tight"
            style={{ fontSize: "clamp(10px, 5vw, 13px)" }}
          >
            Bridging Global Employers with Exceptional Talent.
          </h1>
          <p className="text-white/65" style={{ fontSize: "7px", lineHeight: 1.4 }}>
            High-quality, transparent, and efficient overseas recruitment.
          </p>
          <a
            href="#contact"
            className="bg-[#39B54A] hover:bg-[#006837] text-white font-bold rounded-full font-[family-name:var(--font-montserrat)] transition-colors"
            style={{ fontSize: "8px", padding: "5px 14px" }}
          >
            Contact Us
          </a>
        </div>
      </section>
    );
  }

  // ─── Standard layout ──────────────────────────────────────────────────────
  return (
    <section
      className="relative w-full flex flex-col font-sans text-white overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heroScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-scroll {
          animation: heroScroll 25s linear infinite;
          display: flex;
          width: max-content;
        }
      `}} />

      {/* Background images */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {BACKGROUND_MEDIA.map((media, index) => (
          <div
            key={media.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Image src={media.src} alt={media.alt} fill priority={index === 0} className="object-cover object-center" unoptimized />
          </div>
        ))}
        <div className="absolute inset-0 bg-black/45 z-10" />
        <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#006837]/85 via-black/35 to-transparent z-10" />
      </div>

      {/* Hero content */}
      <div
        className="relative z-20 flex-1 flex flex-col items-center justify-center w-full mx-auto min-h-0"
        style={{
          maxWidth: "64rem",
          // Use measured navbar height so iPad landscape offset is correct
          paddingTop: isLandscapePhone ? navHeight + 8 : navHeight + 24,
          paddingBottom: 16,
          paddingLeft:  "clamp(1rem, 5vw, 2rem)",
          paddingRight: "clamp(1rem, 5vw, 2rem)",
        }}
      >
        <div className="flex flex-col items-center justify-center w-full text-center">

          <h1
            className="font-bold leading-[1.08] tracking-tight font-[family-name:var(--font-montserrat)] drop-shadow-2xl"
            style={{
              fontSize: isLandscapePhone
                ? "clamp(1.1rem, 4.5vw, 1.9rem)"
                : "clamp(1.75rem, 6vw, 4.5rem)",
              marginBottom: isLandscapePhone ? "6px" : "clamp(12px, 2vw, 24px)",
            }}
          >
            Bridging Global Employers{" "}
            <br className="hidden md:inline" />
            with Exceptional Talent.
          </h1>

          {!isLandscapePhone && (
            <p
              className="text-white/88 max-w-3xl font-[family-name:var(--font-open-sans)] drop-shadow-md"
              style={{
                fontSize: "clamp(0.8rem, 1.4vw, 1.15rem)",
                lineHeight: 1.65,
                marginBottom: "clamp(20px, 3vw, 40px)",
              }}
            >
              Delivering high-quality, transparent, and efficient recruitment solutions.
              We connect unskilled, skilled and semi-skilled professionals to critical
              roles across the Middle East and Europe.
            </p>
          )}

          <div
            className="flex items-center justify-center flex-wrap"
            style={{ gap: isLandscapePhone ? "8px" : "clamp(10px, 2vw, 24px)" }}
          >
            <button
              className="bg-[#39B54A] hover:bg-[#006837] text-white font-bold rounded-full transition-all duration-300 font-[family-name:var(--font-montserrat)] whitespace-nowrap shadow-[0_0_20px_rgba(57,181,74,0.3)] hover:shadow-[0_0_30px_rgba(57,181,74,0.5)]"
              style={{
                fontSize: isLandscapePhone ? "0.65rem" : "clamp(0.8rem, 1.2vw, 1.1rem)",
                padding: isLandscapePhone ? "6px 20px" : "clamp(10px,1.2vw,16px) clamp(24px,3vw,42px)",
              }}
            >
              Find Talent
            </button>
            <button
              className="bg-transparent hover:bg-white hover:text-[#1B2B21] border border-white/50 hover:border-white text-white font-bold rounded-full transition-all duration-300 font-[family-name:var(--font-montserrat)] whitespace-nowrap shadow-xl"
              style={{
                fontSize: isLandscapePhone ? "0.65rem" : "clamp(0.8rem, 1.2vw, 1.1rem)",
                padding: isLandscapePhone ? "6px 20px" : "clamp(10px,1.2vw,16px) clamp(24px,3vw,42px)",
              }}
            >
              Submit CV
            </button>
          </div>
        </div>
      </div>

      {/* Marquee bar */}
      <div
        className="relative z-30 w-full bg-black/40 backdrop-blur-md border-t border-white/10 flex-none overflow-hidden"
        style={{ padding: isLandscapePhone ? "4px 0" : "clamp(10px, 2vw, 28px) 0" }}
      >
        {!isLandscapePhone && (
          <p
            className="text-center font-bold text-white/50 uppercase font-[family-name:var(--font-open-sans)]"
            style={{ fontSize: "clamp(8px, 0.65vw, 11px)", letterSpacing: "0.3em", marginBottom: "clamp(6px, 1vw, 20px)" }}
          >
            Trusted by Industry Leaders
          </p>
        )}
        <div className="relative w-full overflow-hidden">
          <div
            className="hero-scroll pointer-events-none"
            style={{ gap: "clamp(1.5rem, 5vw, 8rem)", paddingRight: "clamp(1.5rem, 5vw, 8rem)" }}
          >
            <LogoTrack logos={CLIENT_NAMES} isLandscapePhone={isLandscapePhone} />
            <LogoTrack logos={CLIENT_NAMES} isLandscapePhone={isLandscapePhone} />
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoTrack = ({ logos, isLandscapePhone }: { logos: string[]; isLandscapePhone: boolean }) => (
  <div
    className="flex items-center opacity-40 grayscale contrast-125 hover:opacity-90 transition-opacity duration-300"
    style={{ gap: "clamp(1.5rem, 4vw, 8rem)" }}
  >
    {logos.map((logo, i) => (
      <span
        key={`${logo}-${i}`}
        className="font-bold font-[family-name:var(--font-montserrat)] whitespace-nowrap tracking-tighter"
        style={{ fontSize: isLandscapePhone ? "0.6rem" : "clamp(0.75rem, 1.4vw, 1.4rem)" }}
      >
        {logo}
      </span>
    ))}
  </div>
);

export default Hero;
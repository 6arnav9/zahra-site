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
    src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Luxury Resort Architecture',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop',
    alt: 'Industrial Infrastructure Construction',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=2070&auto=format&fit=crop',
    alt: 'Dubai Night Skyline',
  },
  {
    type: 'image',
    src: 'https://images.pexels.com/photos/30226641/pexels-photo-30226641.jpeg',
    alt: 'Modern Healthcare Environment',
  },
  {
    type: 'image',
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Corporate Enterprise Interior',
  },
];

const CLIENT_NAMES = [
  "MERCURY ENG", "STRABAG SE", "REDCO INFRA", "PORR AG", "GULF CIVIL",
];

type ViewportTier = "watch" | "landscapePhone" | "smallPhone" | "normal";
function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return "normal";
  const w = window.innerWidth;
  const h = window.innerHeight;
  
  if (w < 220) return "watch";
  if (h < 520 && w > h) return "landscapePhone";
  if (w <= 380) return "smallPhone";
  
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
  const isSmallPhone = tier === "smallPhone";

  // ─── Apple Watch layout ───────────────────────────────────────────────────
  if (isWatch) {
    return (
      <section
        className="relative w-full flex flex-col items-center justify-center text-center text-white bg-[#050505] overflow-hidden"
        style={{ minHeight: "100dvh", paddingTop: navHeight, paddingLeft: 8, paddingRight: 8, paddingBottom: 8 }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          {BACKGROUND_MEDIA.map((media, index) => (
            <div
              key={media.src}
              className={`absolute inset-0 transition-opacity duration-1500 ease-out-expo ${
                index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image src={media.src} alt={media.alt} fill priority={index === 0} className="object-cover object-center opacity-50" unoptimized />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        <div className="relative z-20 flex flex-col items-center" style={{ gap: "4px" }}>
          <h1
            className="font-medium font-[family-name:var(--font-cormorant)] italic text-white leading-tight tracking-wide"
            style={{ fontSize: "11px" }}
          >
            Strategic <br/> Workforce.
          </h1>
          <p className="text-white/60 font-medium tracking-[0.1em] uppercase" style={{ fontSize: "5px" }}>
            Global Ambitions.
          </p>
          <a
            href="#contact"
            className="bg-[#006837] text-white font-black rounded-full uppercase tracking-widest active:scale-95 transition-transform"
            style={{ fontSize: "6px", padding: "4px 10px", marginTop: "6px" }}
          >
            Connect
          </a>
        </div>
      </section>
    );
  }

  // ─── Standard layout ──────────────────────────────────────────────────────
  return (
    <section
      className="relative w-full flex flex-col text-white overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes heroScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-scroll {
          animation: heroScroll 45s linear infinite;
          display: flex;
          width: max-content;
        }
        .serif-display {
          font-family: var(--font-cormorant), serif;
          font-style: italic;
        }
      `}} />

      {/* Background images with Ken Burns effect */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {BACKGROUND_MEDIA.map((media, index) => (
          <div
            key={media.src}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentMediaIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className={`absolute inset-0 transition-transform duration-[10000ms] ease-linear ${index === currentMediaIndex ? 'scale-110' : 'scale-100'}`}>
              <Image src={media.src} alt={media.alt} fill priority={index === 0} className="object-cover object-center" unoptimized />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20 z-10" />
      </div>

      {/* Hero content */}
      <div
        className="relative z-20 flex-1 flex flex-col items-center lg:items-start justify-center w-full mx-auto min-h-0"
        style={{
          maxWidth: "85rem",
          paddingTop: isLandscapePhone || isSmallPhone ? navHeight + 16 : navHeight + 64,
          paddingBottom: 48,
          paddingLeft:  "clamp(1.5rem, 8vw, 6rem)",
          paddingRight: "clamp(1.5rem, 8vw, 6rem)",
        }}
      >
        <div className="flex flex-col items-center lg:items-start w-full text-center lg:text-left">
          
          <div className="overflow-hidden mb-4 lg:mb-8">
            <span className="block text-[9px] sm:text-[10px] lg:text-xs font-black tracking-[0.15em] sm:tracking-[0.4em] uppercase text-[#006837] animate-in fade-in slide-in-from-bottom-4 duration-1000">
              International Recruitment Authority
            </span>
          </div>

          <h1
            className="font-medium leading-[1.1] tracking-[-0.03em] serif-display text-white drop-shadow-2xl"
            style={{
              fontSize: isLandscapePhone
                ? "clamp(1.5rem, 6vw, 2.5rem)"
                : isSmallPhone
                ? "clamp(2rem, 8vw, 2.8rem)"
                : "clamp(2.5rem, 9vw, 6.5rem)",
              marginBottom: isLandscapePhone || isSmallPhone ? "16px" : "clamp(24px, 4vw, 48px)",
            }}
          >
            Strategic Workforce <br className="hidden lg:inline" />
            for Global <span className="opacity-70">Ambitions.</span>
          </h1>

          {!isLandscapePhone && (
            <p
              className="text-white/70 max-w-xl font-medium tracking-wide drop-shadow-md leading-relaxed"
              style={{
                fontSize: isSmallPhone ? "0.8rem" : "clamp(1rem, 1.5vw, 1.35rem)",
                marginBottom: isSmallPhone ? "24px" : "clamp(40px, 5vw, 72px)",
                paddingLeft: isSmallPhone ? "1rem" : "0",
                paddingRight: isSmallPhone ? "1rem" : "0",
              }}
            >
              Building the human infrastructure for world-class enterprises across 
              the Middle East and Europe. Reliability at scale.
            </p>
          )}

          <div
            className="flex items-center justify-center lg:justify-start flex-wrap"
            style={{ gap: isLandscapePhone || isSmallPhone ? "16px" : "24px" }}
          >
            <button
              className="bg-[#006837] hover:bg-[#004d29] text-white font-black rounded-full transition-all duration-500 ease-out-expo whitespace-nowrap shadow-2xl hover:-translate-y-1 uppercase tracking-[0.2em] border border-[#006837]"
              style={{
                fontSize: isLandscapePhone || isSmallPhone ? "0.65rem" : "0.9rem",
                padding: isLandscapePhone || isSmallPhone ? "12px 28px" : "18px 56px",
              }}
            >
              Hire Talent
            </button>
            <button
              className="bg-transparent hover:bg-white/10 border border-white/20 text-white font-black rounded-full transition-all duration-500 ease-out-expo whitespace-nowrap uppercase tracking-[0.2em] backdrop-blur-sm"
              style={{
                fontSize: isLandscapePhone || isSmallPhone ? "0.75rem" : "0.9rem",
                padding: isLandscapePhone || isSmallPhone ? "12px 28px" : "18px 56px",
              }}
            >
              Submit CV
            </button>
          </div>
        </div>
      </div>

      {/* Marquee bar */}
      <div
        className="relative z-30 w-full bg-black/20 backdrop-blur-2xl border-t border-white/5 flex-none overflow-hidden"
        style={{ padding: isLandscapePhone || isSmallPhone ? "10px 0" : "clamp(16px, 3vw, 42px) 0" }}
      >
        <div className="relative w-full overflow-hidden">
          <div
            className="hero-scroll pointer-events-none opacity-40"
            style={{ gap: isSmallPhone ? "3rem" : "clamp(4rem, 10vw, 12rem)", paddingRight: isSmallPhone ? "3rem" : "clamp(4rem, 10vw, 12rem)" }}
          >
            <LogoTrack logos={CLIENT_NAMES} isLandscapePhone={isLandscapePhone} isSmallPhone={isSmallPhone} />
            <LogoTrack logos={CLIENT_NAMES} isLandscapePhone={isLandscapePhone} isSmallPhone={isSmallPhone} />
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoTrack = ({ logos, isLandscapePhone, isSmallPhone }: { logos: string[]; isLandscapePhone: boolean; isSmallPhone: boolean }) => (
  <div
    className="flex items-center grayscale invert brightness-0"
    style={{ gap: isSmallPhone ? "3rem" : "clamp(4rem, 10vw, 12rem)" }}
  >
    {logos.map((logo, i) => (
      <span
        key={`${logo}-${i}`}
        className="font-bold tracking-[0.3em] text-white/90"
        style={{ fontSize: isLandscapePhone ? "0.7rem" : isSmallPhone ? "0.65rem" : "clamp(0.9rem, 1.8vw, 1.8rem)" }}
      >
        {logo}
      </span>
    ))}
  </div>
);

export default Hero;
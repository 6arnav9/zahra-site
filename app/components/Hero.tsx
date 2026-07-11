"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useViewport } from "../hooks/useViewport";
import { Button } from "./ui";

interface MediaItem {
  type: "image" | "video";
  src: string;
  alt: string;
}

const BACKGROUND_MEDIA: MediaItem[] = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    alt: "Luxury Resort Architecture",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2070&auto=format&fit=crop",
    alt: "Industrial Infrastructure Construction",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?q=80&w=2070&auto=format&fit=crop",
    alt: "Dubai Night Skyline",
  },
  {
    type: "image",
    src: "https://images.pexels.com/photos/30226641/pexels-photo-30226641.jpeg",
    alt: "Modern Healthcare Environment",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop",
    alt: "Corporate Enterprise Interior",
  },
];

const CLIENT_NAMES = [
  "MERCURY ENG", "STRABAG SE", "REDCO INFRA", "PORR AG", "GULF CIVIL",
];

const Hero = () => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const { mounted, tier, navHeight, isWatch, isPhone, isLandscape } = useViewport();

  useEffect(() => {
    if (!mounted) return;
    const timer = setInterval(() => {
      setCurrentMediaIndex((prev) => (prev + 1) % BACKGROUND_MEDIA.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [mounted]);

  if (!mounted) return null;

  // ─── Apple Watch layout ───────────────────────────────────────────────────
  if (isWatch) {
    return (
      <section
        className="relative w-full flex flex-col items-center justify-center text-center text-white bg-brand-ink overflow-hidden"
        style={{
          minHeight: "100dvh",
          paddingTop: navHeight,
          paddingLeft: 8,
          paddingRight: 8,
          paddingBottom: 8,
        }}
      >
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          {BACKGROUND_MEDIA.map((media, index) => (
            <div
              key={media.src}
              className={`absolute inset-0 transition-opacity duration-1500 ease-out-expo ${
                index === currentMediaIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                priority={index === 0}
                className="object-cover object-center opacity-50"
                unoptimized
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/50 z-10" />
        </div>

        <div className="relative z-20 flex flex-col items-center w-full max-w-[140px]" style={{ gap: "4px" }}>
          <div className="mb-1">
            <span className="block font-black tracking-[0.2em] uppercase text-brand-green-light text-[4px]">
              Global Authority
            </span>
          </div>
          <h1 className="font-medium font-headline italic text-white leading-tight tracking-tight text-[14px]">
            Strategic Workforce
          </h1>
          <p className="text-white/60 font-medium tracking-[0.1em] leading-tight mb-2 text-[6px]">
            For Global Ambitions.
          </p>
          
          <div className="flex flex-col gap-1 w-full">
            <Button
              variant="primary"
              fullWidthOnMobile
              style={{ fontSize: "5px", padding: "6px 0" }}
            >
              Hire Talent
            </Button>
            <Button
              variant="outline"
              fullWidthOnMobile
              style={{ fontSize: "5px", padding: "6px 0" }}
            >
              Submit CV
            </Button>
          </div>
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
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes heroScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .hero-scroll {
          animation: heroScroll 45s linear infinite;
          display: flex;
          width: max-content;
        }
      `,
        }}
      />

      {/* Background images with Ken Burns effect */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        {BACKGROUND_MEDIA.map((media, index) => (
          <div
            key={media.src}
            className={`absolute inset-0 transition-opacity duration-2000 ease-in-out ${
              index === currentMediaIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className={`absolute inset-0 transition-transform duration-[10000ms] ease-linear ${
                index === currentMediaIndex ? "scale-110" : "scale-100"
              }`}
            >
              <Image
                src={media.src}
                alt={media.alt}
                fill
                priority={index === 0}
                className="object-cover object-center"
                unoptimized
              />
            </div>
          </div>
        ))}
        <div className="absolute inset-0 bg-black/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/20 z-10" />
      </div>

      {/* Hero content */}
      <div
        className="relative z-20 flex-1 flex flex-col items-center lg:items-start justify-center w-full mx-auto"
        style={{
          maxWidth: "85rem",
          paddingTop: navHeight + 32,
          paddingBottom: 64,
          paddingLeft: "clamp(1.5rem, 8vw, 6rem)",
          paddingRight: "clamp(1.5rem, 8vw, 6rem)",
        }}
      >
        <div className="flex flex-col items-center lg:items-start w-full text-center lg:text-left">
          <div className="overflow-hidden mb-4 lg:mb-8">
            <span
              className="block font-black tracking-[0.15em] sm:tracking-[0.4em] uppercase text-brand-green-light animate-in fade-in slide-in-from-bottom-4 duration-1000"
              style={{ fontSize: isPhone || isLandscape ? "9px" : "clamp(10px, 0.8vw, 12px)" }}
            >
              International Recruitment Authority
            </span>
          </div>

          <h1
            className="font-medium leading-[1.1] tracking-[-0.03em] font-headline italic text-white drop-shadow-2xl"
            style={{
              fontSize: isLandscape
                ? "clamp(1.5rem, 6vw, 2.5rem)"
                : isPhone
                ? "clamp(2rem, 9vw, 3rem)"
                : "clamp(3rem, 8vw, 6.5rem)",
              marginBottom: isLandscape || isPhone ? "16px" : "clamp(24px, 4vw, 48px)",
            }}
          >
            Strategic Workforce <br className="hidden lg:inline" />
            for Global <span className="opacity-70">Ambitions.</span>
          </h1>

          {!isLandscape && (
            <p
              className="text-white/70 max-w-xl font-medium tracking-wide drop-shadow-md leading-relaxed"
              style={{
                fontSize: isPhone ? "clamp(0.8rem, 4vw, 0.95rem)" : "clamp(1rem, 1.2vw, 1.25rem)",
                marginBottom: isPhone ? "24px" : "clamp(40px, 4vw, 64px)",
                paddingLeft: isPhone ? "1rem" : "0",
                paddingRight: isPhone ? "1rem" : "0",
              }}
            >
              Building the human infrastructure for world-class enterprises across the Middle East and Europe.
              Reliability at scale.
            </p>
          )}

          <div
            className={`flex items-center justify-center lg:justify-start ${isPhone ? "flex-col w-full" : "flex-row"}`}
            style={{ gap: isLandscape || isPhone ? "12px" : "20px" }}
          >
            <Button
              variant="primary"
              size={isLandscape || isPhone ? "sm" : "md"}
              fullWidthOnMobile
            >
              Hire Talent
            </Button>

            <Button
              variant="outline"
              size={isLandscape || isPhone ? "sm" : "md"}
              fullWidthOnMobile
            >
              Submit CV
            </Button>
          </div>
        </div>
      </div>

      {/* Marquee bar - flex-none ensures it stays at the bottom */}
      <div
        className="relative z-30 w-full bg-black/20 backdrop-blur-2xl border-t border-white/5 flex-none overflow-hidden"
        style={{ padding: isLandscape || isPhone ? "10px 0" : "clamp(16px, 2vw, 32px) 0" }}
      >
        <div className="relative w-full overflow-hidden">
          <div
            className="hero-scroll pointer-events-none opacity-40"
            style={{
              gap: isPhone ? "3rem" : "clamp(4rem, 8vw, 10rem)",
              paddingRight: isPhone ? "3rem" : "clamp(4rem, 8vw, 10rem)",
            }}
          >
            <LogoTrack logos={CLIENT_NAMES} isLandscapePhone={isLandscape} isSmallPhone={isPhone} />
            <LogoTrack logos={CLIENT_NAMES} isLandscapePhone={isLandscape} isSmallPhone={isPhone} />
          </div>
        </div>
      </div>
    </section>
  );
};

const LogoTrack = ({
  logos,
  isLandscapePhone,
  isSmallPhone,
}: {
  logos: string[];
  isLandscapePhone: boolean;
  isSmallPhone: boolean;
}) => (
  <div
    className="flex items-center grayscale invert brightness-0"
    style={{ gap: isSmallPhone ? "3rem" : "clamp(4rem, 8vw, 10rem)" }}
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
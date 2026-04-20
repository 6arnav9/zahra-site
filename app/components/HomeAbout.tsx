"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const SECTORS = [
  { name: 'Construction & Civil', href: '/industries/construction' },
  { name: 'Healthcare', href: '/industries/healthcare' },
  { name: 'Logistics', href: '/industries/transportation' },
  { name: 'Hospitality', href: '/industries/hospitality' },
  { name: 'Security', href: '/industries/security' }
];

type ViewportTier = "watch" | "landscapePhone" | "normal";

function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return "normal";
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 220) return "watch";
  if (h < 520 && w < 1024) return "landscapePhone";
  return "normal";
}

const HomeAbout = () => {
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
    const t = setTimeout(update, 300);
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(t);
    };
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isLandscapePhone = tier === "landscapePhone";

  if (isWatch) {
    return (
      <section
        className="w-full bg-[#fdfdfd] font-[family-name:var(--font-open-sans)]"
        style={{
          minHeight: "100dvh",
          paddingTop: navHeight,
          paddingBottom: navHeight,
          paddingLeft: 8,
          paddingRight: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div className="w-8 h-[1px] bg-[#006837] mb-3 opacity-50" />

        <h2
          className="font-bold leading-tight font-[family-name:var(--font-cormorant)] italic text-gray-900 tracking-tight"
          style={{ fontSize: "12px", marginBottom: 6 }}
        >
          Powering Global <br/>
          <span className="text-[#006837] opacity-80">Infrastructure.</span>
        </h2>

        <p
          className="text-gray-500 leading-snug font-medium"
          style={{ fontSize: "7px", marginBottom: 10, maxWidth: "90%" }}
        >
          Since 2001 — High-impact talent for the Middle East & Europe.
        </p>

        <Link
          href="/about"
          className="bg-[#006837] text-white font-black rounded-full uppercase tracking-widest active:scale-95 transition-transform"
          style={{ fontSize: "7px", padding: "5px 12px" }}
        >
          Explore
        </Link>
      </section>
    );
  }

  // ─── STANDARD LAYOUT ──────────────────────────────────────────────────────
  const hPad = "clamp(1rem, 5vw, 4rem)";
  const clusterMaxH = isLandscapePhone
    ? "clamp(140px, 78dvh, 420px)"
    : "clamp(180px, 38dvh, 520px)";

  return (
    <section
      className="relative w-full bg-[#fdfdfd] text-[#1B2B21] font-[family-name:var(--font-open-sans)] overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Subtle architectural grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      />

      <div
        className="relative z-10 w-full flex flex-col justify-center"
        style={{
          minHeight: "100dvh",
          paddingTop: navHeight,
          paddingBottom: isLandscapePhone ? Math.round(navHeight * 0.6) : navHeight,
          paddingLeft: hPad,
          paddingRight: hPad,
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center" style={{ flex: 1 }}>
          <div
            className={`w-full flex gap-[clamp(1.5rem,5vw,5rem)] ${
              isLandscapePhone
                ? "flex-row items-center"
                : "flex-col lg:flex-row items-center"
            }`}
          >

            {/* ── LEFT: NARRATIVE ─────────────────────────────────────────── */}
            <div
              className={`flex flex-col items-start ${
                isLandscapePhone ? "w-[55%]" : "w-full lg:w-[52%]"
              }`}
              style={{ gap: "clamp(0.75rem, 2.5dvh, 2rem)" }}
            >
              <div className="overflow-hidden">
                <span className="block text-[10px] font-black tracking-[0.4em] uppercase text-[#006837]/60 mb-2">
                  Establishment
                </span>
              </div>

              <h2
                className="font-medium leading-[1.05] font-[family-name:var(--font-cormorant)] italic text-gray-900 tracking-tight"
                style={{
                  fontSize: isLandscapePhone
                    ? "clamp(1.2rem, 4vw, 2.2rem)"
                    : "clamp(1.75rem, 5vw + 0.5dvh, 4rem)",
                }}
              >
                Powering the World's <br className={isLandscapePhone ? "hidden" : "inline"} />
                <span className="text-[#006837]">Essential Industries.</span>
              </h2>

              <p
                className="text-gray-600/90 font-medium leading-relaxed"
                style={{
                  fontSize: isLandscapePhone
                    ? "clamp(0.7rem, 1.4vw, 1rem)"
                    : "clamp(0.85rem, 1.5vw, 1.15rem)",
                }}
              >
                Since 2001, Al Zahra has transitioned beyond traditional recruitment. 
                We architect the workforce strategy required to sustain infrastructure, 
                healthcare, and global commerce.
              </p>

              {!isLandscapePhone && (
                <p
                  className="text-gray-500 font-medium leading-relaxed hidden sm:block"
                  style={{
                    fontSize: "clamp(0.85rem, 1.2vw, 1.05rem)",
                  }}
                >
                  Operating as a bridge between frontline talent and global enterprise, 
                  we deliver reliability at an institutional scale.
                </p>
              )}

              {/* Sector pills */}
              {!isLandscapePhone && (
                <div className="flex flex-wrap" style={{ gap: "10px" }}>
                  {SECTORS.map((sector) => (
                    <Link
                      key={sector.name}
                      href={sector.href}
                      className="bg-white border border-black/5 rounded-full font-bold text-[#006837]/70 uppercase tracking-widest shadow-sm hover:border-[#006837] hover:text-[#006837] transition-all duration-300 whitespace-nowrap"
                      style={{
                        fontSize: "clamp(0.6rem, 0.8vw, 0.75rem)",
                        padding: "8px 18px",
                      }}
                    >
                      {sector.name}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/about"
                className="group flex items-center bg-[#006837] hover:bg-[#004d29] text-white font-black rounded-full transition-all duration-500 ease-out-expo shadow-2xl uppercase tracking-[0.2em] w-fit"
                style={{
                  gap: "12px",
                  fontSize: isLandscapePhone
                    ? "clamp(0.65rem, 1.2vw, 0.85rem)"
                    : "clamp(0.75rem, 1vw, 0.9rem)",
                  padding: isLandscapePhone
                    ? "10px 24px"
                    : "16px 42px",
                }}
              >
                Our Authority
                <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out-expo">→</span>
              </Link>
            </div>

            {/* ── RIGHT: IMAGE CLUSTER ────────────────────────────────────── */}
            <div
              className={`relative flex justify-center items-center ${
                isLandscapePhone ? "w-[45%]" : "w-full lg:w-[48%] hidden sm:flex"
              }`}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#006837]/5 blur-[80px] rounded-full pointer-events-none" />

              <div
                className="relative w-full"
                style={{
                  maxHeight: clusterMaxH,
                  aspectRatio: isLandscapePhone ? "1 / 1" : "4 / 5",
                  maxWidth: isLandscapePhone ? "100%" : "clamp(320px, 45vw, 540px)",
                }}
              >

                {/* Image 1: Civil & Engineering */}
                <div className="absolute right-0 bottom-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl border-[6px] border-white z-10 group bg-gray-100">
                  <Image
                    src="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Civil and Engineering" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 lg:bottom-8 lg:left-8">
                    <p className="text-white/80 font-bold tracking-[0.2em] uppercase mb-1" style={{ fontSize: "clamp(0.4rem, 0.8vw, 0.75rem)" }}>Institutional</p>
                    <p className="text-white font-[family-name:var(--font-cormorant)] italic font-medium leading-tight" style={{ fontSize: "clamp(1rem, 2.5vw, 1.8rem)" }}>Civil & Engineering</p>
                  </div>
                </div>

                {/* Image 2: Hospitality */}
                <div className="absolute left-0 top-0 w-[55%] h-[50%] rounded-2xl overflow-hidden shadow-xl border-[6px] border-white z-20 group bg-gray-100">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop"
                    alt="Hospitality and Catering" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000 grayscale hover:grayscale-0"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-3 lg:bottom-6 lg:left-6">
                    <p className="text-white/80 font-bold tracking-[0.2em] uppercase mb-1" style={{ fontSize: "clamp(0.35rem, 0.7vw, 0.65rem)" }}>Luxury</p>
                    <p className="text-white font-[family-name:var(--font-cormorant)] italic font-medium leading-tight" style={{ fontSize: "clamp(0.8rem, 1.8vw, 1.4rem)" }}>Hospitality & Excellence</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
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

const HomeAbout = () => {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<ViewportTier>("desktop");
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
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isPhone = tier === "phone";
  const isLandscape = tier === "landscape";

  if (isWatch) {
    return (
      <section
        className="w-full bg-[#050505] font-[family-name:var(--font-open-sans)]"
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
          className="font-bold leading-tight font-[family-name:var(--font-cormorant)] italic text-white tracking-tight"
          style={{ fontSize: "12px", marginBottom: 6 }}
        >
          Powering Global <br/>
          <span className="text-[#006837] opacity-80">Infrastructure.</span>
        </h2>

        <p
          className="text-white/40 leading-snug font-medium"
          style={{ fontSize: "7px", marginBottom: 10, maxWidth: "90%" }}
        >
          Since 2001 — High-impact talent for the Middle East & Europe.
        </p>

        <Link
          href="/about"
          className="bg-[#006837] text-white font-black rounded-full uppercase tracking-widest active:scale-95 transition-transform"
          style={{ fontSize: "7px", padding: "5px 14px" }}
        >
          Explore
        </Link>
      </section>
    );
  }

  // ─── STANDARD LAYOUT ──────────────────────────────────────────────────────
  const hPad = "clamp(1.5rem, 6vw, 6rem)";
  const clusterMaxH = isLandscape
    ? "clamp(140px, 75dvh, 400px)"
    : "clamp(180px, 40dvh, 560px)";

  return (
    <section
      className="relative w-full bg-[#050505] text-white font-[family-name:var(--font-open-sans)] overflow-hidden"
      style={{ minHeight: "100dvh" }}
    >
      {/* Subtle Architectural Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)', backgroundSize: '48px 48px' }}
      />

      <div
        className="relative z-10 w-full flex flex-col justify-center"
        style={{
          minHeight: "100dvh",
          paddingTop: isLandscape ? navHeight : navHeight + 32,
          paddingBottom: isLandscape ? 32 : navHeight + 32,
          paddingLeft: hPad,
          paddingRight: hPad,
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center" style={{ flex: 1 }}>
          <div
            className={`w-full flex gap-[clamp(1.5rem,5vw,6rem)] ${
              isLandscape
                ? "flex-row items-center"
                : "flex-col lg:flex-row items-center"
            }`}
          >

            {/* ── LEFT: NARRATIVE ─────────────────────────────────────────── */}
            <div
              className={`flex flex-col items-start ${
                isLandscape ? "w-[55%]" : "w-full lg:w-[50%]"
              }`}
              style={{ gap: isLandscape ? "1rem" : "clamp(1rem, 3dvh, 2.5rem)" }}
            >
              <div className="overflow-hidden">
                <span className="block font-black tracking-[0.5em] uppercase text-[#006837]/80 mb-2"
                  style={{ fontSize: isPhone || isLandscape ? '9px' : '10px' }}
                >
                  Institutional Excellence
                </span>
              </div>

              <h2
                className="font-medium leading-[1.1] font-[family-name:var(--font-cormorant)] italic text-white tracking-tight"
                style={{
                  fontSize: isLandscape
                    ? "clamp(1.5rem, 4vw, 2.2rem)"
                    : isPhone
                    ? "clamp(1.8rem, 8vw, 2.5rem)"
                    : "clamp(2.5rem, 5vw, 4.5rem)",
                }}
              >
                The Architecture of <br className={isLandscape ? "hidden" : "inline"} />
                <span className="opacity-50 text-white">Global Talent.</span>
              </h2>

              <p
                className="text-white/50 font-medium leading-relaxed"
                style={{
                  fontSize: isLandscape
                    ? "clamp(0.75rem, 1.2vw, 0.95rem)"
                    : isPhone
                    ? "clamp(0.85rem, 4vw, 1rem)"
                    : "clamp(1rem, 1.2vw, 1.15rem)",
                }}
              >
                Since 2001, Al Zahra has transitioned beyond recruitment to become 
                a strategic mobilizer of the world's most critical workforce. 
                We deliver the human infrastructure that builds nations.
              </p>

              {!isLandscape && !isPhone && (
                <p
                  className="text-white/40 font-medium leading-relaxed hidden sm:block"
                  style={{
                    fontSize: "clamp(0.9rem, 1.1vw, 1rem)",
                  }}
                >
                  Operating as the bridge between large-scale ambition and technical 
                  execution, we provide reliability at scale.
                </p>
              )}

              {/* Sector pills - Luxury Style */}
              {!isLandscape && (
                <div className="flex flex-wrap" style={{ gap: "8px" }}>
                  {SECTORS.map((sector) => (
                    <Link
                      key={sector.name}
                      href={sector.href}
                      className="group relative overflow-hidden border border-white/10 transition-all duration-500 ease-out-expo hover:border-[#006837]/50 whitespace-nowrap"
                      style={{
                        padding: "clamp(6px, 1.2vh, 8px) clamp(14px, 2.5vw, 18px)",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out-expo" />
                      <span className="relative z-10 font-black uppercase tracking-[0.2em] text-white/40 group-hover:text-white transition-colors duration-500" style={{ fontSize: "clamp(0.55rem, 0.7vw, 0.7rem)" }}>
                        {sector.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/about"
                className="group relative bg-[#006837] overflow-hidden transition-all duration-700 ease-out-expo hover:scale-105 hover:shadow-[0_0_40px_rgba(0,104,55,0.3)] w-fit"
                style={{
                  padding: isLandscape
                    ? "clamp(8px, 2vh, 12px) clamp(24px, 4vw, 32px)"
                    : "clamp(12px, 2vw, 16px) clamp(32px, 5vw, 48px)",
                }}
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
                <div className="relative z-10 flex items-center gap-4">
                  <span className="font-black uppercase tracking-[0.25em] text-white" style={{ fontSize: isLandscape ? "0.7rem" : "clamp(0.75rem, 0.9vw, 0.85rem)" }}>
                    Explore More
                  </span>
                  <span className="group-hover:translate-x-2 transition-transform duration-700 ease-out-expo text-white text-xs">→</span>
                </div>
              </Link>
            </div>

            {/* ── RIGHT: IMAGE CLUSTER ────────────────────────────────────── */}
            <div
              className={`relative flex justify-center items-center ${
                isLandscape ? "w-[45%]" : "w-full lg:w-[50%] hidden sm:flex"
              }`}
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#006837]/10 blur-[100px] rounded-full pointer-events-none" />

              <div
                className="relative w-full"
                style={{
                  maxHeight: clusterMaxH,
                  aspectRatio: isLandscape ? "1 / 1" : "4 / 5",
                  maxWidth: isLandscape ? "100%" : "clamp(350px, 45vw, 580px)",
                }}
              >

                {/* Image 1: Civil & Engineering - Institutional Grayscale */}
                <div className="absolute right-0 bottom-0 w-[82%] h-[82%] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-[#0a0a0a] z-10 group bg-gray-900">
                  <Image
                    src="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Civil and Engineering" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out-expo"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                    <p className="text-white/60 font-bold tracking-[0.25em] uppercase mb-2" style={{ fontSize: "clamp(0.45rem, 0.8vw, 0.8rem)" }}>Strategic</p>
                    <p className="text-white font-[family-name:var(--font-cormorant)] italic font-medium leading-tight" style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)" }}>Civil Infrastructure</p>
                  </div>
                </div>

                {/* Image 2: Hospitality - Luxury Tint */}
                <div className="absolute left-0 top-0 w-[58%] h-[52%] rounded-2xl overflow-hidden shadow-xl border-[8px] border-[#0a0a0a] z-20 group bg-gray-900">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop"
                    alt="Hospitality and Catering" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out-expo"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8">
                    <p className="text-white/60 font-bold tracking-[0.25em] uppercase mb-2" style={{ fontSize: "clamp(0.4rem, 0.7vw, 0.7rem)" }}>Premium</p>
                    <p className="text-white font-[family-name:var(--font-cormorant)] italic font-medium leading-tight" style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}>Luxury Hospitality</p>
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

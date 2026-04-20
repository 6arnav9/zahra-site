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
    // Re-measure once the navbar has fully hydrated
    const t = setTimeout(update, 300);
    return () => {
      window.removeEventListener('resize', update);
      clearTimeout(t);
    };
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isLandscapePhone = tier === "landscapePhone";

  // ─── APPLE WATCH LAYOUT ────────────────────────────────────────────────────
  // Watch screen is ~162×197px of usable space (after browser chrome).
  // The navbar is already rendered above (28px logo-only bar).
  // Strategy: no image — same reasoning as portrait phones but even more so.
  // Content = headline + one-line tagline + CTA, all centred.
  // We use equal top/bottom padding around the centred content so it sits
  // in the true optical middle of the remaining space below the navbar.
  if (isWatch) {
    return (
      <section
        className="w-full bg-[#f4f7f6] font-[family-name:var(--font-open-sans)]"
        style={{
          minHeight: "100dvh",
          // Equal top/bottom padding ensures true vertical centring
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
        {/* Thin green accent line above headline — adds brand colour without an image */}
        <div className="w-8 h-[2px] bg-[#39B54A] mb-2 rounded-full" />

        <h2
          className="font-black leading-tight font-[family-name:var(--font-montserrat)] text-gray-900 tracking-tight"
          style={{ fontSize: "clamp(10px, 5vw, 13px)", marginBottom: 4 }}
        >
          Powering the World's{" "}
          <span className="text-[#39B54A]">Essential Industries.</span>
        </h2>

        <p
          className="text-gray-500 leading-snug"
          style={{ fontSize: "7px", marginBottom: 8, maxWidth: "90%" }}
        >
          Since 2001 — skilled workforce for the Middle East &amp; Europe.
        </p>

        <Link
          href="/about"
          className="bg-[#006837] text-white font-bold rounded-full uppercase tracking-wider"
          style={{ fontSize: "7px", padding: "5px 12px" }}
        >
          Learn More →
        </Link>
      </section>
    );
  }

  // ─── STANDARD LAYOUT ──────────────────────────────────────────────────────
  //
  // CENTRING STRATEGY — why the old code broke:
  //   Old: section height=100dvh + paddingTop=navHeight
  //        → inner height = 100dvh - navHeight, content flows from top
  //        → no true vertical centring; overflows when content is tall
  //
  //   New: section min-height=100dvh, inner container uses:
  //        paddingTop=navHeight (clears navbar)
  //        paddingBottom=same value (mirrors top, so visual centre = true centre)
  //        display:flex + align-items:center fills remaining height symmetrically
  //        All font/image sizes use clamp() with dvh units so they SHRINK
  //        before the content can ever overflow.
  //
  // The image cluster height is the biggest overflow culprit.
  // It's now capped at `clamp(180px, 42dvh, 520px)` so it always fits
  // within the available height after the navbar and symmetric padding.

  const hPad = "clamp(1rem, 4vw, 3rem)";

  // Image cluster: portrait phones get less height so text isn't squeezed
  // Landscape phones: row layout, cluster is height-constrained by viewport
  // Tablet portrait / desktop: generous but still capped to prevent overflow
  const clusterMaxH = isLandscapePhone
    ? "clamp(140px, 78dvh, 420px)"
    : "clamp(180px, 38dvh, 520px)";

  return (
    <section
      className="relative w-full bg-[#f4f7f6] text-[#1B2B21] font-[family-name:var(--font-open-sans)] overflow-hidden"
      // min-height not height — allows breathing room if fonts are huge
      // but prevents scroll on normal screens.
      style={{ minHeight: "100dvh" }}
    >
      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/*
        ── MAIN CONTAINER ────────────────────────────────────────────────────
        Uses flex + justify-center + align-items-center to TRULY centre.
        paddingTop = navHeight     ← clears the fixed navbar
        paddingBottom = navHeight  ← mirrors top so visual centre = real centre
        paddingLeft/Right = standard content inset

        On landscape phones paddingBottom is smaller (mobile nav is shorter
        and we have less vertical room to spare).
      */}
      <div
        className="relative z-10 w-full flex flex-col justify-center"
        style={{
          minHeight: "100dvh",
          paddingTop: navHeight,
          // Mirror the top padding so content is optically centred.
          // On landscape phone we use a smaller bottom pad since height is tight.
          paddingBottom: isLandscapePhone ? Math.round(navHeight * 0.6) : navHeight,
          paddingLeft: hPad,
          paddingRight: hPad,
        }}
      >
        <div className="w-full max-w-7xl mx-auto flex items-center justify-center" style={{ flex: 1 }}>
          {/*
            ROW vs COLUMN layout:
              landscapePhone → always side-by-side (row), 55/45 split
              portrait phone → stacked (column)
              tablet portrait → stacked until lg breakpoint
              lg+ (tablet landscape, desktop) → side-by-side via lg:flex-row
          */}
          <div
            className={`w-full flex gap-[clamp(1rem,3vw,3rem)] ${
              isLandscapePhone
                ? "flex-row items-center"
                : "flex-col lg:flex-row items-center"
            }`}
          >

            {/* ── LEFT: NARRATIVE ─────────────────────────────────────────── */}
            <div
              className={`flex flex-col items-start ${
                isLandscapePhone ? "w-[55%]" : "w-full lg:w-1/2"
              }`}
              style={{ gap: "clamp(0.5rem, 1.8dvh, 1.5rem)" }}
            >
              <h2
                className="font-black leading-[1.05] font-[family-name:var(--font-montserrat)] text-gray-900 tracking-tight"
                style={{
                  // Width-fluid but also height-aware: shrinks on short screens
                  fontSize: isLandscapePhone
                    ? "clamp(1rem, 3.5vw, 2rem)"
                    : "clamp(1.5rem, 4vw + 0.25dvh, 3.5rem)",
                }}
              >
                Powering the World's{" "}
                <br className={isLandscapePhone ? "hidden" : "inline"} />
                <span className="text-[#39B54A]">Essential Industries.</span>
              </h2>

              <p
                className="text-gray-600"
                style={{
                  fontSize: isLandscapePhone
                    ? "clamp(0.65rem, 1.2vw, 0.95rem)"
                    : "clamp(0.75rem, 1.4vw + 0.1dvh, 1.1rem)",
                  lineHeight: 1.55,
                }}
              >
                Since 2001, Al Zahra has gone beyond filling desks. We deploy the
                highly skilled, ethical, and resilient workforce required to build
                infrastructure, run healthcare systems, and manage global supply chains.
              </p>

              {/* Second paragraph — hidden on landscape phone to save height */}
              {!isLandscapePhone && (
                <p
                  className="text-gray-600"
                  style={{
                    fontSize: "clamp(0.75rem, 1.4vw + 0.1dvh, 1.1rem)",
                    lineHeight: 1.55,
                  }}
                >
                  Operating out of{" "}
                  <strong className="text-[#006837]">Dubai, India, and Nepal</strong>,
                  Mr. Ashish Kumar Singh and our expert team bridge the gap between
                  massive global projects across the Middle East & Europe, and the
                  frontline talent that brings them to life.
                </p>
              )}

              {/* Sector pills — hidden on landscape phone */}
              {!isLandscapePhone && (
                <div className="flex flex-wrap" style={{ gap: "clamp(5px, 0.8vw, 10px)" }}>
                  {SECTORS.map((sector) => (
                    <Link
                      key={sector.name}
                      href={sector.href}
                      className="bg-white border border-gray-200 rounded-full font-bold text-gray-700 uppercase tracking-wider shadow-sm hover:border-[#39B54A] hover:text-[#006837] transition-all whitespace-nowrap"
                      style={{
                        fontSize: "clamp(0.55rem, 0.85vw, 0.72rem)",
                        padding: "clamp(4px, 0.8dvh, 8px) clamp(10px, 1.5vw, 16px)",
                      }}
                    >
                      {sector.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* CTA */}
              <Link
                href="/about"
                className="group flex items-center bg-[#006837] hover:bg-[#39B54A] text-white font-bold rounded-full transition-all duration-300 shadow-xl uppercase tracking-widest w-fit"
                style={{
                  gap: "8px",
                  fontSize: isLandscapePhone
                    ? "clamp(0.55rem, 1vw, 0.8rem)"
                    : "clamp(0.6rem, 0.9vw + 0.1dvh, 0.875rem)",
                  padding: isLandscapePhone
                    ? "clamp(6px, 1dvh, 10px) clamp(14px, 2vw, 24px)"
                    : "clamp(8px, 1.4dvh, 16px) clamp(16px, 3vw, 32px)",
                }}
              >
                Learn About Us
                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
              </Link>
            </div>

            {/* ── RIGHT: IMAGE CLUSTER ────────────────────────────────────── */}
            {/*
              The cluster uses a FIXED MAX HEIGHT derived from dvh so it can
              never be taller than the available viewport space.
              aspect-ratio keeps proportions correct as width shrinks.
              On portrait mobile the cluster is hidden at small heights to
              ensure the text always fits — it's revealed from md: upward.
            */}
            <div
              className={`relative flex justify-center items-center ${
                isLandscapePhone ? "w-[45%]" : "w-full lg:w-1/2 hidden sm:flex"
              }`}
            >
              {/* Green glow blob */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#39B54A]/15 blur-[60px] rounded-full pointer-events-none" />

              {/*
                Cluster wrapper:
                  Width = 100% of its column
                  Height = clamp(dvh-based) so it never overflows
                  aspect-ratio = 4/3 for landscape-phone (square-ish)
                             = 4/5 for portrait/desktop (taller)
              */}
              <div
                className="relative w-full"
                style={{
                  maxHeight: clusterMaxH,
                  // Aspect ratio drives the width-height relationship.
                  // We use style not class so it's always applied.
                  aspectRatio: isLandscapePhone ? "1 / 1" : "4 / 5",
                  maxWidth: isLandscapePhone ? "100%" : "clamp(280px, 42vw, 500px)",
                }}
              >

                {/* Image 1: Civil & Engineering — large bottom-right anchor */}
                <div className="absolute right-0 bottom-0 w-[75%] h-[75%] rounded-xl lg:rounded-2xl overflow-hidden shadow-2xl border-4 border-[#f4f7f6] z-10 group bg-gray-200">
                  <Image
                    src="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Civil and Engineering" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-2 left-2 lg:bottom-5 lg:left-5">
                    <p className="text-[#39B54A] font-bold tracking-widest uppercase mb-0.5" style={{ fontSize: "clamp(0.35rem, 0.9vw, 0.7rem)" }}>Sector Focus</p>
                    <p className="text-white font-[family-name:var(--font-montserrat)] font-bold leading-tight" style={{ fontSize: "clamp(0.6rem, 1.8vw, 1.4rem)" }}>Civil & Engineering</p>
                  </div>
                </div>

                {/* Image 2: Hospitality — top-left overlay */}
                <div className="absolute left-0 top-0 w-[55%] h-[45%] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl border-4 border-[#f4f7f6] z-20 group bg-gray-200">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop"
                    alt="Hospitality and Catering" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-1.5 left-1.5 lg:bottom-4 lg:left-4">
                    <p className="text-[#39B54A] font-bold tracking-widest uppercase mb-0.5" style={{ fontSize: "clamp(0.25rem, 0.7vw, 0.55rem)" }}>Sector Focus</p>
                    <p className="text-white font-[family-name:var(--font-montserrat)] font-bold leading-tight" style={{ fontSize: "clamp(0.45rem, 1.3vw, 0.95rem)" }}>Hospitality &<br />Catering</p>
                  </div>
                </div>

                {/* Image 3: Logistics — mid-left floating card */}
                <div className="absolute left-[5%] bottom-[15%] w-[45%] h-[35%] rounded-xl lg:rounded-2xl overflow-hidden shadow-xl border-4 border-[#f4f7f6] z-30 group bg-gray-200">
                  <Image
                    src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Logistics and Supply Chain" fill
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-1.5 left-1.5 lg:bottom-4 lg:left-4">
                    <p className="text-[#39B54A] font-bold tracking-widest uppercase mb-0.5" style={{ fontSize: "clamp(0.25rem, 0.7vw, 0.55rem)" }}>Sector Focus</p>
                    <p className="text-white font-[family-name:var(--font-montserrat)] font-bold leading-tight" style={{ fontSize: "clamp(0.4rem, 1.1vw, 0.9rem)" }}>Logistics &<br />Supply Chain</p>
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
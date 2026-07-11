"use client";

import Image from "next/image";
import Link from "next/link";
import { useViewport } from "../hooks/useViewport";
import { Button, Section, SectionHeader } from "./ui";

const SECTORS = [
  { name: "Construction & Civil", href: "/industries/construction" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Logistics", href: "/industries/transportation" },
  { name: "Hospitality", href: "/industries/hospitality" },
  { name: "Security", href: "/industries/security" },
];

const HomeAbout = () => {
  const { mounted, isWatch, isPhone, isLandscape, navHeight } = useViewport();

  if (!mounted) return null;

  if (isWatch) {
    return (
      <Section
        bg="ink"
        paddingSize="none"
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
        <div className="w-8 h-[1px] bg-brand-green mb-3 opacity-50" />

        <SectionHeader
          isWatch
          title={
            <>
              Powering Global <br />
              <span className="text-brand-green opacity-80">Infrastructure.</span>
            </>
          }
        />

        <p className="text-white/40 leading-snug font-medium text-[7px] mb-4 mt-2 max-w-[90%]">
          Since 2001 — High-impact talent for the Middle East & Europe.
        </p>

        <Button href="/about" variant="primary" size="sm" style={{ fontSize: "7px", padding: "5px 14px" }}>
          Explore
        </Button>
      </Section>
    );
  }

  // ─── STANDARD LAYOUT ──────────────────────────────────────────────────────
  const hPad = "clamp(1.5rem, 6vw, 6rem)";
  const clusterMaxH = isLandscape
    ? "clamp(140px, 75dvh, 400px)"
    : "clamp(180px, 40dvh, 560px)";

  return (
    <Section
      bg="ink"
      showGrid
      gridSize="sm"
      showGlow
      glowPosition="center"
      glowColor="green"
      paddingSize="none"
      style={{ minHeight: "100dvh" }}
    >
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
              isLandscape ? "flex-row items-center" : "flex-col lg:flex-row items-center"
            }`}
          >
            {/* ── LEFT: NARRATIVE ─────────────────────────────────────────── */}
            <div
              className={`flex flex-col items-start ${isLandscape ? "w-[55%]" : "w-full lg:w-[50%]"}`}
              style={{ gap: isLandscape ? "1rem" : "clamp(1rem, 3dvh, 2.5rem)" }}
            >
              <SectionHeader
                isPhone={isPhone}
                isLandscape={isLandscape}
                eyebrow="Institutional Excellence"
                title={
                  <>
                    The Architecture of <br className={isLandscape ? "hidden" : "inline"} />
                    <span className="opacity-50 text-white">Global Talent.</span>
                  </>
                }
                description="Since 2001, Al Zahra has transitioned beyond recruitment to become a strategic mobilizer of the world's most critical workforce. We deliver the human infrastructure that builds nations."
              />

              {!isLandscape && !isPhone && (
                <p className="text-white/70 font-medium leading-relaxed hidden sm:block text-sm lg:text-base -mt-4 lg:-mt-6">
                  Operating as the bridge between large-scale ambition and technical execution, we provide reliability
                  at scale.
                </p>
              )}

              {/* Sector pills - Luxury Style */}
              {!isLandscape && (
                <div className="flex flex-wrap gap-2">
                  {SECTORS.map((sector) => (
                    <Link
                      key={sector.name}
                      href={sector.href}
                      className="group relative overflow-hidden border border-white/10 transition-all duration-500 ease-out-expo hover:border-brand-green-light/50 whitespace-nowrap"
                      style={{
                        padding: "clamp(6px, 1.2vh, 8px) clamp(14px, 2.5vw, 18px)",
                      }}
                    >
                      <div className="absolute inset-0 bg-white/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out-expo" />
                      <span
                        className="relative z-10 font-label font-black uppercase tracking-[0.2em] text-white/60 group-hover:text-white transition-colors duration-500"
                        style={{ fontSize: "clamp(0.55rem, 0.7vw, 0.7rem)" }}
                      >
                        {sector.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}

              <Button href="/about" variant="primary" showArrow size={isLandscape ? "sm" : "md"}>
                Explore More
              </Button>
            </div>

            {/* ── RIGHT: IMAGE CLUSTER ────────────────────────────────────── */}
            <div className={`relative flex justify-center items-center ${isLandscape ? "w-[45%]" : "w-full lg:w-[50%] hidden sm:flex"}`}>
              <div
                className="relative w-full"
                style={{
                  maxHeight: clusterMaxH,
                  aspectRatio: isLandscape ? "1 / 1" : "4 / 5",
                  maxWidth: isLandscape ? "100%" : "clamp(350px, 45vw, 580px)",
                }}
              >
                {/* Image 1: Civil & Engineering - Institutional Grayscale */}
                <div className="absolute right-0 bottom-0 w-[82%] h-[82%] rounded-brand-lg overflow-hidden shadow-2xl border-[8px] border-[#0a0a0a] z-10 group bg-gray-900">
                  <Image
                    src="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Civil and Engineering"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out-expo"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10">
                    <p
                      className="text-white/60 font-label font-black tracking-[0.25em] uppercase mb-2"
                      style={{ fontSize: "clamp(0.45rem, 0.8vw, 0.8rem)" }}
                    >
                      Strategic
                    </p>
                    <p
                      className="text-white font-headline italic font-medium leading-tight"
                      style={{ fontSize: "clamp(1.2rem, 2.5vw, 2.2rem)" }}
                    >
                      Civil Infrastructure
                    </p>
                  </div>
                </div>

                {/* Image 2: Hospitality - Luxury Tint */}
                <div className="absolute left-0 top-0 w-[58%] h-[52%] rounded-brand-lg overflow-hidden shadow-xl border-[8px] border-[#0a0a0a] z-20 group bg-gray-900">
                  <Image
                    src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop"
                    alt="Hospitality and Catering"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-[1500ms] ease-out-expo"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                  <div className="absolute bottom-5 left-5 lg:bottom-8 lg:left-8">
                    <p
                      className="text-white/60 font-label font-black tracking-[0.25em] uppercase mb-2"
                      style={{ fontSize: "clamp(0.4rem, 0.7vw, 0.7rem)" }}
                    >
                      Premium
                    </p>
                    <p
                      className="text-white font-headline italic font-medium leading-tight"
                      style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}
                    >
                      Luxury Hospitality
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default HomeAbout;

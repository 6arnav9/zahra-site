"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { useViewport, ViewportTier } from "../hooks/useViewport";
import { Section, SectionHeader } from "./ui";

const INDUSTRIES = [
  {
    id: "01",
    name: "Construction & Civil",
    shortName: "Infrastructure",
    description: "Architecting nations with site supervisors, engineers, and heavy infrastructure talent.",
    href: "/industries/construction",
    image: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "02",
    name: "Hospitality & Catering",
    shortName: "Hospitality",
    description: "Premium frontline staff for luxury resorts and large-scale catering operations.",
    href: "/industries/hospitality",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "Healthcare & Medical",
    shortName: "Healthcare",
    description: "Strategic mobilization of nurses, paramedics, and medical support staff.",
    href: "/industries/healthcare",
    image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "04",
    name: "Security Services",
    shortName: "Security",
    description: "Vetted and trained personnel for institutional and corporate protection.",
    href: "/industries/security",
    image: "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "05",
    name: "Office & Admin",
    shortName: "Corporate",
    description: "Reliable administrative professionals and back-office support for enterprises.",
    href: "/industries/office-admin",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "06",
    name: "Transportation",
    shortName: "Logistics",
    description: "Keeping global supply chains moving with fleet coordinators and logistics managers.",
    href: "/industries/transportation",
    image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const HomeIndustries = () => {
  const { mounted, tier, isWatch, isPhone, isLandscape } = useViewport();
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!mounted) return null;

  return (
    <Section
      bg="ink"
      showGrid
      gridSize="lg"
      showGlow
      glowPosition="bottom"
      glowColor="green"
      paddingSize={isWatch ? "sm" : isPhone ? "md" : isLandscape ? "sm" : "lg"}
    >
      {/* ── SEAMLESS TRANSITION GRADIENT ────────────────────────────────────────── */}
      <div className="absolute bottom-0 right-0 w-full h-[60dvh] pointer-events-none overflow-hidden z-0">
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-white/[0.05] via-transparent to-transparent opacity-60" />
      </div>

      {/* Decorative vertical line */}
      {!isWatch && !isPhone && (
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5 hidden lg:block" />
      )}

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-24">
        <SectionHeader
          isWatch={isWatch}
          isPhone={isPhone}
          isLandscape={isLandscape}
          layout="split"
          eyebrow="Strategic Sectors"
          title={
            <>
              Institutional <br />
              <span className={`opacity-30 ${isWatch || isPhone || isLandscape ? "" : "lg:ml-24"}`}>Excellence.</span>
            </>
          }
          description="Directing high-impact workforce strategies across the critical industries that sustain global infrastructure and enterprise."
          actions={
            !isWatch && (
              <Link
                href="/industries"
                className="group flex items-center gap-4 text-brand-green font-label font-black uppercase tracking-[0.3em] text-[9px] sm:text-[10px]"
              >
                The Portfolio
                <span className="group-hover:translate-x-2 transition-transform duration-700 ease-out-expo">→</span>
              </Link>
            )
          }
        />

        {/* Desktop: Mosaic / Mobile: Slider */}
        <div className="relative mt-12 lg:mt-0">
          {/* Horizontal Slider for Mobile/Tablet/Watch/Landscape */}
          <div
            ref={scrollRef}
            className={`flex lg:hidden gap-6 overflow-x-auto ${isWatch ? "pb-6" : "pb-12"} scrollbar-hide snap-x snap-mandatory`}
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {INDUSTRIES.map((industry) => (
              <div
                key={industry.id}
                className={`${
                  isWatch ? "min-w-[85vw]" : isLandscape ? "min-w-[50vw]" : "min-w-[85vw] sm:min-w-[45vw]"
                } snap-center`}
              >
                <IndustryEditorialCard industry={industry} tier={tier} />
              </div>
            ))}
          </div>

          {/* Desktop Mosaic Grid - Asymmetrical Layout */}
          <div className="hidden lg:grid grid-cols-12 gap-8 lg:gap-12 auto-rows-[450px]">
            {/* 01: Construction - Large / Anchor */}
            <IndustryEditorialCard industry={INDUSTRIES[0]} className="col-span-7 row-span-2" featured />

            {/* 02: Hospitality - Narrow / Vertical */}
            <IndustryEditorialCard industry={INDUSTRIES[1]} className="col-span-5 row-span-1" />

            {/* 03: Healthcare - Small / Box */}
            <IndustryEditorialCard industry={INDUSTRIES[2]} className="col-span-5 row-span-1" />

            {/* 04: Security - Middle / Break */}
            <IndustryEditorialCard industry={INDUSTRIES[3]} className="col-span-4 row-span-1 mt-12" />

            {/* 05: Office & Admin - Large / Right */}
            <IndustryEditorialCard industry={INDUSTRIES[4]} className="col-span-8 row-span-1" />

            {/* 06: Transportation - Bottom / Balanced */}
            <IndustryEditorialCard industry={INDUSTRIES[5]} className="col-span-12 row-span-1 -mt-12" />
          </div>
        </div>
      </div>
    </Section>
  );
};

const IndustryEditorialCard = ({
  industry,
  className = "",
  featured = false,
  tier = "desktop",
}: {
  industry: (typeof INDUSTRIES)[0];
  className?: string;
  featured?: boolean;
  tier?: ViewportTier;
}) => {
  const isWatch = tier === "watch";
  const isPhone = tier === "phone";
  const isLandscape = tier === "landscape";

  return (
    <Link
      href={industry.href}
      className={`group relative overflow-hidden flex flex-col justify-end transition-all duration-1000 ease-out-expo focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
      style={{
        height: isWatch ? "160px" : isLandscape ? "250px" : isPhone ? "320px" : "auto",
        minHeight: !className && !isWatch && !isPhone && !isLandscape ? "400px" : "auto",
      }}
    >
      {/* The Frame */}
      <div className="absolute inset-0 bg-[#0a0a0a] group-hover:bg-black transition-colors duration-1000" />

      {/* The Image */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={industry.image}
          alt={industry.name}
          fill
          className={`object-cover grayscale transition-all duration-[2000ms] ease-out-expo group-hover:grayscale-0 group-hover:scale-110 opacity-30 group-hover:opacity-60`}
          unoptimized
        />
        {/* Dark overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
      </div>

      {/* The Content */}
      <div className={`relative z-10 ${isWatch ? "p-3" : isPhone || isLandscape ? "p-6" : "p-8 lg:p-12"} transition-all duration-700`}>
        <div className={`${isWatch || isPhone || isLandscape ? "mb-1" : "mb-6"} flex items-center gap-4 overflow-hidden`}>
          <span
            className={`${
              isWatch || isPhone || isLandscape ? "text-[8px]" : "text-[10px]"
            } font-label font-black text-brand-green-light tracking-[0.5em] uppercase`}
          >
            {industry.id}
          </span>
          {!isWatch && !isPhone && !isLandscape && (
            <div className="h-[1px] w-8 bg-brand-green/30 group-hover:w-16 transition-all duration-700 ease-out-expo" />
          )}
        </div>

        <h3
          className={`font-medium font-headline italic text-white leading-tight tracking-tighter ${
            isWatch
              ? "text-base mb-0"
              : isPhone || isLandscape
              ? "text-2xl mb-2"
              : featured
              ? "text-4xl lg:text-7xl mb-4"
              : "text-3xl lg:text-5xl mb-4"
          }`}
        >
          {industry.name}
        </h3>

        {!isWatch && (
          <div className="max-w-md overflow-hidden">
            <p
              className={`text-white/70 font-medium leading-relaxed transition-all duration-700 lg:opacity-0 lg:translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 ${
                isPhone || isLandscape ? "text-[10px]" : "text-xs lg:text-sm"
              }`}
            >
              {industry.description}
            </p>
          </div>
        )}

        {/* Subtle indicator */}
        {!isWatch && !isPhone && !isLandscape && (
          <div className="mt-8 flex items-center gap-4 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-700">
            <span className="text-[9px] font-label font-black text-brand-green-light uppercase tracking-[0.3em]">
              Explore Sector
            </span>
            <span className="text-brand-green-light">→</span>
          </div>
        )}
      </div>

      {/* Architectural Line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left" />
    </Link>
  );
};

export default HomeIndustries;

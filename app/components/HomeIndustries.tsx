"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

// ─── DATA ─────────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: "01",
    name: "Construction & Civil",
    shortName: "Construction",
    description: "Site supervisors, civil engineers, heavy equipment operators and unskilled labour for infrastructure mega-projects.",
    href: "/industries/construction",
    image: "https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "02",
    name: "Hospitality & Catering",
    shortName: "Hospitality",
    description: "Premium frontline staff for luxury resorts, hotels and large-scale catering operations across the Gulf.",
    href: "/industries/hospitality",
    image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop",
  },
  {
    id: "03",
    name: "Healthcare & Medical",
    shortName: "Healthcare",
    description: "Qualified nurses, paramedics and support staff for hospitals, clinics and care facilities.",
    href: "/industries/healthcare",
    image: "https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "04",
    name: "Security Services",
    shortName: "Security",
    description: "Vetted and trained security personnel for corporate, residential and event protection.",
    href: "/industries/security",
    image: "https://images.pexels.com/photos/2422280/pexels-photo-2422280.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "05",
    name: "Office & Admin",
    shortName: "Office & Admin",
    description: "Reliable administrative professionals, receptionists and back-office support for corporate environments.",
    href: "/industries/office-admin",
    image: "https://images.pexels.com/photos/1181396/pexels-photo-1181396.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "06",
    name: "Transportation",
    shortName: "Transport",
    description: "Heavy-vehicle drivers, fleet coordinators and logistics managers keeping global supply chains moving.",
    href: "/industries/transportation",
    image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

type LayoutTier = "watch" | "landscapePhone" | "portraitMobile" | "desktop";

function getLayoutTier(): LayoutTier {
  if (typeof window === 'undefined') return "desktop";
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 220) return "watch";
  if (h < 520 && w < 1024) return "landscapePhone";
  if (w < 768) return "portraitMobile";
  return "desktop";
}

const AccordionCard = ({ industry }: { industry: typeof INDUSTRIES[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={industry.href}
      className="group relative overflow-hidden flex-shrink-0"
      style={{
        flexBasis: hovered ? "32%" : "12.5%",
        flexGrow: hovered ? 1 : 0,
        transition: "flex-basis 0.6s cubic-bezier(0.16, 1, 0.3, 1), flex-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        borderRadius: "16px",
        height: "100%",
        minWidth: 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Image
        src={industry.image}
        alt={industry.name}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-[1.08] grayscale group-hover:grayscale-0"
        unoptimized
      />

      <div
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)",
          opacity: hovered ? 0.7 : 0.85,
        }}
      />

      <div className="absolute top-6 left-6 z-10">
        <span
          className="font-black font-[family-name:var(--font-open-sans)] transition-all duration-500 tracking-[0.2em]"
          style={{
            fontSize: "clamp(0.65rem, 0.8vw, 0.75rem)",
            color: hovered ? "#006837" : "rgba(255,255,255,0.4)",
            transform: hovered ? "translateY(-2px)" : "none",
          }}
        >
          {industry.id}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 flex flex-col">
        <h3
          className="font-medium font-[family-name:var(--font-cormorant)] italic text-white leading-tight transition-all duration-500"
          style={{
            fontSize: hovered ? "clamp(1.2rem, 1.8vw, 2rem)" : "clamp(0.8rem, 1.1vw, 1.1rem)",
            writingMode: hovered ? "horizontal-tb" : "vertical-rl",
            transform: hovered ? "none" : "rotate(180deg)",
            alignSelf: hovered ? "flex-start" : "center",
            marginBottom: hovered ? "12px" : "0",
            whiteSpace: hovered ? "normal" : "nowrap",
          }}
        >
          {industry.name}
        </h3>

        <div
          style={{
            maxHeight: hovered ? "100px" : "0px",
            opacity: hovered ? 1 : 0,
            overflow: "hidden",
            transition: "max-height 0.5s ease, opacity 0.4s ease",
          }}
        >
          <p
            className="text-white/80 font-medium leading-relaxed mb-4"
            style={{ fontSize: "clamp(0.75rem, 0.9vw, 0.9rem)" }}
          >
            {industry.description}
          </p>
        </div>

        <div
          className="flex items-center gap-2 text-white font-black uppercase transition-all duration-500"
          style={{
            fontSize: "9px",
            letterSpacing: "0.3em",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
          }}
        >
          Discover
          <span
            className="inline-block transition-transform duration-500"
            style={{ transform: hovered ? "translateX(4px)" : "none" }}
          >
            →
          </span>
        </div>
      </div>
    </Link>
  );
};

const CompactCard = ({ industry }: { industry: typeof INDUSTRIES[0] }) => (
  <Link
    href={industry.href}
    className="group relative overflow-hidden rounded-xl flex items-end"
    style={{ height: "clamp(120px, 25vw, 180px)" }}
  >
    <Image
      src={industry.image}
      alt={industry.name}
      fill
      className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0"
      unoptimized
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#006837] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    <div className="relative z-10 p-4 w-full">
      <p className="text-[#006837] font-black uppercase mb-1" style={{ fontSize: "8px", letterSpacing: "0.2em" }}>
        {industry.id}
      </p>
      <p
        className="text-white font-medium font-[family-name:var(--font-cormorant)] italic leading-tight"
        style={{ fontSize: "clamp(0.9rem, 4vw, 1.25rem)" }}
      >
        {industry.shortName}
      </p>
    </div>
  </Link>
);

const HomeIndustries = () => {
  const [mounted, setMounted] = useState(false);
  const [layoutTier, setLayoutTier] = useState<LayoutTier>("desktop");

  useEffect(() => {
    setMounted(true);
    const update = () => setLayoutTier(getLayoutTier());
    update();
    window.addEventListener('resize', update);
    const t = setTimeout(update, 300);
    return () => { window.removeEventListener('resize', update); clearTimeout(t); };
  }, []);

  if (!mounted) return null;

  const isWatch = layoutTier === "watch";
  const isLandscapePhone = layoutTier === "landscapePhone";
  const isPortraitMobile = layoutTier === "portraitMobile";
  const isDesktop = layoutTier === "desktop";

  if (isWatch) {
    return (
      <section
        className="w-full bg-[#050505] text-white font-[family-name:var(--font-open-sans)]"
        style={{ padding: "16px 8px" }}
      >
        <p className="text-[#006837] font-black uppercase mb-1" style={{ fontSize: "7px", letterSpacing: "0.2em" }}>
          Sectors
        </p>
        <h2
          className="font-bold font-[family-name:var(--font-cormorant)] italic text-white leading-tight mb-4"
          style={{ fontSize: "12px" }}
        >
          Specialized <span className="text-[#006837]/80">Expertise.</span>
        </h2>
        <div className="flex flex-col gap-1">
          {INDUSTRIES.map((ind, i) => (
            <Link
              key={ind.id}
              href={ind.href}
              className="flex items-center justify-between py-2 active:bg-white/5 px-1 rounded transition-colors"
            >
              <span className="text-white/80 font-bold" style={{ fontSize: "8px" }}>{ind.shortName}</span>
              <span className="text-[#006837] font-black" style={{ fontSize: "8px" }}>→</span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const sectionPadding = isLandscapePhone
    ? "clamp(1.5rem,4dvh,3rem) clamp(1rem,5vw,2rem)"
    : isPortraitMobile
    ? "clamp(3rem,6dvh,5rem) clamp(1rem,5vw,2rem)"
    : "clamp(4rem,8dvh,8rem) clamp(2rem,6vw,4rem)";

  return (
    <section className="relative w-full bg-[#050505] text-white font-[family-name:var(--font-open-sans)] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#006837 1px, transparent 1px), linear-gradient(90deg, #006837 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none opacity-20"
        style={{
          width: "100%",
          height: "400px",
          background: "radial-gradient(ellipse at center, #006837 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto" style={{ padding: sectionPadding }}>

        <div
          className={`flex ${isLandscapePhone || isPortraitMobile ? "flex-col" : "flex-row items-end justify-between"}`}
          style={{
            marginBottom: isLandscapePhone
              ? "1.5rem"
              : isPortraitMobile
              ? "2.5rem"
              : "4rem",
          }}
        >
          <div>
            <div className="overflow-hidden">
              <span className="block text-[10px] font-black tracking-[0.4em] uppercase text-[#006837]/80 mb-3 animate-in fade-in slide-in-from-bottom-2 duration-700">
                Sectors of Authority
              </span>
            </div>
            <h2
              className="font-medium font-[family-name:var(--font-cormorant)] italic text-white leading-[1.05]"
              style={{
                fontSize: isLandscapePhone
                  ? "clamp(1.5rem, 4vw, 2.2rem)"
                  : isPortraitMobile
                  ? "clamp(2rem, 8vw, 2.8rem)"
                  : "clamp(2.5rem, 5vw, 4.5rem)",
              }}
            >
              The Industries <span className="opacity-50">We Power.</span>
            </h2>
          </div>

          {isDesktop && (
            <Link
              href="/industries"
              className="group flex items-center gap-3 text-white/40 hover:text-white transition-all duration-500 ease-out-expo mb-2"
              style={{ fontSize: "0.85rem" }}
            >
              <span className="font-bold uppercase tracking-[0.2em]">All Sectors</span>
              <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out-expo">→</span>
            </Link>
          )}
        </div>

        {isDesktop && (
          <>
            <div
              className="flex gap-4"
              style={{ height: "clamp(420px, 50dvh, 600px)" }}
            >
              {INDUSTRIES.map((industry) => (
                <AccordionCard key={industry.id} industry={industry} />
              ))}
            </div>

            <div className="flex items-stretch border-t border-white/5 mt-12 pt-10">
              {[
                { value: "06", label: "Strategic Sectors" },
                { value: "40+", label: "Specializations" },
                { value: "5K+", label: "Deployments" },
                { value: "20+", label: "Years Authority" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-2 flex-1"
                  style={{
                    borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
                  }}
                >
                  <span
                    className="font-medium font-[family-name:var(--font-cormorant)] italic text-white"
                    style={{ fontSize: "clamp(1.5rem, 2.5vw, 2.2rem)" }}
                  >
                    {stat.value}
                  </span>
                  <span
                    className="text-white/40 font-black uppercase tracking-[0.2em]"
                    style={{ fontSize: "9px" }}
                  >
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {isLandscapePhone && (
          <div className="grid grid-cols-3 gap-3">
            {INDUSTRIES.map((industry) => (
              <CompactCard key={industry.id} industry={industry} />
            ))}
          </div>
        )}

        {isPortraitMobile && (
          <>
            <div className="grid grid-cols-2 gap-3">
              {INDUSTRIES.map((industry) => (
                <CompactCard key={industry.id} industry={industry} />
              ))}
            </div>

            <div className="flex justify-center mt-10">
              <Link
                href="/industries"
                className="group flex items-center gap-3 px-10 py-4 border border-white/10 hover:bg-white hover:text-[#006837] text-white/70 rounded-full transition-all duration-500 ease-out-expo"
                style={{ fontSize: "0.8rem", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}
              >
                Explore All Sectors
                <span className="group-hover:translate-x-2 transition-transform duration-500 ease-out-expo">→</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default HomeIndustries;
"use client";

import { useState, useEffect, useRef, MouseEvent } from "react";
import Image from "next/image";
import { useViewport } from "../../../hooks/useViewport";
import { Button } from "../../ui";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  badge: string;
  accentColor: string;
  glowColor: string;
  image: string;
  fullBio: string;
  milestones: string[];
  linkedin: string;
  email: string;
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "ashish-kumar-singh",
    name: "Ashish Kumar Singh",
    role: "CEO & FOUNDER",
    badge: "CEO & FOUNDER",
    accentColor: "#D4AF37", // Metallic Gold
    glowColor: "rgba(212, 175, 55, 0.25)",
    image: "/ceo-headshot2.png",
    fullBio: "Ashish Kumar Singh is the Chief Executive Officer and Founder of Al Zahra HR. He directs global corporate vision, strategic workforce mobilization, and Tier-1 infrastructure deployment across the Middle East, Asia, and Europe.",
    milestones: [
      "Founder & Strategic Visionary",
      "200,000+ Specialists Mobilized",
      "Tier-1 GCC Infrastructure Advisory",
    ],
    linkedin: "https://linkedin.com",
    email: "ashish.singh@alzahrahr.com",
  },
  {
    id: "lata-singh",
    name: "Lata Singh",
    role: "COO — INDIA OPERATIONS",
    badge: "COO — INDIA OPERATIONS",
    accentColor: "#006837", // Deep Emerald
    glowColor: "rgba(0, 104, 55, 0.3)",
    image: "/coo-india.png",
    fullBio: "Lata Singh serves as the Chief Operations Officer of Al Zahra HR, directing all recruitment operations, compliance frameworks, and ethical sourcing networks across the Indian regional office.",
    milestones: [
      "India Regional Operations Lead",
      "Zero-Fee Ethical Mobility Standard",
      "100,000+ Deployed Talent Network",
    ],
    linkedin: "https://linkedin.com",
    email: "lata.singh@alzahrahr.com",
  },
  {
    id: "kshitij-dhungana",
    name: "Kshitij Dhungana",
    role: "CHAIRMAN — NEPAL OPERATIONS",
    badge: "CHAIRMAN — NEPAL OPERATIONS",
    accentColor: "#E6A100", // Imperial Amber
    glowColor: "rgba(230, 161, 0, 0.25)",
    image: "/chairman-nepal.png",
    fullBio: "Kshitij Dhungana serves as Chairman of Al Zahra HR, overseeing executive operations, strategic management, and institutional recruitment partnerships across the Nepal regional office.",
    milestones: [
      "Nepal Regional Operations & Mgmt",
      "Executive Board Governance",
      "Owned Regional Sourcing Hubs",
    ],
    linkedin: "https://linkedin.com",
    email: "kshitij.dhungana@alzahrahr.com",
  },
];

export default function AboutTeam() {
  const { mounted, navHeight, height, isPhone, isWatch, isPhoneLandscape } = useViewport();
  const sectionRef = useRef<HTMLDivElement>(null);

  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  // Mobile layout condition (phones in portrait or landscape & Apple Watch)
  const isMobileLayout = isPhone || isWatch || isPhoneLandscape;
  // Short screen height condition (e.g. 1114x705, laptops with dev tools or short viewports)
  const isShortViewport = height <= 740;

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionHeight = sectionRef.current.clientHeight;
      const windowHeight = window.innerHeight;

      // Vertical distance scrolled inside the section
      const scrolled = -rect.top;
      const totalScrollable = sectionHeight - windowHeight;

      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Active card step index (0, 1, or 2)
      const step = Math.min(
        Math.floor(progress * TEAM_MEMBERS.length * 0.999),
        TEAM_MEMBERS.length - 1
      );
      setActiveIndex(step);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [mounted]);

  if (!mounted) return null;

  // Exact horizontal translate offset: 0vw, 100vw, or 200vw
  const translateVW = scrollProgress * (TEAM_MEMBERS.length - 1) * 100;
  const topPadding = (navHeight || 64) + (isShortViewport ? 4 : 8);
  const activeMember = TEAM_MEMBERS[activeIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#050505] text-white border-t border-white/10"
      style={{
        height: isWatch ? "calc(100dvh - 20px)" : isMobileLayout ? "calc(100dvh - 54px)" : "320vh",
        minHeight: isMobileLayout ? "calc(100dvh - 54px)" : undefined,
      }}
    >
      {/* ── PINNED CONTAINER (Adapts for Apple Watch, Phones, Tablets & Desktops) ── */}
      <div
        className={`${
          isMobileLayout
            ? "relative h-full w-full flex flex-col justify-between py-1 xs:py-3 px-1 xs:px-3 overflow-hidden max-h-[calc(100dvh-54px)]"
            : "sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between z-20 pb-2 sm:pb-3"
        }`}
        style={{
          paddingTop: isMobileLayout ? undefined : `${topPadding}px`,
        }}
      >
        {/* Ambient Background & Dynamic Parallax Shader Grid */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.05] transition-transform duration-300 ease-out"
            style={{
              backgroundImage: `radial-gradient(${activeMember?.accentColor || "#D4AF37"} 1.2px, transparent 1.2px)`,
              backgroundSize: "48px 48px",
              transform: `translateX(${-scrollProgress * 120}px)`,
            }}
          />

          {/* Dynamic Ambient Role Light Aura */}
          <div
            className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[300px] xs:w-[650px] h-[300px] xs:h-[650px] rounded-full blur-[240px] transition-all duration-700 ease-out"
            style={{
              backgroundColor: activeMember?.accentColor || "#D4AF37",
              opacity: 0.16,
              transform: `translate(${-translateVW * 3}px, -50%)`,
            }}
          />

          {/* Center Vertical Guide Line */}
          <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5 -translate-x-1/2 z-10 pointer-events-none" />
        </div>

        {/* ── SECTION HEADER ──────────────────────────────────────────────── */}
        <div
          className={`relative z-20 max-w-7xl mx-auto w-full px-1 xs:px-6 sm:px-8 lg:px-12 flex flex-col items-center text-center sm:items-start sm:text-left shrink-0 ${
            isWatch ? "mb-0.5 pt-0.5" : isShortViewport ? "mb-1" : "mb-1 xs:mb-2"
          }`}
        >
          <span
            className={`font-label font-bold uppercase tracking-[0.2em] text-brand-gold drop-shadow-[0_0_12px_rgba(212,175,55,0.3)] mb-0.5 ${
              isWatch ? "text-[5.5px]" : "text-[9px] xs:text-[11px] sm:text-xs"
            }`}
          >
            Executive Governance
          </span>
          <h2
            className={`font-headline italic text-white font-bold tracking-[-0.02em] leading-tight ${
              isWatch
                ? "text-[8.5px]"
                : isShortViewport
                ? "text-sm xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl"
                : "text-sm xs:text-xl sm:text-2xl md:text-3xl lg:text-5xl"
            }`}
          >
            Meet our <span className="text-brand-gold font-normal">Leadership.</span>
          </h2>
        </div>

        {/* ── SINGLE CARD SHOWCASE (Snap Swipe on Watch/Phone, 3D Track on Desktop) ── */}
        <div className="relative z-20 w-full flex-1 flex items-center overflow-hidden py-0.5">
          {isMobileLayout ? (
            /* Apple Watch / Mobile Snap Track */
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-0 w-full scrollbar-none items-center h-full">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="snap-center shrink-0 w-[100vw] flex justify-center items-center px-1 xs:px-5">
                  <OverdriveExecutiveCard
                    member={member}
                    isPhonePortrait={!isPhoneLandscape}
                    isPhoneLandscape={isPhoneLandscape}
                    isShortViewport={isShortViewport}
                    isWatch={isWatch}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Tablet & Desktop Pinned Showcase Track */
            <div
              className="flex w-[300vw] transition-transform duration-500 ease-out-expo"
              style={{
                transform: `translate3d(-${translateVW}vw, 0, 0)`,
              }}
            >
              {TEAM_MEMBERS.map((member, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={member.id}
                    className="w-[100vw] shrink-0 flex items-center justify-center px-4 sm:px-6 lg:px-14 xl:px-20"
                  >
                    <div
                      className={`w-full max-w-4xl transition-all duration-700 ${
                        isActive ? "opacity-100 scale-100" : "opacity-30 scale-95 pointer-events-none"
                      }`}
                    >
                      <OverdriveExecutiveCard
                        member={member}
                        isPhonePortrait={false}
                        isShortViewport={isShortViewport}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── FOOTER PROGRESS BAR (Desktop / Tablet) ─────────────────────── */}
        {!isMobileLayout && (
          <div className="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-12 lg:px-16 flex items-center justify-center shrink-0 pt-0.5">
            <div className="w-36 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 shadow-[0_0_12px_rgba(212,175,55,0.6)]"
                style={{
                  width: `${((activeIndex + 1) / TEAM_MEMBERS.length) * 100}%`,
                  backgroundColor: activeMember?.accentColor || "#D4AF37",
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

{/* ── EXECUTIVE CARD COMPONENT (Zero Overflow for Apple Watch) ── */}
function OverdriveExecutiveCard({
  member,
  isPhonePortrait,
  isPhoneLandscape,
  isShortViewport,
  isWatch,
}: {
  member: TeamMember;
  isPhonePortrait?: boolean;
  isPhoneLandscape?: boolean;
  isShortViewport?: boolean;
  isWatch?: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [lightSpot, setLightSpot] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isPhonePortrait || isPhoneLandscape || isWatch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const mouseXPercent = (x / rect.width) * 100;
    const mouseYPercent = (y / rect.height) * 100;

    const rX = -((y - rect.height / 2) / (rect.height / 2)) * 8;
    const rY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setRotateX(rX);
    setRotateY(rY);
    setLightSpot({ x: mouseXPercent, y: mouseYPercent });
  };

  const handleMouseEnter = () => !isPhonePortrait && !isPhoneLandscape && !isWatch && setIsHovered(true);
  const handleMouseLeave = () => {
    if (isPhonePortrait || isPhoneLandscape || isWatch) return;
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // APPLE WATCH LAYOUT (Ultra-compact 36px image & Title Only - 100% Zero Overflow)
  if (isWatch) {
    return (
      <div className="relative w-full max-w-[120px] overflow-hidden rounded-brand-md bg-black/90 backdrop-blur-2xl border border-white/15 p-1 shadow-xl flex flex-col text-center items-center mx-auto shrink-0">
        {/* Headshot */}
        <div className="relative w-[36px] aspect-[4/5] mx-auto rounded-brand-sm overflow-hidden border border-brand-gold/40 shadow-md bg-black/80 mb-0.5 shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-center"
            unoptimized
          />
        </div>

        {/* Info Title Only */}
        <div className="flex flex-col items-center text-center">
          <h3 className="font-headline italic text-[8.5px] font-bold text-white mb-0.5 leading-none">
            {member.name}
          </h3>
          <p
            className="font-label font-bold text-[6px] uppercase tracking-tight"
            style={{ color: member.accentColor }}
          >
            {member.role}
          </p>
        </div>
      </div>
    );
  }

  // PHONE LANDSCAPE LAYOUT
  if (isPhoneLandscape) {
    return (
      <div
        className="relative w-full max-w-[640px] overflow-hidden rounded-brand-lg bg-black/85 backdrop-blur-2xl border border-white/15 p-2.5 xs:p-3 shadow-[0_20px_50px_rgba(0,0,0,0.85)] mx-auto shrink-0"
      >
        <div className="grid grid-cols-12 gap-2.5 xs:gap-3.5 items-center text-left">
          {/* Left Column: Compact Executive Portrait */}
          <div className="col-span-4 flex flex-col items-center justify-center">
            <div className="relative w-full aspect-[4/5] max-w-[110px] xs:max-w-[130px] rounded-brand-md overflow-hidden border border-brand-gold/40 shadow-xl bg-black/80">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-50" />
            </div>
          </div>

          {/* Right Column: Full Details */}
          <div className="col-span-8 flex flex-col text-left">
            <h3 className="font-headline italic text-xs xs:text-sm font-bold text-white mb-0.5 leading-tight">
              {member.name}
            </h3>
            <p
              className="font-label font-bold text-[8.5px] xs:text-[9.5px] uppercase tracking-[0.14em] mb-1"
              style={{ color: member.accentColor }}
            >
              {member.role}
            </p>

            {/* Bio */}
            <p className="text-white/90 font-body text-[8.5px] xs:text-[9.5px] leading-snug mb-1.5 line-clamp-2 [text-wrap:pretty]">
              {member.fullBio}
            </p>

            {/* Key Leadership Track Record Box */}
            <div className="p-1.5 rounded-brand-md bg-black/60 border border-white/10 mb-2 shadow-inner">
              <h4
                className="font-mono text-[7.5px] xs:text-[8.5px] font-bold uppercase tracking-wider mb-0.5"
                style={{ color: member.accentColor }}
              >
                KEY LEADERSHIP TRACK RECORD
              </h4>
              <div className="grid grid-cols-1 gap-0.5">
                {member.milestones.map((item, idx) => (
                  <div key={idx} className="flex items-center text-[8px] xs:text-[9px] text-white/90">
                    <span className="font-bold mr-1 text-brand-gold">
                      &#10003;
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons Row */}
            <div className="flex flex-row gap-1.5 items-center w-full">
              <Button
                href={member.linkedin}
                variant="primary"
                size="sm"
                className="flex-1 px-1 py-1 text-[7.5px] xs:text-[8.5px] font-bold tracking-wider text-center"
              >
                CONNECT ON LINKEDIN
              </Button>
              <Button
                href={`mailto:${member.email}`}
                variant="outline"
                size="sm"
                className="flex-1 px-1 py-1 text-[7.5px] xs:text-[8.5px] font-bold tracking-wider text-center border-white/20 hover:border-brand-gold/60"
              >
                DIRECT INQUIRY
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // PHONE & SURFACE DUO PORTRAIT LAYOUT
  if (isPhonePortrait) {
    return (
      <div
        className="relative w-full max-w-[290px] xs:max-w-[340px] sm:max-w-[360px] overflow-hidden rounded-brand-lg bg-black/80 backdrop-blur-2xl border border-white/15 p-2.5 xs:p-4 sm:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex flex-col text-left mx-auto shrink-0"
      >
        {/* Centered High-Res Executive Headshot */}
        <div className="relative w-[115px] xs:w-[165px] sm:w-[185px] aspect-[4/5] mx-auto rounded-brand-md overflow-hidden border border-brand-gold/40 shadow-2xl bg-black/80 mb-1.5 xs:mb-3 shrink-0">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-center"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-50" />
        </div>

        {/* Executive Info Section */}
        <div className="flex flex-col text-left">
          <h3 className="font-headline italic text-sm xs:text-lg sm:text-xl font-bold text-white mb-0.5 leading-tight">
            {member.name}
          </h3>
          <p
            className="font-label font-bold text-[9px] xs:text-[10.5px] uppercase tracking-[0.14em] mb-1.5 xs:mb-2"
            style={{ color: member.accentColor }}
          >
            {member.role}
          </p>

          {/* Full Bio */}
          <p className="text-white/90 font-body text-[9.5px] xs:text-[11px] leading-snug mb-1.5 xs:mb-2.5 [text-wrap:pretty]">
            {member.fullBio}
          </p>

          {/* Key Leadership Track Record Box */}
          <div className="p-1.5 xs:p-2.5 rounded-brand-md bg-black/60 border border-white/10 mb-1.5 xs:mb-3 shadow-inner">
            <h4
              className="font-mono text-[8px] xs:text-[9.5px] font-bold uppercase tracking-wider mb-0.5 xs:mb-1"
              style={{ color: member.accentColor }}
            >
              KEY LEADERSHIP TRACK RECORD
            </h4>
            <div className="flex flex-col gap-0.5 xs:gap-1">
              {member.milestones.map((item, idx) => (
                <div key={idx} className="flex items-center text-[8.5px] xs:text-[10.5px] text-white/90">
                  <span className="font-bold mr-1 text-brand-gold">
                    &#10003;
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons Row (Side-by-Side) */}
          <div className="flex flex-row gap-1 xs:gap-2 items-center w-full">
            <Button
              href={member.linkedin}
              variant="primary"
              size="sm"
              className="flex-1 px-1 py-1 xs:py-2 text-[8px] xs:text-[10px] font-bold tracking-wider text-center"
            >
              CONNECT ON LINKEDIN
            </Button>
            <Button
              href={`mailto:${member.email}`}
              variant="outline"
              size="sm"
              className="flex-1 px-1 py-1 xs:py-2 text-[8px] xs:text-[10px] font-bold tracking-wider text-center border-white/20 hover:border-brand-gold/60"
            >
              DIRECT INQUIRY
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // DESKTOP & TABLET LAYOUT
  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-brand-lg bg-black/80 backdrop-blur-2xl border border-white/15 hover:border-brand-gold/60 shadow-[0_24px_60px_rgba(0,0,0,0.85)] group transition-all duration-300 ease-out cursor-pointer ${
        isShortViewport ? "p-4 sm:p-5 md:p-5 lg:p-6" : "p-4 xs:p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10"
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) ${
          isHovered ? "scale3d(1.012, 1.012, 1.012)" : "scale3d(1, 1, 1)"
        }`,
        transition: isHovered ? "transform 0.15s ease-out" : "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {/* Real-Time Specular Dynamic Light Sweep Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-10"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle 400px at ${lightSpot.x}% ${lightSpot.y}%, ${member.glowColor}, transparent 70%)`,
        }}
      />

      {/* High-Gloss Diagonal Glass Reflection Ray */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-out pointer-events-none z-10" />

      <div className="relative z-20 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-5 lg:gap-8 items-center">
        {/* Left Column: High-Res Executive Portrait */}
        <div className="sm:col-span-4 md:col-span-5 flex flex-col items-center text-center">
          <div
            className={`relative w-full aspect-[4/5] rounded-brand-md overflow-hidden border shadow-2xl bg-black/80 transition-all duration-500 ${
              isShortViewport
                ? "max-w-[170px] sm:max-w-[190px] md:max-w-[210px] lg:max-w-[230px]"
                : "max-w-[200px] xs:max-w-[220px] sm:max-w-[210px] md:max-w-[240px] lg:max-w-[280px] xl:max-w-none"
            }`}
            style={{
              borderColor: isHovered ? member.accentColor : "rgba(212, 175, 55, 0.4)",
            }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60" />
          </div>
        </div>

        {/* Right Column: Full Biography & Key Achievements */}
        <div className="sm:col-span-8 md:col-span-7 flex flex-col text-left">
          <div className={`${isShortViewport ? "mb-1.5" : "mb-2 sm:mb-3"}`}>
            <h3
              className={`font-headline italic font-bold text-white transition-colors duration-300 [text-wrap:balance] ${
                isShortViewport
                  ? "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                  : "text-xl xs:text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl"
              }`}
              style={{
                color: isHovered ? member.accentColor : "#FFFFFF",
              }}
            >
              {member.name}
            </h3>
            <p
              className="font-label font-bold text-[10px] sm:text-xs lg:text-sm uppercase tracking-[0.18em] mt-0.5 transition-colors duration-300"
              style={{ color: member.accentColor }}
            >
              {member.role}
            </p>
          </div>

          {/* Full Bio Text */}
          <p
            className={`text-white/90 font-body leading-snug [text-wrap:pretty] ${
              isShortViewport
                ? "text-[11.5px] sm:text-xs md:text-xs lg:text-sm mb-2"
                : "text-xs sm:text-xs md:text-sm lg:text-base sm:leading-relaxed mb-3 sm:mb-4"
            }`}
          >
            {member.fullBio}
          </p>

          {/* Key Leadership Achievements Grid */}
          <div
            className={`rounded-brand-md bg-black/60 border border-white/10 shadow-inner ${
              isShortViewport ? "p-2.5 sm:p-3 mb-2.5" : "p-3 sm:p-3 md:p-3.5 lg:p-4 mb-3 sm:mb-4"
            }`}
          >
            <h4
              className="font-mono text-[9.5px] sm:text-[11px] font-bold uppercase tracking-wider mb-1 sm:mb-2"
              style={{ color: member.accentColor }}
            >
              KEY LEADERSHIP TRACK RECORD
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
              {member.milestones.map((item, idx) => (
                <div key={idx} className="flex items-center text-[10px] sm:text-xs text-white/80">
                  <span className="font-bold mr-1.5" style={{ color: member.accentColor }}>
                    &#10003;
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Executive Direct Actions */}
          <div className="flex flex-row gap-2 sm:gap-3 items-center">
            <Button
              href={member.linkedin}
              variant="primary"
              size="sm"
              className={`font-bold tracking-wider ${
                isShortViewport
                  ? "px-3.5 sm:px-4 py-1.5 text-[10.5px] sm:text-xs"
                  : "px-4 sm:px-5 py-2 text-[11px] sm:text-xs"
              }`}
            >
              CONNECT ON LINKEDIN
            </Button>
            <Button
              href={`mailto:${member.email}`}
              variant="outline"
              size="sm"
              className={`font-bold tracking-wider border-white/20 hover:border-brand-gold/60 ${
                isShortViewport
                  ? "px-3.5 sm:px-4 py-1.5 text-[10.5px] sm:text-xs"
                  : "px-4 sm:px-5 py-2 text-[11px] sm:text-xs"
              }`}
            >
              DIRECT INQUIRY
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

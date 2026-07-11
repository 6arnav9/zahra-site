"use client";

import Image from "next/image";
import { useViewport } from "../hooks/useViewport";
import { Button, Section, SectionHeader } from "./ui";

const ContactCTA = () => {
  const { mounted, isWatch, isLandscapePhone, isSmallPhone } = useViewport();

  if (!mounted) return null;

  return (
    <Section
      bg="ink"
      showGrid
      gridSize="md"
      showGlow
      glowPosition="center"
      glowColor="green"
      paddingSize={isWatch ? "sm" : isLandscapePhone ? "sm" : "lg"}
    >
      {/* ── BACKGROUND IMAGE & ARCHITECTURE ─────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/8860492/pexels-photo-8860492.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Strategic Infrastructure"
          fill
          className="object-cover grayscale opacity-[0.07] scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>

      {/* Decorative center line */}
      {!isWatch && <div className="absolute left-1/2 top-0 w-[1px] h-full bg-white/5 -translate-x-1/2 z-1" />}

      <div className={`relative z-10 max-w-7xl mx-auto ${isWatch ? "px-4" : "px-6 sm:px-12 lg:px-24"} text-center`}>
        <SectionHeader
          isWatch={isWatch}
          isPhone={isSmallPhone}
          isLandscape={isLandscapePhone}
          align="center"
          eyebrow="Global Mobilization"
          title={
            <>
              Architecting the future of <br />
              <span className="text-brand-green opacity-90">Human Resources.</span>
            </>
          }
        />

        {/* Action Area */}
        <div
          className={`flex ${
            isWatch || isSmallPhone ? "flex-col" : "flex-row"
          } items-center justify-center gap-4 lg:gap-8 w-full mt-8 lg:mt-20`}
        >
          <Button href="/contact/hire" variant="primary" fullWidthOnMobile={isWatch || isSmallPhone}>
            Get Started
          </Button>

          <Button href="/contact/partner" variant="outline" fullWidthOnMobile={isWatch || isSmallPhone}>
            Partner With Us
          </Button>
        </div>

        {/* Bottom Detail */}
        <div className={`${isWatch ? "mt-8" : "mt-16 lg:mt-40"} flex flex-col items-center gap-4 opacity-60`}>
          <div className={`w-[1px] ${isWatch ? "h-6" : "h-12"} bg-gradient-to-b from-transparent to-white/50`} />
          <p className={`font-label font-black tracking-[0.4em] uppercase ${isWatch ? "text-[5px]" : "text-[9px]"}`}>
            EST. 2001 — Al Zahra Human Resources
          </p>
        </div>
      </div>

      {/* Edge Architectural Lines */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/5 z-1" />
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 z-1" />
    </Section>
  );
};

export default ContactCTA;

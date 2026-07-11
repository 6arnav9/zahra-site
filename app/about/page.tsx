"use client";

import { useViewport } from "../hooks/useViewport";
import { Button } from "../components/ui";
import AboutHero from "../components/pages/about/AboutHero";
import AboutStory from "../components/pages/about/AboutStory";

export default function AboutPage() {
  const { mounted, isWatch } = useViewport();

  if (!mounted) return null;

  // --- Apple Watch Layout ----------------------------------------------------
  if (isWatch) {
    return (
      <div className="bg-brand-ink text-white font-body min-h-screen flex flex-col justify-center items-center px-4 py-8 text-center">
        <span className="block font-label font-black text-brand-green uppercase text-[10px] tracking-widest mb-1">
          Al Zahra HR
        </span>
        <h1 className="font-headline italic text-base text-white mb-2 leading-tight">
          Global Workforce Sourcing
        </h1>
        <p className="text-xs text-white/70 leading-relaxed mb-4 max-w-[140px]">
          Elite recruitment solutions for infrastructure and luxury hospitality sectors since 2001.
        </p>
        <Button href="/contact/hire" size="sm">
          Get in Touch
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-brand-ink text-white font-body overflow-x-hidden">
      <AboutHero />
      <AboutStory />
    </div>
  );
}

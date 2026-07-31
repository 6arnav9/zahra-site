"use client";

import { Section } from "../../ui";

export default function AboutStory() {
  return (
    <Section
      bg="ink"
      showGrid
      gridSize="md"
      showGlow
      glowPosition="bottom"
      glowColor="gold"
      paddingSize="lg"
      className="border-t border-white/5 relative overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 text-center py-16">
        <span className="font-mono text-brand-gold font-bold text-xs tracking-[0.4em] uppercase block mb-4">
          OUR STORY
        </span>
        <h2 className="font-headline italic text-3xl sm:text-5xl text-white font-bold mb-6">
          Ready for a Fresh Start
        </h2>
        <p className="text-white/60 font-body text-base max-w-xl mx-auto leading-relaxed">
          Tell us what sections, layout, design, or story elements you want to build for the new About Us experience.
        </p>
      </div>
    </Section>
  );
}

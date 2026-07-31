"use client";

import { useViewport } from "../hooks/useViewport";
import AboutHero from "../components/pages/about/AboutHero";
import AboutTeam from "../components/pages/about/AboutTeam";

export default function AboutPage() {
  const { mounted } = useViewport();

  if (!mounted) return null;

  return (
    <div className="bg-brand-ink text-white font-body min-h-screen">
      <AboutHero />
      <AboutTeam />
    </div>
  );
}

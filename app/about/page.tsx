"use client";

import { useViewport } from "../hooks/useViewport";
import AboutHero from "../components/pages/about/AboutHero";
import AboutTeam from "../components/pages/about/AboutTeam";
import AboutTimeline from "../components/pages/about/AboutTimeline";

export default function AboutPage() {
  const { mounted } = useViewport();

  if (!mounted) return null;

  return (
    <div className="bg-brand-ink text-white font-body min-h-screen">
      <AboutHero />
      <AboutTeam />
      <AboutTimeline />
    </div>
  );
}

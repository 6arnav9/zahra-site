"use client";

import { useViewport } from "../hooks/useViewport";
import AboutHero from "../components/pages/about/AboutHero";

export default function AboutPage() {
  const { mounted } = useViewport();

  if (!mounted) return null;

  return (
    <div className="bg-brand-ink text-white font-body overflow-x-hidden min-h-screen">
      <AboutHero />
    </div>
  );
}

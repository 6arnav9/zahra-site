"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ContactCTA from '../components/ContactCTA';

type ViewportTier = "watch" | "phone" | "landscape" | "tablet" | "desktop";

function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return "desktop";
  const w = window.innerWidth;
  const h = window.innerHeight;
  if (w < 250) return "watch";
  if (h < 500 && w > h) return "landscape";
  if (w < 640) return "phone";
  if (w < 1024) return "tablet";
  return "desktop";
}

const TIMELINE_MILESTONES = [
  {
    year: "2001",
    title: "Founding & Dubai Entry",
    description: "Al Zahra was established in Dubai, UAE to supply high-impact technical workforces to the Middle East's booming civil infrastructure and real estate sectors.",
  },
  {
    year: "2010",
    title: "South Asian Corridor Expansion",
    description: "Formalized recruitment hubs in India and Nepal. Opened dedicated training facilities to vet, certify, and prepare personnel to meet international labor requirements.",
  },
  {
    year: "2018",
    title: "Eastern European Operations",
    description: "Opened corridors to Europe, partnering with major infrastructure, construction, and hospitality brands across Poland, Croatia, and Romania.",
  },
  {
    year: "Present",
    title: "Elite Recruitment Authority",
    description: "Managing deployment pipelines for over 50,000 verified personnel across three continents, serving as a trusted, high-integrity counterpart to global enterprises.",
  },
];

const RECRUITMENT_PROCESS = [
  {
    step: "01",
    title: "Operational Alignment",
    detail: "We consult directly with client stakeholders to define structural needs, technical requirements, and legal parameters. This ensures our pipelines align perfectly with project start dates."
  },
  {
    step: "02",
    title: "Ethical Source Vetting",
    detail: "Recruitment is carried out directly through our owned and vetted source networks. Every candidate goes through background verification and practical trade evaluations."
  },
  {
    step: "03",
    title: "Regulatory Compliance",
    detail: "Our team handles the heavy lifting of compliance: visa processing, embassy authentication, medical assessments, and government approvals, avoiding legal roadblocks."
  },
  {
    step: "04",
    title: "Deployment & Logistics",
    detail: "We manage complete travel, safety briefings, ticketing, and port-of-entry reception, delivering groups of skilled workers in a coordinated and structured manner."
  },
  {
    step: "05",
    title: "Onsite Onboarding & Care",
    detail: "Post-deployment, we remain active as a liaison to support workers through local integration, ensuring optimal productivity and long-term retention."
  }
];

const CORE_PILLARS = [
  {
    title: "Stately Presence",
    subtitle: "Established & Authoritative",
    desc: "We operate as the traditional professional—delivering bespoke, high-status representation. Large-scale developers trust us to represent their interests with absolute integrity."
  },
  {
    title: "Expansive Reach",
    subtitle: "The Global Connector",
    desc: "Our corridors bridge regions, enabling fluid talent migration. We link resources from Central/South Asia and Europe with prime infrastructure developers."
  },
  {
    title: "Pristine Execution",
    subtitle: "Technical Precision",
    desc: "We apply tech-forward operational precision to a traditional industry. Every compliance document, flight log, and candidate record is structured for zero-error delivery."
  }
];

const GLOBAL_OFFICES = [
  {
    region: "Middle East Headquarters",
    city: "Dubai, UAE",
    address: "2701, Prime Tower, Business Bay",
  },
  {
    region: "European Operations Hub",
    city: "Zagreb, Croatia",
    address: "Directing placements, visas, and compliance for EU territories",
  },
  {
    region: "Sourcing & Vetting Hubs",
    city: "Nepal & India",
    address: "Kathmandu and New Delhi screening, medical, and testing facilities",
  }
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  const [tier, setTier] = useState<ViewportTier>("desktop");
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    setMounted(true);
    const update = () => setTier(getViewportTier());
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return null;

  const isWatch = tier === "watch";
  const isPhone = tier === "phone";
  const isLandscape = tier === "landscape";
  const isTablet = tier === "tablet";

  // ─── APPLE WATCH LAYOUT ──────────────────────────────────────────────────
  if (isWatch) {
    return (
      <div className="bg-[#050505] text-white font-[family-name:var(--font-open-sans)] px-2 py-16 flex flex-col gap-8 text-center">
        <div>
          <span className="text-[#006837] text-[8px] uppercase tracking-widest font-bold">About Us</span>
          <h1 className="font-[family-name:var(--font-cinzel)] font-bold text-sm tracking-tight mt-1 text-white">
            Al Zahra HR
          </h1>
        </div>
        <p className="text-[9px] text-white/50 leading-relaxed">
          Founded in 2001, we deliver bespoke, institutional-scale recruitment across the Middle East and Europe.
        </p>
        <div className="flex flex-col gap-2">
          <Link href="/contact" className="bg-[#006837] text-white py-2 text-[9px] font-black uppercase tracking-wider">
            Hire Talent
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] text-white font-[family-name:var(--font-open-sans)] overflow-x-hidden min-h-screen">
      
      {/* ─── SECTION 1: HERO (THE GLOBAL EMBASSY AESTHETIC) ───────────────────── */}
      <section className="relative w-full min-h-[75vh] flex items-center justify-center py-20 md:py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Pristine Corporate Architecture" 
            fill 
            className="object-cover grayscale opacity-25 scale-105 transition-transform duration-[4000ms] ease-out-expo"
            unoptimized
          />
          {/* Subtle architectural dot grid */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{ backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)', backgroundSize: '48px 48px' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16 text-center md:text-left flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-[60%] flex flex-col gap-6 md:gap-8">
            <div>
              <span className="font-[family-name:var(--font-montserrat)] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#006837] mb-3 block">
                Established 2001
              </span>
              <h1 className="font-[family-name:var(--font-cinzel)] font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight text-wrap">
                Architecting Human <br />
                <span className="text-white/60">Infrastructure.</span>
              </h1>
            </div>
            <p className="text-white/50 text-sm sm:text-base md:text-lg leading-relaxed max-w-[55ch] font-medium">
              We deliver the workforce mobilization solutions that build nations, connect continents, and supply global enterprise operations with reliability at scale.
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link 
                href="/contact" 
                className="group relative bg-[#006837] overflow-hidden transition-all duration-500 ease-out-expo hover:scale-105 hover:shadow-[0_0_30px_rgba(0,104,55,0.3)] px-8 py-4 whitespace-nowrap text-xs font-black uppercase tracking-[0.2em]"
              >
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out-expo" />
                <span className="relative z-10 text-white">Hire Talent</span>
              </Link>
              <Link 
                href="/partner" 
                className="group relative border border-white/20 overflow-hidden transition-all duration-500 ease-out-expo hover:border-[#006837]/50 px-8 py-4 whitespace-nowrap text-xs font-black uppercase tracking-[0.2em]"
              >
                <div className="absolute inset-0 bg-white/[0.03] -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out-expo" />
                <span className="relative z-10 text-white/70 group-hover:text-white transition-colors duration-500">Partner With Us</span>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-[40%] flex justify-center">
            <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-44 md:h-44 border border-[#006837]/30 rotate-45 flex items-center justify-center relative animate-[spin_60s_linear_infinite] motion-reduce:animate-none">
              <div className="absolute w-[80%] h-[80%] border border-[#d4af37]/20 flex items-center justify-center">
                <div className="w-[60%] h-[60%] border border-white/5 flex items-center justify-center">
                  <div className="relative w-8 h-8 md:w-12 md:h-12 brightness-0 invert -rotate-45">
                    <Image src="/logo.png" alt="Al Zahra Mark" fill className="object-contain opacity-40" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: ASYMMETRIC LEGACY & MILESTONES ───────────────────────── */}
      <section className="py-20 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
          
          {/* Left Block: Narrative text */}
          <div className="w-full lg:w-[45%] flex flex-col gap-6 md:gap-8">
            <span className="font-[family-name:var(--font-montserrat)] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#006837]">
              Our Heritage
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] italic font-medium text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              A legacy of trust, global scale, and pristine mobilization.
            </h2>
            <div className="text-white/50 text-sm sm:text-base leading-relaxed flex flex-col gap-4 max-w-[65ch]">
              <p>
                Al Zahra HR emerged in Dubai during a period of rapid regional development. Seeing the operational friction faced by enterprise contractors, we established a recruitment model centered around institutional transparency, regulatory precision, and absolute integrity.
              </p>
              <p>
                Today, we have evolved beyond conventional recruiting agency standards. We build and maintain specialized corridors that directly link infrastructure projects in the GCC and Europe with verified, skilled, and safe personnel.
              </p>
            </div>
          </div>

          {/* Right Block: Milestones Timeline */}
          <div className="w-full lg:w-[55%] bg-[#0a0a0a] border border-white/5 rounded-xl p-6 sm:p-10 relative">
            <div className="absolute top-0 right-0 w-36 h-36 bg-[#006837]/5 blur-3xl pointer-events-none" />
            <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-lg sm:text-xl text-white mb-8">
              Strategic Milestones
            </h3>
            <div className="flex gap-2 sm:gap-4 border-b border-white/5 pb-4 mb-6 overflow-x-auto whitespace-nowrap scrollbar-none">
              {TIMELINE_MILESTONES.map((item, idx) => (
                <button
                  key={item.year}
                  onClick={() => setActiveMilestone(idx)}
                  className={`px-4 py-2 text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 relative ${
                    activeMilestone === idx ? 'text-[#006837]' : 'text-white/40 hover:text-white/70'
                  }`}
                >
                  {item.year}
                  {activeMilestone === idx && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#006837] animate-[fadeIn_0.3s_ease] motion-reduce:transition-none" />
                  )}
                </button>
              ))}
            </div>

            <div className="min-h-[160px] flex flex-col justify-center gap-4 transition-all duration-500 ease-out-expo">
              <h4 className="font-[family-name:var(--font-cinzel)] font-bold text-base sm:text-lg text-white">
                {TIMELINE_MILESTONES[activeMilestone].title}
              </h4>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed max-w-[55ch]">
                {TIMELINE_MILESTONES[activeMilestone].description}
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ─── SECTION 3: CORE PILLARS ────────────────────────────────────────── */}
      <section className="py-20 bg-black/40 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-[family-name:var(--font-montserrat)] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#006837] mb-3 block">
              Our Foundations
            </span>
            <h2 className="font-[family-name:var(--font-cormorant)] italic font-medium text-2xl sm:text-3xl md:text-4xl text-white">
              The Spheres of Strength
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CORE_PILLARS.map((pillar, idx) => (
              <div 
                key={pillar.title}
                className="border border-white/5 bg-[#050505] p-8 sm:p-10 rounded-xl relative group transition-all duration-500 hover:border-[#006837]/30 hover:scale-[1.02]"
              >
                <div className="absolute top-0 left-0 w-full h-[3px] bg-[#006837] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                <span className="text-[#d4af37] font-[family-name:var(--font-cinzel)] font-bold text-xs uppercase tracking-widest block mb-4">
                  Pillar 0{idx + 1}
                </span>
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-lg sm:text-xl text-white mb-2">
                  {pillar.title}
                </h3>
                <h4 className="text-white/40 text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-4">
                  {pillar.subtitle}
                </h4>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: CEO MESSAGE ─────────────────────────────────────────── */}
      <section className="py-20 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-center">
          <div className="w-full lg:w-[40%] flex justify-center">
            <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-xl overflow-hidden shadow-2xl border border-white/10 group bg-gray-900">
              <Image 
                src="/ceo-headshot.png" 
                alt="Al Zahra HR Director" 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out-expo"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-center lg:text-left">
                <p className="text-white font-[family-name:var(--font-cinzel)] font-bold text-lg leading-tight">Executive Director</p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-1">Al Zahra Human Resources</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[60%] flex flex-col gap-6 md:gap-8 text-center lg:text-left">
            <span className="font-[family-name:var(--font-montserrat)] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#006837] mx-auto lg:mx-0">
              Executive Voice
            </span>
            <blockquote className="font-[family-name:var(--font-cormorant)] italic text-xl sm:text-2xl md:text-3xl text-white/90 leading-relaxed font-medium">
              "We do not merely mobilize workers; we deliver the foundational talent required to construct cities, coordinate hospitality, and support critical infrastructure. In an industry where trust is the primary asset, Al Zahra maintains a standard that is absolute."
            </blockquote>
            <div className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-[65ch]">
              <p>
                Under steady leadership, Al Zahra has maintained zero-tolerance for compliance infractions. By prioritizing strict vetting, medical security, and ethical corridors, we ensure that every placement represents high-value capability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: THE STRATEGIC PIPELINE (INTERACTIVE) ───────────────── */}
      <section className="py-20 md:py-36 bg-[#0a0a0a] border-y border-white/5 relative">
        <div className="absolute inset-0 top-0 left-0 w-full h-full bg-[#006837]/3 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
            
            {/* Left Narrative */}
            <div className="w-full lg:w-[40%] flex flex-col gap-6 md:gap-8 lg:sticky lg:top-32">
              <span className="font-[family-name:var(--font-montserrat)] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#006837]">
                Operational Protocol
              </span>
              <h2 className="font-[family-name:var(--font-cinzel)] font-bold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                Our Recruitment <br className="hidden lg:block" />
                <span className="text-white/50">Pipeline.</span>
              </h2>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed max-w-[45ch]">
                Every candidate passes through a rigorous five-phase roadmap designed to guarantee legal compliance, physical fitness, and professional capability. Select a step to explore.
              </p>
            </div>

            {/* Right Interactive List */}
            <div className="w-full lg:w-[60%] flex flex-col gap-4">
              {RECRUITMENT_PROCESS.map((item, idx) => (
                <div 
                  key={item.step}
                  onClick={() => setActiveStep(idx)}
                  className={`border p-6 sm:p-8 rounded-xl cursor-pointer transition-all duration-500 ease-out-expo ${
                    activeStep === idx 
                      ? 'bg-black border-[#006837]/50 shadow-[0_0_30px_rgba(0,104,55,0.08)]' 
                      : 'bg-transparent border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 sm:gap-6">
                    <span className={`font-[family-name:var(--font-cinzel)] font-bold text-sm sm:text-lg ${
                      activeStep === idx ? 'text-[#006837]' : 'text-white/20'
                    }`}>
                      {item.step}
                    </span>
                    <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-sm sm:text-base text-white">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className={`grid transition-all duration-500 ease-out-expo ${
                    activeStep === idx ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 h-0 overflow-hidden'
                  }`}>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-medium">
                      {item.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ─── SECTION 6: GLOBAL FOOTPRINT ────────────────────────────────────── */}
      <section className="py-20 md:py-36 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-[family-name:var(--font-montserrat)] font-black text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-[#006837] mb-3 block">
            Locations
          </span>
          <h2 className="font-[family-name:var(--font-cinzel)] font-bold text-2xl sm:text-3xl text-white">
            Our Global Footprint
          </h2>
          <p className="text-white/40 text-xs sm:text-sm mt-3">
            Physically located in primary markets to maintain absolute control over the sourcing pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GLOBAL_OFFICES.map((office) => (
            <div 
              key={office.city}
              className="border border-white/5 bg-[#050505] p-8 rounded-xl flex flex-col justify-between min-h-[160px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#006837]/3 blur-2xl pointer-events-none" />
              <div>
                <span className="text-[#006837] font-[family-name:var(--font-montserrat)] font-black text-[9px] uppercase tracking-widest block mb-2">
                  {office.region}
                </span>
                <h3 className="font-[family-name:var(--font-cinzel)] font-bold text-base sm:text-lg text-white mb-2">
                  {office.city}
                </h3>
              </div>
              <p className="text-white/50 text-xs leading-relaxed font-medium">
                {office.address}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECTION 7: CONTACT CTA ─────────────────────────────────────────── */}
      <ContactCTA />
      
    </div>
  );
}

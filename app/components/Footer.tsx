"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

/**
 * PRODUCTION-GRADE FOOTER COMPONENT
 * Responsive tiers:
 *   Watch  (< 220px) — single column, ultra-compact, no social icons row
 *   Mobile (< 640px) — single column, generous tap targets
 *   sm–md  (640–1023px) — 2-column grid
 *   lg+    (≥ 1024px)  — 4-column grid
 */

const CORPORATE_LINKS = [
  { name: "About us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Offices", href: "/offices" },
  { name: "Countries we serve", href: "/countries" },
  { name: "Careers", href: "/careers" },
  { name: "Blog & News", href: "/blog" },
];

const INDUSTRY_LINKS = [
  { name: "Construction & Civil", href: "/industries/construction" },
  { name: "Hospitality & Catering", href: "/industries/hospitality" },
  { name: "Healthcare & Medical", href: "/industries/healthcare" },
  { name: "Security Services", href: "/industries/security" },
  { name: "Office & Admin", href: "/industries/office-admin" },
  { name: "Transportation", href: "/industries/transportation" },
];

const CONTACT_DETAILS = {
  phone: "+971-55 9996543",
  email: "info@alzahrahr.com",
  address: "2701, Prime Tower, Business Bay, Dubai, United Arab Emirates",
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [isWatch, setIsWatch] = useState(false);

  useEffect(() => {
    const check = () => setIsWatch(window.innerWidth < 220);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // ── Apple Watch layout ────────────────────────────────────────────────────
  if (isWatch) {
    return (
      <footer
        className="bg-black text-white font-[family-name:var(--font-open-sans)]"
        style={{ padding: "16px 8px" }}
      >
        {/* Brand mark */}
        <div className="flex items-center gap-1 mb-3">
          <div className="brightness-0 invert relative flex-shrink-0" style={{ width: 12, height: 12 }}>
            <Image src="/logo.png" alt="Al Zahra" fill className="object-contain" />
          </div>
          <span
            className="font-[family-name:var(--font-cinzel)] font-bold text-white leading-none"
            style={{ fontSize: "7px", letterSpacing: "0.1em" }}
          >
            AL ZAHRA
          </span>
        </div>

        <div className="flex flex-col gap-2 mb-3 border-t border-white/10 pt-3">
          <Link href="/contact" className="text-[#006837] font-black" style={{ fontSize: "7px" }}>Hire Talent</Link>
          <Link href="/about" className="text-white/50 font-bold" style={{ fontSize: "7px" }}>About Us</Link>
        </div>

        <div className="border-t border-white/10 pt-3">
          <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`} className="text-white/40" style={{ fontSize: "6px" }}>
            {CONTACT_DETAILS.phone}
          </a>
        </div>

        <p className="text-white/20 mt-3 font-bold" style={{ fontSize: "5.5px" }}>
          © {currentYear} Al Zahra
        </p>
      </footer>
    );
  }

  return (
    <footer className="relative bg-black text-white font-[family-name:var(--font-open-sans)] overflow-hidden">
      <div className="pt-12 sm:pt-16 lg:pt-24 pb-8 lg:pb-12 border-t border-white/5">
        
        {/* Architectural Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-[#006837]/10 blur-[140px] rounded-full pointer-events-none opacity-40"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-x-10 sm:gap-y-12 lg:gap-16 mb-16 lg:mb-24">

            {/* ── Column 1: Brand & Socials ──────────────────────────────── */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="brightness-0 invert relative w-10 h-10 lg:w-12 lg:h-12 transition-all duration-500 ease-out-expo group-hover:scale-110 flex-shrink-0">
                  <Image src="/logo.png" alt="Al Zahra" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-cinzel)] font-bold text-xl lg:text-2xl leading-none tracking-wide uppercase">
                    Al Zahra
                  </span>
                  <span className="text-[9px] font-black tracking-[0.3em] uppercase mt-1 text-white/50">
                    Authority
                  </span>
                </div>
              </Link>

              <p className="text-sm text-white/40 leading-relaxed font-medium">
                Leading the strategic mobilization of global talent since 2001. 
                Reliability, ethics, and scale at the core of every deployment.
              </p>

              <div className="flex flex-wrap gap-3">
                <SocialIcon href="#" brand="linkedin" color="hover:bg-white hover:text-black"><LinkedinSVG /></SocialIcon>
                <SocialIcon href="#" brand="facebook" color="hover:bg-white hover:text-black"><FacebookSVG /></SocialIcon>
                <SocialIcon href="#" brand="whatsapp" color="hover:bg-white hover:text-black"><WhatsappSVG /></SocialIcon>
                <SocialIcon href="#" brand="instagram" color="hover:bg-white hover:text-black"><InstagramSVG /></SocialIcon>
                <SocialIcon href="#" brand="youtube" color="hover:bg-white hover:text-black"><YoutubeSVG /></SocialIcon>
              </div>
            </div>

            {/* ── Column 2: Corporate links ───────────────────────────────── */}
            <FooterColumn title="The Company" links={CORPORATE_LINKS} />

            {/* ── Column 3: Industry links ────────────────────────────────── */}
            <FooterColumn title="Strategic Sectors" links={INDUSTRY_LINKS} />

            {/* ── Column 4: Contact & CTAs ─────────────────────────────────── */}
            <div className="flex flex-col gap-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#006837] font-[family-name:var(--font-open-sans)]">
                Reach Us
              </h3>

              <div className="flex flex-col gap-4 text-sm text-white/60 font-medium">
                <a
                  href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2.5 py-1"
                >
                  {CONTACT_DETAILS.phone}
                </a>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="hover:text-white transition-colors duration-300 flex items-center gap-2.5 py-1 break-all"
                >
                  {CONTACT_DETAILS.email}
                </a>
                <p className="text-xs leading-relaxed text-white/30 mt-1">
                  {CONTACT_DETAILS.address}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-2">
                <Link
                  href="/contact"
                  className="w-full px-6 py-4 bg-[#006837] hover:bg-[#004d29] text-white text-center font-black rounded-full transition-all duration-500 ease-out-expo shadow-xl text-[10px] uppercase tracking-widest"
                >
                  Hire Talent
                </Link>
                <Link
                  href="/partner"
                  className="w-full px-6 py-4 bg-transparent border border-white/10 hover:border-white hover:bg-white hover:text-black text-white text-center font-black rounded-full transition-all duration-500 ease-out-expo text-[10px] uppercase tracking-widest"
                >
                  Partner
                </Link>
              </div>
            </div>

          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/20 text-center md:text-left font-bold uppercase tracking-widest">
            <p>© {currentYear} Al Zahra Human Resource Consultancy.</p>
            <div className="flex items-center gap-8">
              <Link href="/privacy" className="hover:text-white transition-colors duration-300">Privacy</Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-300">Terms</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const FooterColumn = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="flex flex-col gap-3">
    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#006837] mb-4 font-[family-name:var(--font-open-sans)]">
      {title}
    </h3>
    <div className="flex flex-col gap-2">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-sm text-white/40 hover:text-[#006837] transition-all duration-300 w-fit py-1.5 font-medium"
        >
          {link.name}
        </Link>
      ))}
    </div>
  </div>
);

const SocialIcon = ({
  href,
  children,
  color,
  brand,
}: {
  href: string;
  children: React.ReactNode;
  color: string;
  brand: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`Visit our ${brand} page`}
    className={`
      w-12 h-12 lg:w-10 lg:h-10
      rounded-full bg-white/5 border border-white/5
      flex items-center justify-center
      transition-all duration-500 ease-out-expo group
      ${color}
    `}
  >
    <span className="group-hover:scale-110 transition-transform duration-500 ease-out-expo">
      {children}
    </span>
  </a>
);

// ─── SVG ICONS ───────────────────────────────────────────────────────────────

const LinkedinSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const FacebookSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsappSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const InstagramSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const YoutubeSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

export default Footer;
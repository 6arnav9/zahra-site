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
  // At ~162px wide a multi-column grid is impossible. We show a minimal
  // brand block + two key links + contact line. No social row (icons overflow).
  if (isWatch) {
    return (
      <footer
        className="bg-black text-white font-[family-name:var(--font-open-sans)]"
        style={{ padding: "12px 8px 10px" }}
      >
        {/* Brand mark */}
        <div className="flex items-center gap-1 mb-2">
          <div className="brightness-0 invert relative flex-shrink-0" style={{ width: 14, height: 14 }}>
            <Image src="/logo.png" alt="Al Zahra" fill className="object-contain" />
          </div>
          <span
            className="font-[family-name:var(--font-cinzel)] font-bold text-white leading-none"
            style={{ fontSize: "8px", letterSpacing: "0.1em" }}
          >
            AL ZAHRA HR
          </span>
        </div>

        {/* Key links — just the most important two */}
        <div className="flex flex-col gap-1 mb-2 border-t border-white/10 pt-2">
          <Link href="/contact" className="text-[#39B54A] font-bold" style={{ fontSize: "7px" }}>Hire Talent</Link>
          <Link href="/about" className="text-white/60" style={{ fontSize: "7px" }}>About Us</Link>
        </div>

        {/* Contact */}
        <div className="border-t border-white/10 pt-2">
          <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`} className="text-white/50" style={{ fontSize: "6px" }}>
            {CONTACT_DETAILS.phone}
          </a>
        </div>

        <p className="text-white/20 mt-2" style={{ fontSize: "6px" }}>
          © {currentYear} Al Zahra HR
        </p>
      </footer>
    );
  }

  // ── Standard layout ───────────────────────────────────────────────────────
  return (
    <footer className="relative bg-black text-white font-[family-name:var(--font-open-sans)] overflow-hidden">

      {/* Padding: tighter on mobile, generous on desktop */}
      <div className="pt-10 sm:pt-14 lg:pt-20 pb-8 lg:pb-10 border-t border-white/10">

        {/* Green glow blob */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] lg:h-[400px] bg-[#006837]/20 blur-[120px] rounded-full pointer-events-none opacity-50"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">

          {/*
            GRID LAYOUT:
              Mobile (< 640px) → 1 column, all sections stacked
              sm–md (640–1023px) → 2 columns: Brand+Corporate | Industries+Contact
                The 2-column pairing is intentional — Brand and Corporate are
                related (who we are / what we do), Industries and Contact are
                related (what we cover / how to reach us). Each pair is
                roughly equal in height.
              lg+ (≥ 1024px) → 4 columns side by side

            GAP: smaller on mobile (32px) to avoid dead space in 1-col layout,
            standard on desktop (32px horizontal, tighter than original 48px).
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-x-8 sm:gap-y-10 lg:gap-8 mb-10 lg:mb-16">

            {/* ── Column 1: Brand & Socials ──────────────────────────────── */}
            <div className="flex flex-col gap-5">
              <Link href="/" className="flex items-center gap-3 group w-fit">
                <div className="brightness-0 invert relative w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-105 transition-transform duration-300 flex-shrink-0">
                  <Image src="/logo.png" alt="Al Zahra" fill className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="font-[family-name:var(--font-cinzel)] font-bold text-xl lg:text-2xl leading-none tracking-wide uppercase">
                    Al Zahra
                  </span>
                  <span className="text-[9px] font-bold tracking-[0.2em] uppercase mt-1 text-white/60">
                    Human Resources
                  </span>
                </div>
              </Link>

              <p className="text-sm text-white/50 leading-relaxed">
                Bridging global employers with exceptional talent since 2001.
                Delivering high-quality, transparent, and efficient overseas
                recruitment solutions.
              </p>

              {/*
                Social icons:
                  Mobile: w-11 h-11 (44px) — meets Apple HIG minimum tap target
                  Desktop: w-9 h-9 (36px) — dense enough to look refined
                  gap-2.5 gives breathing room without spreading too wide
              */}
              <div className="flex flex-wrap gap-2.5">
                <SocialIcon href="#" brand="linkedin" color="hover:bg-[#0077b5] hover:border-[#0077b5]"><LinkedinSVG /></SocialIcon>
                <SocialIcon href="#" brand="facebook" color="hover:bg-[#1877F2] hover:border-[#1877F2]"><FacebookSVG /></SocialIcon>
                <SocialIcon href="#" brand="whatsapp" color="hover:bg-[#25D366] hover:border-[#25D366]"><WhatsappSVG /></SocialIcon>
                <SocialIcon href="#" brand="instagram" color="hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent"><InstagramSVG /></SocialIcon>
                <SocialIcon href="#" brand="youtube" color="hover:bg-[#FF0000] hover:border-[#FF0000]"><YoutubeSVG /></SocialIcon>
              </div>
            </div>

            {/* ── Column 2: Corporate links ───────────────────────────────── */}
            <FooterColumn title="Corporate" links={CORPORATE_LINKS} />

            {/* ── Column 3: Industry links ────────────────────────────────── */}
            <FooterColumn title="Industries" links={INDUSTRY_LINKS} />

            {/* ── Column 4: Contact & CTAs ─────────────────────────────────── */}
            <div className="flex flex-col gap-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#39B54A] font-[family-name:var(--font-montserrat)]">
                Get In Touch
              </h3>

              <div className="flex flex-col gap-3 text-sm text-white/70">
                {/*
                  Phone & email: min-height 44px on mobile for touch comfort.
                  The emoji + text layout naturally hits ~44px with py-2.
                */}
                <a
                  href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`}
                  className="hover:text-white transition-colors flex items-center gap-2 py-1"
                >
                  📞 {CONTACT_DETAILS.phone}
                </a>
                <a
                  href={`mailto:${CONTACT_DETAILS.email}`}
                  className="hover:text-white transition-colors flex items-center gap-2 py-1 break-all"
                >
                  ✉️ {CONTACT_DETAILS.email}
                </a>
                <p className="text-xs leading-relaxed text-white/40 mt-1">
                  {CONTACT_DETAILS.address.split(',').slice(0, 2).join(',')},<br />
                  {CONTACT_DETAILS.address.split(',').slice(2).join(',')}
                </p>
              </div>

              {/*
                CTA buttons:
                  w-full on all sizes — inside a narrow footer column on sm
                  screens w-fit would make them awkwardly small. Full width
                  looks intentional and is easier to tap on mobile.
                  Rounded-lg matches original; text-[11px] unchanged.
              */}
              <div className="flex flex-col gap-3 mt-2">
                <Link
                  href="/contact"
                  className="w-full px-6 py-3.5 bg-[#39B54A] hover:bg-[#006837] text-white text-center font-bold rounded-lg transition-all duration-300 shadow-lg text-[11px] uppercase tracking-widest"
                >
                  Hire Talent Now
                </Link>
                <Link
                  href="/partner"
                  className="w-full px-6 py-3.5 bg-transparent border border-white/20 hover:border-white hover:bg-white hover:text-black text-white text-center font-bold rounded-lg transition-all duration-300 text-[11px] uppercase tracking-widest"
                >
                  Partner With Us
                </Link>
              </div>
            </div>

          </div>

          {/* ── Legal bar ──────────────────────────────────────────────────── */}
          {/*
            flex-col always on mobile (text stacks naturally),
            md:flex-row for side-by-side once there's enough horizontal room.
            text-center on mobile so the stacked items look intentional.
          */}
          <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3 text-[11px] text-white/30 text-center md:text-left">
            <p>© {currentYear} Al Zahra Human Resources Consultancy. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors whitespace-nowrap">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors whitespace-nowrap">Terms of Service</Link>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const FooterColumn = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="flex flex-col gap-1">
    <h3 className="text-xs font-bold uppercase tracking-widest text-[#39B54A] mb-3 font-[family-name:var(--font-montserrat)]">
      {title}
    </h3>
    {links.map((link) => (
      /*
        Each link: py-2 gives ~40px tap height on mobile (text-sm = 20px + 16px padding).
        lg:py-1 tightens it up on desktop where mouse precision is fine.
        w-fit keeps the underline hover state tight to the text.
      */
      <Link
        key={link.href}
        href={link.href}
        className="text-sm text-white/50 hover:text-white transition-colors w-fit py-2 lg:py-1"
      >
        {link.name}
      </Link>
    ))}
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
      w-11 h-11 lg:w-9 lg:h-9
      rounded-full bg-white/5 border border-white/10
      flex items-center justify-center
      transition-all duration-300 group
      ${color}
    `}
  >
    <span className="text-white group-hover:scale-110 transition-transform duration-300">
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
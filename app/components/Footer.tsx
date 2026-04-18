"use client";

import Image from 'next/image';
import Link from 'next/link';

/**
 * PRODUCTION-GRADE FOOTER COMPONENT
 * ---------------------------------
 * Structure: 
 * - Branding & Socials
 * - Corporate Links (Navigation)
 * - Industry Focus (Services)
 * - Contact & Global CTAs
 */

// 1. DATA CONFIGURATION
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
  address: "2701, Prime Tower, Business Bay, Dubai, United Arab Emirates"
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-black text-white pt-20 pb-10 border-t border-white/10 font-[family-name:var(--font-open-sans)] overflow-hidden">
      
      {/* Background Aesthetic: Subtle Green Glow */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[400px] bg-[#006837]/20 blur-[120px] rounded-full pointer-events-none opacity-50" 
        aria-hidden="true" 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Column 1: Brand & Social Presence */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group w-fit">
              <div className="brightness-0 invert relative w-12 h-12 group-hover:scale-105 transition-transform duration-300">
                <Image src="/logo.png" alt="Al Zahra" fill className="object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="font-[family-name:var(--font-cinzel)] font-bold text-2xl leading-none tracking-wide uppercase">Al Zahra</span>
                <span className="text-[9px] font-bold tracking-[0.2em] uppercase mt-1 text-white/60">Human Resources</span>
              </div>
            </Link>
            <p className="text-sm text-white/50 leading-relaxed max-w-xs">
              Bridging global employers with exceptional talent since 2001. Delivering high-quality, transparent, and efficient overseas recruitment solutions.
            </p>
            
            {/* Social Media Links - Strict Order: LinkedIn, FB, WA, IG, YT */}
            <div className="flex gap-3 mt-2">
              <SocialIcon href="#" brand="linkedin" color="hover:bg-[#0077b5] hover:border-[#0077b5]"><LinkedinSVG /></SocialIcon>
              <SocialIcon href="#" brand="facebook" color="hover:bg-[#1877F2] hover:border-[#1877F2]"><FacebookSVG /></SocialIcon>
              <SocialIcon href="#" brand="whatsapp" color="hover:bg-[#25D366] hover:border-[#25D366]"><WhatsappSVG /></SocialIcon>
              <SocialIcon href="#" brand="instagram" color="hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:border-transparent"><InstagramSVG /></SocialIcon>
              <SocialIcon href="#" brand="youtube" color="hover:bg-[#FF0000] hover:border-[#FF0000]"><YoutubeSVG /></SocialIcon>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <FooterColumn title="Corporate" links={CORPORATE_LINKS} />

          {/* Column 3: Industry Focus */}
          <FooterColumn title="Industries" links={INDUSTRY_LINKS} />

          {/* Column 4: Contact & Engagement */}
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#39B54A] mb-2 font-[family-name:var(--font-montserrat)]">Get In Touch</h3>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a href={`tel:${CONTACT_DETAILS.phone.replace(/\s/g, '')}`} className="hover:text-white transition-colors flex items-center gap-2">📞 {CONTACT_DETAILS.phone}</a>
              <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-white transition-colors flex items-center gap-2">✉️ {CONTACT_DETAILS.email}</a>
              <p className="mt-2 text-xs leading-relaxed opacity-60">
                {CONTACT_DETAILS.address.split(',').slice(0, 2).join(',')},<br/>
                {CONTACT_DETAILS.address.split(',').slice(2).join(',')}
              </p>
            </div>
            
            {/* Action Group */}
            <div className="flex flex-col gap-3 mt-4 w-full sm:w-fit">
              <Link href="/contact" className="px-6 py-3 bg-[#39B54A] hover:bg-[#006837] text-white text-center font-bold rounded-lg transition-all duration-300 shadow-lg text-[11px] uppercase tracking-widest">
                Hire Talent Now
              </Link>
              <Link href="/partner" className="px-6 py-3 bg-transparent border border-white/20 hover:border-white hover:bg-white hover:text-black text-white text-center font-bold rounded-lg transition-all duration-300 text-[11px] uppercase tracking-widest">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>

        {/* Legal & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-white/30">
          <p>© {currentYear} Al Zahra Human Resources Consultancy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- SUB-COMPONENTS (Internal Helpers) ---

const FooterColumn = ({ title, links }: { title: string; links: { name: string; href: string }[] }) => (
  <div className="flex flex-col gap-4">
    <h3 className="text-sm font-bold uppercase tracking-widest text-[#39B54A] mb-2 font-[family-name:var(--font-montserrat)]">{title}</h3>
    {links.map((link) => (
      <Link key={link.href} href={link.href} className="text-sm text-white/50 hover:text-white transition-colors w-fit">
        {link.name}
      </Link>
    ))}
  </div>
);

const SocialIcon = ({ href, children, color, brand }: { href: string; children: React.ReactNode; color: string; brand: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    aria-label={`Visit our ${brand} page`}
    className={`w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group ${color}`}
  >
    <span className="text-white group-hover:scale-110 transition-transform duration-300">
      {children}
    </span>
  </a>
);

// --- SVG ICON ASSETS ---

const LinkedinSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);

const FacebookSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);

const WhatsappSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
);

const InstagramSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
);

const YoutubeSVG = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.17 1 12 1 12s0 3.83.46 5.58a2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.83 23 12 23 12s0-3.83-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg>
);

export default Footer;
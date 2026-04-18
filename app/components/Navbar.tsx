"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

/**
 * PRODUCTION-GRADE NAVBAR
 * Routing Logic:
 * - Parent items link to index pages (e.g., /industries)
 * - Sub-items link to slug pages (e.g., /industries/hospitality)
 */

const CONTACT_INFO = {
  phone: "+971-55 9996543",
  phoneLink: "tel:+971559996543",
  email: "info@alzahrahr.com",
  emailLink: "mailto:info@alzahrahr.com",
};

const INDUSTRIES = [
  { name: "Construction & Civil", href: "/industries/construction" },
  { name: "Hospitality", href: "/industries/hospitality" },
  { name: "Healthcare", href: "/industries/healthcare" },
  { name: "Security", href: "/industries/security" },
  { name: "Office & Admin", href: "/industries/office-admin" },
  { name: "Transportation", href: "/industries/transportation" },
];

const OFFICES = [
  { name: "United Arab Emirates", href: "/offices/ae" },
  { name: "India", href: "/offices/in" },
  { name: "Nepal", href: "/offices/np" },
];

const COUNTRIES = {
  middleEast: [
    { name: "United Arab Emirates", short: "UAE", href: "/countries/uae" },
    { name: "Saudi Arabia", short: "Saudi Arabia", href: "/countries/saudi-arabia" },
    { name: "Qatar", short: "Qatar", href: "/countries/qatar" },
    { name: "Oman", short: "Oman", href: "/countries/oman" },
    { name: "Kuwait", short: "Kuwait", href: "/countries/kuwait" },
    { name: "Bahrain", short: "Bahrain", href: "/countries/bahrain" },
  ],
  global: [
    { name: "Russia", href: "/countries/russia" }, // Swapped Germany for Russia
    { name: "Romania", href: "/countries/romania" },
    { name: "Poland", href: "/countries/poland" },
    { name: "Malta", href: "/countries/malta" },
    { name: "Cyprus", href: "/countries/cyprus" },
    { name: "Croatia", href: "/countries/croatia" },
  ]
};

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
  }, [isMobileMenuOpen]);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenAccordion(null);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 font-sans text-white ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-2' : 'bg-transparent py-4 [@media(max-height:450px)]:py-1'
      }`}>
        
        {/* Desktop Top Utility Bar */}
        <div className={`hidden lg:flex justify-center items-center w-full pb-2 mb-2 border-b border-white/10 text-xs font-[family-name:var(--font-open-sans)] transition-all duration-300 ${isScrolled ? 'hidden' : 'flex'}`}>
          <div className="flex items-center gap-2 opacity-90 font-semibold tracking-wide">
            <span className="text-[#39B54A]">Interested? Contact us now:</span>
            <a href={CONTACT_INFO.phoneLink} className="hover:text-[#39B54A] transition-colors flex items-center gap-1">📞 {CONTACT_INFO.phone}</a>
            <span className="text-white/30 px-2">|</span>
            <a href={CONTACT_INFO.emailLink} className="hover:text-[#39B54A] transition-colors flex items-center gap-1">✉️ {CONTACT_INFO.email}</a>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="w-full px-4 lg:px-6 xl:px-12 flex justify-between items-center relative z-20">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group flex-none">
            <div className="brightness-0 invert relative w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 [@media(max-height:450px)]:w-6 [@media(max-height:450px)]:h-6 group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="Al Zahra Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-cinzel)] font-bold text-lg lg:text-base xl:text-xl leading-none tracking-wide text-white">
                Al Zahra
              </span>
              <span className="text-[7px] lg:text-[6px] xl:text-[8px] font-bold tracking-[0.2em] uppercase mt-0.5 text-white/80">
                Human Resources
              </span>
            </div>
          </Link>
          
          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 text-[10px] xl:text-[11px] uppercase font-bold tracking-wider font-[family-name:var(--font-open-sans)] whitespace-nowrap">
            <Link href="/" className="hover:text-[#39B54A] transition-colors py-4">Home</Link>
            <Link href="/about" className="hover:text-[#39B54A] transition-colors py-4">About Us</Link>
            <Link href="/services" className="hover:text-[#39B54A] transition-colors py-4">Services</Link>
            
            <Dropdown label="Industries" href="/industries" items={INDUSTRIES} />
            <Dropdown label="Offices" href="/offices" items={OFFICES} />

            {/* Countries Mega Dropdown */}
            <div className="relative group cursor-pointer py-4">
              <Link href="/countries" className="hover:text-[#39B54A] transition-colors flex items-center gap-1">
                Countries we Serve <span className="text-[7px] ml-1">▼</span>
              </Link>
               <div className="absolute top-full -left-[100px] xl:left-0 w-[400px] bg-white text-[#1B2B21] p-4 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border-t-2 border-[#39B54A] flex gap-4">
                <div className="flex-1 text-left">
                  <span className="text-[#006837] font-black text-[10px] mb-2 block border-b pb-1">MIDDLE EAST</span>
                  {COUNTRIES.middleEast.map(c => <Link key={c.href} href={c.href} className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">{c.name}</Link>)}
                </div>
                <div className="flex-1 border-l pl-4 text-left">
                  <span className="text-[#006837] font-black text-[10px] mb-2 block border-b pb-1">EUROPE & GLOBAL</span>
                  {COUNTRIES.global.map(c => <Link key={c.href} href={c.href} className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">{c.name}</Link>)}
                </div>
              </div>
            </div>

            <Link href="/careers" className="hover:text-[#39B54A] transition-colors py-4">Careers</Link>
            <Link href="/blog" className="hover:text-[#39B54A] transition-colors py-4 pr-3 xl:pr-4 border-r border-white/20">Blog</Link>
            
            <div className="flex items-center gap-2 xl:gap-3 pl-1 xl:pl-2">
              <Link href="/partner" className="px-3 xl:px-5 py-2 xl:py-2.5 bg-transparent border border-white hover:bg-white hover:text-[#1B2B21] rounded-full transition-all duration-300 text-[9px] xl:text-[10px] font-bold whitespace-nowrap">
                Partner With Us
              </Link>
              <Link href="/contact" className="px-3 xl:px-5 py-2 xl:py-2.5 bg-[#39B54A] hover:bg-[#006837] text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl text-[9px] xl:text-[10px] font-bold whitespace-nowrap">
                Hire Talent
              </Link>
            </div>
          </nav>

          {/* Hamburger */}
          <button className="lg:hidden p-2 z-50 flex flex-col gap-1.5" onClick={() => setIsMobileMenuOpen(true)}>
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
            <span className="block w-6 h-0.5 bg-white" />
          </button>
        </div>
      </header>

      {/* MOBILE OVERLAY */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl lg:hidden z-[110] flex flex-col transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="w-full flex justify-between items-center px-4 py-4 border-b border-white/10 bg-[#006837]/20 shrink-0">
          <Link href="/" className="flex items-center gap-2" onClick={closeMenu}>
            <div className="brightness-0 invert relative w-6 h-6"><Image src="/logo.png" alt="Logo" fill className="object-contain" /></div>
            <span className="font-[family-name:var(--font-cinzel)] font-bold text-sm text-white uppercase tracking-tighter">Al Zahra</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/contact" onClick={closeMenu} className="px-4 py-2 bg-[#39B54A] text-white rounded-full font-bold uppercase text-[10px]">Hire Talent</Link>
            <button className="relative w-8 h-8" onClick={closeMenu}>
              <span className="block w-6 h-0.5 bg-white rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2" />
              <span className="block w-6 h-0.5 bg-white -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 font-[family-name:var(--font-open-sans)]">
          <div className="flex flex-col gap-1 max-w-lg mx-auto pb-10">
            <MobileLink label="Home" href="/" onClick={closeMenu} />
            <MobileLink label="About Us" href="/about" onClick={closeMenu} />
            <MobileLink label="Services" href="/services" onClick={closeMenu} />
            
            <MobileAccordion label="Industries" href="/industries" isOpen={openAccordion === 'ind'} onToggle={() => toggleAccordion('ind')} onLinkClick={closeMenu}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 border-l-2 border-[#39B54A] ml-2">
                {INDUSTRIES.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} className="text-sm font-semibold text-white/80 py-1">{item.name}</Link>)}
              </div>
            </MobileAccordion>

            <MobileAccordion label="Offices" href="/offices" isOpen={openAccordion === 'off'} onToggle={() => toggleAccordion('off')} onLinkClick={closeMenu}>
              <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#39B54A] ml-2">
                {OFFICES.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} className="text-sm font-semibold text-white/80 py-1">{item.name}</Link>)}
              </div>
            </MobileAccordion>

            <MobileAccordion label="Countries we serve" href="/countries" isOpen={openAccordion === 'count'} onToggle={() => toggleAccordion('count')} onLinkClick={closeMenu}>
              <div className="flex flex-col gap-4 pl-4 border-l-2 border-[#39B54A] ml-2">
                <div>
                  <span className="text-[#39B54A] font-black text-[10px] mb-2 block uppercase tracking-tighter">Middle East</span>
                  <div className="grid grid-cols-2 gap-2">
                    {COUNTRIES.middleEast.map(c => <Link key={c.href} href={c.href} onClick={closeMenu} className="text-sm font-semibold text-white/70">{c.short}</Link>)}
                  </div>
                </div>
                <div>
                  <span className="text-[#39B54A] font-black text-[10px] mb-2 block uppercase tracking-tighter">Europe & Global</span>
                  <div className="grid grid-cols-2 gap-2">
                    {COUNTRIES.global.map(c => <Link key={c.href} href={c.href} onClick={closeMenu} className="text-sm font-semibold text-white/70">{c.name}</Link>)}
                  </div>
                </div>
              </div>
            </MobileAccordion>

            <MobileLink label="Careers" href="/careers" onClick={closeMenu} />
            <MobileLink label="Blog" href="/blog" onClick={closeMenu} />
            <div className="mt-8"><Link href="/partner" onClick={closeMenu} className="block w-full py-4 border border-white/30 text-center rounded-lg font-bold text-sm uppercase tracking-widest text-white/80">Partner With Us</Link></div>
          </div>
        </div>
      </div>
    </>
  );
};

// --- SUB-COMPONENTS ---

const Dropdown = ({ label, href, items }: { label: string, href: string, items: { name: string, href: string }[] }) => (
  <div className="relative group cursor-pointer py-4">
    <Link href={href} className="hover:text-[#39B54A] transition-colors flex items-center gap-1">
      {label} <span className="text-[7px] ml-1">▼</span>
    </Link>
    <div className="absolute top-full left-0 w-56 bg-white text-[#1B2B21] p-2 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border-t-2 border-[#39B54A] text-left">
      {items.map(item => (
        <Link key={item.href} href={item.href} className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">
          {item.name}
        </Link>
      ))}
    </div>
  </div>
);

const MobileLink = ({ label, href, onClick }: { label: string, href: string, onClick: () => void }) => (
  <Link href={href} onClick={onClick} className="text-base font-bold hover:text-[#39B54A] py-3 border-b border-white/5 uppercase tracking-wide text-left">
    {label}
  </Link>
);

const MobileAccordion = ({ label, href, isOpen, onToggle, onLinkClick, children }: { label: string, href: string, isOpen: boolean, onToggle: () => void, onLinkClick: () => void, children: React.ReactNode }) => (
  <div className="w-full border-b border-white/5 py-1">
    <div className="w-full flex justify-between items-center py-2">
      <Link href={href} onClick={onLinkClick} className="text-base font-bold hover:text-[#39B54A] uppercase tracking-wide text-left flex-grow">
        {label}
      </Link>
      <button onClick={onToggle} className="p-2 ml-4">
        <span className={`text-[10px] block transition-transform ${isOpen ? 'rotate-180' : ''}`}>▼</span>
      </button>
    </div>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
      {children}
    </div>
  </div>
);

export default Navbar;
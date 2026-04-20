"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// ─── DATA CONFIGURATION ──────────────────────────────────────────────────
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
    { name: "Russia", href: "/countries/russia" },
    { name: "Romania", href: "/countries/romania" },
    { name: "Poland", href: "/countries/poland" },
    { name: "Malta", href: "/countries/malta" },
    { name: "Cyprus", href: "/countries/cyprus" },
    { name: "Croatia", href: "/countries/croatia" },
  ]
};

// ─── VIEWPORT TIER ───────────────────────────────────────────────────────────
type ViewportTier = "watch" | "smallPhone" | "normal";
function getViewportTier(): ViewportTier {
  if (typeof window === 'undefined') return "normal";
  const w = window.innerWidth;
  // Apple Watch width is typically ~180-220px
  if (w < 250) return "watch";
  // Targets small devices like iPhone SE (320px width)
  if (w < 375) return "smallPhone";
  return "normal";
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [tier, setTier] = useState<ViewportTier>("normal");

  useEffect(() => {
    const handleResize = () => {
      setIsScrolled(window.scrollY > 50);
      setTier(getViewportTier());
    };
    
    window.addEventListener('scroll', handleResize);
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleResize);
      window.removeEventListener('resize', handleResize);
    };
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

  const isWatch = tier === "watch";
  const isSmallPhone = tier === "smallPhone";

  return (
    <>
      <header id="site-navbar" className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 font-sans text-white ${
        isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg py-1' : 'bg-transparent py-4 [@media(max-height:450px)]:py-1'
      }`}>
        
        {/* Desktop Top Utility Bar (Hidden on small screens) */}
        {!isWatch && !isSmallPhone && (
          <div className={`hidden lg:flex justify-center items-center w-full pb-2 mb-2 border-b border-white/5 text-[10px] tracking-[0.1em] font-medium transition-all duration-500 ease-out-expo ${isScrolled ? 'hidden' : 'flex'}`}>
            <div className="flex items-center gap-4 opacity-80 uppercase">
              <span className="text-[#006837] font-bold">Contact:</span>
              <a href={CONTACT_INFO.phoneLink} className="hover:text-white transition-colors duration-300 flex items-center gap-1.5">{CONTACT_INFO.phone}</a>
              <span className="text-white/20">/</span>
              <a href={CONTACT_INFO.emailLink} className="hover:text-white transition-colors duration-300 flex items-center gap-1.5">{CONTACT_INFO.email}</a>
            </div>
          </div>
        )}

        {/* Main Navigation Bar */}
        <div className={`w-full flex justify-between items-center relative z-20 ${isWatch ? 'px-2' : 'px-4 lg:px-8 xl:px-16'}`}>
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 sm:gap-3 group flex-none">
            <div className={`brightness-0 invert relative transition-all duration-500 ease-out-expo group-hover:scale-110 ${isWatch ? 'w-5 h-5' : 'w-7 h-7 lg:w-9 lg:h-9 xl:w-11 xl:h-11'}`}>
              <Image src="/logo.png" alt="Al Zahra Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className={`font-[family-name:var(--font-cinzel)] font-bold leading-none tracking-[0.05em] text-white ${isWatch ? 'text-[10px]' : 'text-base lg:text-lg xl:text-2xl'}`}>
                Al Zahra
              </span>
              {!isWatch && (
                <span className="text-[6px] lg:text-[7px] xl:text-[9px] font-bold tracking-[0.25em] uppercase mt-1 text-white/70">
                  Human Resources
                </span>
              )}
            </div>
          </Link>
          
          {/* Desktop Links (Hidden on mobile) */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-[10px] xl:text-[11px] uppercase font-bold tracking-[0.15em] whitespace-nowrap">
            <Link href="/" className="hover:text-[#006837] transition-colors duration-300 py-4 relative group/link">
              Home
              <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-[#006837] transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link href="/about" className="hover:text-[#006837] transition-colors duration-300 py-4 relative group/link">
              About Us
              <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-[#006837] transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link href="/services" className="hover:text-[#006837] transition-colors duration-300 py-4 relative group/link">
              Services
              <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-[#006837] transition-all duration-300 group-hover/link:w-full" />
            </Link>
            
            <Dropdown label="Industries" href="/industries" items={INDUSTRIES} />
            <Dropdown label="Offices" href="/offices" items={OFFICES} />
            
            <div className="relative group cursor-pointer py-4">
              <Link href="/countries" className="hover:text-[#006837] transition-colors duration-300 flex items-center gap-1.5 group/link">
                Countries <span className="text-[7px] opacity-40 group-hover:rotate-180 transition-transform duration-300">▼</span>
              </Link>
               <div className="absolute top-full -left-[120px] xl:left-0 w-[440px] bg-[#fdfdfd] text-[#1B2B21] p-6 rounded-b-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out-expo translate-y-4 group-hover:translate-y-0 border border-black/5 flex gap-6">
                <div className="flex-1 text-left">
                  <span className="text-[#006837] font-black text-[9px] mb-4 block tracking-[0.2em] border-b border-black/5 pb-2 uppercase">Middle East</span>
                  <div className="flex flex-col gap-1">
                    {COUNTRIES.middleEast.map(c => (
                      <Link key={c.href} href={c.href} className="block px-3 py-2 hover:bg-[#006837]/5 hover:text-[#006837] rounded-lg text-xs font-bold transition-all duration-200">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="flex-1 border-l border-black/5 pl-6 text-left">
                  <span className="text-[#006837] font-black text-[9px] mb-4 block tracking-[0.2em] border-b border-black/5 pb-2 uppercase">Europe & Global</span>
                  <div className="flex flex-col gap-1">
                    {COUNTRIES.global.map(c => (
                      <Link key={c.href} href={c.href} className="block px-3 py-2 hover:bg-[#006837]/5 hover:text-[#006837] rounded-lg text-xs font-bold transition-all duration-200">
                        {c.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/careers" className="hover:text-[#006837] transition-colors duration-300 py-4 relative group/link">
              Careers
              <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-[#006837] transition-all duration-300 group-hover/link:w-full" />
            </Link>
            <Link href="/blog" className="hover:text-[#006837] transition-colors duration-300 py-4 pr-4 border-r border-white/10 relative group/link">
              Blog
              <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-[#006837] transition-all duration-300 group-hover/link:w-full" />
            </Link>
            
            <div className="flex items-center gap-3 xl:gap-4 pl-2 xl:pl-4">
              <Link href="/partner" className="px-5 xl:px-7 py-2.5 xl:py-3 border border-white/30 hover:border-white hover:bg-white hover:text-[#006837] rounded-full transition-all duration-500 ease-out-expo text-[9px] xl:text-[10px] font-black tracking-widest uppercase">
                Partner
              </Link>
              <Link href="/contact" className="px-5 xl:px-7 py-2.5 xl:py-3 bg-[#006837] hover:bg-[#004d29] text-white rounded-full transition-all duration-500 ease-out-expo shadow-lg hover:shadow-2xl hover:-translate-y-0.5 text-[9px] xl:text-[10px] font-black tracking-widest uppercase">
                Hire Talent
              </Link>
            </div>
          </nav>

          {/* Hamburger Menu Icon */}
          <button 
            className="lg:hidden p-1 sm:p-2 z-50 flex flex-col gap-1 sm:gap-1.5 justify-center" 
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Menu"
          >
            <span className={`block bg-white transition-all ${isWatch ? 'w-4 h-[1px]' : 'w-6 h-0.5'}`} />
            <span className={`block bg-white transition-all ${isWatch ? 'w-4 h-[1px]' : 'w-6 h-0.5'}`} />
            <span className={`block bg-white transition-all ${isWatch ? 'w-4 h-[1px]' : 'w-6 h-0.5'}`} />
          </button>
        </div>
      </header>

      {/* FIXED FULL-SCREEN MOBILE MENU OVERLAY */}
      <div className={`fixed inset-0 bg-black/98 backdrop-blur-3xl lg:hidden z-[110] flex flex-col transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        
        {/* Mobile Header */}
        <div className={`w-full flex justify-between items-center border-b border-white/10 bg-[#006837]/20 shrink-0 ${isWatch ? 'px-2 py-2' : 'px-4 py-4'}`}>
          <Link href="/" className="flex items-center gap-1" onClick={closeMenu}>
            <div className="brightness-0 invert relative w-5 h-5"><Image src="/logo.png" alt="Logo" fill className="object-contain" /></div>
            <span className={`font-[family-name:var(--font-cinzel)] font-bold text-white uppercase tracking-tighter ${isWatch ? 'text-[10px]' : 'text-sm'}`}>Al Zahra</span>
          </Link>
          <div className="flex items-center gap-2">
            {!isWatch && (
              <Link href="/contact" onClick={closeMenu} className={`bg-[#006837] text-white rounded-full font-bold uppercase ${isSmallPhone ? 'px-3 py-1.5 text-[8px]' : 'px-4 py-2 text-[10px]'}`}>Hire</Link>
            )}
            <button className="relative w-6 h-6 sm:w-8 sm:h-8" onClick={closeMenu}>
              <span className="block w-4 sm:w-6 h-[1px] sm:h-0.5 bg-white rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2" />
              <span className="block w-4 sm:w-6 h-[1px] sm:h-0.5 bg-white -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2" />
            </button>
          </div>
        </div>

        {/* Scrollable Mobile Links */}
        <div className={`flex-1 overflow-y-auto font-[family-name:var(--font-open-sans)] ${isWatch ? 'px-2 py-2' : 'px-6 py-4'}`}>
          <div className="flex flex-col gap-0.5 max-w-lg mx-auto pb-10">
            <MobileLink label="Home" href="/" onClick={closeMenu} tier={tier} />
            <MobileLink label="About Us" href="/about" onClick={closeMenu} tier={tier} />
            <MobileLink label="Services" href="/services" onClick={closeMenu} tier={tier} />
            
            <MobileAccordion label="Industries" href="/industries" isOpen={openAccordion === 'ind'} onToggle={() => toggleAccordion('ind')} onLinkClick={closeMenu} tier={tier}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 pl-3 border-l-[1px] border-[#006837] ml-1">
                {INDUSTRIES.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} className={`${isWatch ? 'text-[8px]' : isSmallPhone ? 'text-[10px]' : 'text-xs sm:text-sm'} font-semibold text-white/80 py-1`}>{item.name}</Link>)}
              </div>
            </MobileAccordion>

            <MobileAccordion label="Offices" href="/offices" isOpen={openAccordion === 'off'} onToggle={() => toggleAccordion('off')} onLinkClick={closeMenu} tier={tier}>
              <div className="flex flex-col gap-1 pl-3 border-l-[1px] border-[#006837] ml-1">
                {OFFICES.map(item => <Link key={item.href} href={item.href} onClick={closeMenu} className={`${isWatch ? 'text-[8px]' : isSmallPhone ? 'text-[10px]' : 'text-xs sm:text-sm'} font-semibold text-white/80 py-1`}>{item.name}</Link>)}
              </div>
            </MobileAccordion>

            <MobileAccordion label="Countries" href="/countries" isOpen={openAccordion === 'count'} onToggle={() => toggleAccordion('count')} onLinkClick={closeMenu} tier={tier}>
              <div className="flex flex-col gap-2 pl-3 border-l-[1px] border-[#006837] ml-1">
                <div>
                  <span className="text-[#006837] font-black text-[8px] mb-1 block uppercase tracking-tighter">Middle East</span>
                  <div className="grid grid-cols-2 gap-1">
                    {COUNTRIES.middleEast.map(c => <Link key={c.href} href={c.href} onClick={closeMenu} className={`${isWatch ? 'text-[7px]' : isSmallPhone ? 'text-[9px]' : 'text-[11px] sm:text-xs'} font-semibold text-white/70`}>{c.short}</Link>)}
                  </div>
                </div>
                <div>
                  <span className="text-[#006837] font-black text-[8px] mb-1 block uppercase tracking-tighter">Global</span>
                  <div className="grid grid-cols-2 gap-1">
                    {COUNTRIES.global.map(c => <Link key={c.href} href={c.href} onClick={closeMenu} className={`${isWatch ? 'text-[7px]' : isSmallPhone ? 'text-[9px]' : 'text-[11px] sm:text-xs'} font-semibold text-white/70`}>{c.name}</Link>)}
                  </div>
                </div>
              </div>
            </MobileAccordion>

            <MobileLink label="Careers" href="/careers" onClick={closeMenu} tier={tier} />
            <MobileLink label="Blog" href="/blog" onClick={closeMenu} tier={tier} />
            
            <div className={`${isWatch ? 'mt-4' : 'mt-8'}`}>
              <Link href="/partner" onClick={closeMenu} className={`block w-full border border-white/30 text-center rounded-lg font-bold uppercase tracking-widest text-white/80 ${isWatch ? 'py-2 text-[8px]' : isSmallPhone ? 'py-3 text-[10px]' : 'py-4 text-xs sm:text-sm'}`}>
                Partner
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ─── SUB-COMPONENTS ────────────────────────────────────────────────────────
const Dropdown = ({ label, href, items }: { label: string, href: string, items: { name: string, href: string }[] }) => (
  <div className="relative group cursor-pointer py-4">
    <Link href={href} className="hover:text-[#006837] transition-colors duration-300 flex items-center gap-1.5 group/link">
      {label} <span className="text-[7px] opacity-40 group-hover:rotate-180 transition-transform duration-300">▼</span>
    </Link>
    <div className="absolute top-full left-0 w-64 bg-[#fdfdfd] text-[#1B2B21] p-3 rounded-b-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 ease-out-expo translate-y-4 group-hover:translate-y-0 border border-black/5 text-left">
      {items.map(item => (
        <Link key={item.href} href={item.href} className="block px-4 py-3 hover:bg-[#006837]/5 hover:text-[#006837] rounded-lg transition-all duration-200 text-xs font-bold">
          {item.name}
        </Link>
      ))}
    </div>
  </div>
);

const MobileLink = ({ label, href, onClick, tier }: { label: string, href: string, onClick: () => void, tier: ViewportTier }) => {
  const isWatch = tier === "watch";
  const isSmallPhone = tier === "smallPhone";
  const fontSize = isWatch ? 'text-[9px]' : isSmallPhone ? 'text-[11px]' : 'text-sm sm:text-base';
  const padding = isWatch ? 'py-3' : isSmallPhone ? 'py-4' : 'py-5';
  
  return (
    <Link href={href} onClick={onClick} className={`font-bold hover:text-[#006837] border-b border-white/5 uppercase tracking-[0.1em] text-left transition-colors duration-300 ${fontSize} ${padding}`}>
      {label}
    </Link>
  );
};

const MobileAccordion = ({ label, href, isOpen, onToggle, onLinkClick, children, tier }: { label: string, href: string, isOpen: boolean, onToggle: () => void, onLinkClick: () => void, children: React.ReactNode, tier: ViewportTier }) => {
  const isWatch = tier === "watch";
  const isSmallPhone = tier === "smallPhone";
  const fontSize = isWatch ? 'text-[9px]' : isSmallPhone ? 'text-[11px]' : 'text-sm sm:text-base';
  
  return (
    <div className="w-full border-b border-white/5 py-1">
      <div className="w-full flex justify-between items-center py-2">
        <Link href={href} onClick={onLinkClick} className={`font-bold hover:text-[#006837] uppercase tracking-[0.1em] text-left flex-grow transition-colors duration-300 ${fontSize}`}>
          {label}
        </Link>
        <button onClick={onToggle} className="p-2 ml-4">
          <span className={`transition-transform duration-500 ease-out-expo block ${isOpen ? 'rotate-180' : ''} ${isWatch ? 'text-[8px]' : 'text-[11px]'}`}>▼</span>
        </button>
      </div>
      <div className={`overflow-hidden transition-all duration-500 ease-out-expo ${isOpen ? 'max-h-[800px] opacity-100 mb-4' : 'max-h-0 opacity-0'}`}>
        {children}
      </div>
    </div>
  );
};

export default Navbar;
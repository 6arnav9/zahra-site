"use client";

import Image from 'next/image';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling on the body when the mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
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
            <a href="tel:+971559996543" className="hover:text-[#39B54A] transition-colors flex items-center gap-1">📞 +971-55 9996543</a>
            <span className="text-white/30 px-2">|</span>
            <a href="mailto:info@alzahrahr.com" className="hover:text-[#39B54A] transition-colors flex items-center gap-1">✉️ info@alzahrahr.com</a>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="w-full px-4 lg:px-6 xl:px-12 flex justify-between items-center relative z-20">
          
          {/* Logo Area */}
          <Link href="/" className="flex items-center gap-2 group flex-none">
            <div className="brightness-0 invert relative w-8 h-8 lg:w-8 lg:h-8 xl:w-10 xl:h-10 [@media(max-height:450px)]:w-6 [@media(max-height:450px)]:h-6 group-hover:scale-105 transition-transform">
              <Image src="/logo.png" alt="Al Zahra Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-cinzel)] font-bold text-lg lg:text-base xl:text-xl leading-none tracking-wide text-white [@media(max-height:450px)]:text-base">
                Al Zahra
              </span>
              <span className="text-[7px] lg:text-[6px] xl:text-[8px] font-bold tracking-[0.2em] uppercase mt-0.5 text-white/80 [@media(max-height:450px)]:text-[5px]">
                Human Resources
              </span>
            </div>
          </Link>
          
          {/* Desktop Links */}
          <nav className="hidden lg:flex items-center gap-3 xl:gap-6 text-[10px] xl:text-[11px] uppercase font-bold tracking-wider font-[family-name:var(--font-open-sans)] whitespace-nowrap">
            <Link href="/" className="hover:text-[#39B54A] transition-colors py-4">Home</Link>
            <Link href="/about" className="hover:text-[#39B54A] transition-colors py-4">About Us</Link>
            <Link href="/services" className="hover:text-[#39B54A] transition-colors py-4">Services</Link>
            
            <div className="relative group cursor-pointer py-4">
              <span className="hover:text-[#39B54A] transition-colors flex items-center gap-1">Industries <span className="text-[7px] ml-1">▼</span></span>
               <div className="absolute top-full left-0 w-56 bg-white text-[#1B2B21] p-2 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border-t-2 border-[#39B54A]">
                <Link href="/industries/construction" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Construction & Civil</Link>
                <Link href="/industries/hospitality" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Hospitality</Link>
                <Link href="/industries/healthcare" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Healthcare</Link>
                <Link href="/industries/security" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Security</Link>
                <Link href="/industries/office-admin" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Office & Admin</Link>
                <Link href="/industries/transportation" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Transportation</Link>
              </div>
            </div>

            <div className="relative group cursor-pointer py-4">
              <span className="hover:text-[#39B54A] transition-colors flex items-center gap-1">Offices <span className="text-[7px] ml-1">▼</span></span>
               <div className="absolute top-full left-0 w-48 bg-white text-[#1B2B21] p-2 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border-t-2 border-[#39B54A]">
                <Link href="/offices/uae" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">United Arab Emirates</Link>
                <Link href="/offices/india" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">India</Link>
                <Link href="/offices/nepal" className="block px-4 py-3 hover:bg-[#E8F5E9] hover:text-[#006837] rounded transition-colors text-xs font-semibold">Nepal</Link>
              </div>
            </div>

            <div className="relative group cursor-pointer py-4">
              <span className="hover:text-[#39B54A] transition-colors flex items-center gap-1">Countries we Serve <span className="text-[7px] ml-1">▼</span></span>
               <div className="absolute top-full -left-[100px] xl:left-0 w-[400px] bg-white text-[#1B2B21] p-4 rounded-b-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all translate-y-2 group-hover:translate-y-0 border-t-2 border-[#39B54A] flex gap-4">
                <div className="flex-1">
                  <span className="text-[#006837] font-black text-[10px] mb-2 block border-b pb-1">MIDDLE EAST</span>
                  <Link href="/countries/uae" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">United Arab Emirates</Link>
                  <Link href="/countries/saudi-arabia" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Saudi Arabia</Link>
                  <Link href="/countries/qatar" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Qatar</Link>
                  <Link href="/countries/oman" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Oman</Link>
                  <Link href="/countries/kuwait" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Kuwait</Link>
                  <Link href="/countries/bahrain" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Bahrain</Link>
                </div>
                <div className="flex-1 border-l pl-4">
                  <span className="text-[#006837] font-black text-[10px] mb-2 block border-b pb-1">EUROPE & GLOBAL</span>
                  <Link href="/countries/romania" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Romania</Link>
                  <Link href="/countries/poland" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Poland</Link>
                  <Link href="/countries/germany" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Germany</Link>
                  <Link href="/countries/malta" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Malta</Link>
                  <Link href="/countries/cyprus" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Cyprus</Link>
                  <Link href="/countries/croatia" className="block px-2 py-2 hover:bg-[#E8F5E9] rounded text-xs font-semibold">Croatia</Link>
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

          {/* Open Mobile Menu Hamburger Button */}
          <button 
            className="lg:hidden flex flex-col gap-1.5 p-2 z-50 [@media(max-height:450px)]:scale-75"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
            <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
            <span className="block w-6 h-0.5 bg-white transition-all duration-300" />
          </button>
        </div>
      </header>

      {/* FIXED FULL-SCREEN MOBILE MENU OVERLAY */}
      <div 
        className={`fixed inset-0 bg-black/98 backdrop-blur-3xl lg:hidden z-[110] flex flex-col transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        {/* Mobile Menu Top Utility Bar (Eliminates the gap and groups CTA + Close Button) */}
        <div className="w-full flex justify-between items-center px-4 py-4 sm:py-5 border-b border-white/10 bg-[#006837]/20 backdrop-blur-md shrink-0">
          
          {/* Logo on the left */}
          <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="brightness-0 invert relative w-6 h-6 sm:w-8 sm:h-8">
              <Image src="/logo.png" alt="Al Zahra Logo" fill className="object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="font-[family-name:var(--font-cinzel)] font-bold text-sm sm:text-base leading-none text-white">Al Zahra</span>
            </div>
          </Link>
          
          {/* Grouped CTA and Close button on the right */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-2 sm:px-5 sm:py-2.5 bg-[#39B54A] text-white rounded-full font-bold uppercase tracking-wider text-[10px] sm:text-xs shadow-[0_0_15px_rgba(57,181,74,0.3)]">
              Hire Talent
            </Link>
            
            {/* The 'X' Close Button */}
            <button 
              className="flex flex-col justify-center items-center p-2 w-8 h-8"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="block w-6 h-0.5 bg-white rotate-45 translate-y-[1px] absolute"></span>
              <span className="block w-6 h-0.5 bg-white -rotate-45 translate-y-[1px] absolute"></span>
            </button>
          </div>
        </div>

        {/* Scrollable Links Section */}
        <div className="flex-1 overflow-y-auto w-full font-[family-name:var(--font-open-sans)] px-6 py-4">
          <div className="flex flex-col w-full max-w-lg mx-auto pb-10 gap-1">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-base sm:text-lg font-bold hover:text-[#39B54A] py-3 border-b border-white/5 uppercase tracking-wide">Home</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-base sm:text-lg font-bold hover:text-[#39B54A] py-3 border-b border-white/5 uppercase tracking-wide">About Us</Link>
            <Link href="/services" onClick={() => setIsMobileMenuOpen(false)} className="text-base sm:text-lg font-bold hover:text-[#39B54A] py-3 border-b border-white/5 uppercase tracking-wide">Services</Link>
            
            {/* Industries Accordion */}
            <div className="w-full border-b border-white/5 py-1">
              <button 
                onClick={() => toggleAccordion('industries')}
                className="w-full flex justify-between items-center text-base sm:text-lg font-bold hover:text-[#39B54A] py-2 uppercase tracking-wide text-left"
              >
                Industries
                <span className={`text-[10px] transition-transform duration-300 ${openAccordion === 'industries' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'industries' ? 'max-h-96 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-4 pb-2 border-l-2 border-[#39B54A] ml-2">
                  <Link href="/industries/construction" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Construction</Link>
                  <Link href="/industries/hospitality" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Hospitality</Link>
                  <Link href="/industries/healthcare" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Healthcare</Link>
                  <Link href="/industries/security" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Security</Link>
                  <Link href="/industries/office-admin" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Office & Admin</Link>
                  <Link href="/industries/transportation" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Transportation</Link>
                </div>
              </div>
            </div>

            {/* Offices Accordion */}
            <div className="w-full border-b border-white/5 py-1">
              <button 
                onClick={() => toggleAccordion('offices')}
                className="w-full flex justify-between items-center text-base sm:text-lg font-bold hover:text-[#39B54A] py-2 uppercase tracking-wide text-left"
              >
                Offices
                <span className={`text-[10px] transition-transform duration-300 ${openAccordion === 'offices' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'offices' ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-2 pl-4 pb-2 border-l-2 border-[#39B54A] ml-2">
                  <Link href="/offices/uae" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">United Arab Emirates</Link>
                  <Link href="/offices/india" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">India</Link>
                  <Link href="/offices/nepal" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-[#39B54A] py-1 text-white/80">Nepal</Link>
                </div>
              </div>
            </div>

            {/* Countries Accordion */}
            <div className="w-full border-b border-white/5 py-1">
              <button 
                onClick={() => toggleAccordion('countries')}
                className="w-full flex justify-between items-center text-base sm:text-lg font-bold hover:text-[#39B54A] py-2 uppercase tracking-wide text-left"
              >
                Countries we serve
                <span className={`text-[10px] transition-transform duration-300 ${openAccordion === 'countries' ? 'rotate-180' : ''}`}>▼</span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openAccordion === 'countries' ? 'max-h-[800px] opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col gap-4 pl-4 pb-4 border-l-2 border-[#39B54A] ml-2">
                  <div>
                    <span className="text-[#39B54A] font-black text-[10px] mb-2 block">MIDDLE EAST</span>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/countries/uae" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">UAE</Link>
                      <Link href="/countries/saudi-arabia" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Saudi Arabia</Link>
                      <Link href="/countries/qatar" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Qatar</Link>
                      <Link href="/countries/oman" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Oman</Link>
                      <Link href="/countries/kuwait" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Kuwait</Link>
                      <Link href="/countries/bahrain" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Bahrain</Link>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#39B54A] font-black text-[10px] mb-2 block">EUROPE</span>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/countries/romania" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Romania</Link>
                      <Link href="/countries/poland" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Poland</Link>
                      <Link href="/countries/germany" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Germany</Link>
                      <Link href="/countries/malta" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Malta</Link>
                      <Link href="/countries/cyprus" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Cyprus</Link>
                      <Link href="/countries/croatia" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-semibold hover:text-white py-1 text-white/70">Croatia</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/careers" onClick={() => setIsMobileMenuOpen(false)} className="text-base sm:text-lg font-bold hover:text-[#39B54A] py-3 border-b border-white/5 uppercase tracking-wide">Careers</Link>
            <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-base sm:text-lg font-bold hover:text-[#39B54A] py-3 border-b border-white/5 uppercase tracking-wide">Blog</Link>
            
            {/* Bottom CTA (Partner With Us) */}
            <div className="mt-8 mb-4">
              <Link href="/partner" onClick={() => setIsMobileMenuOpen(false)} className="block w-full py-4 border border-white/30 text-center rounded-lg font-bold hover:bg-white hover:text-black transition-colors text-sm uppercase tracking-widest text-white/80">
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
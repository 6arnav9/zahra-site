"use client";

import Image from 'next/image';
import Link from 'next/link';

const LegacyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <path d="M9 22v-4h6v4"></path>
    <path d="M8 6h.01"></path>
    <path d="M16 6h.01"></path>
    <path d="M12 6h.01"></path>
    <path d="M12 10h.01"></path>
    <path d="M12 14h.01"></path>
    <path d="M16 10h.01"></path>
    <path d="M16 14h.01"></path>
    <path d="M8 10h.01"></path>
    <path d="M8 14h.01"></path>
  </svg>
);

const SECTORS = [
  { name: 'Construction & Civil', href: '/industries/construction' },
  { name: 'Healthcare', href: '/industries/healthcare' },
  { name: 'Logistics', href: '/industries/transportation' },
  { name: 'Hospitality', href: '/industries/hospitality' },
  { name: 'Security', href: '/industries/security' }
];

const HomeAbout = () => {
  return (
    <section className="relative w-full bg-[#f4f7f6] text-[#1B2B21] py-24 lg:py-32 overflow-hidden font-[family-name:var(--font-open-sans)]">
      
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#006837 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">
          
          {/* Left Column: The Narrative */}
          <div className="flex flex-col items-start pr-0 lg:pr-10 mt-8 lg:mt-0">
            
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-black leading-[1.1] mb-6 font-[family-name:var(--font-montserrat)] text-gray-900 tracking-tight">
              Powering the World's <br/>
              <span className="text-[#39B54A]">Essential Industries.</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6">
              Since 2001, Al Zahra has gone beyond filling desks. We deploy the highly skilled, ethical, and resilient workforce required to build infrastructure, run healthcare systems, and manage global supply chains.
            </p>
            
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              Operating out of <strong className="text-[#006837]">Dubai, India, and Nepal</strong>, Mr. Ashish Kumar Singh and our expert team bridge the gap between massive global projects across the Middle East & Europe, and the frontline talent that brings them to life.
            </p>

            {/* Clickable Industry Links */}
            <div className="flex flex-wrap gap-3 mb-10">
              {SECTORS.map((sector) => (
                <Link 
                  key={sector.name} 
                  href={sector.href}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 uppercase tracking-wider shadow-sm hover:border-[#39B54A] hover:text-[#006837] transition-all hover:shadow-md cursor-pointer"
                >
                  {sector.name}
                </Link>
              ))}
            </div>

            {/* Action Button */}
            <Link href="/about" className="group flex items-center gap-4 px-8 py-4 bg-[#006837] hover:bg-[#39B54A] text-white font-bold rounded-full transition-all duration-300 shadow-xl text-sm uppercase tracking-widest">
              Learn About Us
              <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
            </Link>

          </div>

          {/* Right Column: Frontline Image Cluster */}
          <div className="relative w-full h-[500px] sm:h-[600px] lg:h-[700px] max-w-lg mx-auto lg:max-w-none mt-10 lg:mt-0">
            
            {/* Main Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-[#39B54A]/20 blur-[80px] rounded-full pointer-events-none" />

            {/* Image 1: Heavy Industry / Construction (Large, bottom right) - Updated to South Asian workforce */}
            <div className="absolute right-0 bottom-0 w-[75%] h-[75%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#f4f7f6] z-10 group bg-gray-200">
              <Image 
                src="https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Engineering and Construction Professionals" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white font-bold tracking-widest text-xs uppercase mb-1 text-[#39B54A]">Sector Focus</p>
                <p className="text-white font-[family-name:var(--font-montserrat)] text-xl sm:text-2xl font-bold">Civil & Engineering</p>
              </div>
            </div>

            {/* Image 2: Hospitality (Top left, overlaps main) - Updated from Healthcare */}
            <div className="absolute left-0 top-0 w-[55%] h-[45%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#f4f7f6] z-20 group transform hover:-translate-y-2 transition-transform duration-500 bg-gray-200">
              <Image 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1740&auto=format&fit=crop" 
                alt="Hospitality and Catering Staff" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <p className="text-white font-bold tracking-widest text-[8px] sm:text-[10px] uppercase mb-0.5 text-[#39B54A]">Sector Focus</p>
                <p className="text-white font-[family-name:var(--font-montserrat)] text-sm sm:text-base font-bold leading-tight">Hospitality &<br/>Catering</p>
              </div>
            </div>

            {/* Image 3: Logistics / Transportation (Bottom left, overlaps main) */}
            <div className="absolute left-[5%] bottom-[15%] w-[45%] h-[35%] rounded-3xl overflow-hidden shadow-2xl border-8 border-[#f4f7f6] z-30 group transform hover:-translate-y-2 transition-transform duration-500 bg-gray-200">
              <Image 
                src="https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Global Logistics and Transportation" 
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-1000"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5">
                <p className="text-white font-bold tracking-widest text-[8px] sm:text-[10px] uppercase mb-0.5 text-[#39B54A]">Sector Focus</p>
                <p className="text-white font-[family-name:var(--font-montserrat)] text-sm sm:text-base font-bold leading-tight">Logistics &<br/>Supply Chain</p>
              </div>
            </div>

            {/* Floating Badge: Established 2001 */}
            {/* <div className="absolute top-[35%] right-[-10%] sm:right-[-5%] bg-white px-5 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-2xl z-40 border border-gray-100 flex items-center gap-3 sm:gap-4 animate-[bounce_3s_ease-in-out_infinite]">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#006837] flex items-center justify-center text-white shrink-0 shadow-inner">
                <LegacyIcon />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-black text-gray-900 font-[family-name:var(--font-montserrat)] leading-none">2001</p>
                <p className="text-[8px] sm:text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Established</p>
              </div>
            </div> */}

          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
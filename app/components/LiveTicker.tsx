"use client";

import { useEffect, useState } from "react";

const TICKER_DATA = [
  "MOBILIZATION LOG: 45 Heavy Civil Engineers deployed to Riyadh, KSA",
  "STRATEGIC PLACEMENT: 120 Premium Hospitality Staff to Dubai, UAE",
  "OPERATIONS: 30 Medical Professionals mobilized to Doha, Qatar",
  "LOGISTICS: 15 Supply Chain Managers dispatched to Frankfurt, EU",
  "SECURITY: 50 Vetted Security Personnel assigned to Manama, Bahrain",
  "INFRASTRUCTURE: 200 Site Supervisors deployed to Neom, KSA",
];

const LiveTicker = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full bg-[#006837] text-white border-y border-white/20 overflow-hidden relative flex items-center h-10 lg:h-12 z-40 shadow-[0_0_20px_rgba(0,104,55,0.4)]">
      
      {/* Decorative gradient edges to fade the text in/out */}
      <div className="absolute left-0 top-0 bottom-0 w-8 lg:w-24 bg-gradient-to-r from-[#006837] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 lg:w-24 bg-gradient-to-l from-[#006837] to-transparent z-10 pointer-events-none" />

      {/* Flashing "LIVE" indicator */}
      <div className="absolute left-0 top-0 bottom-0 flex items-center px-4 lg:px-8 bg-[#006837] z-20 border-r border-white/20 font-black tracking-widest text-[8px] lg:text-[10px] uppercase">
        <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-white mr-2 animate-pulse" />
        Live
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: tickerScroll 40s linear infinite;
          display: flex;
          width: max-content;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="animate-ticker pl-24 lg:pl-40 cursor-default">
        {/* Double the data array to create a seamless loop */}
        {[...TICKER_DATA, ...TICKER_DATA].map((item, i) => (
          <div key={i} className="flex items-center text-[9px] lg:text-xs font-bold tracking-[0.2em] uppercase whitespace-nowrap opacity-90">
            <span className="mx-4 lg:mx-8 opacity-40 text-[8px]">[ // ]</span>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveTicker;
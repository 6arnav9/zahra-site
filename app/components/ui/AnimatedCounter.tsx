"use client";

import React, { useState, useEffect, useRef } from "react";

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  isActive: boolean;
  className?: string;
  fontSize?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  duration = 2000,
  suffix = "",
  isActive,
  className = "",
  fontSize = "clamp(1.8rem, 4vw, 3.5rem)",
}) => {
  const [count, setCount] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isActive) {
      setCount(0);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Exponential ease-out curve matching brand guidelines
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.floor(eased * target));
      
      if (progress < 1) {
        rafRef.current = window.requestAnimationFrame(step);
      }
    };

    rafRef.current = window.requestAnimationFrame(step);
    
    return () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [target, duration, isActive]);

  return (
    <span
      className={`font-black font-label text-white drop-shadow-xl leading-none ${className}`}
      style={{ fontSize }}
    >
      {count}
      {suffix}
    </span>
  );
};

export default AnimatedCounter;

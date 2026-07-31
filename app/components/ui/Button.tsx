"use client";

import Link from "next/link";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "text";
  href?: string;
  className?: string;
  children: React.ReactNode;
  showArrow?: boolean;
  fullWidthOnMobile?: boolean;
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  href,
  className = "",
  children,
  showArrow = false,
  fullWidthOnMobile = true,
  size = "md",
  ...props
}) => {
  // Base classes with brand tokens and touch-friendly scaling
  const baseClasses =
    "group relative overflow-hidden transition-all duration-300 ease-out-expo whitespace-nowrap flex items-center justify-center text-center font-label font-bold uppercase active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink rounded-brand-sm";

  // Size configurations (ensures crisp legibility & generous touch targets across all device sizes)
  const sizeClasses = {
    sm: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-xs tracking-[0.15em]",
    md: "px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm tracking-[0.18em]",
    lg: "px-6 sm:px-9 py-3 sm:py-4 text-sm sm:text-base tracking-[0.2em]",
  };

  // Variant configurations
  const variantClasses = {
    primary:
      "bg-brand-green text-white hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(0,104,55,0.35)] hover:bg-brand-green-deep",
    secondary:
      "bg-brand-gold text-brand-ink hover:scale-[1.02] hover:shadow-[0_0_35px_rgba(212,175,55,0.25)]",
    outline:
      "border border-white/25 text-white hover:text-white hover:border-brand-gold/60 hover:bg-brand-gold/10 backdrop-blur-sm",
    text: "text-brand-green hover:text-brand-green-light tracking-widest px-0 py-0",
  };

  const mobileWidthClass = fullWidthOnMobile ? "w-full max-w-[280px] sm:w-auto sm:max-w-none" : "w-fit";

  const combinedClasses = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${mobileWidthClass} ${className}`;

  const content = (
    <>
      {/* Sliding hover overlay (excluding text variant) */}
      {variant !== "text" && (
        <div
          className={`absolute inset-0 transition-transform duration-500 ease-out-expo pointer-events-none ${
            variant === "outline"
              ? "bg-white/[0.04] -translate-x-full group-hover:translate-x-0"
              : "bg-white/10 translate-y-full group-hover:translate-y-0"
          }`}
        />
      )}
      
      <div className="relative z-10 flex items-center gap-2 sm:gap-3">
        <span>{children}</span>
        {showArrow && (
          <span className="group-hover:translate-x-1.5 transition-transform duration-500 ease-out-expo">
            →
          </span>
        )}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};

export default Button;

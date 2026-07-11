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
  // Base classes with brand tokens
  const baseClasses =
    "group relative overflow-hidden transition-all duration-500 ease-out-expo whitespace-nowrap flex items-center justify-center text-center font-label font-black uppercase tracking-[0.25em] rounded-brand-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/70 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-ink";

  // Size configurations
  const sizeClasses = {
    sm: "px-4 py-2.5 text-[8px] sm:text-[9px]",
    md: "px-6 sm:px-8 py-3 sm:py-3.5 text-[9px] sm:text-[10px]",
    lg: "px-8 sm:px-11 py-4 sm:py-5 text-[10px] sm:text-[11px]",
  };

  // Variant configurations
  const variantClasses = {
    primary:
      "bg-brand-green text-white hover:scale-105 hover:shadow-[0_0_40px_rgba(0,104,55,0.3)] hover:bg-brand-green-deep",
    secondary:
      "bg-brand-gold text-brand-ink hover:scale-105 hover:shadow-[0_0_40px_rgba(212,175,55,0.2)]",
    outline:
      "border border-white/20 text-white/70 hover:text-white hover:border-brand-green/50 backdrop-blur-sm",
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
              ? "bg-white/[0.03] -translate-x-full group-hover:translate-x-0"
              : "bg-white/10 translate-y-full group-hover:translate-y-0"
          }`}
        />
      )}
      
      <div className="relative z-10 flex items-center gap-3">
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

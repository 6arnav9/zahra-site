"use client";

import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center" | "right";
  layout?: "stacked" | "split";
  actions?: React.ReactNode;
  className?: string;
  isWatch?: boolean;
  isPhone?: boolean;
  isLandscape?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  layout = "stacked",
  actions,
  className = "",
  isWatch = false,
  isPhone = false,
  isLandscape = false,
}) => {
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  };

  // Stacked Layout
  if (layout === "stacked") {
    return (
      <div className={`flex flex-col ${alignmentClasses[align]} ${className}`}>
        {eyebrow && (
          <div className="overflow-hidden mb-4 lg:mb-6">
            <span
              className={`block font-black tracking-[0.5em] sm:tracking-[0.6em] uppercase text-brand-green animate-in fade-in slide-in-from-bottom-4 duration-1000 ${
                isWatch || isPhone ? "text-[8px]" : "text-[10px] lg:text-xs"
              }`}
            >
              {eyebrow}
            </span>
          </div>
        )}

        <h2
          className={`font-medium font-headline italic text-white leading-[1.1] tracking-tight ${
            isWatch
              ? "text-2xl"
              : isLandscape
              ? "text-4xl"
              : isPhone
              ? "text-4xl sm:text-5xl"
              : "text-5xl lg:text-7xl xl:text-8xl"
          }`}
        >
          {title}
        </h2>

        {description && (
          <p
            className={`text-white/70 font-medium leading-relaxed max-w-2xl ${
              isWatch ? "mt-4 text-[7px]" : "mt-6 lg:mt-8 text-sm lg:text-lg"
            }`}
          >
            {description}
          </p>
        )}

        {actions && (
          <div className={`mt-8 ${isWatch || isPhone ? "w-full" : ""}`}>
            {actions}
          </div>
        )}
      </div>
    );
  }

  // Split / Asymmetric Layout (e.g. HomeIndustries)
  return (
    <div
      className={`flex flex-col lg:flex-row lg:items-start justify-between gap-8 ${
        isWatch ? "mb-6" : isPhone ? "mb-12" : isLandscape ? "mb-8" : "mb-20 lg:mb-40"
      } ${className}`}
    >
      <div className="max-w-3xl">
        {eyebrow && (
          <div className="overflow-hidden mb-4 lg:mb-6">
            <span
              className={`block font-black tracking-[0.6em] uppercase text-brand-green animate-in fade-in slide-in-from-bottom-4 duration-1000 ${
                isWatch || isPhone ? "text-[8px]" : "text-[10px]"
              }`}
            >
              {eyebrow}
            </span>
          </div>
        )}
        <h2
          className={`font-medium font-headline italic text-white leading-[1.05] tracking-tighter ${
            isWatch
              ? "text-2xl"
              : isPhone || isLandscape
              ? "text-4xl"
              : "text-5xl lg:text-[7rem] xl:text-[8.5rem]"
          }`}
        >
          {title}
        </h2>
      </div>

      <div
        className={`lg:max-w-xs ${
          isWatch || isPhone || isLandscape ? "pt-0" : "pt-4 lg:pt-20"
        }`}
      >
        {description && (
          <p
            className={`text-white/70 font-medium leading-relaxed mb-6 ${
              isWatch || isPhone ? "text-[9px]" : "text-sm lg:text-base"
            }`}
          >
            {description}
          </p>
        )}
        {actions}
      </div>
    </div>
  );
};

export default SectionHeader;

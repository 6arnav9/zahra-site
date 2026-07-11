"use client";

import { useState, useEffect } from "react";

export type ViewportTier = "watch" | "phone" | "landscape" | "tablet" | "desktop";

export function useViewport() {
  const [mounted, setMounted] = useState(false);
  const [width, setWidth] = useState(1024);
  const [height, setHeight] = useState(768);
  const [navHeight, setNavHeight] = useState(64);

  useEffect(() => {
    setMounted(true);
    const update = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      const nav = document.getElementById("site-navbar");
      if (nav) {
        setNavHeight(nav.getBoundingClientRect().height);
      }
    };
    update();
    window.addEventListener("resize", update);
    const t = setTimeout(update, 300);
    return () => {
      window.removeEventListener("resize", update);
      clearTimeout(t);
    };
  }, []);

  const isWatch = width < 250;
  const isLandscape = height < 520 && width > height;
  const isSmallPhone = width <= 380;
  const isPhone = width < 640;
  const isTablet = width >= 640 && width < 1024;
  const isDesktop = width >= 1024;

  let tier: ViewportTier = "desktop";
  if (isWatch) tier = "watch";
  else if (isLandscape) tier = "landscape";
  else if (isPhone) tier = "phone";
  else if (isTablet) tier = "tablet";

  return {
    mounted,
    tier,
    navHeight,
    isWatch,
    isLandscape,
    isLandscapePhone: isLandscape, // Compatibility alias
    isSmallPhone,
    isPhone,
    isTablet,
    isDesktop,
    width,
    height,
  };
}

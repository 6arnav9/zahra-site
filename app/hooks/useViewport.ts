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
  // Phone Landscape: Matches all phone models in landscape mode (height < 500px and width < 960px)
  const isPhoneLandscape = width > height && height < 500 && width < 960;
  
  // Tablet Landscape: Matches all tablet & foldable devices held horizontally (height between 500px and 920px and width < 1400px)
  // Triggers the 2-column split layout (left narrative + right 3 vertical stat cards) for Surface Pro, Surface Duo, Galaxy Tab S7/S8/S9, iPad Pro/Air, and MacBook Air
  const isTabletLandscape = width > height && height >= 500 && height <= 920 && width < 1400;
  
  const isLandscape = isPhoneLandscape || isTabletLandscape;
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
    isPhoneLandscape,
    isTabletLandscape,
    isLandscapePhone: isPhoneLandscape,
    isSmallPhone,
    isPhone,
    isTablet,
    isDesktop,
    width,
    height,
  };
}

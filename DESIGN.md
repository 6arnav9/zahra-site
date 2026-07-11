---
name: Al Zahra HR
description: Global Recruitment Authority Design System
colors:
  primary: "#006837"
  primary-deep: "#004d29"
  primary-light: "#39B54A"
  neutral-bg: "#050505"
  neutral-fg: "#ffffff"
  pearl-white: "#fdfdfd"
  gold-accent: "#d4af37"
typography:
  display:
    fontFamily: "var(--font-cinzel), Cinzel, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: "1.1"
  headline:
    fontFamily: "var(--font-cormorant), Cormorant Garamond, serif"
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)"
    fontWeight: 500
    lineHeight: "1.2"
  body:
    fontFamily: "var(--font-open-sans), Open Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.6"
  label:
    fontFamily: "var(--font-montserrat), Montserrat, sans-serif"
    fontSize: "0.7rem"
    fontWeight: 900
    letterSpacing: "0.25em"
rounded:
  sm: "4px"
  md: "8px"
  lg: "16px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-fg}"
    rounded: "{rounded.sm}"
    padding: "12px 32px"
  button-primary-hover:
    backgroundColor: "{colors.primary-deep}"
---

# Design System: Al Zahra HR

## 1. Overview

**Creative North Star: "The Global Embassy"**

The Al Zahra design system uses high-end editorial layouts and architectural precision to communicate stately, expansive, and pristine recruitment services. Rather than typical blue-collar imagery or cluttered listings, it frames workforce mobilization through the lens of modern infrastructure, luxury hospitality, and corporate excellence.

Key Characteristics:
- **Asymmetrical Editorial Grid**: Magazine-like spacing and layout variations.
- **Deep Emerald & Gold Accents**: Signaling high status and premium trust.
- **Generous Whitespace**: Creating an open, authoritative "lean-back" professional feel.

## 2. Colors

A prestigious palette anchored in Al Zahra Green, charcoal ink, and gold highlights.

### Primary
- **Al Zahra Green** (`#006837` / `oklch(45% 0.12 150)`): The signature color representing growth, prosperity, and trust. Used for main buttons, primary hover states, and brand highlights.

### Secondary
- **Al Zahra Deep Green** (`#004d29`): Used for primary button hover/active states and deep container backgrounds.
- **Gold Accent** (`#d4af37` / `oklch(85% 0.05 85)`): A subtle gold accent signifying elite, high-status global operations.

### Neutral
- **Deep Ink Background** (`#050505`): The primary body background, replacing harsh pure black.
- **Pearl White** (`#fdfdfd`): Clean, premium off-white used for core text on dark backgrounds or backgrounds of cards.

### Named Rules
**The Green Restraint Rule**: Al Zahra Green and gold are luxury accents. They should not occupy more than 15% of the total screen space. Let whitespace and typography lead.

## 3. Typography

**Display Font:** Cinzel (serif)
**Headline Font:** Cormorant Garamond (serif/italic)
**Body Font:** Open Sans (sans-serif)
**Label/Mono Font:** Montserrat (sans-serif)

### Hierarchy
- **Display**: Cinzel, bold, clamp(2.5rem, 5vw, 4.5rem), line-height 1.1. Used for primary site-wide heroes and giant statements.
- **Headline**: Cormorant Garamond, medium italic, clamp(1.8rem, 4vw, 2.5rem), line-height 1.2. Used for narrative sub-headings.
- **Body**: Open Sans, regular, 1rem, line-height 1.6. Max line length kept to 65–75ch for optimal reading comfort.
- **Label**: Montserrat, black, 0.7rem, letter-spacing 0.25em, uppercase. Used for kickers and indicators.

## 4. Elevation

The interface uses flat, crisp borders and layered background opacities to indicate hierarchy rather than heavy drop shadows.

**The flat-by-default rule**: Elements rest flatly on the surface. Depth is created using 1px white/5% borders, glassmorphism filters, or color-blocked backgrounds rather than shadows.

## 5. Components

### Buttons
- **Shape**: Clean, sharp corners or very minimal radius (4px).
- **Primary**: Al Zahra Green (`#006837`) background with white text. Padding is 12px 32px.
- **Hover**: Background shifts to Deep Green (`#004d29`) with a scale effect (105%) and slight glow.

### Cards / Containers
- **Corner Style**: Minimalist rounded corners (8px to 16px).
- **Background**: `rgba(255, 255, 255, 0.03)` or solid `#0a0a0a`.
- **Border**: Thin border `1px solid rgba(255, 255, 255, 0.1)`.

### Navigation
- Sticky/sticky navigation with a blurred backdrop-filter (`backdrop-blur-md`). Links transition to brand green on hover with a clean slide-in underline.

### Extracted Core Components

To support absolute visual consistency and clean codebase architecture, the following core components are exported from the design system (`app/components/ui`):

#### 1. `<Section>`
An architectural wrapper that standardizes sections, responsive paddings, background color behaviors, and luxury design details like grid and glows.
- **Props**:
  - `bg`: `"ink"` (default `#050505`) | `"black"` | `"transparent"`
  - `showGrid`: `boolean` (subtle radial-gradient dot background)
  - `gridSize`: `"sm" | "md" | "lg"` (default `"md"`)
  - `showGlow`: `boolean` (ambient editorial background glowing orb)
  - `glowPosition`: `"center" | "right" | "bottom" | "top-right"`
  - `glowColor`: `"green" | "gold"`
  - `paddingSize`: `"none" | "sm" | "md" | "lg" | "xl"`

#### 2. `<SectionHeader>`
Standardizes kicker eyebrows, titles/headlines, and readable description layouts.
- **Props**:
  - `eyebrow`: `string` (uppercase, tracked, green kicker)
  - `title`: `ReactNode` (Cormorant serif italic header text)
  - `description`: `string` (Open Sans readable paragraph text)
  - `align`: `"left" | "center" | "right"`
  - `layout`: `"stacked" | "split"` (split places the description/actions on the right side on desktop)
  - `actions`: `ReactNode` (optional action elements)

#### 3. `<Button>`
A premium, animated action component supporting buttons and next/link elements.
- **Props**:
  - `variant`: `"primary" | "secondary" | "outline" | "text"`
  - `href`: `string` (converts button to Next.js link on supply)
  - `showArrow`: `boolean` (appends sliding hover arrow)
  - `size`: `"sm" | "md" | "lg"`

#### 4. `<AnimatedCounter>`
An exponential ease-out statistical counter component for numbers, ratios, and metrics.
- **Props**:
  - `target`: `number` (value to count up to)
  - `duration`: `number` (animation length in ms)
  - `suffix`: `string` (e.g. `"+"`, `"%"` or text suffix)
  - `isActive`: `boolean` (trigger animation on scroll visibility)


## 6. Do's and Don'ts

### Do:
- **Do** use large, high-quality architectural images that reflect the results of civil infrastructure, healthcare, and hospitality.
- **Do** enforce a line length ceiling of 75ch on body text.
- **Do** keep display headings letter-spacing to normal or slightly open; never compress below -0.04em.

### Don't:
- **Don't** use cluttered stock imagery of candidates or handshakes.
- **Don't** use side-stripe borders or heavy default box-shadows on cards.
- **Don't** use gradient text under any circumstances.

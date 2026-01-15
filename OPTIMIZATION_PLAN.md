# Floresiendo Website Optimization Plan

## Current State Analysis

### PageSpeed Insights Score (Homepage)
- Mobile: ~40-50 (needs improvement)
- Desktop: ~60-70 (needs improvement)

### Critical Issues Found

---

## Phase 1: Image Optimization (HIGH IMPACT)

### 1.1 Enable Next.js Image Optimization
**File:** `next.config.mjs`
**Problem:** `images: { unoptimized: true }` disables all automatic optimization
**Fix:** Remove this setting to enable:
- Automatic WebP/AVIF conversion
- Responsive srcset generation
- Lazy loading
- Blur placeholder support

### 1.2 Convert Large Images to WebP
| Image | Current Size | Target | Savings |
|-------|-------------|--------|---------|
| sergio.png | 1,011 KB | ~80 KB | 92% |
| comunidad-espana-1.jpg | 761 KB | ~60 KB | 92% |
| retreat-bg.jpg | 524 KB | ~50 KB | 90% |
| medicinas.png | 364 KB | ~40 KB | 89% |
| rape-dioses.jpg | 297 KB | ~35 KB | 88% |
| rana-mono-gigante.jpg | 271 KB | ~35 KB | 87% |
| floresiendo-logo-banner.png | 266 KB | ~20 KB | 92% |
| circulo-integracion.jpg | 237 KB | ~30 KB | 87% |
| venue-alberca.jpg | 237 KB | ~30 KB | 87% |
| venue-jardin.jpg | 226 KB | ~30 KB | 87% |
| grupo-participantes.jpg | 222 KB | ~30 KB | 86% |

**Total estimated savings: ~3.5 MB**

### 1.3 Add `sizes` Prop to Image Components
Images using `fill` without `sizes` load full resolution.
Add appropriate sizes prop based on display dimensions.

---

## Phase 2: Third-Party Scripts (MEDIUM IMPACT)

### 2.1 Current Script Loading (app/layout.tsx)
| Script | Strategy | Status |
|--------|----------|--------|
| Meta Pixel | lazyOnload | OK |
| Hotjar | lazyOnload | OK |
| HubSpot Analytics | lazyOnload | OK |
| Vercel Analytics | Default | Consider lazy |

### 2.2 Vimeo Player Optimization
**Problem:** @vimeo/player loads ~150KB on every VSL page even before user clicks play
**Fix:** Lazy load Vimeo SDK only when user clicks play button

### 2.3 Font Loading
**Current:** RocknRoll_One from Google Fonts
**Status:** Using next/font (optimal - self-hosted, no CLS)

---

## Phase 3: Code Splitting (LOW-MEDIUM IMPACT)

### 3.1 Dynamic Imports for Heavy Components
- TrackedVimeoPlayer - load on user interaction
- FAQ accordions - could be lazy loaded below fold

### 3.2 Bundle Analysis
Run: `npm run build && npx @next/bundle-analyzer`

---

## Phase 4: Core Web Vitals Specific

### 4.1 LCP (Largest Contentful Paint)
- Preload hero images with `priority` prop
- Ensure hero images are WebP
- Add `fetchpriority="high"` to critical images

### 4.2 CLS (Cumulative Layout Shift)
- All images have explicit dimensions or aspect-ratio (OK with fill)
- Font loading OK (next/font handles flash)

### 4.3 FID/INP (First Input Delay / Interaction to Next Paint)
- Third-party scripts already lazy loaded
- Consider requestIdleCallback for non-critical tracking

---

## Implementation Order

### Batch 1 (Biggest Impact - Do First)
1. Remove `images: { unoptimized: true }` from next.config.mjs
2. Convert sergio.png to WebP (1MB savings)
3. Convert comunidad-espana-1.jpg to WebP (760KB savings)
4. Convert retreat-bg.jpg to WebP (524KB savings)

### Batch 2 (Medium Impact)
5. Convert remaining large JPGs/PNGs to WebP
6. Add `sizes` prop to all fill images
7. Add `priority` to hero images

### Batch 3 (Polish)
8. Lazy load Vimeo SDK
9. Clean up unused images
10. Run bundle analyzer and optimize

---

## Expected Results

| Metric | Before | After (Est.) |
|--------|--------|--------------|
| Mobile Score | ~45 | ~75-85 |
| Desktop Score | ~65 | ~90-95 |
| Page Weight | ~5MB | ~1.5MB |
| LCP | ~4s | ~1.5s |

---

## Notes

- Always test changes locally with Lighthouse before deploying
- Deploy incrementally and verify each batch
- Keep original images in `/public/images/originals/` as backup

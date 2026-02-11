# Floresiendo Meta Ads Campaign Plan

## Encuentro Mar 5-8, 2026 | 15 Spots | Morelos, Mexico

---

## Executive Summary

| Item | Details |
|------|---------|
| **Campaign Type** | CBO (Campaign Budget Optimization) with Audience Stacking |
| **Total Budget** | 50,000 MXN/month (~$2,900 USD) or 15,000 MXN minimum |
| **Campaigns** | 3 (TOFU, MOFU, BOFU) |
| **Funnels** | 3 pain-point + 2 lead magnets |
| **Pixel ID** | 1337956628128088 |
| **CAPI Status** | Implemented with double deduplication |

---

## Part 1: Assets Inventory

### Pain-Point Funnels (TOFU)

| Funnel | URL | Video ID | WhatsApp | Event |
|--------|-----|----------|----------|-------|
| **Duelo** | `/f/duelo-acompanamiento` | 1142274109 | +52 1 55 4018 0914 (Karla) | `Lead_Duelo` |
| **Propósito** | `/f/proposito` | 1143233296 | +52 442 784 5308 | `Lead_Proposito` |
| **Estrés** | `/f/estres` | 1143232548 | +52 442 784 5308 | `Lead_Estres` |

### Lead Magnets (MOFU)

| Magnet | URL | Type | Event | Date |
|--------|-----|------|-------|------|
| **Meditación Gratis** | `/f/meditacion-gratis` | Zoom Session | `Lead_Meditacion_Gratis` | Mar 3, 2026 |
| **Conferencia Vida Perfecta** | `/f/conferencia-vida-perfecta` | In-person (CDMX) | `Lead_Conferencia_VidaPerfecta` | Mar 4, 2026 |

### Purchase Flow (BOFU)

| Page | URL | Events |
|------|-----|--------|
| **Pricing** | `/encuentros/marzo-2026-precios` | `ViewContent` → `InitiateCheckout` → `Purchase` |

---

## Part 2: Technical Implementation

### 2.1 Tracking Configuration

**Pricing Page Tracking:**
*   **Path:** `app/encuentros/marzo-2026-precios/page.tsx`
*   **Content Name:** `marzo_2026_precios`
*   **Encuentro Slug:** `marzo-2026`

---

## Part 3: Budget Allocation

### Full Budget (50,000 MXN/month)

| Campaign | Budget | % | Purpose |
|----------|--------|---|---------|
| TOFU Discovery | 25,000 MXN | 50% | Cold traffic acquisition |
| MOFU Engagement | 15,000 MXN | 30% | Warm audience nurturing |
| BOFU Purchase | 10,000 MXN | 20% | Conversion push |
| **TOTAL** | **50,000 MXN** | 100% | ~$2,900 USD |

---

## Part 4: Launch Sequence (Revised)

### Phase 1: Warming (Jan 20 - Feb 15)
- Focus on TOFU funnels.
- Build audiences for Video 50%+, Page Visitors.

### Phase 2: Lead Magnet Push (Feb 16 - Mar 2)
- Focus on Meditación (Mar 3) and Conferencia (Mar 4).
- High volume registration campaigns.

### Phase 3: Final Retreat Close (Mar 1 - Mar 4)
- Retargeting all leads to `/encuentros/marzo-2026-precios`.
- Scarcity: "Last 3 spots", "Final 48 hours".

---

*Generated for Floresiendo - Encuentro Mar 5-8, 2026*
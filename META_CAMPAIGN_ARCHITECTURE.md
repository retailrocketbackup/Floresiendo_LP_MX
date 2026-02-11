# Floresiendo Meta Ads Campaign Architecture

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

## Campaign Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    FLORESIENDO META ADS ARCHITECTURE                        │
│                         CBO with Audience Stacking                          │
└─────────────────────────────────────────────────────────────────────────────┘

                              ┌─────────────────┐
                              │   COLD TRAFFIC  │
                              │   (Unknown)     │
                              └────────┬────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CAMPAIGN 1: TOFU DISCOVERY                                                 │
│  Objective: Leads | Budget: 25,000 MXN/month CBO                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐ ┌───────────┐    │
│  │  Duelo    │ │ Propósito │ │  Estrés   │ │   Broad   │ │ Lookalike │    │
│  │ Interests │ │ Interests │ │ Interests │ │  Mexico   │ │    1%     │    │
│  │  35-55    │ │   28-45   │ │   30-50   │ │   28-55   │ │ Purchasers│    │
│  └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘ └─────┬─────┘    │
│        │             │             │             │             │           │
│        └─────────────┴─────────────┴─────────────┴─────────────┘           │
│                                    │                                        │
│                    ┌───────────────┼───────────────┐                       │
│                    ▼               ▼               ▼                        │
│              ┌──────────┐   ┌──────────┐   ┌──────────┐                    │
│              │  Video   │   │  Video   │   │  Static  │                    │
│              │  Duelo   │   │ Propósito│   │   Lead   │                    │
│              │          │   │  Estrés  │   │  Magnets │                    │
│              └────┬─────┘   └────┬─────┘   └────┬─────┘                    │
│                   │              │              │                           │
│                   ▼              ▼              ▼                           │
│  ┌────────────────────────────────────────────────────────────────────┐   │
│  │ DESTINATIONS:                                                       │   │
│  │ • /f/duelo-acompanamiento  → Lead_Duelo (WhatsApp)                 │   │
│  │ • /f/proposito             → Lead_Proposito (WhatsApp)             │   │
│  │ • /f/estres                → Lead_Estres (WhatsApp)                │   │
│  │ • /f/meditacion-gratis     → Lead_Meditacion_Gratis (Form)         │   │
│  │ • /f/conferencia-vida-perfecta → Lead_Conferencia (Form)           │   │
│  └────────────────────────────────────────────────────────────────────┘   │
│                                                                             │
│  EVENT TRACKED: Lead (any funnel)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │   WARM TRAFFIC  │
                              │ (Engaged Users) │
                              └────────┬────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CAMPAIGN 2: MOFU ENGAGEMENT                                                │
│  Objective: Conversions | Budget: 15,000 MXN/month CBO                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐            │
│  │  Video Viewers  │  │  Page Visitors  │  │ Social Engagers │            │
│  │     50%+ (7d)   │  │     (14d)       │  │     (30d)       │            │
│  └────────┬────────┘  └────────┬────────┘  └────────┬────────┘            │
│           │                    │                    │                      │
│           └────────────────────┼────────────────────┘                      │
│                                │                                           │
│                                ▼                                           │
│                    ┌───────────────────────┐                              │
│                    │     LEAD MAGNETS      │                              │
│                    │  • Meditación Gratis  │                              │
│                    │  • Conferencia VP     │                              │
│                    └───────────┬───────────┘                              │
│                                │                                           │
│  EVENT TRACKED: CompleteRegistration                                       │
│  EXCLUSIONS: Purchasers                                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                              ┌─────────────────┐
                              │   HOT TRAFFIC   │
                              │  (High Intent)  │
                              └────────┬────────┘
                                       │
                                       ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  CAMPAIGN 3: BOFU PURCHASE                                                  │
│  Objective: Conversions | Budget: 10,000 MXN/month CBO                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐      │
│  │ Lead Magnet  │ │   WhatsApp   │ │  High-Intent │ │   Checkout   │      │
│  │ Registrants  │ │   Clickers   │ │   Visitors   │ │  Abandoners  │      │
│  └──────┬───────┘ └──────┬───────┘ └──────┬───────┘ └──────┬───────┘      │
│         │                │                │                │               │
│         └────────────────┴────────────────┴────────────────┘               │
│                                   │                                        │
│                                   ▼                                        │
│                    ┌───────────────────────┐                              │
│                    │    RETREAT OFFER      │                              │
│                    │  • Testimonials       │                              │
│                    │  • Urgency/Scarcity   │                              │
│                    │  • Pricing            │                              │
│                    └───────────┬───────────┘                              │
│                                │                                           │
│                                ▼                                           │
│                    ┌───────────────────────┐                              │
│                    │  /encuentros/         │                              │
│                    │  marzo-2026-precios   │                              │
│                    └───────────────────────┘                              │
│                                                                             │
│  EVENT TRACKED: Purchase                                                    │
│  EXCLUSIONS: Purchasers (180d)                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                       │
                                       ▼
                         ┌─────────────────────────┐
                         │      CONVERSION        │
                         │  15-person Retreat     │
                         │   Mar 5-8, 2026        │
                         └─────────────────────────┘
```

---

## Part 1: Assets Inventory

### Pain-Point Funnels (TOFU)

| Funnel | URL | Video ID | WhatsApp | Event |
|--------|-----|----------|----------|-------|
| **Duelo** | `/f/duelo-acompanamiento` | 1142274109 | +52 1 55 4018 0914 (Karla) | `Lead_Duelo` |
| **Propósito** | `/f/proposito` | 1143233296 | +52 442 784 5308 | `Lead_Proposito` |
| **Estrés** | `/f/estres` | 1143232548 | +52 442 784 5308 | `Lead_Estres` |

### Lead Magnets (MOFU)

| Magnet | URL | Type | Event |
|--------|-----|------|-------|
| **Meditación Gratis** | `/f/meditacion-gratis` | Form → WhatsApp → Cal.com | `Lead_Meditacion_Gratis` + `CompleteRegistration` |
| **Conferencia Vida Perfecta** | `/f/conferencia-vida-perfecta` | Form → Thank You Page | `Lead_Conferencia_VidaPerfecta` + `CompleteRegistration` |

### Purchase Flow (BOFU)

| Page | URL | Events |
|------|-----|--------|
| **Pricing** | `/encuentros/marzo-2026-precios` | `ViewContent` → `InitiateCheckout` → `Purchase` |

---

## Part 2: Technical Implementation

### 2.1 Tracking Status

| Component | Status | File |
|-----------|--------|------|
| Meta Pixel | ✅ Ready | `app/layout.tsx` |
| CAPI Endpoint | ✅ Ready | `app/api/meta-capi/route.ts` |
| Tracking Library | ✅ Ready | `lib/meta-tracking.ts` |
| Deduplication | ✅ Ready | event_id + external_id |
| Video Milestones | ✅ Ready | `components/tracked-vimeo-player.tsx` |
| WhatsApp Leads | ✅ Ready | Funnel pages |
| Form Tracking | ✅ Ready | `components/conference-registration-form.tsx` |

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| Jan 14, 2026 | 1.0 | Initial campaign architecture plan |
| Feb 07, 2026 | 1.1 | Updated for March 5-8 retreat |

---

*Generated for Floresiendo - Encuentro Mar 5-8, 2026*
*Architecture: CBO with Audience Stacking*
*Pixel ID: 1337956628128088*
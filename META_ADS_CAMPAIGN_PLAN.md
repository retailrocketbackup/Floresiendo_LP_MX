# Floresiendo Meta Ads Campaign Architecture

## Encuentro Feb 19-22, 2026 | 15 Spots | Morelos, Mexico

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
│                    │  febrero-2026-precios │                              │
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
                         │   Feb 19-22, 2026      │
                         └─────────────────────────┘
```

---

## Part 1: Assets Inventory

### Pain-Point Funnels (TOFU)

| Funnel | URL | Video ID | WhatsApp | Event |
|--------|-----|----------|----------|-------|
| **Duelo** | `/f/duelo-acompanamiento` | 1142274109 | +52 1 55 4018 0914 (Karla) | `Lead_Duelo` |
| **Propósito** | `/f/proposito` | 1143233296 | +52 618 230 1481 | `Lead_Proposito` |
| **Estrés** | `/f/estres` | 1143232548 | +52 618 230 1481 | `Lead_Estres` |

### Lead Magnets (MOFU)

| Magnet | URL | Type | Event |
|--------|-----|------|-------|
| **Meditación Gratis** | `/f/meditacion-gratis` | Form → WhatsApp → Cal.com | `Lead_Meditacion_Gratis` + `CompleteRegistration` |
| **Conferencia Vida Perfecta** | `/f/conferencia-vida-perfecta` | Form → Thank You Page | `Lead_Conferencia_VidaPerfecta` + `CompleteRegistration` |

### Purchase Flow (BOFU)

| Page | URL | Events |
|------|-----|--------|
| **Pricing** | `/encuentros/febrero-2026-precios` | `ViewContent` → `InitiateCheckout` → `Purchase` |

---

## Part 2: Technical Implementation

### 2.1 Code Changes Required

#### File 1: Environment Variables
**Path:** `.env.local`

```env
# META / FACEBOOK ADS - CLIENT SIDE
NEXT_PUBLIC_META_PIXEL_ID=1337956628128088

# META / FACEBOOK ADS - SERVER SIDE (for CAPI)
META_PIXEL_ID=1337956628128088
META_CAPI_ACCESS_TOKEN=<GET_FROM_META_BUSINESS_MANAGER>
```

**How to get CAPI Access Token:**
1. Go to: https://business.facebook.com/events_manager
2. Select Pixel: 1337956628128088
3. Settings → Conversions API → Generate Access Token
4. Copy and paste into `.env.local`

---

#### File 2: FloatingWhatsApp Tracking
**Path:** `components/floating-whatsapp.tsx`

**Current Issue:** No tracking on sticky WhatsApp button

**Changes Required:**
```typescript
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { trackWhatsAppLead } from "@/lib/meta-tracking";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  message?: string;
  page?: string;
  encuentroSlug?: string;
}

export function FloatingWhatsApp({
  phoneNumber = "526182301481",
  message = "Hola, me gustaría saber más sobre los encuentros de FloreSiendo México",
  page = "general",
  encuentroSlug,
}: FloatingWhatsAppProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    // Track WhatsApp click as Lead event
    trackWhatsAppLead({
      page: page,
      buttonLocation: "sticky",
      encuentroSlug: encuentroSlug,
      eventName: "Lead_WhatsApp_Sticky",
    });

    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={handleClick}
        className="group relative w-16 h-16 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 overflow-hidden"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-25" />
        <Image src="/images/whatsapp-icon.webp" alt="WhatsApp" width={64} height={64} className="relative z-10" />
      </button>
    </div>
  );
}
```

---

#### File 3: Payment Tracking
**Path:** `components/ConektaPaymentForm.tsx`

**Add import:**
```typescript
import { trackEvent } from "@/lib/meta-tracking";
```

**Add InitiateCheckout (in useEffect when modal opens):**
```typescript
useEffect(() => {
  trackEvent("InitiateCheckout", {
    funnel: "pricing",
    content_type: "retreat_package",
    content_name: productName,
    value: amount / 100,
    currency: "MXN",
  }, { enableCAPI: true });
}, [productName, amount]);
```

**Add Purchase (on success):**
```typescript
if (data.success) {
  await trackEvent("Purchase", {
    funnel: "pricing",
    content_type: "retreat_booking",
    content_name: productName,
    value: amount / 100,
    currency: "MXN",
    email: formData.email,
    first_name: formData.name.split(' ')[0],
    phone: formData.phone,
  }, { enableCAPI: true });

  setSuccess(true);
}
```

---

#### File 4: Pricing Page ViewContent
**Path:** `app/encuentros/febrero-2026-precios/page.tsx`

**Add imports:**
```typescript
"use client";
import { useEffect } from 'react';
import { trackPageViewContent } from "@/lib/meta-tracking";
```

**Add tracking:**
```typescript
useEffect(() => {
  trackPageViewContent({
    page: "precios",
    contentName: "febrero_2026_precios",
    contentCategory: "high_intent",
    value: 10200,
    currency: "MXN",
  });
}, []);
```

**Update FloatingWhatsApp:**
```tsx
<FloatingWhatsApp
  phoneNumber="526182301481"
  message="Hola Ramón, me interesa el Encuentro de Febrero 2026..."
  page="precios"
  encuentroSlug="febrero-2026"
/>
```

---

### 2.2 Tracking Infrastructure (Already Implemented)

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

## Part 3: Meta Business Manager Setup

### 3.1 Custom Conversions (Events Manager)

Create these in: Events Manager → Custom Conversions → Create

| Name | Event Name | Category |
|------|------------|----------|
| Lead - Duelo | `Lead_Duelo` | Lead |
| Lead - Propósito | `Lead_Proposito` | Lead |
| Lead - Estrés | `Lead_Estres` | Lead |
| Lead - Meditación | `Lead_Meditacion_Gratis` | Lead |
| Lead - Conferencia | `Lead_Conferencia_VidaPerfecta` | Lead |
| Lead - WhatsApp Sticky | `Lead_WhatsApp_Sticky` | Lead |
| Video 25% | `Video25` | Other |
| Video 50% | `Video50` | Other |
| Video 75% | `Video75` | Other |
| Video Complete | `VideoComplete` | Other |
| Checkout Started | `InitiateCheckout` | Purchase |
| Purchase | `Purchase` | Purchase |

---

### 3.2 Custom Audiences (Audiences → Create)

#### Website Custom Audiences

| Audience Name | Events | Retention | Use |
|---------------|--------|-----------|-----|
| Video 50%+ Viewers | Video50, Video75, VideoComplete | 14 days | MOFU retargeting |
| Video 75%+ Viewers | Video75, VideoComplete | 30 days | High intent |
| Video Complete | VideoComplete | 60 days | Highest intent |
| All WhatsApp Leads | All Lead_* events | 30 days | BOFU targeting |
| Lead Magnet Registrants | CompleteRegistration | 60 days | BOFU targeting |
| High-Intent (Pricing) | ViewContent on /precios | 14 days | BOFU targeting |
| Checkout Abandoners | InitiateCheckout EXCLUDE Purchase | 7 days | Recovery |
| Purchasers (Exclude) | Purchase | 180 days | Exclusion list |
| All Website Visitors | PageView | 30 days | Broad retargeting |

#### Lookalike Audiences (create after 100+ in source)

| Name | Source | Location | Size |
|------|--------|----------|------|
| LAL 1% Purchasers | Purchasers | Mexico | 1% |
| LAL 1% WhatsApp Leads | All WhatsApp Leads | Mexico | 1% |
| LAL 1% Video Complete | Video Complete | Mexico | 1% |
| LAL 2% All Leads | All Lead_* combined | Mexico | 2% |

---

## Part 4: Campaign Setup Details

### Campaign 1: TOFU Discovery

```
Campaign Name: Floresiendo - TOFU Discovery
Objective: Leads
Budget: CBO - 25,000 MXN/month (or start at 15,000)
Bid Strategy: Lowest Cost
```

#### Ad Sets

| Ad Set | Targeting | Age | Gender | Location |
|--------|-----------|-----|--------|----------|
| **Duelo Interests** | Grief, loss, bereavement, emotional support, spiritual healing | 35-55 | 65% Women | Mexico |
| **Propósito Interests** | Life purpose, personal growth, career change, coaching, self-discovery | 28-45 | 50/50 | Urban Mexico |
| **Estrés Interests** | Stress relief, burnout, work-life balance, mindfulness, wellness | 30-50 | 55% Men | Mexico |
| **Broad Mexico** | No detailed targeting | 28-55 | All | Mexico |
| **Lookalike 1%** | Based on Purchasers or All Leads | 28-55 | All | Mexico |

#### Creatives per Ad Set

- 3 Video Ads (15-30 sec clips from each funnel VSL)
- 2 Image Ads (testimonial quotes, retreat imagery)
- 3 Primary Text variations
- Dynamic Creative: ON

#### Destinations

All ad sets drive to all 5 funnels (Meta optimizes):
- `/f/duelo-acompanamiento`
- `/f/proposito`
- `/f/estres`
- `/f/meditacion-gratis`
- `/f/conferencia-vida-perfecta`

---

### Campaign 2: MOFU Engagement

```
Campaign Name: Floresiendo - MOFU Engagement
Objective: Conversions
Conversion Event: CompleteRegistration
Budget: CBO - 15,000 MXN/month
```

#### Ad Sets

| Ad Set | Source Audience | Retention |
|--------|-----------------|-----------|
| Video 50%+ Viewers | Video50/75/Complete events | 14 days |
| Page Visitors | All Website Visitors | 14 days |
| Social Engagers | IG/FB engagement | 30 days |

#### Exclusions
- Purchasers (180 days)

#### Creatives
- Lead magnet focused (Meditación, Conferencia)
- Testimonial videos
- "Next step" messaging
- Urgency for upcoming sessions

---

### Campaign 3: BOFU Purchase

```
Campaign Name: Floresiendo - BOFU Purchase
Objective: Conversions
Conversion Event: Purchase
Budget: CBO - 10,000 MXN/month
```

#### Ad Sets

| Ad Set | Source Audience | Size Est. |
|--------|-----------------|-----------|
| Lead Magnet Registrants | CompleteRegistration events | 100-500 |
| WhatsApp Leads | All Lead_* events | 100-300 |
| High-Intent Visitors | ViewContent on /precios | 50-200 |
| Checkout Abandoners | InitiateCheckout - Purchase | 20-100 |

#### Exclusions
- Purchasers (180 days)

#### Creatives
- Testimonial videos (past participants)
- Retreat experience carousel
- Urgency: "Solo quedan X lugares"
- Scarcity: "15 lugares totales"
- Early bird pricing deadlines

---

## Part 5: Budget Allocation

### Full Budget (50,000 MXN/month)

| Campaign | Budget | % | Purpose |
|----------|--------|---|---------|
| TOFU Discovery | 25,000 MXN | 50% | Cold traffic acquisition |
| MOFU Engagement | 15,000 MXN | 30% | Warm audience nurturing |
| BOFU Purchase | 10,000 MXN | 20% | Conversion push |
| **TOTAL** | **50,000 MXN** | 100% | ~$2,900 USD |

### Minimum Viable Budget (15,000 MXN/month)

| Campaign | Budget | When |
|----------|--------|------|
| TOFU Discovery | 15,000 MXN | Weeks 1-6 |
| MOFU (add later) | 5,000 MXN | After 200+ in audiences |
| BOFU (add later) | 5,000 MXN | After 50+ leads |

---

## Part 6: KPIs & Benchmarks

### Funnel Metrics

| Metric | Target | Acceptable |
|--------|--------|------------|
| CTR (Click-through) | >1.5% | >1.0% |
| Video 25% | >40% of plays | >30% |
| Video 75% | >15% of plays | >10% |
| Video Complete | >8% of plays | >5% |
| WhatsApp Click Rate | >3% of page visitors | >2% |
| Cost per Lead (CPL) | <150 MXN | <300 MXN |
| Cost per Application (CPA) | <1,200 MXN | <2,500 MXN |
| ROAS | 5x | 3x minimum |

### Conversion Funnel (Expected)

```
Impressions   → Clicks   → Page Views → Video Play → Video 75% → WhatsApp → Booking
   100%          2%          1.8%         1.2%         0.3%        0.1%      0.02%
```

### Target Numbers ($1,000 USD budget)

| Stage | Expected |
|-------|----------|
| Impressions | 100,000+ |
| Link Clicks | 2,000+ |
| Page Views | 1,800+ |
| Video Plays | 1,200+ |
| Video 75%+ | 300+ |
| WhatsApp Leads | 100-200 |
| Conversations | 50-100 |
| Bookings | 5-15 |

---

## Part 7: Launch Sequence

### Week 1: Technical Setup
- [ ] Day 1-2: Implement code changes (FloatingWhatsApp, ConektaPaymentForm, pricing page)
- [ ] Day 2: Add environment variables
- [ ] Day 3: Deploy to staging, run validation
- [ ] Day 4: Deploy to production
- [ ] Day 5: Get CAPI access token, add to production

### Week 2: Meta Setup
- [ ] Day 6: Create custom conversions in Events Manager
- [ ] Day 7: Create custom audiences
- [ ] Day 8: Verify events in Test Events tool
- [ ] Day 9: Create Campaign 1 (TOFU) - Paused
- [ ] Day 10: Create Campaigns 2-3 - Paused

### Week 3: Launch
- [ ] Day 11: Launch Campaign 1 at 50% budget
- [ ] Day 13: Review metrics, scale to full budget if good
- [ ] Day 14: Activate MOFU if audiences > 200

### Week 4+: Optimization
- [ ] Weekly: Review ad set performance, pause underperformers
- [ ] Bi-weekly: Refresh creatives
- [ ] Monthly: Create new lookalikes from growing audiences

---

## Part 8: Verification Checklist

### Pre-Launch

- [ ] `META_CAPI_ACCESS_TOKEN` in `.env.local`
- [ ] `NEXT_PUBLIC_META_PIXEL_ID` = 1337956628128088
- [ ] FloatingWhatsApp tracking implemented
- [ ] InitiateCheckout tracking implemented
- [ ] Purchase tracking implemented
- [ ] ViewContent on pricing page implemented
- [ ] Deployed to production

### Events Manager Verification

- [ ] PageView events appearing
- [ ] ViewContent events appearing
- [ ] Lead_* events appearing (click WhatsApp buttons)
- [ ] Video25/50/75/Complete appearing (play videos)
- [ ] CompleteRegistration appearing (submit forms)
- [ ] InitiateCheckout appearing (open payment modal)
- [ ] Purchase appearing (complete test payment)
- [ ] Event Match Quality > 90%
- [ ] No duplicate events (deduplication working)

### Console Validation Script

```javascript
(async () => {
  console.log('=== FLORESIENDO TRACKING VALIDATION ===');
  console.log('Pixel Loaded:', typeof fbq !== 'undefined' ? 'YES' : 'NO');
  console.log('FBCLID captured:', sessionStorage.getItem('fbclid') ? 'YES' : 'NO');
  console.log('Client IP cached:', sessionStorage.getItem('client_ip') || 'NO');
  console.log('External ID:', sessionStorage.getItem('user_external_id') || 'Will generate on first event');
  console.log('=== VALIDATION COMPLETE ===');
})();
```

---

## Part 9: Compliance Framework

### Allowed Language (Meta 2025+ Policies)

**SAFE:**
- "Experiencia transformacional"
- "Reconexión espiritual"
- "Prácticas ancestrales"
- "Bienestar emocional"
- "Desarrollo personal"

**BANNED (Will trigger rejection):**
- "Cura depresión/ansiedad"
- "Sanación médica"
- "Tratamiento de trauma"
- "Resultados garantizados"

### Required Disclaimers

All ads must include:
> "Esta no es una experiencia médica. Consulta a tu médico si tienes condiciones de salud."

### Content Category Sanitization

When sending CAPI events, use safe categories:

```typescript
const SAFE_CATEGORIES = {
  'duelo': 'Wellness_General',
  'depresion': 'Wellness_General',  // REMAP
  'trauma': 'Personal_Development',
  'proposito': 'Education',
  'estres': 'Wellness_General',
  'ansiedad': 'Wellness_General'    // REMAP
};
```

---

## Revision History

| Date | Version | Changes |
|------|---------|---------|
| Jan 14, 2026 | 1.0 | Initial campaign architecture plan |

---

*Generated for Floresiendo - Encuentro Feb 19-22, 2026*
*Architecture: CBO with Audience Stacking*
*Pixel ID: 1337956628128088*

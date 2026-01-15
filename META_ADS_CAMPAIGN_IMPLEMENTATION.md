# Meta Ads Campaign Implementation Guide - Floresiendo

## Encuentro Feb 19-22, 2026 | 15 Spots | Morelos, Mexico

---

# QUICK REFERENCE DASHBOARD

## Campaign Overview

| Campaign | Objective | Budget (MXN/month) | Budget (USD) | % |
|----------|-----------|-------------------|--------------|---|
| **TOFU-A: Pain Funnels** | Leads | 12,500 | ~$725 | 25% |
| **TOFU-B: Lead Magnets** | Conversions | 12,500 | ~$725 | 25% |
| **MOFU: Engagement** | Conversions | 15,000 | ~$870 | 30% |
| **BOFU: Purchase** | Conversions | 10,000 | ~$580 | 20% |
| **TOTAL** | | **50,000** | **~$2,900** | 100% |

## Key Dates

| Event | Date | Time | Funnel |
|-------|------|------|--------|
| Meditacion EN VIVO | Feb 10, 2026 | 8pm CDMX | `/f/meditacion-gratis` |
| Conferencia Vida Perfecta | Feb 11, 2026 | 8pm CDMX | `/f/conferencia-vida-perfecta` |
| **RETREAT** | Feb 19-22, 2026 | - | `/encuentros/febrero-2026-precios` |

## Technical Setup

| Item | Value |
|------|-------|
| Pixel ID | `1337956628128088` |
| CAPI | Enabled (server-side) |
| Deduplication | event_id based |
| Domain | escuelafloresiendomexico.com |

---

# NAMING CONVENTION SYSTEM

## Overview

All Meta Ads assets follow a consistent naming pattern for easy identification and reporting.

## 1. Campaign Names

**Pattern:** `[Brand] - [Funnel] [Purpose] | [Month][Year]`

| Campaign Name | Funnel | Purpose |
|---------------|--------|---------|
| `FL - TOFU-A Pain Funnels \| Jan26` | Top of Funnel A | Pain point targeting |
| `FL - TOFU-B Lead Magnets \| Jan26` | Top of Funnel B | Avatar-based lead magnets |
| `FL - MOFU Engagement \| Jan26` | Middle of Funnel | Retargeting warm audiences |
| `FL - BOFU Purchase \| Jan26` | Bottom of Funnel | Conversion to purchase |

## 2. Ad Set Names

**Pattern:** `[Funnel] | [Target] | [Age] | [Strategy] | [Placement]`

### TOFU-A Ad Sets (Pain Funnels)

| Ad Set Name | Target | Destination |
|-------------|--------|-------------|
| `TOFU-A \| Duelo \| 35-55 \| DeepLayer \| Adv+` | Grief pain point | /f/duelo-acompanamiento |
| `TOFU-A \| Proposito \| 28-45 \| DeepLayer \| Adv+` | Purpose pain point | /f/proposito |
| `TOFU-A \| Estres \| 30-50 \| DeepLayer \| Adv+` | Stress pain point | /f/estres |

### TOFU-B Ad Sets (Lead Magnets)

| Ad Set Name | Avatar | Destination |
|-------------|--------|-------------|
| `TOFU-B \| Exec \| 35-55 \| HBR-Forbes \| Adv+` | Corporate Executives | /f/meditacion-gratis |
| `TOFU-B \| Entrep \| 28-50 \| Startups-VC \| Adv+` | Entrepreneurs | /f/meditacion-gratis |
| `TOFU-B \| Women \| 30-50 \| Oprah-Brene \| Adv+` | High-Achieving Women | /f/conferencia-vida-perfecta |
| `TOFU-B \| Burnout \| 28-45 \| Calm-Headspace \| Adv+` | Burned-out Professionals | /f/conferencia-vida-perfecta |

### MOFU Ad Sets (Engagement)

| Ad Set Name | Audience | Retention |
|-------------|----------|-----------|
| `MOFU \| Video50 \| 28-55 \| 14d \| Adv+` | Video 50%+ viewers | 14 days |
| `MOFU \| Visitors \| 28-55 \| 14d \| Adv+` | Page visitors | 14 days |
| `MOFU \| Engagers \| 28-55 \| 30d \| Adv+` | Social engagers | 30 days |

### BOFU Ad Sets (Purchase)

| Ad Set Name | Audience | Retention |
|-------------|----------|-----------|
| `BOFU \| LeadRegs \| 28-55 \| 60d \| Adv+` | Lead magnet registrants | 60 days |
| `BOFU \| WALeads \| 28-55 \| 30d \| Adv+` | WhatsApp leads | 30 days |
| `BOFU \| HiIntent \| 28-55 \| 14d \| Adv+` | High-intent /precios visitors | 14 days |
| `BOFU \| Abandon \| 28-55 \| 7d \| Adv+` | Checkout abandoners | 7 days |

## 3. Ad Names

**Pattern:** `[Funnel]-[Target] | [Format] | [Angle] | [Version]`

**Format Codes:**
- `IMG` = Static image
- `VID` = Video
- `CAR` = Carousel

**Version Codes:**
- `v1`, `v2`, `v3` = Sequential versions
- `A`, `B` = A/B test variants

### TOFU-A Ads

| Ad Name | Format | Message Angle |
|---------|--------|---------------|
| `TOFU-A-Duelo \| VID \| Perdida \| v1` | Video | Grief/loss empathy |
| `TOFU-A-Duelo \| IMG \| Soltar \| v1` | Image | Letting go |
| `TOFU-A-Proposito \| VID \| Vacio \| v1` | Video | Emptiness feeling |
| `TOFU-A-Proposito \| IMG \| Legado \| v1` | Image | Legacy message |
| `TOFU-A-Estres \| VID \| Rutina \| v1` | Video | Routine trap |
| `TOFU-A-Estres \| IMG \| Pausa \| v1` | Image | Need for pause |

### TOFU-B Ads

| Ad Name | Format | Message Angle |
|---------|--------|---------------|
| `TOFU-B-Exec \| IMG \| PausaEst \| v1` | Image | Strategic pause for leaders |
| `TOFU-B-Exec \| IMG \| Claridad \| v1` | Image | Mental clarity |
| `TOFU-B-Entrep \| IMG \| Negocio \| v1` | Image | Business clarity |
| `TOFU-B-Entrep \| IMG \| Reset \| v1` | Image | Founder reset |
| `TOFU-B-Women \| IMG \| ExitoVacio \| v1` | Image | Success paradox |
| `TOFU-B-Women \| IMG \| MasAlla \| v1` | Image | Beyond success |
| `TOFU-B-Burnout \| IMG \| Centro \| v1` | Image | Find your center |
| `TOFU-B-Burnout \| IMG \| PausaEst \| v1` | Image | Strategic pause |

### MOFU Ads

| Ad Name | Format | Message Angle |
|---------|--------|---------------|
| `MOFU-Video50 \| IMG \| SigPaso \| v1` | Image | Next step CTA |
| `MOFU-Visitors \| IMG \| Invitacion \| v1` | Image | Personal invitation |
| `MOFU-Engagers \| IMG \| Conecta \| v1` | Image | Reconnect message |

### BOFU Ads

| Ad Name | Format | Message Angle |
|---------|--------|---------------|
| `BOFU-LeadRegs \| IMG \| Urgencia \| v1` | Image | Limited spots urgency |
| `BOFU-LeadRegs \| IMG \| Testimonio \| v1` | Image | Testimonial social proof |
| `BOFU-WALeads \| IMG \| Ultima \| v1` | Image | Last chance |
| `BOFU-HiIntent \| IMG \| 6Lugares \| v1` | Image | Only 6 spots left |
| `BOFU-Abandon \| IMG \| TeEspera \| v1` | Image | Your spot is waiting |

## Abbreviation Reference

| Code | Meaning |
|------|---------|
| FL | Floresiendo |
| TOFU | Top of Funnel |
| MOFU | Middle of Funnel |
| BOFU | Bottom of Funnel |
| Exec | Corporate Executives |
| Entrep | Entrepreneurs |
| DeepLayer | Deep Layered Targeting |
| Adv+ | Advantage+ Placements |
| IMG | Static Image |
| VID | Video |
| CAR | Carousel |
| WALeads | WhatsApp Leads |
| LeadRegs | Lead Magnet Registrants |
| HiIntent | High-Intent Visitors |
| PausaEst | Pausa Estratégica |
| SigPaso | Siguiente Paso (Next Step) |

---

## Destination URLs

| Funnel | URL | Event |
|--------|-----|-------|
| Meditacion | `/f/meditacion-gratis` | `Lead_Meditacion_Gratis` |
| Conferencia | `/f/conferencia-vida-perfecta` | `Lead_Conferencia_VidaPerfecta` |
| Duelo | `/f/duelo-acompanamiento` | `Lead_Duelo` |
| Proposito | `/f/proposito` | `Lead_Proposito` |
| Estres | `/f/estres` | `Lead_Estres` |
| Pricing | `/encuentros/febrero-2026-precios` | `ViewContent` / `Purchase` |

---

# CAMPAIGN ARCHITECTURE

```
                         ┌─────────────────────────────────────┐
                         │         COLD TRAFFIC               │
                         │      (Unknown Audiences)           │
                         └─────────────────┬───────────────────┘
                                           │
              ┌────────────────────────────┴────────────────────────────┐
              │                                                         │
              ▼                                                         ▼
┌─────────────────────────────────┐               ┌─────────────────────────────────┐
│   TOFU-A: PAIN FUNNELS          │               │   TOFU-B: LEAD MAGNETS          │
│   Budget: 12,500 MXN/month      │               │   Budget: 12,500 MXN/month      │
│   Objective: Leads              │               │   Objective: Conversions        │
├─────────────────────────────────┤               ├─────────────────────────────────┤
│ Ad Sets:                        │               │ Ad Sets (Avatars):              │
│ • Duelo Interests (35-55)       │               │ • Corporate Executives (35-55)  │
│ • Proposito Interests (28-45)   │               │ • Entrepreneurs (28-50)         │
│ • Estres Interests (30-50)      │               │ • High-Achieving Women (30-50)  │
│                                 │               │ • Burned-out Prof. (28-45)      │
├─────────────────────────────────┤               ├─────────────────────────────────┤
│ Destinations:                   │               │ Destinations:                   │
│ → /f/duelo-acompanamiento       │               │ → /f/meditacion-gratis          │
│ → /f/proposito                  │               │ → /f/conferencia-vida-perfecta  │
│ → /f/estres                     │               │                                 │
├─────────────────────────────────┤               ├─────────────────────────────────┤
│ CTA: WhatsApp Conversation      │               │ CTA: Form Submission            │
│ Events: Lead_Duelo, etc.        │               │ Event: CompleteRegistration     │
└─────────────────────────────────┘               └─────────────────────────────────┘
              │                                                         │
              └────────────────────────────┬────────────────────────────┘
                                           │
                                           ▼
                         ┌─────────────────────────────────────┐
                         │       WARM TRAFFIC                  │
                         │   (Video Viewers, Visitors)         │
                         └─────────────────┬───────────────────┘
                                           │
                                           ▼
              ┌─────────────────────────────────────────────────────────┐
              │   MOFU: ENGAGEMENT RETARGETING                          │
              │   Budget: 15,000 MXN/month | Objective: Conversions     │
              ├─────────────────────────────────────────────────────────┤
              │ Ad Sets:                                                │
              │ • Video 50%+ Viewers (14d)                              │
              │ • Page Visitors (14d)                                   │
              │ • Social Engagers (30d)                                 │
              ├─────────────────────────────────────────────────────────┤
              │ Destinations: Lead Magnets ONLY                         │
              │ Event: CompleteRegistration                             │
              │ Exclusions: Purchasers (180d)                           │
              └─────────────────────────────┬───────────────────────────┘
                                           │
                                           ▼
                         ┌─────────────────────────────────────┐
                         │        HOT TRAFFIC                  │
                         │   (Leads, High Intent)              │
                         └─────────────────┬───────────────────┘
                                           │
                                           ▼
              ┌─────────────────────────────────────────────────────────┐
              │   BOFU: PURCHASE CONVERSION                             │
              │   Budget: 10,000 MXN/month | Objective: Conversions     │
              ├─────────────────────────────────────────────────────────┤
              │ Ad Sets:                                                │
              │ • Lead Magnet Registrants (60d)                         │
              │ • WhatsApp Leads (30d)                                  │
              │ • High-Intent Visitors /precios (14d)                   │
              │ • Checkout Abandoners (7d)                              │
              ├─────────────────────────────────────────────────────────┤
              │ Destination: /encuentros/febrero-2026-precios           │
              │ Event: Purchase                                         │
              │ Exclusions: Purchasers (180d)                           │
              └─────────────────────────────┬───────────────────────────┘
                                           │
                                           ▼
                         ┌─────────────────────────────────────┐
                         │         CONVERSION                  │
                         │    15-person Retreat                │
                         │    Feb 19-22, 2026                  │
                         └─────────────────────────────────────┘
```

---

# PART 1: PRE-LAUNCH SETUP

## 1.1 Custom Conversions (Events Manager)

Go to: **Events Manager → Custom Conversions → Create**

| # | Name | Event Name | Category | Description |
|---|------|------------|----------|-------------|
| 1 | Lead - Duelo | `Lead_Duelo` | Lead | WhatsApp click from grief funnel |
| 2 | Lead - Proposito | `Lead_Proposito` | Lead | WhatsApp click from purpose funnel |
| 3 | Lead - Estres | `Lead_Estres` | Lead | WhatsApp click from stress funnel |
| 4 | Lead - Meditacion | `Lead_Meditacion_Gratis` | Lead | Form submit meditation |
| 5 | Lead - Conferencia | `Lead_Conferencia_VidaPerfecta` | Lead | Form submit conference |
| 6 | Lead - WhatsApp Sticky | `Lead_WhatsApp_Sticky` | Lead | Floating button click |
| 7 | Video 25% | `Video25` | Other | Video watched 25% |
| 8 | Video 50% | `Video50` | Other | Video watched 50% |
| 9 | Video 75% | `Video75` | Other | Video watched 75% |
| 10 | Video Complete | `VideoComplete` | Other | Video watched 100% |
| 11 | Checkout Started | `InitiateCheckout` | Purchase | Payment modal opened |
| 12 | Purchase | `Purchase` | Purchase | Payment completed |

**Checklist:**
- [ ] All 12 custom conversions created
- [ ] Categories assigned correctly
- [ ] Events appearing in Events Manager

---

## 1.2 Custom Audiences (Audiences → Create)

Go to: **Ads Manager → Audiences → Create Audience → Custom Audience**

### Website Custom Audiences

| # | Audience Name | Type | Events | Retention | Use |
|---|---------------|------|--------|-----------|-----|
| 1 | Video 50%+ Viewers | Website | Video50, Video75, VideoComplete | 14 days | MOFU |
| 2 | Video 75%+ Viewers | Website | Video75, VideoComplete | 30 days | BOFU |
| 3 | Video Complete | Website | VideoComplete | 60 days | BOFU |
| 4 | All WhatsApp Leads | Website | All Lead_* events | 30 days | BOFU |
| 5 | Lead Magnet Registrants | Website | CompleteRegistration | 60 days | BOFU |
| 6 | High-Intent (Pricing) | Website | ViewContent on /precios | 14 days | BOFU |
| 7 | Checkout Abandoners | Website | InitiateCheckout EXCLUDE Purchase | 7 days | BOFU |
| 8 | Purchasers (Exclude) | Website | Purchase | 180 days | Exclusion |
| 9 | All Website Visitors | Website | PageView | 30 days | MOFU |

### Engagement Custom Audiences

| # | Audience Name | Source | Retention |
|---|---------------|--------|-----------|
| 10 | IG/FB Engagers | Instagram + Facebook Page | 30 days |
| 11 | Video Viewers (any) | Video views on ads | 30 days |

**Checklist:**
- [ ] All 11 custom audiences created
- [ ] Retention windows set correctly
- [ ] Exclusion audience (Purchasers) created

---

## 1.3 Lookalike Audiences

Go to: **Ads Manager → Audiences → Create Audience → Lookalike Audience**

Create these AFTER you have 100+ people in source audiences:

| # | Name | Source Audience | Location | Size |
|---|------|-----------------|----------|------|
| 1 | LAL 1% Purchasers | Purchasers | Mexico | 1% |
| 2 | LAL 1% WhatsApp Leads | All WhatsApp Leads | Mexico | 1% |
| 3 | LAL 1% Video Complete | Video Complete | Mexico | 1% |
| 4 | LAL 2% All Leads | All Lead_* combined | Mexico | 2% |

**Note:** Start with LAL 1% WhatsApp Leads or Video Complete first.

---

## 1.4 Pixel & CAPI Verification

### Verify Pixel is Working

1. Install **Meta Pixel Helper** Chrome extension
2. Visit each funnel page and verify:
   - [ ] PageView fires on all pages
   - [ ] ViewContent fires on pricing page
   - [ ] Video events fire (Video25, Video50, etc.)
   - [ ] Lead events fire on WhatsApp clicks
   - [ ] CompleteRegistration fires on form submit

### Verify CAPI is Working

1. Go to **Events Manager → Pixel → Test Events**
2. Enter your domain
3. Trigger events and verify:
   - [ ] Events appear in Test Events
   - [ ] "Server" badge shows (CAPI working)
   - [ ] No duplicate events (deduplication working)
   - [ ] Event Match Quality > 90%

### Console Validation Script

Open browser console on any funnel page and run:
```javascript
(async () => {
  console.log('=== FLORESIENDO TRACKING VALIDATION ===');
  console.log('Pixel Loaded:', typeof fbq !== 'undefined' ? 'YES' : 'NO');
  console.log('FBCLID captured:', sessionStorage.getItem('fbclid') ? 'YES' : 'NO');
  console.log('External ID:', sessionStorage.getItem('user_external_id') || 'Will generate');
  console.log('=== END VALIDATION ===');
})();
```

---

# PART 2: CAMPAIGN TOFU-A - PAIN FUNNELS (DEEP LAYERED TARGETING)

## Campaign Settings

| Setting | Value |
|---------|-------|
| Campaign Name | `Floresiendo - TOFU-A Pain Funnels` |
| Campaign Objective | **Leads** |
| Buying Type | Auction |
| Budget Type | **Campaign Budget Optimization (CBO)** |
| Campaign Budget | 12,500 MXN/month (or ~417 MXN/day) |
| Bid Strategy | Lowest Cost |
| Campaign Status | Start Paused |
| **Income Target** | Top 10-25% |
| **LAL Strategy** | Add after 100+ leads |

---

## Ad Set 1: DUELO (Grief) - Deep Layered Targeting

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-A | Duelo | 35-55 | Deep Layered` |
| Conversion Location | Website |
| Optimization Event | Lead |
| Age | 35-55 |
| Gender | All (65% women expected) |
| Location | Mexico (all regions) |
| Languages | Spanish |
| **Income** | Top 25% household income |

### LAYER 1: Primary Interests (ANY of these)
Select people who match ANY of these grief-related interests:
- Grief
- Bereavement
- Loss of a loved one
- Thanatology (Tanatologia)
- Death and dying
- Widows and widowers
- Hospice care
- Grief counseling

### LAYER 2: AND Spiritual/Healing Interests
NARROW audience to people who ALSO match:
- Emotional support
- Spiritual healing
- Psychology
- Self-help books
- Inner peace
- Spiritual growth
- Holistic healing
- Energy healing

### LAYER 3: AND Behavior Signals
NARROW further to people who ALSO have these behaviors:
- Engaged shoppers
- Travel frequently
- Premium purchasers
- Luxury goods buyers

### Exclusions
- Custom Audience: Purchasers (180d)

### Placements
- Advantage+ Placements (recommended)
- OR: Feed, Stories, Reels, Search

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/duelo-acompanamiento`

---

## Ad Set 2: PROPOSITO (Purpose) - Deep Layered Targeting

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-A | Proposito | 28-45 | Deep Layered` |
| Conversion Location | Website |
| Optimization Event | Lead |
| Age | 28-45 |
| Gender | All (50/50 split) |
| Location | Urban Mexico (CDMX, Guadalajara, Monterrey, Puebla) |
| Languages | Spanish |
| **Income** | Top 10-25% |

### LAYER 1: Primary Interests (ANY of these)
Select people who match ANY of these purpose/meaning interests:
- Life purpose
- Personal development
- Career change
- Life coaching
- Self-discovery
- Finding meaning
- Ikigai
- Personal transformation

### LAYER 2: AND Thought Leadership Interests
NARROW audience to people who ALSO match:
- TED Talks
- Motivational speakers
- Business books
- Personal growth podcasts
- Simon Sinek
- Tony Robbins
- Brene Brown
- Jay Shetty

### LAYER 3: AND Professional Behaviors
NARROW further to people who ALSO have:
- Business travelers
- Higher education
- Engaged shoppers
- Technology early adopters

### LAYER 4: OR Job Titles (Flexible)
Include people with these job titles:
- Manager
- Director
- Professional
- Consultant
- Entrepreneur
- Coach

### Exclusions
- Custom Audience: Purchasers (180d)

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/proposito`

---

## Ad Set 3: ESTRES (Stress/Burnout) - Deep Layered Targeting

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-A | Estres | 30-50 | Deep Layered` |
| Conversion Location | Website |
| Optimization Event | Lead |
| Age | 30-50 |
| Gender | All (55% men expected) |
| Location | Mexico (urban focus) |
| Languages | Spanish |
| **Income** | Top 25% |

### LAYER 1: Primary Interests (ANY of these)
Select people who match ANY of these stress/burnout interests:
- Stress relief
- Burnout recovery
- Work-life balance
- Mental wellness
- Mindfulness
- Meditation
- Stress management
- Anxiety relief

### LAYER 2: AND Wellness Lifestyle Interests
NARROW audience to people who ALSO match:
- Wellness
- Self-care
- Yoga
- Fitness
- Health consciousness
- Healthy lifestyle
- Spa and relaxation
- Retreat experiences

### LAYER 3: AND Active Lifestyle Behaviors
NARROW further to people who ALSO have:
- Frequent travelers
- Engaged shoppers
- Fitness enthusiasts
- Health app users
- Outdoor activities

### LAYER 4: OR Professional Job Titles
Include people with these job titles:
- Manager
- Director
- Executive
- Business owner
- Professional
- Team lead

### Exclusions
- Custom Audience: Purchasers (180d)

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/estres`

---

# PART 3: CAMPAIGN TOFU-B - LEAD MAGNETS (UNIQUE AVATAR TARGETING)

## Campaign Settings

| Setting | Value |
|---------|-------|
| Campaign Name | `Floresiendo - TOFU-B Lead Magnets` |
| Campaign Objective | **Conversions** |
| Buying Type | Auction |
| Budget Type | **Campaign Budget Optimization (CBO)** |
| Campaign Budget | 12,500 MXN/month (or ~417 MXN/day) |
| Conversion Event | CompleteRegistration |
| Bid Strategy | Lowest Cost |
| Campaign Status | Start Paused |
| **Strategy** | Each avatar has NON-OVERLAPPING interests |
| **LAL Strategy** | Add after 100+ leads |

---

## Ad Set 1: CORPORATE EXECUTIVES - Unique Avatar

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-B | Executives | 35-55 | HBR Forbes` |
| Conversion Location | Website |
| Optimization Event | CompleteRegistration |
| Age | 35-55 |
| Gender | All |
| Location | Urban Mexico (CDMX, Guadalajara, Monterrey) |
| Languages | Spanish |
| **Income** | Top 10% |

### UNIQUE Interest Stack (Non-overlapping with other avatars)
These interests are EXCLUSIVE to this avatar - not used in other ad sets:
- Harvard Business Review
- Forbes Mexico
- Expansion (Mexican business magazine)
- The Economist
- Business Insider
- C-suite executives
- Executive coaching
- Leadership development
- Board of directors
- CEO World
- Chief Executive Magazine

### Job Title Layer (Primary Differentiator)
- CEO, CFO, COO, CTO
- Director General
- VP, Vice President
- Managing Director
- C-Level Executive
- Board Member

### Behavior Layer
- Business page admins
- Business travelers
- High-value purchases (luxury, premium)
- International travelers

### Exclusions
- Custom Audience: Purchasers (180d)
- Other TOFU-B avatars (optional - prevents overlap)

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/meditacion-gratis`

### Copy Angle
**"Pausa estrategica para lideres"** - Position meditation as executive strategy, not indulgence

---

## Ad Set 2: ENTREPRENEURS / BUSINESS OWNERS - Unique Avatar

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-B | Entrepreneurs | 28-50 | Startups VC` |
| Conversion Location | Website |
| Optimization Event | CompleteRegistration |
| Age | 28-50 |
| Gender | All |
| Location | Mexico (all regions) |
| Languages | Spanish |
| **Income** | Top 25% |

### UNIQUE Interest Stack (Non-overlapping with other avatars)
These interests are EXCLUSIVE to this avatar:
- Entrepreneurship
- Small business owners
- Startups
- Shark Tank Mexico
- Business innovation
- E-commerce
- Digital marketing
- Venture capital
- Angel investors
- Y Combinator
- Startup Grind
- 500 Startups
- Emprendedor Magazine

### Job Title Layer (Primary Differentiator)
- Founder
- Co-founder
- Business owner
- Entrepreneur
- Freelancer
- Independent contractor
- Solopreneur

### Behavior Layer
- Small business owners (Meta category)
- Online purchasers
- Technology early adopters
- Facebook Shop admins

### Exclusions
- Custom Audience: Purchasers (180d)

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/meditacion-gratis`

### Copy Angle
**"Claridad mental para tu negocio"** - Position as business performance tool

---

## Ad Set 3: HIGH-ACHIEVING WOMEN - Unique Avatar

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-B | Women | 30-50 | Oprah Brene` |
| Conversion Location | Website |
| Optimization Event | CompleteRegistration |
| Age | 30-50 |
| Gender | **Women only** |
| Location | Urban Mexico (CDMX, Guadalajara, Monterrey, Puebla) |
| Languages | Spanish |
| **Income** | Top 10-25% |

### UNIQUE Interest Stack (Non-overlapping with other avatars)
These interests are EXCLUSIVE to this avatar:
- Women in business
- Female entrepreneurs
- Women's empowerment
- Oprah Winfrey
- Marie Forleo
- Brene Brown
- Women Who Lead
- Girl boss
- Boss babe
- Women's leadership
- Lean In
- Sheryl Sandberg
- Michelle Obama
- Female Founder

### Behavior Layer (Premium Signals)
- Premium purchasers
- Travel frequently
- Engaged shoppers
- Fashion & beauty (premium brands)
- Luxury goods buyers

### Exclusions
- Custom Audience: Purchasers (180d)

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/conferencia-vida-perfecta`

### Copy Angle
**"Lo tienes todo y aun sientes vacio?"** - Address success without fulfillment paradox

---

## Ad Set 4: BURNED-OUT PROFESSIONALS - Unique Avatar

| Setting | Value |
|---------|-------|
| Ad Set Name | `TOFU-B | Burnout | 28-45 | Calm Headspace` |
| Conversion Location | Website |
| Optimization Event | CompleteRegistration |
| Age | 28-45 |
| Gender | All |
| Location | Urban Mexico |
| Languages | Spanish |
| **Income** | Top 25% |

### UNIQUE Interest Stack (Non-overlapping with other avatars)
These interests are EXCLUSIVE to this avatar - APP-BASED signals:
- Calm (meditation app)
- Headspace
- Insight Timer
- Sleep Cycle
- Noom
- MyFitnessPal
- Sleep apps
- Stress management apps
- Work-life balance blogs
- Mental health awareness
- Burnout recovery
- Self-care routines
- Digital detox

### Behavior Layer (App Usage Signals)
- App users (health/fitness category)
- Engaged shoppers
- Recently moved (life change indicator)
- New job (life change indicator)
- Fitness app users

### Exclusions
- Custom Audience: Purchasers (180d)

### Destination
- Website URL: `https://escuelafloresiendomexico.com/f/conferencia-vida-perfecta`

### Copy Angle
**"Recupera tu centro en 60 minutos"** - Promise quick recovery and reset

---

# PART 4: CAMPAIGN MOFU - ENGAGEMENT

## Campaign Settings

| Setting | Value |
|---------|-------|
| Campaign Name | `Floresiendo - MOFU Engagement` |
| Campaign Objective | **Conversions** |
| Buying Type | Auction |
| Budget Type | **Campaign Budget Optimization (CBO)** |
| Campaign Budget | 15,000 MXN/month (or ~500 MXN/day) |
| Conversion Event | CompleteRegistration |
| Bid Strategy | Lowest Cost |
| Campaign Status | Start Paused |

---

## Ad Set 1: Video 50%+ Viewers

| Setting | Value |
|---------|-------|
| Ad Set Name | `MOFU | Video 50%+ | 14d` |
| Custom Audience | Video 50%+ Viewers |
| Retention | 14 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d) |

### Destination
- `/f/meditacion-gratis` OR `/f/conferencia-vida-perfecta`

---

## Ad Set 2: Page Visitors

| Setting | Value |
|---------|-------|
| Ad Set Name | `MOFU | Page Visitors | 14d` |
| Custom Audience | All Website Visitors |
| Retention | 14 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d), Lead Magnet Registrants |

### Destination
- `/f/meditacion-gratis` OR `/f/conferencia-vida-perfecta`

---

## Ad Set 3: Social Engagers

| Setting | Value |
|---------|-------|
| Ad Set Name | `MOFU | Social Engagers | 30d` |
| Custom Audience | IG/FB Engagers |
| Retention | 30 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d) |

### Destination
- `/f/meditacion-gratis` OR `/f/conferencia-vida-perfecta`

---

# PART 5: CAMPAIGN BOFU - PURCHASE

## Campaign Settings

| Setting | Value |
|---------|-------|
| Campaign Name | `Floresiendo - BOFU Purchase` |
| Campaign Objective | **Conversions** |
| Buying Type | Auction |
| Budget Type | **Campaign Budget Optimization (CBO)** |
| Campaign Budget | 10,000 MXN/month (or ~333 MXN/day) |
| Conversion Event | Purchase |
| Bid Strategy | Lowest Cost |
| Campaign Status | Start Paused |

---

## Ad Set 1: Lead Magnet Registrants

| Setting | Value |
|---------|-------|
| Ad Set Name | `BOFU | Lead Magnet Registrants | 60d` |
| Custom Audience | Lead Magnet Registrants |
| Retention | 60 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d) |

### Destination
- `/encuentros/febrero-2026-precios`

---

## Ad Set 2: WhatsApp Leads

| Setting | Value |
|---------|-------|
| Ad Set Name | `BOFU | WhatsApp Leads | 30d` |
| Custom Audience | All WhatsApp Leads |
| Retention | 30 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d) |

### Destination
- `/encuentros/febrero-2026-precios`

---

## Ad Set 3: High-Intent Visitors

| Setting | Value |
|---------|-------|
| Ad Set Name | `BOFU | High-Intent Pricing | 14d` |
| Custom Audience | High-Intent (Pricing) |
| Retention | 14 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d) |

### Destination
- `/encuentros/febrero-2026-precios`

---

## Ad Set 4: Checkout Abandoners

| Setting | Value |
|---------|-------|
| Ad Set Name | `BOFU | Checkout Abandoners | 7d` |
| Custom Audience | Checkout Abandoners |
| Retention | 7 days |
| Age | 28-55 |
| Exclusions | Purchasers (180d) |

### Destination
- `/encuentros/febrero-2026-precios`

---

# PART 6: AD COPY - ALL CREATIVES

## TOFU-A: Pain Funnel Ad Copy

### DUELO (Grief) Funnel

**Video Summary:** Facilitator empathizes with grief, shares personal loss, offers accompaniment.

**Ad 1 - Primary:**
```
Cargar una perdida en silencio es agotador.

No tienes que atravesar este proceso solo/a.

Te acompanamos a soltar con amor lo que ya no esta.

Hablemos cuando estes listo/a
```
**Headline:** Acompanamiento en Tu Proceso
**Description:** Conversacion sin compromiso | Espacio seguro | A tu ritmo
**CTA:** Mas informacion
**Destination:** `https://escuelafloresiendomexico.com/f/duelo-acompanamiento`

---

### PROPOSITO (Purpose) Funnel

**Video Summary:** Facilitator shares feeling empty in 9-5 job, invites viewer to discover purpose.

**Ad 1 - Primary:**
```
Tu trabajo te da dinero pero no sentido?

Ese vacio que sientes al terminar el dia tiene una razon.

Descubre cual es tu verdadero proposito y construye el legado que quieres dejar.

Agenda una llamada sin compromiso
```
**Headline:** Encuentra Tu Proposito de Vida
**Description:** Llamada gratuita | Sin compromiso | Acompanamiento personalizado
**CTA:** Mas informacion
**Destination:** `https://escuelafloresiendomexico.com/f/proposito`

---

### ESTRES (Stress) Funnel

**Video Summary:** Facilitator describes feeling trapped in routine, found alternative, invites viewer.

**Ad 1 - Primary:**
```
Trabajo, familia, deudas... todo al mismo tiempo.

Si sientes que tu rutina te consume, hay otra forma de vivir.

Encuentra la pausa que necesitas para recuperar tu centro.

Conversemos
```
**Headline:** Recupera Tu Paz Interior
**Description:** Llamada gratuita | Sin presion | Escucha activa
**CTA:** Mas informacion
**Destination:** `https://escuelafloresiendomexico.com/f/estres`

---

## TOFU-B: Lead Magnet Ad Copy (By Avatar)

### Avatar 1: Corporate Executives

**Ad 1 - Strategic Pause:**
```
Lideras equipos, tomas decisiones importantes y cargas con responsabilidades enormes.

Pero, cuando fue la ultima vez que te diste una pausa estrategica?

Esta meditacion guiada EN VIVO es para ti:

Lunes 10 de Febrero, 8pm CDMX
30 minutos | 100% online | Gratuito

Reserva tu lugar
```
**Headline:** Pausa Estrategica para Lideres
**Description:** 10 de Febrero | Meditacion en vivo | Sin costo
**CTA:** Registrarte
**Destination:** `/f/meditacion-gratis`

**Ad 2 - Mental Clarity:**
```
Las mejores decisiones no vienen del ruido mental.

Vienen de la claridad.

En esta sesion en vivo aprenderas a aquietar tu mente para pensar con mas precision.

Lunes 10 de Febrero | 8pm CDMX | Gratis

Solo 50 lugares
```
**Headline:** Claridad Mental para Ejecutivos
**Description:** Meditacion guiada | 30 minutos | Online
**CTA:** Mas informacion
**Destination:** `/f/meditacion-gratis`

---

### Avatar 2: Entrepreneurs

**Ad 1 - Business Clarity:**
```
Tu negocio te necesita enfocado, pero tu mente no para.

Ideas, pendientes, preocupaciones... el ruido nunca termina.

Aprende a crear espacios de silencio mental para tomar mejores decisiones.

Meditacion EN VIVO | Lunes 10 Feb | 8pm CDMX

Gratis - Cupo limitado
```
**Headline:** Claridad para Tu Negocio
**Description:** Meditacion para emprendedores | 30 min | Online
**CTA:** Registrarte
**Destination:** `/f/meditacion-gratis`

**Ad 2 - Founder's Reset:**
```
Emprender es emocionante... y agotador.

Si sientes que tu mente necesita un reset, esta sesion es para ti.

30 minutos de meditacion guiada EN VIVO.

Lunes 10 de Febrero | 8pm CDMX | Sin costo

Reserva tu lugar
```
**Headline:** Reset Mental para Emprendedores
**Description:** 10 de Febrero | Meditacion gratis | Online
**CTA:** Mas informacion
**Destination:** `/f/meditacion-gratis`

---

### Avatar 3: High-Achieving Women

**Ad 1 - Success Paradox:**
```
Has logrado todo lo que te propusiste: el puesto, la estabilidad y el reconocimiento.

Sin embargo, esa sensacion de que "algo falta" sigue ahi.

En esta conferencia EN VIVO exploramos por que el exito no trajo la plenitud que prometia.

Martes 11 de Febrero | 8pm CDMX | Gratuito

Aparta tu lugar
```
**Headline:** Lo tienes todo y aun sientes vacio?
**Description:** 11 de Febrero | Conferencia gratuita en vivo
**CTA:** Registrarte
**Destination:** `/f/conferencia-vida-perfecta`

**Ad 2 - Beyond Success:**
```
El exito externo no garantiza plenitud interna.

Si has logrado mucho pero sientes que falta algo, no estas sola.

En esta conferencia gratuita descubriras como transformar logros en verdadera satisfaccion.

Martes 11 Feb | 8pm CDMX

Solo 100 lugares
```
**Headline:** Mas Alla del Exito Profesional
**Description:** Conferencia en vivo | 11 de Febrero | Gratis
**CTA:** Mas informacion
**Destination:** `/f/conferencia-vida-perfecta`

---

### Avatar 4: Burned-out Professionals

**Ad 1 - Recovery:**
```
Vives a toda velocidad cuidando del negocio y la familia, pero a veces te olvidas de ti.

Esta conferencia no es para escapar de tu realidad, es para regresar a ella con vision renovada.

Martes 11 de Febrero | 8pm CDMX
60 minutos | Incluye material descargable

Registro gratuito
```
**Headline:** Recupera Tu Claridad en 60 Minutos
**Description:** Conferencia en vivo | 11 de Febrero | Gratis
**CTA:** Mas informacion
**Destination:** `/f/conferencia-vida-perfecta`

**Ad 2 - Strategic Pause:**
```
No necesitas cambiar quien eres, ni tampoco "arreglarte".

Solo necesitas una pausa estrategica para reconectar con lo que realmente importa.

Te lo explico en esta conferencia gratuita:

Martes 11 de Febrero | 8pm CDMX | Online

Solo 100 lugares. Aparta el tuyo
```
**Headline:** La Pausa Estrategica que Necesitas
**Description:** 11 de Febrero | Conferencia gratis | Cupo limitado
**CTA:** Registrarte
**Destination:** `/f/conferencia-vida-perfecta`

---

## MOFU: Retargeting Ad Copy

**Ad 1 - Video Viewers:**
```
Viste nuestro video... algo resonó contigo.

Da el siguiente paso: unete a nuestra meditacion EN VIVO gratuita.

Lunes 10 de Febrero | 8pm CDMX

Reserva tu lugar
```
**Headline:** El Siguiente Paso Te Espera
**CTA:** Registrarte

**Ad 2 - Page Visitors:**
```
Exploraste nuestro contenido pero aun no te registraste.

Esta es tu invitacion personal a nuestra conferencia gratuita EN VIVO.

Martes 11 de Febrero | 8pm CDMX

Aparta tu lugar
```
**Headline:** Tu Invitacion Personal
**CTA:** Registrarte

---

## BOFU: Purchase Ad Copy

**Ad 1 - Urgency:**
```
Solo quedan 6 lugares para el Encuentro de Febrero.

19-22 de Febrero | Morelos, Mexico

Una experiencia transformacional de 4 dias que cambiara tu perspectiva de vida.

Reserva tu lugar ahora
```
**Headline:** Solo Quedan 6 Lugares
**CTA:** Reservar Ahora
**Destination:** `/encuentros/febrero-2026-precios`

**Ad 2 - Testimonial:**
```
"Llegue buscando respuestas y encontre algo mucho mas profundo: paz."
- Participante Encuentro 2025

Proximo Encuentro: 19-22 de Febrero, Morelos

15 lugares. Cupo casi lleno.

Reserva el tuyo
```
**Headline:** Una Experiencia que Cambia Vidas
**CTA:** Ver Disponibilidad
**Destination:** `/encuentros/febrero-2026-precios`

**Ad 3 - Checkout Abandoners:**
```
Estuviste a punto de reservar tu lugar...

El Encuentro de Febrero esta casi lleno. No dejes pasar esta oportunidad.

19-22 de Febrero | Morelos | 15 lugares

Completa tu reservacion
```
**Headline:** Tu Lugar Te Espera
**CTA:** Completar Reservacion
**Destination:** `/encuentros/febrero-2026-precios`

---

## Image Prompts for AI Generation

### Meditacion Lead Magnet

**Image 1 - Person Meditating:**
```
Serene Mexican woman in her 30s-40s meditating outdoors at sunrise, sitting cross-legged on a cushion in a lush garden with tropical plants, soft golden light, peaceful expression with closed eyes, warm earth tones, professional lifestyle photography, no text, 1080x1080
```

**Image 2 - Nature/Spiritual:**
```
Mystical forest path in Mexico with morning mist and golden sunbeams filtering through trees, soft purple and gold tones, cinematic lighting, spiritual atmosphere, nature photography, no text, 1080x1080
```

**Image 3 - Transformation Symbol:**
```
Beautiful butterfly emerging from cocoon on a flower, macro photography, soft bokeh background with warm golden light, symbolizing transformation and rebirth, nature photography, no text, 1080x1080
```

### Conferencia Lead Magnet

**Image 1 - Successful But Empty:**
```
Professional Mexican woman in her 30s-40s looking pensively out a modern office window at city skyline, successful but contemplative expression, elegant business attire, soft natural lighting, emotional portrait photography, no text, 1080x1080
```

**Image 2 - Breaking Free:**
```
Silhouette of person with arms raised at mountain summit during dramatic sunset, clouds below, feeling of freedom and breakthrough, inspirational lifestyle photography, warm orange and purple sky, no text, 1080x1080
```

**Image 3 - New Beginning:**
```
Person walking alone on empty beach at golden hour, footprints in sand, peaceful ocean waves, symbolizing new journey and fresh start, cinematic wide shot, warm tones, no text, 1080x1080
```

---

# PART 7: COMPLIANCE REFERENCE

## Banned Words (Will Trigger Ad Rejection)

| Category | Banned | Safe Alternative |
|----------|--------|------------------|
| Mental Health | Ansiedad, depresion, trastorno | Ruido mental, inquietud |
| Medical Claims | Curar, sanar, tratar, terapia | Reconectar, renovar, recuperar |
| Stress | Estres, estresado | Vivir a toda velocidad, agotamiento |
| Guarantees | Garantizado, 100% efectivo | Experiencia transformacional |
| Before/After | Antes y despues, resultados | Tu proceso, tu camino |

## Required Disclaimers

Include in ad or landing page:
> "Esta no es una experiencia medica. Consulta a tu medico si tienes condiciones de salud."

## Content Category Mapping (for CAPI)

When tracking events, use safe categories:
```
duelo → Wellness_General
trauma → Personal_Development
proposito → Education
estres → Wellness_General
```

---

# PART 8: LAUNCH SEQUENCE

## Week 1: Technical Setup & Verification

| Day | Task | Status |
|-----|------|--------|
| Mon | Create all Custom Conversions | [ ] |
| Tue | Create all Custom Audiences | [ ] |
| Wed | Verify Pixel + CAPI working | [ ] |
| Thu | Upload ad images to Meta | [ ] |
| Fri | Create Campaign TOFU-A (paused) | [ ] |
| Sat | Create Campaign TOFU-B (paused) | [ ] |
| Sun | Review and prepare for launch | [ ] |

## Week 2: TOFU Launch

| Day | Task | Status |
|-----|------|--------|
| Mon | Launch TOFU-A at 50% budget | [ ] |
| Tue | Launch TOFU-B at 50% budget | [ ] |
| Wed | Monitor CTR, CPM, CPC | [ ] |
| Thu | Identify top performers | [ ] |
| Fri | Scale to full budget if good | [ ] |
| Sat | Create MOFU campaign (paused) | [ ] |
| Sun | Weekly review | [ ] |

## Week 3: MOFU Activation

| Day | Task | Status |
|-----|------|--------|
| Mon | Check audience sizes (need 200+) | [ ] |
| Tue | Activate MOFU if audiences ready | [ ] |
| Wed | Monitor MOFU performance | [ ] |
| Thu | Create BOFU campaign (paused) | [ ] |
| Fri | Prepare Feb 10 Meditacion push | [ ] |
| Sat-Sun | Monitor + optimize | [ ] |

## Week 4+: BOFU & Final Push

| Day | Task | Status |
|-----|------|--------|
| Feb 5 | Activate BOFU campaign | [ ] |
| Feb 10 | Meditacion EN VIVO event | [ ] |
| Feb 11 | Conferencia EN VIVO event | [ ] |
| Feb 12-18 | Final urgency push | [ ] |
| Feb 19-22 | RETREAT | [ ] |

---

# PART 9: KPIs & BENCHMARKS

## Target Metrics

| Metric | Target | Acceptable | Action if Below |
|--------|--------|------------|-----------------|
| CTR | >1.5% | >1.0% | Test new creatives |
| Video 25% | >40% | >30% | Check hook, first 3 sec |
| Video 75% | >15% | >10% | Shorten video |
| CPL (WhatsApp) | <150 MXN | <300 MXN | Narrow targeting |
| CPR (Registration) | <100 MXN | <200 MXN | Test new copy |
| CPA (Purchase) | <5,000 MXN | <10,000 MXN | Scale BOFU |
| ROAS | 5x | 3x | Review funnel |

## Conversion Funnel Expected

```
Impressions → Clicks → Page Views → Video 75% → Lead → Booking
   100%        2%         1.8%        0.3%      0.1%    0.02%
```

## Target Numbers (50,000 MXN/month budget)

| Stage | Expected |
|-------|----------|
| Impressions | 200,000+ |
| Link Clicks | 4,000+ |
| Page Views | 3,600+ |
| Video 75%+ | 600+ |
| Leads (WhatsApp + Forms) | 200-400 |
| Conversations | 100-200 |
| Bookings | 10-15 |

---

# FINAL CHECKLIST

## Before Going Live

- [ ] All Custom Conversions created
- [ ] All Custom Audiences created
- [ ] Pixel verified and working
- [ ] CAPI verified and working
- [ ] All 4 campaigns created (paused)
- [ ] Ad images uploaded
- [ ] Ad copy reviewed for compliance
- [ ] Payment method verified
- [ ] Landing pages tested on mobile
- [ ] WhatsApp numbers tested

## After Launch (Daily)

- [ ] Check spend vs budget
- [ ] Review CTR and CPM
- [ ] Identify winning ad sets
- [ ] Pause underperformers (CTR < 0.8%)
- [ ] Check for ad rejections

## Weekly Optimization

- [ ] Refresh top 20% of creatives
- [ ] Expand winning audiences
- [ ] Create new lookalikes from leads
- [ ] Review funnel conversion rates
- [ ] Update BOFU messaging for urgency

---

# APPENDIX: TARGETING DIFFERENTIATION MATRIX

## Quick Reference: Why Each Audience is Unique

### TOFU-A: Pain Funnels (Emotional Entry Points)

| Ad Set | Primary Pain | Interest Layer 1 | Interest Layer 2 | Behavior Signal | Location | Age |
|--------|--------------|------------------|------------------|-----------------|----------|-----|
| **DUELO** | Loss/Grief | Grief, Bereavement, Thanatology | Spiritual healing, Psychology | Premium purchasers, Travelers | All Mexico | 35-55 |
| **PROPOSITO** | Meaninglessness | Personal development, Career change | TED Talks, Simon Sinek | Business travelers, Higher ed | Urban only | 28-45 |
| **ESTRES** | Overwhelm | Burnout, Work-life balance | Wellness, Yoga, Fitness | Fitness enthusiasts, Travelers | Urban focus | 30-50 |

### TOFU-B: Lead Magnets (Avatar-Specific, NON-OVERLAPPING)

| Avatar | UNIQUE Interest Signal | Income | Key Differentiator | Destination |
|--------|------------------------|--------|-------------------|-------------|
| **EXECUTIVES** | HBR, Forbes, Economist, CEO World | Top 10% | Job titles (CEO, CFO, Director) | Meditacion |
| **ENTREPRENEURS** | Shark Tank, Startups, VC, Y Combinator | Top 25% | Small business owner behavior | Meditacion |
| **WOMEN** | Oprah, Marie Forleo, Brene Brown, Lean In | Top 10-25% | Gender + Empowerment interests | Conferencia |
| **BURNOUT** | Calm, Headspace, Insight Timer, Sleep apps | Top 25% | App usage behavior | Conferencia |

## Targeting Logic Explained

### Why Deep Layered Targeting (TOFU-A)?

```
Layer 1 (ANY)     →  Casts wide net within pain point category
       ↓
Layer 2 (AND)     →  Narrows to people also interested in growth/healing
       ↓
Layer 3 (AND)     →  Filters for purchase intent and travel ability
       ↓
Layer 4 (OR)      →  Includes relevant professional titles
       ↓
RESULT            →  High-intent, high-income prospects ready to invest
```

### Why Non-Overlapping Interests (TOFU-B)?

| Problem | Solution |
|---------|----------|
| Same person sees 4 different ads | Each avatar targets COMPLETELY different interest signals |
| Audience fatigue from overlap | HBR readers ≠ Shark Tank fans ≠ Oprah followers ≠ Calm users |
| Wasted budget on duplicates | Meta won't show same person in multiple ad sets |
| Can't identify winning avatar | Clean data per avatar for optimization decisions |

### Interest Signal Categories

| Avatar | Signal Type | Why It Works |
|--------|-------------|--------------|
| **Executives** | Publication readers | HBR/Forbes readers = confirmed executives |
| **Entrepreneurs** | Startup ecosystem | VC/YC interest = active founders |
| **Women** | Influencer followers | Oprah/Brene = success-seeking women |
| **Burnout** | App users | Calm/Headspace = actively seeking relief |

## Income Targeting Rationale

| Retreat Price | ~$10,000 MXN+ |
|---------------|---------------|
| Required Income | Top 10-25% of Mexico |
| Behavior Signals | Travelers, Premium purchasers, Luxury buyers |
| Why This Matters | Filters out those who can't afford the retreat |

## Expected Audience Sizes (Estimates)

| Ad Set | Estimated Reach | Quality Score |
|--------|-----------------|---------------|
| DUELO (Deep Layered) | 100,000 - 300,000 | High intent |
| PROPOSITO (Deep Layered) | 200,000 - 500,000 | High intent |
| ESTRES (Deep Layered) | 300,000 - 700,000 | Medium-high intent |
| EXECUTIVES (Unique) | 50,000 - 150,000 | Very high intent |
| ENTREPRENEURS (Unique) | 150,000 - 400,000 | High intent |
| WOMEN (Unique) | 100,000 - 300,000 | Very high intent |
| BURNOUT (Unique) | 200,000 - 500,000 | High intent |

---

*Generated for Floresiendo - Encuentro Feb 19-22, 2026*
*Pixel ID: 1337956628128088*
*Last Updated: January 14, 2026*
*Deep Dive Targeting Version*

# Meta Ads Campaign Architecture - Floresiendo

## Campaign Overview

**Retreat:** Feb 19-22, 2026 (15 spots)
**Total Budget:** 1,000 MXN/day (~$58 USD)

---

## Campaign Structure (CBO)

```
                    ┌─────────────────────────────────────────────────────────────┐
                    │                    FLORESIENDO META ADS                      │
                    │                    CBO Campaign Structure                    │
                    └─────────────────────────────────────────────────────────────┘
                                                 │
           ┌─────────────────────────────────────┼─────────────────────────────────┐
           │                                     │                                 │
           ▼                                     ▼                                 ▼
┌─────────────────────┐            ┌─────────────────────┐            ┌─────────────────────┐
│   TOFU DISCOVERY    │            │   MOFU RETARGETING  │            │   BOFU CONVERSION   │
│   500 MXN/day       │            │   300 MXN/day       │            │   200 MXN/day       │
│   ($29 USD)         │            │   ($17 USD)         │            │   ($12 USD)         │
└─────────────────────┘            └─────────────────────┘            └─────────────────────┘
           │                                     │                                 │
     Ad Sets:                              Ad Sets:                          Ad Sets:
     ├─ Duelo Interests                    ├─ Video 50%+ (14d)               ├─ Lead Magnet Registrants
     ├─ Proposito Interests                ├─ Page Visitors (14d)            ├─ WhatsApp Leads
     ├─ Estres Interests                   └─ Social Engagers (30d)          ├─ High-Intent (/precios)
     ├─ Broad MX 28-55                                                       └─ Checkout Abandoners
     └─ LAL 1% Purchasers
           │                                     │                                 │
     Creatives:                            Creatives:                         Creatives:
     ├─ 3 Funnel Videos                    ├─ Meditación Lead Magnet         ├─ Testimonial Videos
     ├─ Meditación Images (3)              ├─ Conferencia Lead Magnet        ├─ "Solo 15 lugares"
     └─ Conferencia Images (3)             └─ Testimonial Snippets           └─ Urgency/Scarcity
           │                                     │                                 │
     Destinations:                         Destinations:                      Destinations:
     ├─ /f/meditacion-gratis               ├─ /f/meditacion-gratis           ├─ /encuentros/.../precios
     ├─ /f/conferencia-vida-perfecta       └─ /f/conferencia-vida-perfecta   └─ /f/llamada
     ├─ /f/duelo                                  │                                 │
     ├─ /f/proposito                              │                                 │
     └─ /f/estres                                 │                                 │
           │                                     │                                 │
     Events Tracked:                       Events Tracked:                    Events Tracked:
     ├─ Lead_Meditacion_Gratis             ├─ CompleteRegistration            ├─ ViewContent
     ├─ Lead_Conferencia_VidaPerfecta      └─ Lead_*                          ├─ InitiateCheckout
     ├─ Lead_Duelo                                                            └─ Purchase
     ├─ Lead_Proposito
     └─ Lead_Estres
           │                                     │                                 │
           └─────────────────────────────────────┴─────────────────────────────────┘
                                                 │
                                    ┌────────────┴────────────┐
                                    │     CUSTOM AUDIENCES    │
                                    └─────────────────────────┘
                                    │ Video 50%+ Viewers (14d)
                                    │ Video 75%+ Viewers (30d)
                                    │ All WhatsApp Leads (30d)
                                    │ Lead Magnet Registrants (60d)
                                    │ High-Intent Visitors (14d)
                                    │ Checkout Abandoners (7d)
                                    │ Purchasers - EXCLUDE (180d)
                                    └─────────────────────────┘
```

---

## Timeline

```
        Jan 14          Jan 21          Feb 4           Feb 11          Feb 19-22
           │               │               │               │               │
           ▼               ▼               ▼               ▼               ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │  LAUNCH  │    │  SCALE   │    │MEDITACIÓN│    │CONFERENCIA│   │ RETREAT  │
    │  TOFU    │    │  MOFU    │    │  EN VIVO │    │  EN VIVO  │   │ FEB 2026 │
    │Campaign 1│    │Campaign 2│    │  8pm MX  │    │  8pm MX   │   │ 15 spots │
    └──────────┘    └──────────┘    └──────────┘    └──────────┘    └──────────┘
           │               │               │               │               │
           └───────────────┴───────────────┴───────────────┴───────────────┘
                                    BOFU Campaign 3 activates
                                    when leads > 50
```

---

## Event Calendar

| Event | Date | Day | Time | Funnel URL |
|-------|------|-----|------|------------|
| Meditación en Vivo | Feb 4, 2026 | Martes | 8pm CDMX | `/f/meditacion-gratis` |
| Conferencia Vida Perfecta | Feb 11, 2026 | Martes | 8pm CDMX | `/f/conferencia-vida-perfecta` |
| **Retreat** | Feb 19-22, 2026 | Jue-Dom | - | `/encuentros/febrero-2026-precios` |

---

## Budget Allocation

| Campaign | Daily (MXN) | Monthly (MXN) | Monthly (USD) | % of Budget |
|----------|-------------|---------------|---------------|-------------|
| TOFU Discovery | 500 | 15,000 | $870 | 50% |
| MOFU Retargeting | 300 | 9,000 | $522 | 30% |
| BOFU Conversion | 200 | 6,000 | $348 | 20% |
| **Total** | **1,000** | **30,000** | **$1,740** | 100% |

---

## Ad Sets by Campaign

### Campaign 1: TOFU Discovery
| Ad Set | Targeting | Budget Share |
|--------|-----------|--------------|
| Duelo | Interests: grief, loss, healing, widows | 20% |
| Proposito | Interests: life purpose, personal growth, coaching | 20% |
| Estres | Interests: stress relief, burnout, wellness | 20% |
| Broad MX | Demographics: 28-55, Mexico, middle-upper class | 20% |
| LAL Purchasers | 1% Lookalike of past buyers | 20% |

### Campaign 2: MOFU Retargeting
| Ad Set | Audience | Window |
|--------|----------|--------|
| Video Viewers | 50%+ video completion | 14 days |
| Website Visitors | All page visitors | 14 days |
| Social Engagers | Post engagers + followers | 30 days |

### Campaign 3: BOFU Conversion
| Ad Set | Audience | Window |
|--------|----------|--------|
| Lead Magnet | Meditación + Conferencia registrants | 60 days |
| WhatsApp Leads | All Lead_WhatsApp_* events | 30 days |
| High-Intent | ViewContent on /precios | 14 days |
| Abandoners | InitiateCheckout minus Purchase | 7 days |

---

## Creatives Summary

### TOFU Creatives
- **Videos (3):** Duelo, Proposito, Estres funnels
- **Meditación Images (3):** Person meditating, Nature/spiritual, Butterfly
- **Conferencia Images (3):** Successful but empty, Breaking free, New beginning

### MOFU Creatives
- Meditación lead magnet ads
- Conferencia lead magnet ads
- Short testimonial snippets

### BOFU Creatives
- Full testimonial videos
- "Solo quedan X lugares" urgency
- Scarcity messaging
- Direct CTA to pricing/call

---

## Tracking Events

| Event Name | Stage | Trigger |
|------------|-------|---------|
| `Lead_Meditacion_Gratis` | TOFU | Meditation form submit |
| `Lead_Conferencia_VidaPerfecta` | TOFU | Conference form submit |
| `Lead_Duelo` | TOFU | Duelo funnel submit |
| `Lead_Proposito` | TOFU | Proposito funnel submit |
| `Lead_Estres` | TOFU | Estres funnel submit |
| `Lead_WhatsApp_Sticky` | All | Floating WhatsApp click |
| `CompleteRegistration` | MOFU | Lead magnet confirmation |
| `ViewContent` | BOFU | Pricing page view |
| `InitiateCheckout` | BOFU | Payment modal opens |
| `Purchase` | BOFU | Payment success |

---

## Pixel Configuration

- **Pixel ID:** `1337956628128088`
- **CAPI:** Enabled (server-side tracking)
- **Deduplication:** event_id based

---

## Exclusions

All campaigns exclude:
- **Purchasers** (180 day window) - Don't show ads to people who already bought

---

## Optimization Goals

| Campaign | Objective | Optimization Event |
|----------|-----------|-------------------|
| TOFU | Leads | Lead (any Lead_* event) |
| MOFU | Conversions | CompleteRegistration |
| BOFU | Conversions | Purchase |

---

## Launch Checklist

- [ ] CAPI Access Token in Vercel env vars
- [ ] All events verified in Events Manager
- [ ] Custom Audiences created
- [ ] Ad images uploaded to Meta
- [ ] Ad copy finalized (see META_ADS_COPY.md)
- [ ] Campaign 1 created and paused
- [ ] Campaign 2 created and paused
- [ ] Campaign 3 created and paused
- [ ] Budget allocated in bank/card
- [ ] Launch Campaign 1
- [ ] Monitor for 3-5 days
- [ ] Activate Campaigns 2-3 when audiences ready

# FloreSiendo - Funnel Strategy & Architecture

## Overview

FloreSiendo uses a **4-funnel architecture** with pain-specific TOFU entry points that convert via WhatsApp (high-touch sales), plus one lead magnet funnel using Cal.com for automated scheduling.

---

## Funnel Architecture

```
                              META ADS (Pain-specific videos)
                                         |
                    +--------------------+--------------------+
                    |                    |                    |
                    v                    v                    v
+-------------------------+ +-------------------------+ +-------------------------+
|  TOFU: GRIEF            | |  TOFU: PURPOSE          | |  TOFU: STRESS           |
|  /f/duelo-acompanamiento| |  /f/proposito           | |  /f/estres              |
|                         | |                         | |                         |
|  Pain: Loss/Grief       | |  Pain: No meaning       | |  Pain: Overwhelm        |
|  Video: Karla           | |  Video: V001            | |  Video: V003            |
|  CTA: WhatsApp          | |  CTA: WhatsApp          | |  CTA: WhatsApp          |
|  Event: Lead_Duelo      | |  Event: Lead_Proposito  | |  Event: Lead_Estres     |
+-------------------------+ +-------------------------+ +-------------------------+
            |                           |                           |
            +---------------------------+---------------------------+
                                        |
                                        v
                    +---------------------------------------+
                    |              WHATSAPP                 |
                    |         (Human Conversation)          |
                    |                                       |
                    |  - Build trust                        |
                    |  - Understand their situation         |
                    |  - Answer questions                   |
                    |  - Invite to retreat when ready       |
                    +-------------------+-------------------+
                                        |
                                        v
                    +---------------------------------------+
                    |         SALE (via WhatsApp)           |
                    |                                       |
                    |  - Share retreat details              |
                    |  - Handle objections                  |
                    |  - Collect payment                    |
                    |  - Confirm booking                    |
                    +---------------------------------------+


================================================================================


                    SEPARATE: FREE MEDITATION (Lead Magnet)

                              META ADS (Wellness/Generic)
                                         |
                                         v
                          +-----------------------------+
                          |  TOFU: FREE MEDITATION      |
                          |  /f/meditacion              |
                          |                             |
                          |  Offer: Free live session   |
                          |  CTA: Cal.com booking       |
                          |  Event: Schedule            |
                          +-------------+---------------+
                                        |
                                        v
                          +-----------------------------+
                          |  CAL.COM                    |
                          |  (Automated scheduling)     |
                          |                             |
                          |  - Webhook -> CAPI tracking |
                          |  - Email reminder           |
                          +-------------+---------------+
                                        |
                                        v
                          +-----------------------------+
                          |  LIVE SESSION (Zoom)        |
                          |                             |
                          |  - Deliver value            |
                          |  - Build relationship       |
                          |  - Soft pitch for retreat   |
                          +-----------------------------+
```

---

## Funnel Details

### 1. Grief/Duelo Funnel (DONE)

| Property | Value |
|----------|-------|
| URL | `/f/duelo-acompanamiento` |
| Video Ad | "Arrastras una perdida imposible" (Karla) |
| Vimeo ID | `1142274109` |
| Pain Point | Loss of loved one, grief, emptiness |
| Target Audience | Bereaved individuals seeking healing |
| CTA | WhatsApp to Karla Nava |
| WhatsApp Number | +52 1 55 4018 0914 |
| Lead Event | `Lead_Duelo` |
| Video Events | `ViewContent`, `Video25`, `Video50`, `Video75`, `VideoComplete` |

### 2. Purpose/Proposito Funnel (TODO)

| Property | Value |
|----------|-------|
| URL | `/f/proposito` |
| Video Ad | V001 "Vida sin sentido" |
| Vimeo ID | TBD |
| Pain Point | Existential emptiness, no purpose, 9-5 burnout |
| Target Audience | Corporate professionals, mid-career crisis |
| CTA | WhatsApp to main business |
| WhatsApp Number | +52 618 230 1481 |
| Lead Event | `Lead_Proposito` |
| Video Events | `ViewContent`, `Video25`, `Video50`, `Video75`, `VideoComplete` |

### 3. Stress/Estres Funnel (TODO)

| Property | Value |
|----------|-------|
| URL | `/f/estres` |
| Video Ad | V003 "Sientes que tu rutina te consume" |
| Vimeo ID | TBD |
| Pain Point | Overwhelm, routine, work/family/debt stress |
| Target Audience | Stressed professionals, burnout |
| CTA | WhatsApp to main business |
| WhatsApp Number | +52 618 230 1481 |
| Lead Event | `Lead_Estres` |
| Video Events | `ViewContent`, `Video25`, `Video50`, `Video75`, `VideoComplete` |

### 4. Free Meditation Funnel (EXISTING)

| Property | Value |
|----------|-------|
| URL | `/f/meditacion` |
| Offer | Free live meditation session |
| CTA | Cal.com booking |
| Lead Event | `Schedule` (via Cal.com webhook) |
| Purpose | Lead magnet for cold traffic |

---

## Tracking Events Summary

| Funnel | WhatsApp Event | Video Events | Booking Event |
|--------|---------------|--------------|---------------|
| Duelo | `Lead_Duelo` | ViewContent, Video25/50/75/Complete | - |
| Proposito | `Lead_Proposito` | ViewContent, Video25/50/75/Complete | - |
| Estres | `Lead_Estres` | ViewContent, Video25/50/75/Complete | - |
| Meditacion | - | - | `Schedule` |

All events use dual tracking: **Pixel (browser) + CAPI (server-side)** with deduplication.

---

## Key Files

### Reusable Components

- `components/tracked-vimeo-player.tsx` - Video player with milestone tracking
- `lib/meta-tracking.ts` - Tracking utilities (trackWhatsAppLead, trackVideoMilestone)

### Funnel Pages

- `app/(funnels)/f/duelo-acompanamiento/page.tsx` - Grief funnel
- `app/(funnels)/f/duelo-acompanamiento/layout.tsx` - Custom layout (no footer)
- `app/(funnels)/f/proposito/page.tsx` - Purpose funnel (TODO)
- `app/(funnels)/f/estres/page.tsx` - Stress funnel (TODO)
- `app/(funnels)/f/meditacion/page.tsx` - Free meditation funnel

### API Routes

- `app/api/meta-capi/route.ts` - CAPI endpoint
- `app/api/calcom-webhook/route.ts` - Cal.com webhook for Schedule events

---

## WhatsApp Numbers

| Funnel | Facilitator | Number |
|--------|-------------|--------|
| Duelo | Karla Nava | +52 1 55 4018 0914 |
| Proposito | Main Business | +52 618 230 1481 |
| Estres | Main Business | +52 618 230 1481 |

---

## Video Assets

Located in: `public/copy meta ads/`

| File | Funnel | Status |
|------|--------|--------|
| `ARRASTRAS UNA PERDIDA IMPOSIBLE.txt` | Duelo | DONE |
| `V 001 VIDA SIN SENTIDO.txt` | Proposito | TODO |
| `V 003 SIENTES QUE TU RUTINA TE CONSUME.txt` | Estres | TODO |

---

## Production URLs

- https://www.escuelafloresiendomexico.com/f/duelo-acompanamiento
- https://www.escuelafloresiendomexico.com/f/proposito (TODO)
- https://www.escuelafloresiendomexico.com/f/estres (TODO)
- https://www.escuelafloresiendomexico.com/f/meditacion

---

## Meta Pixel

- **Pixel ID**: 1337956628128088
- **Enhanced Matching**: IP, User Agent, FBP cookie, FBCLID
- **Deduplication**: Shared event_id between Pixel and CAPI
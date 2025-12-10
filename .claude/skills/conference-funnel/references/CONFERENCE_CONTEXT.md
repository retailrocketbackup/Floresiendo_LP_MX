# Conference Funnel - Full Context

## Business Overview

### Company: FloreSiendo

FloreSiendo is a high-ticket spiritual retreat company in Mexico offering transformative encounters with ancestral practices and plant medicine ceremonies.

**Website**: escuelafloresiendomexico.com

### Product: February 2026 Retreat

| Property | Value |
|----------|-------|
| Dates | February 19-22, 2026 (Thu-Sun) |
| Location | Morelos, México |
| Duration | 3 nights / 4 days |
| Capacity | 15 spots |
| Price Range | $15,000-25,000 MXN (~$850-1,400 USD) |
| Includes | Lodging, meals, ceremonies, integration, 1 post-retreat session |

### Conference Purpose

The free conference serves as a **TOFU (Top of Funnel)** lead magnet positioned 8 days before the retreat. Its purpose is to:

1. Attract high-intent leads who resonate with the specific pain points
2. Build trust with Ramón as facilitator before the retreat
3. Filter for people ready to invest in transformation
4. Create urgency with proximity to retreat dates
5. Enable human follow-up via WhatsApp after registration

---

## Target Audience

### Demographics

- **Age**: 35-55 years old
- **Location**: Mexico, primarily urban (CDMX, Guadalajara, Monterrey)
- **Income**: Upper-middle to high income (can afford $15-25k MXN retreat)
- **Gender**: Both, slight skew toward women 55%
- **Language**: Mexican Spanish

### Psychographics

**External Success, Internal Emptiness Profile:**

- Achieved conventional markers of success (career, family, home)
- Respected professionally, often in leadership roles
- Financially stable but not fulfilled by money
- May have tried therapy, coaching, self-help books
- Skeptical of "woo-woo" but open to alternatives
- Values privacy - won't post about struggles publicly
- Night owls who question life at 3am

**Pain Points (Vida Perfecta Vacía):**

- "I have everything I'm supposed to want, why do I feel empty?"
- "My life looks perfect on Instagram but I'm dying inside"
- "I can't tell anyone because they'd think I'm ungrateful"
- "Success was supposed to feel different than this"
- "I don't know who I am outside my roles"

**Pain Points (Atrapado en el Éxito):**

- "I built the wrong life and now I'm trapped in it"
- "I followed the path everyone expected, not mine"
- "I resent the choices I made 20 years ago"
- "Changing now would destroy everything I built"
- "I feel like a prisoner of my own success"

### Who Is NOT the Target

- People seeking quick fixes or motivation
- Spiritual tourists collecting experiences
- Those unwilling to invest money in transformation
- People looking for escape rather than confrontation
- Anyone expecting plant medicine tourism

---

## Facilitator: Ramón Henríquez

### Background

- 10 years facilitating transformation processes
- Deep personal experience with the pains being addressed
- Not positioned as guru or expert—as a guide who understands
- Authentic, warm, direct communication style

### Positioning for Conference

Ramón should be presented as:

- Someone who has walked through similar darkness
- A facilitator, not a teacher or healer
- Experienced but humble
- Someone who creates space, not someone who fixes

**Bio Template:**

> Ramón Henríquez ha dedicado los últimos 10 años a acompañar a personas en momentos de profunda transformación. No como experto que tiene las respuestas, sino como alguien que ha caminado por lugares oscuros y encontró un camino de regreso. En esta conferencia, comparte lo que ha aprendido acompañando a cientos de personas que, como tú, sentían que algo fundamental faltaba en sus vidas.

---

## Conference Details

### Format

| Property | Value |
|----------|-------|
| Platform | Zoom |
| Date | Wednesday, February 11, 2026 |
| Duration | 1 hour |
| Format | Presentation + Q&A |
| Recording | TBD (recommend NO recording for exclusivity) |

### Recommended Time

- **7:00 PM Mexico City time** (optimal for working professionals)
- Avoids work hours
- Not too late for families
- Prime engagement time

### Conference Content Structure (60 min)

```
0-5 min   - Welcome, ground rules, intention setting
5-15 min  - Ramón's story: "How I got here" (vulnerability)
15-30 min - The trap of external success (framework/teaching)
30-45 min - What's actually possible (transformation stories, NOT sales pitch)
45-55 min - Q&A from attendees
55-60 min - Invitation to continue conversation (soft CTA to WhatsApp)
```

### What the Conference Should NOT Be

- A sales pitch for the retreat
- A plant medicine advertisement
- A spiritual lecture
- A motivational talk
- A therapy session

### What the Conference SHOULD Be

- A mirror that reflects attendees' experience
- Validation that they're not alone
- A glimpse of what's possible without promising outcomes
- An invitation to go deeper (not a push)

---

## Existing Funnel Architecture

FloreSiendo currently has 4 active funnels:

| Funnel | URL | Pain | CTA |
|--------|-----|------|-----|
| Duelo | /f/duelo-acompanamiento | Grief/Loss | WhatsApp to Karla |
| Propósito | /f/proposito | No meaning | WhatsApp |
| Estrés | /f/estres | Burnout/Overwhelm | WhatsApp |
| Meditación | /f/meditacion | Cold traffic | Cal.com booking |

### Conference Funnels (NEW)

| Funnel | URL | Pain | CTA |
|--------|-----|------|-----|
| Vida Perfecta | /f/conferencia-vida-perfecta | Success + emptiness | Registration form |
| Atrapado Éxito | /f/conferencia-atrapado-exito | Wrong life + regret | Registration form |

---

## Technical Stack

### Frontend

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS 4.1
- Shadcn/ui components

### Tracking

- **Meta Pixel ID**: 1337956628128088
- **Meta CAPI**: Server-side tracking via /api/meta-capi
- **HubSpot Portal**: 50499487
- **Hotjar**: 6538146

### Key Files

```
lib/meta-tracking.ts          - Tracking utilities
components/tracked-vimeo-player.tsx - Video with milestones
app/api/meta-capi/route.ts    - Server-side Meta events
app/api/hubspot-contact/route.ts - HubSpot contact creation
```

### Tracking Events for Conference

```
ViewContent                              - Page view
Lead_Conferencia_[Funnel]               - Form interaction
CompleteRegistration_Conferencia_[Funnel] - Form submit
Attendance_Conferencia                   - Post-event attendance
```

---

## Marketing Strategy

### Traffic Sources

1. **Meta Ads** (Primary)
   - Target: Interests in personal growth, meditation, retreats
   - Exclude: Previous converters on other funnels
   - Budget: $200-400 USD for conference promotion

2. **Organic**
   - Instagram stories from facilitators
   - WhatsApp broadcast to existing contacts
   - Email to existing subscribers

3. **Retargeting**
   - Website visitors who didn't convert
   - Video viewers from other funnels (50%+)

### Ad Creative Direction

**Vida Perfecta angle:**
- Image: Professional person looking out window, pensive
- Copy: "Tu vida se ve perfecta. ¿Por qué se siente vacía?"
- Hook: External success, internal emptiness

**Atrapado Éxito angle:**
- Image: Person at desk, head in hands, successful office
- Copy: "Construiste todo bien. ¿Por qué sientes que estás atrapado?"
- Hook: Achievement + regret + trapped feeling

### Budget Allocation

| Phase | Budget | Purpose |
|-------|--------|---------|
| Week 1 (Feb 3-7) | $150 | Cold traffic awareness |
| Week 2 (Feb 8-10) | $150 | Urgency + retargeting |
| Day of (Feb 11) | $50 | Last-minute registrations |
| **Total** | **$350 USD** | |

---

## Post-Conference Flow

### Immediate (During Conference)

- Chat engagement tracked
- Q&A participation noted
- Soft mention of retreat at end

### Day 0 (After Conference)

- WhatsApp message from Ramón: "Gracias por estar hoy..."
- Personal, not automated feel
- Open door for questions

### Day 1-3

- Follow-up based on engagement level
- High engagement: Direct retreat invitation
- Medium engagement: "¿Qué te quedó resonando?"
- Low engagement: Value-add content

### Day 4-7

- Retreat urgency messaging
- "Quedan X lugares para el encuentro del 19-22"
- Social proof from previous attendees

---

## Success Metrics

### Funnel Metrics

| Stage | Metric | Target |
|-------|--------|--------|
| Ad → Landing | CTR | >1.5% |
| Landing → Form Start | Rate | >15% |
| Form Start → Submit | Completion | >60% |
| Submit → Attendance | Show Rate | >40% |
| Attendance → WhatsApp | Engagement | >30% |
| WhatsApp → Retreat | Conversion | >10% |

### Business Metrics

| Metric | Target |
|--------|--------|
| Total Registrations | 100-200 |
| Attendees | 40-80 |
| Retreat Bookings from Conference | 3-5 |
| Revenue from Conference Leads | $45,000-125,000 MXN |
| ROAS | >10x |

---

## Risk Mitigation

### Low Registration

- Increase ad budget
- Activate organic channels (IG, WhatsApp)
- Consider postponing if <30 registrations

### Low Attendance

- Multiple reminders (email + WhatsApp)
- Day-of reminder 2 hours before
- Consider incentive for live attendance

### Technical Issues

- Test Zoom setup day before
- Have backup facilitator available
- Pre-record key segments as backup

### Low Conversion to Retreat

- Adjust follow-up messaging
- Consider retreat payment plan option
- Extend early-bird pricing
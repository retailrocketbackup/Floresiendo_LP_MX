---
name: conference-funnel
description: Conference funnel builder for FloreSiendo free Zoom conferences. This skill should be used when creating landing pages, forms, tracking, and marketing assets for free online conferences that convert to retreat sales. Covers two angles - "vida perfecta vacía" and "atrapado en el éxito".
---

# Conference Funnel Builder

This skill provides guidance for building free conference funnels that convert high-ticket retreat buyers for FloreSiendo.

## When to Use

- Creating new conference landing pages
- Setting up registration forms and tracking
- Writing conference-specific copy
- Configuring Meta ads for conference promotion
- Building email/WhatsApp follow-up sequences

## Conference Overview

**Event**: Free Zoom Conference
**Date**: Wednesday, February 11, 2026
**Time**: TBD (evening Mexico time recommended)
**Duration**: 1 hour
**Facilitator**: Ramón Henríquez (10 years experience)
**CTA**: Fill registration form to participate
**Strategic Context**: 8 days before February 19-22 retreat

## Two Funnel Angles

### Funnel A: "Vida Perfecta Vacía"

| Property | Value |
|----------|-------|
| URL | `/f/conferencia-vida-perfecta` |
| Title | "Cuando tu vida se ve perfecta pero se siente vacía" |
| Pain | Disillusionment despite external success |
| Target | Professionals 35-50 with achievements but inner emptiness |
| Event Name | `Lead_Conferencia_VidaPerfecta` |
| Registration Event | `CompleteRegistration_Conferencia_VidaPerfecta` |

**Copy Angle**: Target people whose life "looks good on paper" but feel hollow inside. They've done everything right—career, family, status—yet wake up feeling empty.

### Funnel B: "Atrapado en el Éxito"

| Property | Value |
|----------|-------|
| URL | `/f/conferencia-atrapado-exito` |
| Title | "Atrapado en el éxito: cuando la vida que construiste no es la que querías" |
| Pain | Regret, built wrong life, trapped by past choices |
| Target | Professionals 40-55 who feel prisoner of their own success |
| Event Name | `Lead_Conferencia_AtrapadoExito` |
| Registration Event | `CompleteRegistration_Conferencia_AtrapadoExito` |

**Copy Angle**: Target people who achieved what they thought they wanted, only to realize it wasn't their dream—it was someone else's expectation.

## Technical Implementation

### Page Structure

```
1. Hero Section
   - Badge: "Conferencia Gratuita | 11 de Febrero 2026"
   - Headline: [Funnel-specific title]
   - Subheadline: [Pain validation]
   - Primary CTA: Registration form button
   - Trust indicators: "1 hora | Zoom | Sin costo"

2. Pain Validation Section
   - "¿Te suena familiar?" list
   - 5 specific pain points for target audience

3. What You'll Discover Section
   - 3 key takeaways from the conference
   - Position Ramón as guide, not guru

4. About Ramón Section
   - Photo
   - 10 years experience
   - Personal story connection to the pain
   - NOT positioned as expert—as someone who understands

5. Registration Form Section
   - Name, Email, Phone (WhatsApp)
   - Optional: "¿Cuál de estos dolores te trae aquí?"
   - Submit → Thank you page with Zoom link + calendar invite

6. FAQ Section
   - Conference-specific questions

7. Final CTA Section
   - Urgency: Limited spots or replay availability
```

### Tracking Events

```typescript
// Page View
trackEvent('ViewContent', { content_name: 'conferencia_vida_perfecta' });

// Form Start
trackEvent('Lead_Conferencia_VidaPerfecta', { button_location: 'hero' });

// Form Submit
trackEvent('CompleteRegistration_Conferencia_VidaPerfecta', {
  content_name: 'conferencia_feb_2026',
  value: 0,
  currency: 'MXN'
});

// Attendance (post-conference webhook)
trackEvent('Attendance_Conferencia', { attended: true/false });
```

### Form Integration Options

1. **HubSpot Form** - Native integration, auto-creates contacts
2. **Custom Form → API** - More control, sends to HubSpot + Meta CAPI
3. **Cal.com** - If scheduling flexibility needed

Recommended: **Custom Form** for maximum tracking control.

### File Structure

```
app/(funnels)/f/
├── conferencia-vida-perfecta/
│   ├── page.tsx
│   ├── layout.tsx
│   └── gracias/
│       └── page.tsx    # Thank you page with Zoom link
├── conferencia-atrapado-exito/
│   ├── page.tsx
│   ├── layout.tsx
│   └── gracias/
│       └── page.tsx
```

## Copy Guidelines

### Headlines That Work

- Lead with the PAIN, not the solution
- Use quotes to imply someone else said it first
- Be specific to the target's internal experience

### What NOT to Say

- "Encuentra tu mejor versión" (too generic)
- "Despertar espiritual" (triggers skepticism)
- "Sanación" (overused)
- Any mention of plant medicine, ayahuasca, ceremonies

### Ramón's Positioning

DO:
- "Ramón ha acompañado a personas en estos momentos de quiebre"
- "Con 10 años facilitando procesos de transformación"
- "Alguien que entiende lo que estás viviendo"

DON'T:
- "Experto en..."
- "Maestro de..."
- "Gurú"

## Post-Registration Flow

1. **Immediate**: Thank you page + Zoom link + Add to calendar
2. **+1 day**: WhatsApp confirmation from Ramón (personal)
3. **+3 days**: Email reminder with "what to expect"
4. **Day of**: WhatsApp reminder 2 hours before
5. **Post-conference**: WhatsApp follow-up + retreat invitation

## Success Metrics

| Metric | Target |
|--------|--------|
| Landing page → Form start | >15% |
| Form start → Complete | >60% |
| Registration → Attendance | >40% |
| Attendance → WhatsApp conversation | >30% |
| Conversation → Retreat booking | >10% |

## References

- See `references/CONFERENCE_CONTEXT.md` for full business context
- See `references/CONFERENCE_ROADMAP.md` for implementation timeline

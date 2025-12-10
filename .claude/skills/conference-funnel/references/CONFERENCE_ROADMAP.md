# Conference Funnel - Implementation Roadmap

## Overview

This roadmap covers the implementation of two conference funnels for FloreSiendo's free Zoom conference on February 11, 2026.

**Conference Date**: Wednesday, February 11, 2026
**Retreat Date**: February 19-22, 2026
**Days Between**: 8 days

---

## Phase 1: Foundation Setup

### 1.1 Create Funnel Page Structure

**Files to Create:**

```
app/(funnels)/f/conferencia-vida-perfecta/
├── page.tsx              # Main landing page
├── layout.tsx            # Funnel layout (no header/footer)
└── gracias/
    └── page.tsx          # Thank you page with Zoom link

app/(funnels)/f/conferencia-atrapado-exito/
├── page.tsx              # Main landing page
├── layout.tsx            # Funnel layout (no header/footer)
└── gracias/
    └── page.tsx          # Thank you page with Zoom link
```

**Tasks:**
- [ ] Create directory structure for both funnels
- [ ] Create layout.tsx with minimal funnel styling (copy from existing funnels)
- [ ] Create placeholder page.tsx for each funnel
- [ ] Create thank you pages with Zoom link placeholder

### 1.2 Registration Form Component

**File to Create:**

```
components/conference-registration-form.tsx
```

**Form Fields:**
- First name (required)
- Email (required)
- WhatsApp phone (required, Mexican format)
- Pain point selector (optional): "¿Qué te trae aquí?"
  - "Mi vida se ve bien pero me siento vacío"
  - "Siento que construí la vida equivocada"
  - "Estoy agotado y desconectado"
  - "Otro"

**Tasks:**
- [ ] Create form component with react-hook-form + zod validation
- [ ] Style with Tailwind matching existing funnel aesthetic
- [ ] Add loading state and success state
- [ ] Implement form submission handler

### 1.3 API Routes

**Files to Create:**

```
app/api/conference-registration/route.ts
```

**API Functionality:**
1. Receive form data
2. Validate input
3. Create/update HubSpot contact
4. Send Meta CAPI event (CompleteRegistration)
5. Return success with Zoom link

**Tasks:**
- [ ] Create API route with POST handler
- [ ] Implement HubSpot contact creation
- [ ] Implement Meta CAPI tracking
- [ ] Add error handling and logging
- [ ] Return Zoom meeting URL on success

### 1.4 Tracking Setup

**Update File:**

```
lib/meta-tracking.ts
```

**New Events:**
```typescript
// Conference-specific events
Lead_Conferencia_VidaPerfecta
Lead_Conferencia_AtrapadoExito
CompleteRegistration_Conferencia_VidaPerfecta
CompleteRegistration_Conferencia_AtrapadoExito
```

**Tasks:**
- [ ] Add conference tracking event types
- [ ] Create trackConferenceRegistration() helper function
- [ ] Test Pixel firing in browser
- [ ] Test CAPI events in Meta Events Manager

---

## Phase 2: Landing Page Content

### 2.1 Vida Perfecta Landing Page

**File:** `app/(funnels)/f/conferencia-vida-perfecta/page.tsx`

**Sections:**

1. **Hero**
   - Badge: "Conferencia Gratuita | Miércoles 11 de Febrero"
   - Headline: "Cuando tu vida se ve perfecta pero se siente vacía"
   - Subheadline: "Una conversación honesta sobre el vacío que el éxito no llena"
   - CTA Button: "Reservar mi lugar"
   - Trust: "1 hora | Zoom | Sin costo | Cupo limitado"

2. **Pain Validation**
   - "¿Te suena familiar?"
   - Items:
     - "Tienes todo lo que 'deberías' querer, pero despiertas vacío"
     - "Tu vida se ve perfecta en fotos, pero por dentro algo falta"
     - "No puedes contarle a nadie porque pensarían que eres malagradecido"
     - "El éxito se suponía que debía sentirse diferente"
     - "No sabes quién eres fuera de tus roles"

3. **What You'll Discover**
   - "En esta conferencia exploraremos:"
   - Why external success doesn't fill internal void
   - The hidden cost of living someone else's expectations
   - What's actually possible when you stop performing

4. **About Ramón**
   - Photo
   - Bio emphasizing understanding, not expertise
   - 10 years of experience accompanying transformation

5. **Registration Form**
   - Embedded form component
   - "Lugares limitados" urgency

6. **FAQ**
   - "¿Es realmente gratis?"
   - "¿Habrá grabación?"
   - "¿Qué necesito para participar?"
   - "¿Esto es para venderme algo?"

7. **Final CTA**
   - Repeat registration form or scroll trigger

**Tasks:**
- [ ] Write all copy sections
- [ ] Implement page with all sections
- [ ] Add scroll-based animations
- [ ] Mobile responsive testing
- [ ] Connect form to API

### 2.2 Atrapado en el Éxito Landing Page

**File:** `app/(funnels)/f/conferencia-atrapado-exito/page.tsx`

**Sections:** Same structure as Vida Perfecta with different copy:

1. **Hero**
   - Headline: "Atrapado en el éxito: cuando la vida que construiste no es la que querías"
   - Subheadline: "Qué hacer cuando el arrepentimiento pesa más que los logros"

2. **Pain Validation**
   - "Construiste todo bien... pero no era tu sueño"
   - "Tomaste decisiones por obligación, no por deseo"
   - "Sientes que es muy tarde para cambiar"
   - "El resentimiento hacia tus elecciones crece cada día"
   - "Te sientes prisionero de tu propio éxito"

3. **What You'll Discover**
   - How regret becomes wisdom, not punishment
   - Why "too late" is usually a lie we tell ourselves
   - Permission to want something different

**Tasks:**
- [ ] Write differentiated copy for this angle
- [ ] Implement page (can share components with Vida Perfecta)
- [ ] Test both funnels side by side

### 2.3 Thank You Pages

**Files:**
- `app/(funnels)/f/conferencia-vida-perfecta/gracias/page.tsx`
- `app/(funnels)/f/conferencia-atrapado-exito/gracias/page.tsx`

**Content:**
- Confirmation message
- Zoom link (prominent)
- Add to calendar button (Google, Apple, Outlook)
- "Add to WhatsApp contacts" for reminder
- What to expect
- "Share with someone who needs this"

**Tasks:**
- [ ] Create thank you page template
- [ ] Implement calendar add buttons
- [ ] Add Zoom link display
- [ ] Track page view for attribution

---

## Phase 3: Integrations

### 3.1 HubSpot Setup

**Tasks:**
- [ ] Create "Conference Registration" form in HubSpot (for backup)
- [ ] Create contact property: "Conference Source" (vida_perfecta / atrapado_exito)
- [ ] Create contact property: "Conference Registered" (date)
- [ ] Create contact property: "Conference Attended" (yes/no/unknown)
- [ ] Create list: "Conference Feb 2026 Registrants"
- [ ] Set up workflow: Registration → Welcome email

### 3.2 Zoom Setup

**Tasks:**
- [ ] Create Zoom webinar/meeting for Feb 11
- [ ] Configure registration settings (if using Zoom registration as backup)
- [ ] Generate meeting link
- [ ] Set up waiting room or direct join
- [ ] Configure recording settings (if applicable)

### 3.3 Email Sequences (HubSpot)

**Emails to Create:**

1. **Immediate Confirmation**
   - Subject: "Confirmado: Te veo el 11 de febrero"
   - Content: Zoom link, calendar add, what to expect

2. **Reminder -3 days (Feb 8)**
   - Subject: "En 3 días: nuestra conversación sobre [pain point]"
   - Content: Re-confirm time, build anticipation

3. **Reminder -1 day (Feb 10)**
   - Subject: "Mañana a las [TIME]: [Conference title]"
   - Content: Practical details, Zoom link

4. **Day-of Reminder (Feb 11, 2 hours before)**
   - Subject: "En 2 horas comenzamos"
   - Content: Zoom link, "click here to join"

**Tasks:**
- [ ] Write email copy for all 4 emails
- [ ] Create emails in HubSpot
- [ ] Set up automation workflow with timing
- [ ] Test email delivery

### 3.4 WhatsApp Follow-up

**Messages to Prepare:**

1. **Post-registration (automated or manual)**
   ```
   ¡Hola [Nombre]! Soy Ramón. Gracias por registrarte a la
   conferencia del 11 de febrero. Te espero ahí. Si tienes
   alguna pregunta antes, aquí estoy.
   ```

2. **Day-of reminder**
   ```
   [Nombre], en 2 horas comenzamos. Aquí está el link de Zoom:
   [LINK]. ¿Nos vemos ahí?
   ```

3. **Post-conference (attended)**
   ```
   [Nombre], gracias por estar hoy. ¿Qué fue lo que más te
   resonó de la conversación?
   ```

4. **Post-conference (no-show)**
   ```
   [Nombre], te extrañamos hoy en la conferencia. ¿Todo bien?
   Si quieres, puedo contarte brevemente de qué hablamos.
   ```

**Tasks:**
- [ ] Prepare WhatsApp message templates
- [ ] Define who sends (Ramón directly or team)
- [ ] Set up tracking for WhatsApp conversations

---

## Phase 4: Meta Ads Setup

### 4.1 Pixel Events Verification

**Tasks:**
- [ ] Verify ViewContent fires on landing pages
- [ ] Verify Lead event fires on form interaction
- [ ] Verify CompleteRegistration fires on form submit
- [ ] Check CAPI events in Events Manager
- [ ] Confirm deduplication is working

### 4.2 Ad Creative

**Vida Perfecta Ad:**
- Image/Video: Professional looking pensive, successful but empty
- Primary Text: "Tu vida se ve perfecta. ¿Por qué se siente vacía? El 11 de febrero, una conversación honesta sobre lo que el éxito no puede darte."
- Headline: "Conferencia Gratuita | 11 de Febrero"
- CTA: "Registrarse"

**Atrapado Éxito Ad:**
- Image/Video: Person at desk, head in hands, nice office
- Primary Text: "Construiste todo bien. Pero no era tu sueño. El 11 de febrero, hablemos de qué hacer cuando el arrepentimiento pesa más que los logros."
- Headline: "Conferencia Gratuita | 11 de Febrero"
- CTA: "Registrarse"

**Tasks:**
- [ ] Create ad images (or source stock photos)
- [ ] Write 3 variations of primary text per angle
- [ ] Set up A/B test structure
- [ ] Define target audiences

### 4.3 Campaign Structure

```
Campaign: Conferencia Feb 2026
├── Ad Set: Vida Perfecta - Cold
│   ├── Ad: Image A + Copy 1
│   ├── Ad: Image A + Copy 2
│   └── Ad: Image B + Copy 1
├── Ad Set: Atrapado Éxito - Cold
│   ├── Ad: Image A + Copy 1
│   ├── Ad: Image A + Copy 2
│   └── Ad: Image B + Copy 1
├── Ad Set: Retargeting - Web Visitors
│   └── Ad: Combined angle
└── Ad Set: Retargeting - Video Viewers
    └── Ad: Combined angle
```

**Tasks:**
- [ ] Create campaign in Ads Manager
- [ ] Set up ad sets with targeting
- [ ] Upload creatives
- [ ] Configure budget and schedule
- [ ] Set up conversion tracking

---

## Phase 5: Testing & QA

### 5.1 Functional Testing

**Tasks:**
- [ ] Test form submission flow (both funnels)
- [ ] Verify HubSpot contact creation
- [ ] Verify Meta events in Events Manager
- [ ] Test thank you page displays correctly
- [ ] Test calendar add buttons
- [ ] Verify email automation triggers

### 5.2 Cross-Device Testing

**Tasks:**
- [ ] Test on mobile (iPhone, Android)
- [ ] Test on tablet
- [ ] Test on desktop (Chrome, Safari, Firefox)
- [ ] Verify responsive design
- [ ] Check load times

### 5.3 Tracking Verification

**Tasks:**
- [ ] Use Meta Pixel Helper to verify events
- [ ] Check Events Manager for test events
- [ ] Verify CAPI events are received
- [ ] Confirm deduplication (no double counting)

---

## Phase 6: Launch & Monitor

### 6.1 Pre-Launch Checklist

- [ ] All pages live and tested
- [ ] Zoom meeting created and link embedded
- [ ] HubSpot workflows active
- [ ] Email sequences scheduled
- [ ] WhatsApp templates ready
- [ ] Meta Pixel verified
- [ ] Ads ready (not yet live)

### 6.2 Launch Timeline

| Date | Action |
|------|--------|
| Feb 1 | Pages live, final testing |
| Feb 3 | Ads go live |
| Feb 5 | First performance check |
| Feb 8 | Reminder email #1 sent |
| Feb 10 | Reminder email #2 sent |
| Feb 11 AM | Day-of WhatsApp + email reminder |
| Feb 11 7PM | Conference |
| Feb 11 PM | Post-conference follow-up begins |
| Feb 12-18 | Retreat conversion push |

### 6.3 Monitoring Dashboard

**Daily Metrics to Track:**

| Metric | Source |
|--------|--------|
| Ad spend | Meta Ads Manager |
| Impressions | Meta Ads Manager |
| Link clicks | Meta Ads Manager |
| Page views | Vercel Analytics |
| Form submissions | HubSpot |
| Cost per registration | Calculated |

### 6.4 Contingency Plans

**Low registrations (<30 by Feb 8):**
- Increase ad budget
- Activate organic channels
- Send email blast to existing contacts

**High bounce rate (>70%):**
- Review page load speed
- A/B test different headlines
- Check mobile experience

**Low attendance (<30%):**
- Add urgency to reminders
- Personal WhatsApp from Ramón
- Consider incentive for live attendance

---

## Summary: Task Count by Phase

| Phase | Tasks |
|-------|-------|
| 1. Foundation | 16 |
| 2. Landing Pages | 12 |
| 3. Integrations | 18 |
| 4. Meta Ads | 12 |
| 5. Testing | 11 |
| 6. Launch | 8 |
| **Total** | **77 tasks** |

---

## Dependencies

```
Phase 1 (Foundation)
    ↓
Phase 2 (Landing Pages) ←→ Phase 3 (Integrations)
    ↓                           ↓
Phase 4 (Meta Ads) ←────────────┘
    ↓
Phase 5 (Testing)
    ↓
Phase 6 (Launch)
```

**Critical Path:**
1. Form component + API (blocks everything)
2. Landing page content (blocks ads)
3. Tracking verification (blocks ads launch)
4. Zoom setup (blocks thank you page)
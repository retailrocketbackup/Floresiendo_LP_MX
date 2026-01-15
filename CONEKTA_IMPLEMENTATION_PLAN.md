# Conekta Payment Integration Plan - Floresiendo

## Overview
Integrate Conekta payment gateway into the February 2026 retreat pricing page, allowing direct card payments and SPEI transfers.

---

## Implementation Steps

### Phase 1: Setup & Dependencies

**1.1 Install Dependencies**
```bash
npm install axios
```
Note: Not using `conekta` npm package since it's Node.js SDK - we'll use REST API directly with axios (already pattern in project).

**1.2 Environment Variables**
Add to `.env.local`:
```bash
CONEKTA_API_KEY=key_prod_xxx
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY=key_pub_xxx
CONEKTA_WEBHOOK_SECRET=whk_live_xxx
```

---

### Phase 2: Backend API Routes

**2.1 Create `/app/api/payments/create-charge/route.ts`**
- Accept tokenized card + customer info
- Create charge via Conekta REST API
- Return charge status

**2.2 Create `/app/api/payments/spei/route.ts`** (Optional)
- Generate SPEI payment reference
- Return CLABE + reference for bank transfer

**2.3 Create `/app/api/webhooks/conekta/route.ts`**
- Handle payment confirmations
- Verify webhook signature
- Log payments (console for now, can add DB later)

---

### Phase 3: Frontend Components

**3.1 Create `/components/ConektaPaymentForm.tsx`**
- Card input form (number, exp, cvc)
- Customer info (name, email, phone)
- Tokenization with Conekta.js
- Submit to backend API
- Success/error handling

**3.2 Update `/app/encuentros/febrero-2026-precios/page.tsx`**
- Add Conekta.js script
- Replace WhatsApp buttons with payment options
- Add payment modal or inline form

---

### Phase 4: Payment Flow

```
User selects package (2 or 3 nights)
    ↓
Opens payment form (modal or page)
    ↓
Enters card details + customer info
    ↓
Frontend tokenizes card with Conekta.js
    ↓
Token sent to /api/payments/create-charge
    ↓
Backend creates charge via Conekta API
    ↓
Success → Redirect to /pago-exitoso
Error → Show error message
    ↓
Webhook confirms payment (async)
```

---

### Phase 5: Success/Error Pages

**5.1 Create `/app/pago-exitoso/page.tsx`**
- Confirmation message
- Order details
- WhatsApp contact for questions

**5.2 Error handling in form**
- Display user-friendly error messages
- Retry option

---

## Files to Create

```
app/
├── api/
│   ├── payments/
│   │   └── create-charge/
│   │       └── route.ts
│   └── webhooks/
│       └── conekta/
│           └── route.ts
├── encuentros/
│   └── febrero-2026-precios/
│       └── page.tsx (UPDATE)
├── pago-exitoso/
│   └── page.tsx
components/
└── ConektaPaymentForm.tsx
lib/
└── conekta.ts
```

---

## Pricing Configuration

| Package | Price | Amount in Cents |
|---------|-------|-----------------|
| Deposit | $3,000 MXN | 300000 |
| 2 Nights (Early) | $7,100 MXN | 710000 |
| 2 Nights (Regular) | $8,000 MXN | 800000 |
| 3 Nights (Early) | $10,200 MXN | 1020000 |
| 3 Nights (Regular) | $11,500 MXN | 1150000 |

---

## Security Considerations

- Never expose `CONEKTA_API_KEY` to frontend
- Only `NEXT_PUBLIC_CONEKTA_PUBLIC_KEY` is safe for client
- Verify webhook signatures
- No card data stored on server (tokenization only)

---

## Testing

Use Conekta test cards:
- Success: `4242 4242 4242 4242`
- Declined: `4000 0000 0000 0002`
- Exp: Any future date
- CVC: Any 3 digits

---

## Decisions Made

1. **Database**: Console logging only (MVP simplicity)
2. **Payment methods**: Card only via Conekta
3. **Payment flow**: Full payment options (deposit $3,000 OR full package)

---

## Implementation Summary

### What we built:
1. `lib/conekta.ts` - Conekta API client
2. `app/api/payments/create-charge/route.ts` - Backend charge creation
3. `app/api/webhooks/conekta/route.ts` - Webhook handler
4. `components/ConektaPaymentForm.tsx` - Payment form component
5. `app/pago-exitoso/page.tsx` - Success page
6. Updated pricing page with payment buttons

---

## Production Deployment

### Current Status: TEST MODE
- Test account configured and working
- Test payment successful ($3,000 MXN deposit)

### Environment Keys

**Current (Sandbox/Test):**
```bash
CONEKTA_API_KEY=key_tzx3lWod30WmiVrV6KwNAjg
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY=key_FlTwr3nFy39PoqzIfcR83C5
```

**Production (TODO - Replace before go-live):**
```bash
CONEKTA_API_KEY=<PRODUCTION_PRIVATE_KEY>
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY=<PRODUCTION_PUBLIC_KEY>
CONEKTA_WEBHOOK_SECRET=<PRODUCTION_WEBHOOK_SECRET>
```

### Production Checklist

- [ ] Get production keys from Conekta Dashboard (Modo Produccion)
- [ ] Set up webhook: `https://floresiendo.com/api/webhooks/conekta`
- [ ] Add production keys to Vercel environment variables
- [ ] Deploy to production: `vercel --prod`
- [ ] Test with real card (small amount, then refund)
- [ ] Verify webhook delivery in Conekta Dashboard

### Vercel Environment Variables to Set

| Variable | Description |
|----------|-------------|
| `CONEKTA_API_KEY` | Production private key (`key_live_...`) |
| `NEXT_PUBLIC_CONEKTA_PUBLIC_KEY` | Production public key (`key_live_...`) |
| `CONEKTA_WEBHOOK_SECRET` | Webhook secret from Conekta |

### How to Get Production Keys

1. Go to https://panel.conekta.com
2. Toggle to **"Modo Produccion"**
3. Desarrolladores → API Keys → Copy Live keys
4. Desarrolladores → Webhooks → Create webhook → Copy secret
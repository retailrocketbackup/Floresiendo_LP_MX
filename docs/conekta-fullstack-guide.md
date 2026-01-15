# Complete Stack: Conekta Integration with Next.js 14 + TypeScript + Tailwind CSS + Vercel

**Full Stack Specification for Production-Ready Payment Integration**

**Target Stack**:
- **Frontend**: Next.js 14+ (App Router), React 18+, TypeScript (strict mode)
- **Styling**: Tailwind CSS v4 (minimal config)
- **Backend**: Next.js API Routes, Server Actions
- **Database**: Prisma ORM + PostgreSQL
- **Deployment**: Vercel
- **Security**: Environment variables (Vercel sensitive vars), webhook signature verification

**Total Setup Time**: 5-7 hours
**Estimated Cost**: Free (Vercel free tier includes webhooks + 12 serverless function invocations/month)

---

## 1. PROJECT INITIALIZATION

### 1.1 Create Next.js Project with Full Stack

```bash
# Create Next.js project with TypeScript + Tailwind
npx create-next-app@latest conekta-landing \
  --typescript \
  --tailwind \
  --app \
  --eslint \
  --use-npm

# Navigate to project
cd conekta-landing

# Install additional dependencies
npm install \
  conekta \
  axios \
  @prisma/client \
  dotenv \
  clsx
  
# Install Prisma CLI (dev dependency)
npm install -D prisma @prisma/cli
```

### 1.2 Project Structure

```
conekta-landing/
├── app/
│   ├── api/
│   │   ├── payments/
│   │   │   ├── create-charge/
│   │   │   │   └── route.ts
│   │   │   ├── spei/
│   │   │   │   └── route.ts
│   │   │   └── cash/
│   │   │       └── route.ts
│   │   └── webhooks/
│   │       └── conekta/
│   │           └── route.ts
│   ├── actions/
│   │   └── payments.ts
│   ├── components/
│   │   ├── PaymentForm.tsx
│   │   ├── SuccessPage.tsx
│   │   └── ErrorPage.tsx
│   ├── success/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── conekta.ts
│   ├── prisma.ts
│   ├── email.ts
│   └── webhook-utils.ts
├── types/
│   ├── index.ts
│   ├── payment.ts
│   └── order.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.local              # Local development
├── .env.example            # Template for ENV vars
├── tsconfig.json           # Strict TypeScript config
├── tailwind.config.ts      # Tailwind config (TypeScript)
├── next.config.js
└── package.json
```

---

## 2. TYPESCRIPT CONFIGURATION

### 2.1 tsconfig.json (Strict Mode)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictPropertyInitialization": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"],
      "@/app/*": ["./app/*"],
      "@/components/*": ["./app/components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/prisma/*": ["./prisma/*"]
    },
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "incremental": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"],
  "compilerOptions": {
    "plugins": [
      {
        "name": "next"
      }
    ]
  }
}
```

### 2.2 Global Type Definitions (types/index.ts)

```typescript
// types/index.ts

export interface PaymentResponse {
  success: boolean;
  charge: {
    id: string;
    status: 'paid' | 'pending' | 'declined';
    amount: number;
    currency: string;
    orderId: string;
  };
  error?: string;
}

export interface CreateChargeRequest {
  amount: number;
  currency?: string;
  description: string;
  tokenId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  metadata?: Record<string, string>;
}

export interface WebhookPayload {
  type: string;
  data: {
    id: string;
    order_id: string;
    status: string;
    amount: number;
    currency: string;
    customer_info: {
      email: string;
      name: string;
      phone?: string;
    };
    payment_details?: {
      reference?: string;
      clabe?: string;
      barcode?: string;
      expires_at?: string;
    };
    details?: {
      message_to_purchaser?: string;
      error_code?: string;
    };
  };
}

export type OrderStatus = 'PENDING' | 'PAID' | 'FAILED' | 'REFUNDED' | 'CANCELLED';

export interface Order {
  id: string;
  orderId: string;
  chargeId?: string;
  customerEmail: string;
  customerName: string;
  amountCents: number;
  currency: string;
  status: OrderStatus;
  paymentMethod?: string;
  createdAt: Date;
  paidAt?: Date;
  declinedReason?: string;
}
```

---

## 3. TAILWIND CSS CONFIGURATION

### 3.1 tailwind.config.ts (TypeScript)

```typescript
// tailwind.config.ts

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom brand colors
        brand: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          900: '#082f49',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      spacing: {
        '128': '32rem',
      },
      borderRadius: {
        '3xl': '1.5rem',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
```

### 3.2 globals.css (Tailwind Import)

```css
/* app/globals.css */

@import "tailwindcss";

/* Custom base styles */
@layer base {
  /* Smooth color transitions */
  * {
    @apply transition-colors duration-200;
  }

  /* Default link styles */
  a {
    @apply text-brand-600 hover:text-brand-700 underline;
  }

  /* Button defaults */
  button {
    @apply transition-all duration-150;
  }
}

/* Utility layers */
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-brand-600 text-white rounded-lg font-semibold hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed;
  }

  .btn-secondary {
    @apply px-4 py-2 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100;
  }

  .input-field {
    @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white;
  }

  .card {
    @apply bg-white dark:bg-gray-800 rounded-lg shadow-md p-6;
  }

  .error-message {
    @apply bg-error-50 border border-error-300 text-error-700 px-4 py-3 rounded-lg dark:bg-error-900 dark:border-error-700 dark:text-error-100;
  }

  .success-message {
    @apply bg-success-50 border border-success-300 text-success-700 px-4 py-3 rounded-lg dark:bg-success-900 dark:border-success-700 dark:text-success-100;
  }
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@layer utilities {
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out;
  }
}
```

---

## 4. ENVIRONMENT VARIABLES

### 4.1 .env.local (Local Development)

```bash
# Conekta API Configuration
CONEKTA_API_KEY=key_prod_xxxxxxxxxxxxxxxxxxxxxxxxx
CONEKTA_PUBLIC_KEY=key_pub_xxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY=key_pub_xxxxxxxxxxxxxxxxxxxxxxxxx
CONEKTA_WEBHOOK_SECRET=whk_live_xxxxxxxxxxxxxxxxxxxxxxxxx

# Database Configuration
DATABASE_URL="postgresql://user:password@localhost:5432/conekta_payments"

# App URLs
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Email Configuration (if using)
RESEND_API_KEY=re_xxxxxxxxxxxxxx
SENDER_EMAIL=noreply@yourdomain.com

# Environment
NODE_ENV=development
```

### 4.2 .env.example (Template for Team)

```bash
# Never commit actual secrets - use this template
CONEKTA_API_KEY=key_prod_xxx
CONEKTA_PUBLIC_KEY=key_pub_xxx
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY=key_pub_xxx
CONEKTA_WEBHOOK_SECRET=whk_live_xxx

DATABASE_URL=postgresql://user:password@host:5432/db_name

NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000

RESEND_API_KEY=re_xxx
SENDER_EMAIL=noreply@yourdomain.com

NODE_ENV=development
```

---

## 5. CORE LIBRARY FILES

### 5.1 lib/conekta.ts (Conekta Client)

```typescript
// lib/conekta.ts

import axios, { AxiosInstance } from 'axios';
import crypto from 'crypto';

/**
 * Initialize Conekta API client
 * Server-side use only (API routes, Server Actions)
 */
export const conektaAPI: AxiosInstance = axios.create({
  baseURL: 'https://api.conekta.io',
  headers: {
    'Authorization': `Bearer ${process.env.CONEKTA_API_KEY}`,
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

/**
 * Get Conekta Public Key for client-side tokenization
 * Safe to expose to frontend
 */
export const getConektaPublicKey = (): string => {
  const key = process.env.NEXT_PUBLIC_CONEKTA_PUBLIC_KEY || 
              process.env.CONEKTA_PUBLIC_KEY;
  
  if (!key) {
    throw new Error('Conekta public key not configured');
  }
  
  return key;
};

/**
 * Verify Conekta webhook signature using SHA256
 * @param payload - Raw request body as JSON string
 * @param signature - Signature from X-Conekta-Webhook-Signature header
 * @returns Boolean indicating if signature is valid
 */
export const verifyConektaSignature = (
  payload: string,
  signature: string
): boolean => {
  const secret = process.env.CONEKTA_WEBHOOK_SECRET;
  
  if (!secret) {
    throw new Error('Conekta webhook secret not configured');
  }
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');
  
  return signature === expectedSignature;
};

/**
 * Handle API errors consistently
 */
export const handleConektaError = (error: any): { message: string; code?: string } => {
  if (error.response?.data) {
    return {
      message: error.response.data.message || error.message,
      code: error.response.data.details?.error_code
    };
  }
  
  return {
    message: error.message || 'An error occurred with Conekta',
    code: 'UNKNOWN_ERROR'
  };
};

export default conektaAPI;
```

### 5.2 lib/prisma.ts (Prisma Client Singleton)

```typescript
// lib/prisma.ts

import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export default prisma;
```

### 5.3 lib/email.ts (Email Templates)

```typescript
// lib/email.ts

interface ConfirmationEmailParams {
  orderId: string;
  chargeId: string;
  amount: number;
  customerName: string;
}

interface DeclinedEmailParams {
  orderId: string;
  reason: string;
  customerName: string;
}

/**
 * Send payment confirmation email
 * Replace with your email service (Resend, SendGrid, etc.)
 */
export async function sendConfirmationEmail(
  to: string,
  params: ConfirmationEmailParams
): Promise<void> {
  // Example using Resend (if available)
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'noreply@yourdomain.com',
      to,
      subject: `Pago Confirmado - Orden ${params.orderId}`,
      html: `
        <h1>¡Pago Recibido!</h1>
        <p>Hola ${params.customerName},</p>
        <p>Tu pago de <strong>MXN$${params.amount.toFixed(2)}</strong> ha sido procesado exitosamente.</p>
        <p><strong>Detalles de tu orden:</strong></p>
        <ul>
          <li>Número de Orden: ${params.orderId}</li>
          <li>ID de Transacción: ${params.chargeId}</li>
          <li>Monto: MXN$${params.amount.toFixed(2)}</li>
        </ul>
        <p>Gracias por tu compra.</p>
      `
    });
  }

  // Log for debugging
  console.log(`✅ Confirmation email sent to ${to}`);
}

/**
 * Send payment declined email
 */
export async function sendDeclinedEmail(
  to: string,
  params: DeclinedEmailParams
): Promise<void> {
  if (process.env.RESEND_API_KEY) {
    const { Resend } = await import('resend');
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.SENDER_EMAIL || 'noreply@yourdomain.com',
      to,
      subject: `Tu pago fue rechazado - Orden ${params.orderId}`,
      html: `
        <h1>Pago Rechazado</h1>
        <p>Hola ${params.customerName},</p>
        <p>Lamentablemente, tu pago fue rechazado.</p>
        <p><strong>Motivo:</strong> ${params.reason}</p>
        <p>Por favor, intenta de nuevo o contacta a nuestro equipo de soporte.</p>
      `
    });
  }

  console.log(`❌ Declined email sent to ${to}`);
}
```

---

## 6. PRISMA SETUP

### 6.1 prisma/schema.prisma

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
  previewFeatures = ["jsonProtocol"]
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Order {
  id                String    @id @default(cuid())
  orderId           String    @unique @db.VarChar(100)
  chargeId          String?   @db.VarChar(100)
  customerEmail     String    @db.VarChar(255)
  customerName      String    @db.VarChar(255)
  amountCents       Int       @db.Integer
  currency          String    @default("MXN") @db.VarChar(10)
  status            OrderStatus @default(PENDING)
  paymentMethod     String?   @db.VarChar(50)
  
  createdAt         DateTime  @default(now())
  paidAt            DateTime?
  declinedReason    String?   @db.Text
  metadata          Json?

  webhookLogs       WebhookLog[]

  @@index([orderId])
  @@index([chargeId])
  @@index([status])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  CANCELLED
}

model WebhookLog {
  id                String    @id @default(cuid())
  eventType         String    @db.VarChar(100)
  chargeId          String?   @db.VarChar(100)
  payload           Json
  processed         Boolean   @default(false)
  errorMessage      String?   @db.Text
  
  createdAt         DateTime  @default(now())
  processedAt       DateTime?
  
  order             Order?    @relation(fields: [orderId], references: [id], onDelete: Cascade)
  orderId           String?

  @@index([eventType])
  @@index([chargeId])
  @@index([createdAt])
}
```

### 6.2 Initialize Prisma

```bash
# Generate Prisma client
npx prisma generate

# Create initial migration (development)
npx prisma migrate dev --name init

# For production (no interactive)
npx prisma migrate deploy
```

---

## 7. VERCEL DEPLOYMENT

### 7.1 Vercel Configuration (vercel.json)

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_API_URL": "@next_public_api_url",
    "NEXT_PUBLIC_APP_URL": "@next_public_app_url"
  }
}
```

### 7.2 Environment Variables in Vercel Dashboard

**Navigate**: Project Settings → Environment Variables

**Set these as Sensitive (encrypted at rest, only available at build/runtime)**:

```
CONEKTA_API_KEY = key_prod_xxx
CONEKTA_PUBLIC_KEY = key_pub_xxx (also set as NEXT_PUBLIC_CONEKTA_PUBLIC_KEY)
CONEKTA_WEBHOOK_SECRET = whk_live_xxx
DATABASE_URL = postgresql://user:password@host:5432/db
RESEND_API_KEY = re_xxx
SENDER_EMAIL = noreply@yourdomain.com
```

**Set these as Public (NEXT_PUBLIC prefix)**:

```
NEXT_PUBLIC_API_URL = https://yourdomain.com
NEXT_PUBLIC_APP_URL = https://yourdomain.com
NEXT_PUBLIC_CONEKTA_PUBLIC_KEY = key_pub_xxx
```

### 7.3 Deploy Script (package.json)

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "prisma generate && next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "db:migrate": "prisma migrate dev",
    "db:deploy": "prisma migrate deploy",
    "db:seed": "ts-node prisma/seed.ts"
  }
}
```

### 7.4 Deployment Steps

```bash
# 1. Initialize Git repository
git init
git add .
git commit -m "Initial commit: Conekta payment integration"

# 2. Push to GitHub
git push -u origin main

# 3. Connect to Vercel (via dashboard or CLI)
vercel

# 4. Add environment variables in Vercel dashboard
# Settings → Environment Variables

# 5. Deploy
vercel deploy --prod

# 6. Run database migrations on production
vercel env pull .env.production.local
npx prisma migrate deploy --skip-generate
```

---

## 8. PAYMENT FORM COMPONENT (Full Implementation)

### 8.1 app/components/PaymentForm.tsx

```typescript
// app/components/PaymentForm.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { validateAndCreateOrder } from '@/app/actions/payments';
import clsx from 'clsx';

interface PaymentFormProps {
  amount: number;
  description: string;
  onSuccess?: (chargeId: string) => void;
}

export default function PaymentForm({ 
  amount, 
  description, 
  onSuccess 
}: PaymentFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const conektaRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    cardMonth: '',
    cardYear: '',
    cardCvc: ''
  });

  // Initialize Conekta reference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      conektaRef.current = window.Conekta;
      if (!conektaRef.current) {
        setError('Payment system not loaded. Please refresh the page.');
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form
      if (!formData.name || !formData.email || !formData.cardNumber) {
        throw new Error('Please fill all required fields');
      }

      // Step 1: Create order via Server Action
      const orderFormData = new FormData();
      orderFormData.append('email', formData.email);
      orderFormData.append('name', formData.name);
      orderFormData.append('amount', (amount * 100).toString());

      const orderResult = await validateAndCreateOrder(orderFormData);

      if (!orderResult.success) {
        throw new Error(orderResult.error || 'Failed to create order');
      }

      // Step 2: Tokenize card with Conekta.js
      if (!conektaRef.current) {
        throw new Error('Payment system not available');
      }

      const token = await new Promise<any>((resolve, reject) => {
        conektaRef.current.Token.create({
          card: {
            number: formData.cardNumber.replace(/\s/g, ''),
            name: formData.name,
            exp_month: formData.cardMonth,
            exp_year: formData.cardYear,
            cvc: formData.cardCvc
          }
        }, resolve, reject);
      });

      // Step 3: Send to backend API
      const paymentResponse = await fetch('/api/payments/create-charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount * 100,
          description,
          tokenId: token.id,
          customerEmail: formData.email,
          customerName: formData.name,
          metadata: {
            orderId: orderResult.orderId
          }
        })
      });

      const paymentData = await paymentResponse.json();

      if (!paymentData.success) {
        throw new Error(paymentData.error || 'Payment processing failed');
      }

      // Success!
      setSuccess(true);
      
      // Callback and redirect
      if (onSuccess) {
        onSuccess(paymentData.charge.id);
      }

      setTimeout(() => {
        window.location.href = `/success?charge_id=${paymentData.charge.id}`;
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form 
        onSubmit={handleSubmit} 
        className="card"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Realizar Pago
        </h2>

        {/* Error Message */}
        {error && (
          <div className="error-message mb-4 animate-fade-in">
            <p className="font-semibold">Error</p>
            <p className="text-sm mt-1">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="success-message mb-4 animate-fade-in">
            <p className="font-semibold">¡Pago Exitoso!</p>
            <p className="text-sm mt-1">Redirigiendo...</p>
          </div>
        )}

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Nombre Completo
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Juan Pérez"
            disabled={loading || success}
            className={clsx(
              'input-field',
              (loading || success) && 'opacity-50 cursor-not-allowed'
            )}
            required
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="juan@example.com"
            disabled={loading || success}
            className={clsx(
              'input-field',
              (loading || success) && 'opacity-50 cursor-not-allowed'
            )}
            required
          />
        </div>

        {/* Card Number */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Número de Tarjeta
          </label>
          <input
            type="text"
            name="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            disabled={loading || success}
            className={clsx(
              'input-field',
              (loading || success) && 'opacity-50 cursor-not-allowed'
            )}
            required
          />
        </div>

        {/* Expiry and CVC */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Mes
            </label>
            <input
              type="text"
              name="cardMonth"
              value={formData.cardMonth}
              onChange={handleChange}
              placeholder="12"
              maxLength={2}
              disabled={loading || success}
              className={clsx(
                'input-field text-center',
                (loading || success) && 'opacity-50 cursor-not-allowed'
              )}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Año
            </label>
            <input
              type="text"
              name="cardYear"
              value={formData.cardYear}
              onChange={handleChange}
              placeholder="25"
              maxLength={2}
              disabled={loading || success}
              className={clsx(
                'input-field text-center',
                (loading || success) && 'opacity-50 cursor-not-allowed'
              )}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              CVC
            </label>
            <input
              type="text"
              name="cardCvc"
              value={formData.cardCvc}
              onChange={handleChange}
              placeholder="123"
              maxLength={4}
              disabled={loading || success}
              className={clsx(
                'input-field text-center',
                (loading || success) && 'opacity-50 cursor-not-allowed'
              )}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading || success}
          className={clsx(
            'btn-primary w-full font-bold text-lg',
            (loading || success) && 'opacity-50 cursor-not-allowed'
          )}
        >
          {loading ? (
            <>
              <span className="inline-block animate-spin mr-2">⟳</span>
              Procesando...
            </>
          ) : success ? (
            'Redirigiendo...'
          ) : (
            `Pagar MXN$${amount.toFixed(2)}`
          )}
        </button>

        {/* Test Card Info */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <p className="text-xs font-semibold text-gray-600 dark:text-gray-300 mb-2">
            Tarjeta de Prueba:
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 font-mono">
            4242 4242 4242 4242 | 12/25 | 123
          </p>
        </div>
      </form>
    </div>
  );
}
```

### 8.2 app/layout.tsx (With Conekta.js)

```typescript
// app/layout.tsx

import type { Metadata } from 'next';
import { getConektaPublicKey } from '@/lib/conekta';
import './globals.css';

export const metadata: Metadata = {
  title: 'Compra Segura - Conekta Payments',
  description: 'Procesa tu pago de manera rápida y segura con Conekta',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conektaPublicKey = getConektaPublicKey();

  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Conekta.js Library */}
        <script src="https://cdn.conekta.io/js/conekta.js" async defer />
        
        {/* Initialize Conekta */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (window.Conekta) {
                Conekta.setPublicKey('${conektaPublicKey}');
              }
            `
          }}
        />
      </head>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  );
}
```

### 8.3 app/page.tsx (Home Page)

```typescript
// app/page.tsx

import PaymentForm from '@/app/components/PaymentForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-brand-50 to-blue-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12 sm:py-20">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            Compra Segura
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Procesa tu pago de manera rápida y segura con Conekta
          </p>
        </div>

        <PaymentForm 
          amount={99.99}
          description="Premium Plan - Monthly Subscription"
        />

        {/* Trust Badges */}
        <div className="mt-12 flex justify-center gap-6 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>🔒</span>
            <span>Pago 100% Seguro</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>✓</span>
            <span>Encriptado SSL</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <span>✓</span>
            <span>Certificado PCI DSS</span>
          </div>
        </div>
      </div>
    </main>
  );
}
```

---

## 9. QUICK START REFERENCE

```bash
# 1. Clone and setup
git clone <your-repo>
cd conekta-landing
npm install

# 2. Configure environment
cp .env.example .env.local
# Edit .env.local with your Conekta keys

# 3. Setup database
npx prisma migrate dev --name init

# 4. Start development server
npm run dev

# 5. Access application
# http://localhost:3000

# 6. Deploy to Vercel
vercel deploy --prod
```

---

**Last Updated**: January 2025
**Next.js**: 14+
**TypeScript**: 5.3+
**Tailwind CSS**: 4.0+
**Conekta API**: 2.0.0

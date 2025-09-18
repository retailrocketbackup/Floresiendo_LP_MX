This file is a merged representation of the entire codebase, combined into a single document by Repomix.
The content has been processed where security check has been disabled.

# File Summary

## Purpose
This file contains a packed representation of the entire repository's contents.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Security check has been disabled - content may contain sensitive information
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
app/
  globals.css
  layout.tsx
  page.tsx
components/
  ui/
    badge.tsx
    button.tsx
    card.tsx
    input.tsx
    textarea.tsx
  calendly-widget.tsx
  contact-section.tsx
  encounters-section.tsx
  faq-section.tsx
  features-section.tsx
  footer.tsx
  help-section.tsx
  hero-section.tsx
  hubspot-form.tsx
  liberation-section.tsx
  plants-section.tsx
  schedule-section.tsx
  testimonials-section.tsx
  theme-provider.tsx
  video-section.tsx
lib/
  utils.ts
public/
  placeholder-logo.svg
  placeholder.svg
styles/
  globals.css
.gitignore
components.json
index.html
next.config.mjs
package.json
postcss.config.mjs
README.md
tsconfig.json
```

# Files

## File: app/globals.css
```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

:root {
  /* Updated to cosmic purple/blue theme for FloreSiendo */
  --background: oklch(1 0 0); /* White background */
  --foreground: oklch(0.2 0 0); /* Dark gray text */
  --card: oklch(0.98 0 0); /* Light gray card background */
  --card-foreground: oklch(0.2 0 0); /* Dark text on cards */
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.2 0 0);
  --primary: oklch(0.45 0.15 280); /* Cosmic purple */
  --primary-foreground: oklch(1 0 0); /* White text on primary */
  --secondary: oklch(0.55 0.2 250); /* Galaxy blue */
  --secondary-foreground: oklch(1 0 0); /* White text on secondary */
  --muted: oklch(0.96 0 0); /* Very light gray */
  --muted-foreground: oklch(0.5 0 0); /* Medium gray */
  --accent: oklch(0.55 0.2 250); /* Galaxy blue accent */
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.9 0 0); /* Light border */
  --input: oklch(1 0 0);
  --ring: oklch(0.45 0.15 280 / 0.5); /* Purple focus ring */
  --chart-1: oklch(0.45 0.15 280); /* Cosmic purple */
  --chart-2: oklch(0.55 0.2 250); /* Galaxy blue */
  --chart-3: oklch(0.6 0.15 200); /* Light blue */
  --chart-4: oklch(0.7 0.1 300); /* Light purple */
  --chart-5: oklch(0.5 0 0); /* Deep blue */
  --radius: 0.5rem;
  --sidebar: oklch(0.98 0 0);
  --sidebar-foreground: oklch(0.2 0 0);
  --sidebar-primary: oklch(0.45 0.15 280);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.55 0.2 250);
  --sidebar-accent-foreground: oklch(1 0 0);
  --sidebar-border: oklch(0.9 0 0);
  --sidebar-ring: oklch(0.45 0.15 280 / 0.5);
}

.dark {
  --background: oklch(0.1 0 0); /* Very dark background */
  --foreground: oklch(0.95 0 0); /* Light text */
  --card: oklch(0.15 0 0); /* Dark card background */
  --card-foreground: oklch(0.95 0 0);
  --popover: oklch(0.1 0 0);
  --popover-foreground: oklch(0.95 0 0);
  --primary: oklch(0.6 0.2 280); /* Brighter cosmic purple for dark mode */
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.65 0.25 250); /* Brighter galaxy blue */
  --secondary-foreground: oklch(1 0 0);
  --muted: oklch(0.2 0 0);
  --muted-foreground: oklch(0.7 0 0);
  --accent: oklch(0.65 0.25 250);
  --accent-foreground: oklch(1 0 0);
  --destructive: oklch(0.6 0.3 25);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.25 0 0);
  --input: oklch(0.15 0 0);
  --ring: oklch(0.6 0.2 280 / 0.5);
  --chart-1: oklch(0.6 0.2 280);
  --chart-2: oklch(0.65 0.25 250);
  --chart-3: oklch(0.7 0.2 200);
  --chart-4: oklch(0.75 0.15 300);
  --chart-5: oklch(0.6 0.25 260);
  --sidebar: oklch(0.12 0 0);
  --sidebar-foreground: oklch(0.95 0 0);
  --sidebar-primary: oklch(0.6 0.2 280);
  --sidebar-primary-foreground: oklch(1 0 0);
  --sidebar-accent: oklch(0.65 0.25 250);
  --sidebar-accent-foreground: oklch(1 0 0);
  --sidebar-border: oklch(0.25 0 0);
  --sidebar-ring: oklch(0.6 0.2 280 / 0.5);
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}

@layer utilities {
  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }
}

@keyframes spin-slow {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
```

## File: app/layout.tsx
```typescript
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## File: app/page.tsx
```typescript
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { LiberationSection } from "@/components/liberation-section"
import { PlantsSection } from "@/components/plants-section"
import { VideoSection } from "@/components/video-section"
import { HelpSection } from "@/components/help-section"
import { ScheduleSection } from "@/components/schedule-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { EncountersSection } from "@/components/encounters-section"
import { FAQSection } from "@/components/faq-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturesSection />
      <LiberationSection />
      <PlantsSection />
      <VideoSection
        title="Experiencia transformadora"
        description="Descubre testimonios reales de participantes que han vivido esta experiencia de sanación y crecimiento personal"
        videoId="dQw4w9WgXcQ"
        thumbnail="/placeholder.svg?key=gw58i"
        className="bg-background"
      />
      <HelpSection />
      <ScheduleSection />
      <TestimonialsSection />
      <EncountersSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
```

## File: components/ui/badge.tsx
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span'

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
```

## File: components/ui/button.tsx
```typescript
import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
        destructive:
          'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
```

## File: components/ui/card.tsx
```typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card"
      className={cn(
        'bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm',
        className,
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className,
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className,
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-content"
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
```

## File: components/ui/input.tsx
```typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
```

## File: components/ui/textarea.tsx
```typescript
import * as React from 'react'

import { cn } from '@/lib/utils'

function Textarea({ className, ...props }: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
```

## File: components/calendly-widget.tsx
```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function CalendlyWidget() {
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)

  const openCalendly = () => {
    setIsCalendlyOpen(true)
    const calendlyUrl = "https://calendly.com/floresiendo-retiros/consulta-inicial"
    window.open(calendlyUrl, "_blank", "width=800,height=600")
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">Agenda una Consulta</CardTitle>
        <CardDescription className="text-gray-600">
          Habla directamente con nuestros facilitadores para resolver todas tus dudas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>30 minutos</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Videollamada gratuita</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Consulta personalizada</span>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-900 mb-2">En esta consulta hablaremos sobre:</h4>
          <ul className="text-sm text-purple-800 space-y-1">
            <li>• Tu experiencia previa con medicina ancestral</li>
            <li>• Expectativas y objetivos del retiro</li>
            <li>• Proceso de preparación recomendado</li>
            <li>• Fechas disponibles y logística</li>
          </ul>
        </div>

        <Button
          onClick={openCalendly}
          className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground py-3"
        >
          Agendar Consulta Gratuita
        </Button>

        <p className="text-xs text-gray-500 text-center">
          Al agendar, recibirás un enlace de Zoom y recordatorios por email
        </p>
      </CardContent>
    </Card>
  )
}
```

## File: components/contact-section.tsx
```typescript
import { HubSpotForm } from "./hubspot-form"
import { CalendlyWidget } from "./calendly-widget"

export function ContactSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">¿Listo para tu Transformación?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conecta con nosotros para comenzar tu viaje de sanación y crecimiento personal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <HubSpotForm />
          </div>
          <div>
            <CalendlyWidget />
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">¿Prefieres contactarnos directamente?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="mailto:info@floresiendo.com"
              className="flex items-center space-x-2 text-primary hover:text-primary/80"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>info@floresiendo.com</span>
            </a>
            <a
              href="https://wa.me/525512345678"
              className="flex items-center space-x-2 text-green-600 hover:text-green-500"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.700" />
              </svg>
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## File: components/encounters-section.tsx
```typescript
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function EncountersSection() {
  const encounters = [
    {
      title: "Encuentro de Integración",
      date: "15 de Octubre, 2024",
      description: "Sesión grupal para compartir experiencias y profundizar en el proceso de integración",
      image: "/placeholder.svg?key=enc1",
    },
    {
      title: "Círculo de Medicina",
      date: "22 de Octubre, 2024",
      description: "Ceremonia especial con plantas maestras para participantes avanzados",
      image: "/placeholder.svg?key=enc2",
    },
    {
      title: "Taller de Respiración",
      date: "29 de Octubre, 2024",
      description: "Técnicas de respiración consciente para el trabajo interior",
      image: "/placeholder.svg?key=enc3",
    },
    {
      title: "Retiro de Silencio",
      date: "5 de Noviembre, 2024",
      description: "Experiencia de introspección profunda en contacto con la naturaleza",
      image: "/placeholder.svg?key=enc4",
    },
  ]

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Encuentros 2024</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Próximos eventos y actividades para continuar tu proceso de crecimiento
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {encounters.map((encounter, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
              <div className="aspect-square overflow-hidden">
                <img
                  src={encounter.image || "/placeholder.svg"}
                  alt={encounter.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 text-card-foreground">{encounter.title}</h3>
                <p className="text-primary font-semibold text-sm mb-3">{encounter.date}</p>
                <p className="text-muted-foreground text-sm leading-relaxed">{encounter.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
          >
            Ver todos los encuentros
          </Button>
        </div>
      </div>
    </section>
  )
}
```

## File: components/faq-section.tsx
```typescript
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ChevronUp } from "lucide-react"

export function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "¿Es seguro participar en ceremonias con plantas amazónicas?",
      answer:
        "Sí, la seguridad es nuestra máxima prioridad. Contamos con facilitadores experimentados, protocolos médicos estrictos, y un entorno controlado. Realizamos evaluaciones previas de salud física y mental, y mantenemos supervisión médica durante todo el proceso.",
    },
    {
      question: "¿Qué debo traer al retiro?",
      answer:
        "Te proporcionaremos una lista detallada al confirmar tu participación. Generalmente incluye ropa cómoda, artículos de higiene personal, una botella de agua, y cualquier medicamento personal. No es necesario traer comida, ya que proporcionamos todas las comidas.",
    },
    {
      question: "¿Hay restricciones de edad para participar?",
      answer:
        "Los participantes deben ser mayores de 21 años. También evaluamos la madurez emocional y la preparación mental de cada persona durante el proceso de selección para asegurar que estén listos para esta experiencia.",
    },
    {
      question: "¿Qué pasa si tengo condiciones médicas preexistentes?",
      answer:
        "Es fundamental que nos informes sobre cualquier condición médica, medicamentos o tratamientos actuales. Algunas condiciones pueden ser contraindicaciones. Nuestro equipo médico evaluará cada caso individualmente para determinar la seguridad de tu participación.",
    },
    {
      question: "¿Cómo es el proceso de integración después del retiro?",
      answer:
        "La integración es tan importante como la ceremonia misma. Ofrecemos sesiones de seguimiento, círculos de integración grupales, y recursos para ayudarte a incorporar las enseñanzas en tu vida diaria. También proporcionamos herramientas prácticas y apoyo continuo.",
    },
    {
      question: "¿Qué incluye el precio del retiro?",
      answer:
        "El precio incluye todas las ceremonias, alojamiento, comidas vegetarianas, talleres, sesiones de integración, y acompañamiento profesional durante todo el fin de semana. No incluye transporte hasta el lugar del retiro.",
    },
    {
      question: "¿Puedo cancelar mi reservación?",
      answer:
        "Sí, entendemos que pueden surgir circunstancias imprevistas. Tenemos una política de cancelación flexible: reembolso completo hasta 30 días antes, 50% hasta 15 días antes. Consulta nuestros términos completos para más detalles.",
    },
    {
      question: "¿Es necesario tener experiencia previa con plantas medicinales?",
      answer:
        "No es necesario tener experiencia previa. Nuestros retiros están diseñados tanto para principiantes como para personas con experiencia. Proporcionamos toda la preparación y orientación necesaria para que te sientas seguro y preparado.",
    },
    {
      question: "¿Cómo puedo prepararme para el retiro?",
      answer:
        "Te enviaremos una guía completa de preparación que incluye recomendaciones dietéticas, prácticas de meditación, y preparación mental y emocional. También ofrecemos sesiones de preparación individuales si las necesitas.",
    },
    {
      question: "¿Qué medidas de privacidad y confidencialidad manejan?",
      answer:
        "Respetamos completamente tu privacidad. Todo lo compartido durante el retiro se mantiene confidencial. No tomamos fotos durante las ceremonias y pedimos a todos los participantes que respeten la privacidad de los demás.",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Preguntas frecuentes</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Resolvemos las dudas más comunes sobre nuestros retiros de transformación
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="shadow-sm hover:shadow-md transition-shadow duration-200">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors duration-200"
                >
                  <h3 className="font-semibold text-lg text-card-foreground pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## File: components/features-section.tsx
```typescript
import { Card, CardContent } from "@/components/ui/card"

export function FeaturesSection() {
  const features = [
    {
      title: "Plantas amazónicas",
      description:
        "Conecta con la sabiduría ancestral de las plantas maestras amazónicas en un entorno seguro y sagrado.",
      icon: "🌿",
    },
    {
      title: "Integración transcendente",
      description: "Procesos de integración profunda que te permiten incorporar las enseñanzas en tu vida cotidiana.",
      icon: "✨",
    },
    {
      title: "Experiencia segura y consciente",
      description: "Acompañamiento profesional y protocolos de seguridad para una experiencia transformadora.",
      icon: "🛡️",
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Una experiencia transformadora</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Descubre un camino hacia la sanación y el crecimiento personal a través de prácticas ancestrales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8 text-center">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">{feature.title}</h3>
                <p className="text-muted-foreground text-pretty leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## File: components/footer.tsx
```typescript
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-purple-900 to-blue-900 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4">FloreSiendo</h3>
            <p className="text-purple-200 mb-6 leading-relaxed">
              Facilitamos experiencias transformadoras a través de la sabiduría ancestral de las plantas amazónicas en
              un entorno seguro y sagrado en Morelos, México.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-white text-purple-900 hover:bg-purple-100 px-6 py-3 rounded-full">
                Contactar
              </Button>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2 text-purple-200">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#sobre-nosotros" className="hover:text-white transition-colors">
                  Sobre nosotros
                </a>
              </li>
              <li>
                <a href="#retiros" className="hover:text-white transition-colors">
                  Retiros
                </a>
              </li>
              <li>
                <a href="#testimonios" className="hover:text-white transition-colors">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Contacto</h4>
            <div className="space-y-2 text-purple-200">
              <p>Morelos, México</p>
              <p>info@floresiendo.com</p>
              <p>WhatsApp: +52 777 123 4567</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-purple-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-purple-200 text-sm">© 2024 FloreSiendo. Todos los derechos reservados.</p>
            <div className="flex gap-6 text-sm text-purple-200">
              <a href="#privacidad" className="hover:text-white transition-colors">
                Política de Privacidad
              </a>
              <a href="#terminos" className="hover:text-white transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

## File: components/help-section.tsx
```typescript
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function HelpSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <Card className="overflow-hidden shadow-xl">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
                  <img
                    src="/spiritual-guide-meditation-session.jpg"
                    alt="Sesión de ayuda y orientación espiritual"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2">Orientación personalizada</h3>
                    <p className="text-white/80">Acompañamiento individual durante todo el proceso</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">¿En qué te puede ayudar?</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Nuestro equipo de facilitadores experimentados te acompañará en cada paso de tu proceso de
                transformación personal y espiritual.
              </p>
              <p>
                Ofrecemos orientación personalizada para ayudarte a integrar las enseñanzas recibidas durante las
                ceremonias en tu vida cotidiana, creando cambios duraderos y significativos.
              </p>
              <ul className="space-y-3 text-base">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Preparación pre-ceremonia y establecimiento de intenciones</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Acompañamiento durante las ceremonias</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Procesos de integración post-ceremonia</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl">•</span>
                  <span>Seguimiento y apoyo continuo</span>
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
              >
                Solicitar orientación
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## File: components/hero-section.tsx
```typescript
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/cosmic-spiritual-background.jpg"
          alt="Cosmic spiritual background with person walking toward mandala galaxy"
          className="w-full h-full object-cover"
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance drop-shadow-2xl">
          Retiros FloreSiendo
          <span className="block text-3xl md:text-4xl font-normal mt-2 text-purple-200">en Morelos</span>
        </h1>

        <p className="text-xl md:text-2xl mb-8 text-purple-100 max-w-2xl mx-auto text-pretty drop-shadow-lg">
          Liberate tu mente de patrones limitantes y conecta con tu esencia más profunda
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full shadow-2xl"
          >
            Más información del retiro
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="border-white text-white hover:bg-white hover:text-purple-900 px-8 py-4 text-lg rounded-full bg-white/10 backdrop-blur-sm shadow-2xl"
          >
            Ver fechas disponibles
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  )
}
```

## File: components/hubspot-form.tsx
```typescript
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function HubSpotForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In production, replace this with actual HubSpot API integration
      await new Promise((resolve) => setTimeout(resolve, 2000))

      console.log("[v0] Form submitted to HubSpot:", formData)
      setIsSubmitted(true)
    } catch (error) {
      console.error("[v0] Error submitting to HubSpot:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Gracias por tu interés!</h3>
          <p className="text-gray-600">
            Nos pondremos en contacto contigo muy pronto para brindarte más información sobre nuestros retiros.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-sm shadow-2xl">
      <CardHeader>
        <CardTitle className="text-2xl text-center text-gray-900">Solicita Información</CardTitle>
        <CardDescription className="text-center text-gray-600">
          Déjanos tus datos y te contactaremos para brindarte más detalles sobre nuestros retiros
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                name="firstName"
                placeholder="Nombre"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="bg-white"
              />
            </div>
            <div>
              <Input
                name="lastName"
                placeholder="Apellido"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="bg-white"
              />
            </div>
          </div>

          <Input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-white"
          />

          <Input
            name="phone"
            type="tel"
            placeholder="Teléfono (opcional)"
            value={formData.phone}
            onChange={handleChange}
            className="bg-white"
          />

          <Textarea
            name="message"
            placeholder="¿Tienes alguna pregunta específica sobre los retiros?"
            value={formData.message}
            onChange={handleChange}
            rows={3}
            className="bg-white resize-none"
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3"
          >
            {isSubmitting ? "Enviando..." : "Solicitar Información"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
```

## File: components/liberation-section.tsx
```typescript
import { Button } from "@/components/ui/button"

export function LiberationSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Un espacio de liberación</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Rodeado de la naturaleza exuberante de Morelos, nuestro espacio sagrado te invita a soltar y renacer
          </p>
        </div>

        {/* Nature images grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/placeholder-4dfp6.png"
              alt="Espacio de meditación en la naturaleza"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/placeholder-cg9lw.png"
              alt="Círculo sagrado de ceremonia"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="aspect-square rounded-lg overflow-hidden">
            <img
              src="/placeholder-y8a5z.png"
              alt="Jardín de plantas medicinales"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
          >
            Conoce nuestro espacio
          </Button>
        </div>
      </div>
    </section>
  )
}
```

## File: components/plants-section.tsx
```typescript
import { Button } from "@/components/ui/button"

export function PlantsSection() {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-square rounded-full overflow-hidden bg-gradient-to-br from-green-100 to-blue-100 p-8">
              <img
                src="/placeholder-romd4.png"
                alt="Plantas amazónicas y geometría sagrada"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              ¿Qué son las plantas amazónicas y la integración?
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Las plantas maestras amazónicas son aliados vegetales sagrados que han sido utilizados durante milenios
                por las culturas indígenas para la sanación, el crecimiento espiritual y la conexión con la sabiduría
                ancestral.
              </p>
              <p>
                En nuestros retiros, trabajamos con estas plantas en un contexto ceremonial seguro, acompañados por
                facilitadores experimentados que honran las tradiciones ancestrales mientras proporcionan un marco
                moderno de seguridad y contención.
              </p>
              <p>
                La integración es el proceso fundamental donde las enseñanzas y revelaciones recibidas durante las
                ceremonias se incorporan conscientemente en la vida cotidiana, creando cambios duraderos y
                significativos.
              </p>
            </div>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-8 py-4 text-lg rounded-full"
              >
                Más información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## File: components/schedule-section.tsx
```typescript
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function ScheduleSection() {
  const scheduleData = {
    viernes: [
      { time: "16:00 - 17:00", activity: "Llegada y registro", type: "arrival" },
      { time: "17:00 - 18:00", activity: "Círculo de apertura y presentaciones", type: "ceremony" },
      { time: "18:00 - 19:30", activity: "Cena comunitaria", type: "meal" },
      { time: "19:30 - 21:00", activity: "Preparación y meditación", type: "preparation" },
      { time: "21:00 - 00:00", activity: "Primera ceremonia", type: "ceremony" },
    ],
    sabado: [
      { time: "08:00 - 09:00", activity: "Desayuno ligero", type: "meal" },
      { time: "09:00 - 11:00", activity: "Círculo de integración matutino", type: "integration" },
      { time: "11:00 - 12:30", activity: "Taller de respiración consciente", type: "workshop" },
      { time: "12:30 - 14:00", activity: "Almuerzo y descanso", type: "meal" },
      { time: "14:00 - 16:00", activity: "Tiempo libre y reflexión personal", type: "free" },
      { time: "16:00 - 17:30", activity: "Taller de movimiento corporal", type: "workshop" },
      { time: "17:30 - 19:00", activity: "Cena", type: "meal" },
      { time: "19:00 - 20:30", activity: "Preparación ceremonial", type: "preparation" },
      { time: "20:30 - 02:00", activity: "Segunda ceremonia", type: "ceremony" },
    ],
    domingo: [
      { time: "09:00 - 10:00", activity: "Desayuno", type: "meal" },
      { time: "10:00 - 12:00", activity: "Círculo de integración final", type: "integration" },
      { time: "12:00 - 13:30", activity: "Taller de herramientas para la vida cotidiana", type: "workshop" },
      { time: "13:30 - 15:00", activity: "Almuerzo de despedida", type: "meal" },
      { time: "15:00 - 16:00", activity: "Círculo de cierre y compromisos", type: "ceremony" },
      { time: "16:00", activity: "Despedida", type: "departure" },
    ],
  }

  const getActivityColor = (type: string) => {
    switch (type) {
      case "ceremony":
        return "bg-primary text-primary-foreground"
      case "integration":
        return "bg-secondary text-secondary-foreground"
      case "workshop":
        return "bg-accent text-accent-foreground"
      case "meal":
        return "bg-muted text-muted-foreground"
      case "preparation":
        return "bg-purple-100 text-purple-800"
      case "free":
        return "bg-green-100 text-green-800"
      case "arrival":
        return "bg-blue-100 text-blue-800"
      case "departure":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">El programa del retiro</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Un cronograma cuidadosamente diseñado para maximizar tu experiencia de transformación
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Viernes */}
          <Card className="shadow-lg">
            <CardHeader className="bg-primary text-primary-foreground">
              <CardTitle className="text-2xl text-center">Viernes</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scheduleData.viernes.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-muted-foreground">{item.time}</span>
                      <Badge className={`text-xs ${getActivityColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.activity}</p>
                    {index < scheduleData.viernes.length - 1 && <div className="border-b border-border mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Sábado */}
          <Card className="shadow-lg">
            <CardHeader className="bg-secondary text-secondary-foreground">
              <CardTitle className="text-2xl text-center">Sábado</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scheduleData.sabado.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-muted-foreground">{item.time}</span>
                      <Badge className={`text-xs ${getActivityColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.activity}</p>
                    {index < scheduleData.sabado.length - 1 && <div className="border-b border-border mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Domingo */}
          <Card className="shadow-lg">
            <CardHeader className="bg-accent text-accent-foreground">
              <CardTitle className="text-2xl text-center">Domingo</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {scheduleData.domingo.map((item, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-muted-foreground">{item.time}</span>
                      <Badge className={`text-xs ${getActivityColor(item.type)}`}>{item.type}</Badge>
                    </div>
                    <p className="text-sm leading-relaxed">{item.activity}</p>
                    {index < scheduleData.domingo.length - 1 && <div className="border-b border-border mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to action */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-lg text-muted-foreground mb-4">¿Listo para comenzar tu transformación?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg rounded-full"
              >
                Reservar mi lugar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg rounded-full bg-transparent"
              >
                Más información
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

## File: components/testimonials-section.tsx
```typescript
"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "María González",
      location: "Ciudad de México",
      rating: 5,
      text: "Esta experiencia cambió mi vida completamente. Logré sanar traumas profundos que llevaba años cargando. El acompañamiento fue excepcional y me sentí segura en todo momento.",
      image: "/placeholder.svg?key=maria",
    },
    {
      name: "Carlos Hernández",
      location: "Guadalajara",
      rating: 5,
      text: "Nunca imaginé que podría conectar tan profundamente conmigo mismo. Las plantas maestras me mostraron aspectos de mi ser que desconocía. La integración posterior fue fundamental.",
      image: "/placeholder.svg?key=carlos",
    },
    {
      name: "Ana Rodríguez",
      location: "Monterrey",
      rating: 5,
      text: "El espacio sagrado en Morelos es perfecto para este tipo de trabajo interior. Los facilitadores son muy profesionales y crean un ambiente de confianza y respeto.",
      image: "/placeholder.svg?key=ana",
    },
    {
      name: "Roberto Silva",
      location: "Puebla",
      rating: 5,
      text: "Después del retiro, mi perspectiva sobre la vida cambió radicalmente. Encontré claridad en mis propósitos y sanación en heridas emocionales muy antiguas.",
      image: "/placeholder.svg?key=roberto",
    },
    {
      name: "Laura Martínez",
      location: "Querétaro",
      rating: 5,
      text: "La experiencia superó todas mis expectativas. El proceso de integración me ayudó a incorporar las enseñanzas en mi vida diaria de manera práctica y sostenible.",
      image: "/placeholder.svg?key=laura",
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Testimonios de transformación</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
            Conoce las experiencias reales de quienes han vivido este proceso de sanación y crecimiento
          </p>
        </div>

        {/* Main testimonial carousel */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-blue-50">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-blue-200">
                    <img
                      src={currentTestimonial.image || "/placeholder.svg"}
                      alt={currentTestimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  {/* Rating stars */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <blockquote className="text-lg md:text-xl text-foreground mb-6 leading-relaxed italic">
                    "{currentTestimonial.text}"
                  </blockquote>

                  <div>
                    <p className="font-semibold text-foreground text-lg">{currentTestimonial.name}</p>
                    <p className="text-muted-foreground">{currentTestimonial.location}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation controls */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={prevTestimonial}
              className="rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextTestimonial}
              className="rounded-full w-12 h-12 p-0 bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Grid of additional testimonials */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  "{testimonial.text.substring(0, 120)}..."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-purple-200 to-blue-200">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
```

## File: components/theme-provider.tsx
```typescript
'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

## File: components/video-section.tsx
```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, X } from "lucide-react"

interface VideoSectionProps {
  title: string
  description: string
  videoId: string
  thumbnail?: string
  className?: string
}

export function VideoSection({ title, description, videoId, thumbnail, className = "" }: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className={`py-20 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{description}</p>
        </div>

        <Card className="overflow-hidden shadow-2xl">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gradient-to-br from-purple-900 to-blue-900">
              {!isPlaying ? (
                <>
                  {/* Video thumbnail */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 to-blue-900/80">
                    {thumbnail && (
                      <img
                        src={thumbnail || "/placeholder.svg"}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover opacity-60"
                      />
                    )}
                  </div>

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="lg"
                      onClick={() => setIsPlaying(true)}
                      className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/50 rounded-full w-20 h-20 p-0"
                    >
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </Button>
                  </div>

                  {/* Video title overlay */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-white text-2xl font-bold mb-2">{title}</h3>
                    <p className="text-white/80 text-lg">Haz clic para reproducir</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Close button */}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(false)}
                    className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                  >
                    <X className="w-5 h-5" />
                  </Button>

                  {/* Embedded video */}
                  <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                    title={title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
```

## File: lib/utils.ts
```typescript
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## File: public/placeholder-logo.svg
```
<svg xmlns="http://www.w3.org/2000/svg" width="215" height="48" fill="none"><path fill="#000" d="M57.588 9.6h6L73.828 38h-5.2l-2.36-6.88h-11.36L52.548 38h-5.2l10.24-28.4Zm7.16 17.16-4.16-12.16-4.16 12.16h8.32Zm23.694-2.24c-.186-1.307-.706-2.32-1.56-3.04-.853-.72-1.866-1.08-3.04-1.08-1.68 0-2.986.613-3.92 1.84-.906 1.227-1.36 2.947-1.36 5.16s.454 3.933 1.36 5.16c.934 1.227 2.24 1.84 3.92 1.84 1.254 0 2.307-.373 3.16-1.12.854-.773 1.387-1.867 1.6-3.28l5.12.24c-.186 1.68-.733 3.147-1.64 4.4-.906 1.227-2.08 2.173-3.52 2.84-1.413.667-2.986 1-4.72 1-2.08 0-3.906-.453-5.48-1.36-1.546-.907-2.76-2.2-3.64-3.88-.853-1.68-1.28-3.627-1.28-5.84 0-2.24.427-4.187 1.28-5.84.88-1.68 2.094-2.973 3.64-3.88 1.574-.907 3.4-1.36 5.48-1.36 1.68 0 3.227.32 4.64.96 1.414.64 2.56 1.56 3.44 2.76.907 1.2 1.454 2.6 1.64 4.2l-5.12.28Zm11.486-7.72.12 3.4c.534-1.227 1.307-2.173 2.32-2.84 1.04-.693 2.267-1.04 3.68-1.04 1.494 0 2.76.387 3.8 1.16 1.067.747 1.827 1.813 2.28 3.2.507-1.44 1.294-2.52 2.36-3.24 1.094-.747 2.414-1.12 3.96-1.12 1.414 0 2.64.307 3.68.92s1.84 1.52 2.4 2.72c.56 1.2.84 2.667.84 4.4V38h-4.96V25.92c0-1.813-.293-3.187-.88-4.12-.56-.96-1.413-1.44-2.56-1.44-.906 0-1.68.213-2.32.64-.64.427-1.133 1.053-1.48 1.88-.32.827-.48 1.84-.48 3.04V38h-4.56V25.92c0-1.2-.133-2.213-.4-3.04-.24-.827-.626-1.453-1.16-1.88-.506-.427-1.133-.64-1.88-.64-.906 0-1.68.227-2.32.68-.64.427-1.133 1.053-1.48 1.88-.32.827-.48 1.827-.48 3V38h-4.96V16.8h4.48Zm26.723 10.6c0-2.24.427-4.187 1.28-5.84.854-1.68 2.067-2.973 3.64-3.88 1.574-.907 3.4-1.36 5.48-1.36 1.84 0 3.494.413 4.96 1.24 1.467.827 2.64 2.08 3.52 3.76.88 1.653 1.347 3.693 1.4 6.12v1.32h-15.08c.107 1.813.614 3.227 1.52 4.24.907.987 2.134 1.48 3.68 1.48.987 0 1.88-.253 2.68-.76a4.803 4.803 0 0 0 1.84-2.2l5.08.36c-.64 2.027-1.84 3.64-3.6 4.84-1.733 1.173-3.733 1.76-6 1.76-2.08 0-3.906-.453-5.48-1.36-1.573-.907-2.786-2.2-3.64-3.88-.853-1.68-1.28-3.627-1.28-5.84Zm15.16-2.04c-.213-1.733-.76-3.013-1.64-3.84-.853-.827-1.893-1.24-3.12-1.24-1.44 0-2.6.453-3.48 1.36-.88.88-1.44 2.12-1.68 3.72h9.92ZM163.139 9.6V38h-5.04V9.6h5.04Zm8.322 7.2.24 5.88-.64-.36c.32-2.053 1.094-3.56 2.32-4.52 1.254-.987 2.787-1.48 4.6-1.48 2.32 0 4.107.733 5.36 2.2 1.254 1.44 1.88 3.387 1.88 5.84V38h-4.96V25.92c0-1.253-.12-2.28-.36-3.08-.24-.8-.64-1.413-1.2-1.84-.533-.427-1.253-.64-2.16-.64-1.44 0-2.573.48-3.4 1.44-.8.933-1.2 2.307-1.2 4.12V38h-4.96V16.8h4.48Zm30.003 7.72c-.186-1.307-.706-2.32-1.56-3.04-.853-.72-1.866-1.08-3.04-1.08-1.68 0-2.986.613-3.92 1.84-.906 1.227-1.36 2.947-1.36 5.16s.454 3.933 1.36 5.16c.934 1.227 2.24 1.84 3.92 1.84 1.254 0 2.307-.373 3.16-1.12.854-.773 1.387-1.867 1.6-3.28l5.12.24c-.186 1.68-.733 3.147-1.64 4.4-.906 1.227-2.08 2.173-3.52 2.84-1.413.667-2.986 1-4.72 1-2.08 0-3.906-.453-5.48-1.36-1.546-.907-2.76-2.2-3.64-3.88-.853-1.68-1.28-3.627-1.28-5.84 0-2.24.427-4.187 1.28-5.84.88-1.68 2.094-2.973 3.64-3.88 1.574-.907 3.4-1.36 5.48-1.36 1.68 0 3.227.32 4.64.96 1.414.64 2.56 1.56 3.44 2.76.907 1.2 1.454 2.6 1.64 4.2l-5.12.28Zm11.443 8.16V38h-5.6v-5.32h5.6Z"/><path fill="#171717" fill-rule="evenodd" d="m7.839 40.783 16.03-28.054L20 6 0 40.783h7.839Zm8.214 0H40L27.99 19.894l-4.02 7.032 3.976 6.914H20.02l-3.967 6.943Z" clip-rule="evenodd"/></svg>
```

## File: public/placeholder.svg
```
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" fill="none"><rect width="1200" height="1200" fill="#EAEAEA" rx="3"/><g opacity=".5"><g opacity=".5"><path fill="#FAFAFA" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/></g><path stroke="url(#a)" stroke-width="2.418" d="M0-1.209h553.581" transform="scale(1 -1) rotate(45 1163.11 91.165)"/><path stroke="url(#b)" stroke-width="2.418" d="M404.846 598.671h391.726"/><path stroke="url(#c)" stroke-width="2.418" d="M599.5 795.742V404.017"/><path stroke="url(#d)" stroke-width="2.418" d="m795.717 796.597-391.441-391.44"/><path fill="#fff" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/><g clip-path="url(#e)"><path fill="#666" fill-rule="evenodd" d="M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z" clip-rule="evenodd"/></g><path stroke="#C9C9C9" stroke-width="2.418" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/></g><defs><linearGradient id="a" x1="554.061" x2="-.48" y1=".083" y2=".087" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="b" x1="796.912" x2="404.507" y1="599.963" y2="599.965" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="c" x1="600.792" x2="600.794" y1="403.677" y2="796.082" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><linearGradient id="d" x1="404.85" x2="796.972" y1="403.903" y2="796.02" gradientUnits="userSpaceOnUse"><stop stop-color="#C9C9C9" stop-opacity="0"/><stop offset=".208" stop-color="#C9C9C9"/><stop offset=".792" stop-color="#C9C9C9"/><stop offset="1" stop-color="#C9C9C9" stop-opacity="0"/></linearGradient><clipPath id="e"><path fill="#fff" d="M581.364 580.535h38.689v38.689h-38.689z"/></clipPath></defs></svg>
```

## File: styles/globals.css
```css
@import 'tailwindcss';
@import 'tw-animate-css';

@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --destructive-foreground: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --radius: 0.625rem;
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.145 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.145 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.985 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.396 0.141 25.723);
  --destructive-foreground: oklch(0.637 0.237 25.331);
  --border: oklch(0.269 0 0);
  --input: oklch(0.269 0 0);
  --ring: oklch(0.439 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(0.269 0 0);
  --sidebar-ring: oklch(0.439 0 0);
}

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## File: .gitignore
```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules

# next.js
/.next/
/out/

# production
/build

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

# env files
.env*

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts
```

## File: components.json
```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

## File: index.html
```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Retiros en Morelos Expansión – FloreSiendo</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .hero-bg {
            background: linear-gradient(135deg, rgba(139, 69, 19, 0.8), rgba(34, 139, 34, 0.8)), 
                        url('/placeholder.svg?height=800&width=1200') center/cover;
        }
        .card-hover {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
    </style>
</head>
<body class="bg-gray-50 text-gray-800">
    <!-- Hero Section -->
    <section class="hero-bg min-h-screen flex items-center justify-center relative">
        <div class="absolute inset-0 bg-black bg-opacity-30"></div>
        <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
            <div class="mb-8">
                <img src="/placeholder.svg?height=120&width=120" alt="FloreSiendo Logo" class="mx-auto mb-6 w-24 h-24 rounded-full bg-white p-4">
            </div>
            <h1 class="text-5xl md:text-6xl font-bold mb-4 text-balance">
                Retiros FloreSiendo<br>en Morelos
            </h1>
            <h2 class="text-2xl md:text-3xl mb-8 text-balance font-light">
                Reduce el estrés y siente la paz en tu vida con plantas amazónicas
            </h2>
            <a href="#entrevista" class="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-colors">
                <i class="fas fa-phone-alt mr-3"></i>
                Agenda tu llamada
            </a>
        </div>
        
        <!-- Mountain SVG Divider -->
        <div class="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1000 100" class="w-full h-20 fill-gray-50">
                <path d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"></path>
            </svg>
        </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
        <div class="container mx-auto px-4">
            <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <!-- Feature 1 -->
                <div class="text-center card-hover bg-white p-8 rounded-2xl shadow-lg">
                    <div class="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=60&width=60" alt="Plantas amazónicas" class="w-12 h-12">
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-green-800">Plantas amazónicas</h3>
                    <div class="text-gray-600 leading-relaxed">
                        <p class="mb-4">Hacemos uso consciente de plantas y ranas amazónicas, sapo de Sonora, rapé, ruda siria y otros, sustancias vegetales que nos permiten conectar con nuestro origen divino...</p>
                        <button class="text-green-600 hover:text-green-800 font-semibold flex items-center mx-auto">
                            Leer más <i class="fas fa-chevron-down ml-2"></i>
                        </button>
                    </div>
                </div>

                <!-- Feature 2 -->
                <div class="text-center card-hover bg-white p-8 rounded-2xl shadow-lg">
                    <div class="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=60&width=60" alt="Integración" class="w-12 h-12">
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-blue-800">Integración trascendente y amorosa</h3>
                    <div class="text-gray-600 leading-relaxed">
                        <p class="mb-4">Antes y después de las sesiones abrimos espacios para la apertura, la comprensión y la liberación a través del uso de la palabra y de dinámicas grupales...</p>
                        <button class="text-blue-600 hover:text-blue-800 font-semibold flex items-center mx-auto">
                            Leer más <i class="fas fa-chevron-down ml-2"></i>
                        </button>
                    </div>
                </div>

                <!-- Feature 3 -->
                <div class="text-center card-hover bg-white p-8 rounded-2xl shadow-lg">
                    <div class="w-20 h-20 mx-auto mb-6 bg-purple-100 rounded-full flex items-center justify-center">
                        <img src="/placeholder.svg?height=60&width=60" alt="Seguridad" class="w-12 h-12">
                    </div>
                    <h3 class="text-2xl font-bold mb-4 text-purple-800">Experiencia segura y confortable</h3>
                    <div class="text-gray-600 leading-relaxed">
                        <p class="mb-4">Estarás acompañado de facilitadores experimentados, con medicinas totalmente puras y de excelente calidad, en un entorno tranquilo en la naturaleza...</p>
                        <button class="text-purple-600 hover:text-purple-800 font-semibold flex items-center mx-auto">
                            Leer más <i class="fas fa-chevron-down ml-2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Video Section -->
    <section class="py-20 bg-gradient-to-r from-green-800 to-blue-800">
        <div class="container mx-auto px-4 text-center">
            <div class="max-w-4xl mx-auto">
                <div class="bg-black rounded-2xl overflow-hidden shadow-2xl">
                    <div class="aspect-video bg-gray-900 flex items-center justify-center">
                        <div class="text-white text-center">
                            <i class="fas fa-play-circle text-6xl mb-4 text-green-400"></i>
                            <p class="text-xl">La ayahuasca desde la psicología</p>
                            <p class="text-gray-300">Entrevista Sergio Sanz, co-fundador FloreSiendo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Schedule Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">Programa del Retiro</h2>
            <div class="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                <!-- Thursday -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <h3 class="text-2xl font-bold mb-4 text-green-600">Jueves:</h3>
                    <div class="space-y-2 text-gray-700">
                        <p><strong>18h</strong> merienda</p>
                        <p><strong>20:30h</strong> preparación</p>
                        <p><strong>22:30h</strong> sesión de plantas amazónicas</p>
                    </div>
                </div>

                <!-- Friday -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <h3 class="text-2xl font-bold mb-4 text-blue-600">Viernes:</h3>
                    <div class="space-y-2 text-gray-700">
                        <p><strong>9h</strong> rana amazónica (opcional)</p>
                        <p><strong>9h30</strong> desayuno</p>
                        <p><strong>11h</strong> Integración del grupo</p>
                        <p><strong>13h</strong> sapo de Sonora (opcional)</p>
                        <p><strong>14h</strong> almuerzo</p>
                        <p><strong>18h</strong> merienda</p>
                        <p><strong>20:30h</strong> preparación</p>
                        <p><strong>22:30h</strong> sesión de plantas amazónicas</p>
                    </div>
                </div>

                <!-- Saturday -->
                <div class="bg-gradient-to-br from-green-100 to-blue-100 p-6 rounded-xl border-2 border-green-200">
                    <h3 class="text-2xl font-bold mb-4 text-green-700">Sábado:</h3>
                    <div class="space-y-2 text-gray-700">
                        <p><strong>9h</strong> rana amazónica (opcional)</p>
                        <p><strong>9h30</strong> desayuno</p>
                        <p><strong>11h</strong> Integración del grupo</p>
                        <p><strong>13h</strong> sapo de Sonora (opcional)</p>
                        <p><strong>14h</strong> almuerzo</p>
                        <p><strong>18h</strong> merienda</p>
                        <p><strong>20:30h</strong> preparación</p>
                        <p><strong>22:00h</strong> sesión de plantas amazónicas</p>
                    </div>
                </div>

                <!-- Sunday -->
                <div class="bg-gray-50 p-6 rounded-xl">
                    <h3 class="text-2xl font-bold mb-4 text-purple-600">Domingo:</h3>
                    <div class="space-y-2 text-gray-700">
                        <p><strong>9h</strong> rana amazónica (opcional)</p>
                        <p><strong>9:30h</strong> desayuno</p>
                        <p><strong>11h</strong> Integración del grupo</p>
                        <p><strong>13h</strong> sapo de Sonora (opcional)</p>
                        <p><strong>14:30h</strong> almuerzo</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">Testimonios</h2>
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                <!-- Testimonial 1 -->
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <img src="/placeholder.svg?height=60&width=60" alt="Silvia Cabrera" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <h4 class="font-semibold">Silvia Cabrera</h4>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        "Soy otra desde la primera medicina. Revertir una enfermedad después de 30 años no es poco, ya no existe virus en mi sangre, lo dicen los estudios médicos. Gracias medicina, gracias Flor por abrirme la puerta."
                    </p>
                </div>

                <!-- Testimonial 2 -->
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <img src="/placeholder.svg?height=60&width=60" alt="Sarah Salomón" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <h4 class="font-semibold">Sarah Salomón</h4>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        "Asistir al retiro en Paraguay fue un punto de inflexión en mi vida. Estaba luchando contra la fibromialgia, la depresión y la medicación, pero gracias a esta experiencia, ahora estoy en el camino de la recuperación."
                    </p>
                </div>

                <!-- Testimonial 3 -->
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <img src="/placeholder.svg?height=60&width=60" alt="Flavia" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <h4 class="font-semibold">Flavia</h4>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        "Quiero compartir una experiencia maravillosa que viví este fin de semana! Participé de un encuentro holístico donde descubrí la medicina ancestral, ésta me hizo sentir como un 'reseteo' dejándome en un bellísimo estado de paz."
                    </p>
                </div>

                <!-- Testimonial 4 -->
                <div class="bg-white p-6 rounded-xl shadow-lg">
                    <div class="flex items-center mb-4">
                        <img src="/placeholder.svg?height=60&width=60" alt="Viviana" class="w-12 h-12 rounded-full mr-4">
                        <div>
                            <h4 class="font-semibold">Viviana</h4>
                        </div>
                    </div>
                    <p class="text-gray-600 text-sm leading-relaxed">
                        "Aquí estoy, rendida a lo que siento, la mente está quieta, siento VIDA en mí, tengo PAZ, un cambio de energía importante fluye, contagia mi entorno. Una tremenda gratitud me visita, me acompaña! LAS AMO!"
                    </p>
                </div>
            </div>
        </div>
    </section>

    <!-- Pricing Section -->
    <section class="py-20 bg-white">
        <div class="container mx-auto px-4 text-center">
            <h2 class="text-4xl font-bold mb-8 text-gray-800">Reserva tu lugar</h2>
            <div class="max-w-md mx-auto">
                <div class="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 rounded-2xl shadow-2xl">
                    <h3 class="text-2xl font-bold mb-4">Reserva con</h3>
                    <div class="text-5xl font-bold mb-6">3,000 MXN</div>
                    <p class="text-green-100 mb-6">Incluye todas las sesiones, comidas y alojamiento</p>
                    <button class="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                        Reservar ahora
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-gray-50" id="entrevista">
        <div class="container mx-auto px-4">
            <h2 class="text-4xl font-bold text-center mb-16 text-gray-800">Preguntas Frecuentes</h2>
            <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                <!-- FAQ Left Column -->
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <h3 class="text-xl font-bold mb-3 text-green-600 flex items-center">
                            <i class="fas fa-plus mr-3"></i>
                            ¿Todo el mundo puede venir al retiro?
                        </h3>
                        <p class="text-gray-600 leading-relaxed">
                            Todas las personas pueden asistir al retiro y casi todas las personas pueden tomar las plantas amazónicas en una dosis personalizada para ellos. Para vincularnos de corazón nos gusta tener un encuentro telefónico previo para explicarte todo con detalle.
                        </p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <h3 class="text-xl font-bold mb-3 text-blue-600 flex items-center">
                            <i class="fas fa-plus mr-3"></i>
                            ¿Es necesario hacer dieta antes de tomar plantas amazónicas?
                        </h3>
                        <p class="text-gray-600">
                            <a href="#" class="text-blue-600 hover:underline">Ir al artículo del blog →</a>
                        </p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <h3 class="text-xl font-bold mb-3 text-purple-600 flex items-center">
                            <i class="fas fa-plus mr-3"></i>
                            ¿Son las plantas y ranas amazónicas y el sapo de Sonora legales?
                        </h3>
                        <p class="text-gray-600">
                            🎥 Magistral explicación del abogado Jesús Olamendi, director del ADF de ICEERS:<br>
                            <a href="#" class="text-purple-600 hover:underline">Ver video explicativo →</a>
                        </p>
                    </div>
                </div>

                <!-- FAQ Right Column -->
                <div class="space-y-6">
                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <h3 class="text-xl font-bold mb-3 text-orange-600 flex items-center">
                            <i class="fas fa-plus mr-3"></i>
                            ¿Es seguro? ¿Puedo tener un "mal viaje" o "quedar loco"?
                        </h3>
                        <p class="text-gray-600">
                            <a href="#" class="text-orange-600 hover:underline">Ir al artículo del blog →</a>
                        </p>
                    </div>

                    <div class="bg-white p-6 rounded-xl shadow-lg">
                        <h3 class="text-xl font-bold mb-3 text-red-600 flex items-center">
                            <i class="fas fa-plus mr-3"></i>
                            ¿Es una droga o es una medicina?
                        </h3>
                        <p class="text-gray-600">
                            <a href="#" class="text-red-600 hover:underline">Ir al artículo del blog →</a>
                        </p>
                    </div>

                    <!-- Contact Card -->
                    <div class="bg-gradient-to-br from-green-600 to-blue-600 text-white p-8 rounded-xl shadow-lg">
                        <h3 class="text-2xl font-bold mb-4">¿Tienes más preguntas?</h3>
                        <p class="mb-6">Agenda una llamada gratuita para resolver todas tus dudas</p>
                        <button class="bg-white text-green-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors flex items-center">
                            <i class="fas fa-phone mr-3"></i>
                            Agendar llamada
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
        <div class="container mx-auto px-4 text-center">
            <div class="mb-8">
                <img src="/placeholder.svg?height=80&width=80" alt="FloreSiendo Logo" class="mx-auto mb-4 w-16 h-16 rounded-full bg-white p-3">
                <h3 class="text-2xl font-bold">FloreSiendo</h3>
                <p class="text-gray-400">Retiros de sanación con plantas amazónicas</p>
            </div>
            
            <div class="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h4 class="font-bold mb-4">Contacto</h4>
                    <p class="text-gray-400">
                        <i class="fas fa-envelope mr-2"></i>
                        info@escuelafloresiendo.com
                    </p>
                </div>
                <div>
                    <h4 class="font-bold mb-4">Ubicación</h4>
                    <p class="text-gray-400">Morelos, México</p>
                </div>
                <div>
                    <h4 class="font-bold mb-4">Síguenos</h4>
                    <div class="flex justify-center space-x-4">
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-instagram text-xl"></i>
                        </a>
                        <a href="#" class="text-gray-400 hover:text-white">
                            <i class="fab fa-youtube text-xl"></i>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="border-t border-gray-700 pt-8">
                <p class="text-gray-400">© 2024 FloreSiendo. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
</body>
</html>
```

## File: next.config.mjs
```
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
```

## File: package.json
```json
{
  "name": "my-v0-project",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "build": "next build",
    "dev": "next dev",
    "lint": "next lint",
    "start": "next start"
  },
  "dependencies": {
    "@hookform/resolvers": "^3.10.0",
    "@radix-ui/react-accordion": "1.2.2",
    "@radix-ui/react-alert-dialog": "1.1.4",
    "@radix-ui/react-aspect-ratio": "1.1.1",
    "@radix-ui/react-avatar": "1.1.2",
    "@radix-ui/react-checkbox": "1.1.3",
    "@radix-ui/react-collapsible": "1.1.2",
    "@radix-ui/react-context-menu": "2.2.4",
    "@radix-ui/react-dialog": "1.1.4",
    "@radix-ui/react-dropdown-menu": "2.1.4",
    "@radix-ui/react-hover-card": "1.1.4",
    "@radix-ui/react-label": "2.1.1",
    "@radix-ui/react-menubar": "1.1.4",
    "@radix-ui/react-navigation-menu": "1.2.3",
    "@radix-ui/react-popover": "1.1.4",
    "@radix-ui/react-progress": "1.1.1",
    "@radix-ui/react-radio-group": "1.2.2",
    "@radix-ui/react-scroll-area": "1.2.2",
    "@radix-ui/react-select": "2.1.4",
    "@radix-ui/react-separator": "1.1.1",
    "@radix-ui/react-slider": "1.2.2",
    "@radix-ui/react-slot": "latest",
    "@radix-ui/react-switch": "1.1.2",
    "@radix-ui/react-tabs": "1.1.2",
    "@radix-ui/react-toast": "1.2.4",
    "@radix-ui/react-toggle": "1.1.1",
    "@radix-ui/react-toggle-group": "1.1.1",
    "@radix-ui/react-tooltip": "1.1.6",
    "@vercel/analytics": "latest",
    "autoprefixer": "^10.4.20",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "1.0.4",
    "date-fns": "4.1.0",
    "embla-carousel-react": "8.5.1",
    "geist": "latest",
    "input-otp": "1.4.1",
    "lucide-react": "^0.454.0",
    "next": "14.2.16",
    "next-themes": "latest",
    "react": "^18",
    "react-day-picker": "9.8.0",
    "react-dom": "^18",
    "react-hook-form": "^7.60.0",
    "react-resizable-panels": "^2.1.7",
    "recharts": "2.15.4",
    "sonner": "^1.7.4",
    "tailwind-merge": "^2.5.5",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.9",
    "zod": "3.25.67"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.1.9",
    "@types/node": "^22",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "postcss": "^8.5",
    "tailwindcss": "^4.1.9",
    "tw-animate-css": "1.3.3",
    "typescript": "^5"
  }
}
```

## File: postcss.config.mjs
```
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

export default config
```

## File: README.md
```markdown
# Remix of HTML interpretation

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/henriquezalan-1028s-projects/v0-remix-of-html-interpretation)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/fYOkNcA96Au)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Your project is live at:

**[https://vercel.com/henriquezalan-1028s-projects/v0-remix-of-html-interpretation](https://vercel.com/henriquezalan-1028s-projects/v0-remix-of-html-interpretation)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/fYOkNcA96Au](https://v0.app/chat/projects/fYOkNcA96Au)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository
```

## File: tsconfig.json
```json
{
  "compilerOptions": {
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "target": "ES6",
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

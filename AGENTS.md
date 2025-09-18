# Agent Guidelines for Floresiendo LP MX

## Build/Lint/Test Commands
- **Build**: `npm run build` or `next build`
- **Dev server**: `npm run dev` or `next dev`
- **Lint**: `npm run lint` or `next lint` (requires ESLint configuration first)
- **Start**: `npm run start` or `next start`
- **Test**: No test framework configured (no test scripts available)

## Code Style Guidelines

### TypeScript & React
- Use strict TypeScript mode
- Component functions: `export function ComponentName()`
- Props typing: Use `React.ComponentProps` for HTML elements
- Import style: `import type { Type } from 'module'` for types, regular imports for values

### Imports & Paths
- Use `@/` path alias for internal imports (maps to `./`)
- Group imports: React/types first, then external libraries, then internal components
- Example: `import { Button } from "@/components/ui/button"`

### Styling
- Use Tailwind CSS classes extensively
- Use `cn()` utility for conditional class merging (clsx + tailwind-merge)
- Responsive design: Use `md:`, `lg:`, `sm:` prefixes
- Component variants: Use `class-variance-authority` for variant props

### Naming Conventions
- Components: PascalCase (`HeroSection`, `Button`)
- Files: kebab-case for components (`hero-section.tsx`)
- Functions: camelCase
- Variables: camelCase
- Types: PascalCase

### UI Components
- Use Radix UI primitives for accessibility
- Add `data-slot` attributes to components
- Use semantic HTML with proper alt text and ARIA labels

### Error Handling
- Use TypeScript strict mode for compile-time error catching
- ESLint for code quality (`next lint`)

### Dependencies
- Next.js 14 with App Router
- React 18
- Tailwind CSS 4.x
- Radix UI components
- Class Variance Authority for component variants
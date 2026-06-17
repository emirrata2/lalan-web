# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js Version Warning

This project uses **Next.js 16** with **React 19** — both are cutting-edge with breaking changes from your training data. Before writing any Next.js-specific code, consult `node_modules/next/dist/docs/` for accurate API conventions. Heed all deprecation notices.

## Commands

All commands run from the `nextapp/` directory:

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is configured.

## Architecture

This is a **static B2B marketing site** for Lalan Rubbers Group (rubber glove manufacturer). There is no backend, no API routes, and no database — all data is hardcoded in `lib/products.ts`.

**Routing:** Next.js App Router. Pages live in `app/`. The homepage (`app/page.tsx`) is a single-page layout with anchor-linked sections (`#products`, `#about`, `#contact`, `#sustainability`). Product detail uses dynamic routes (`app/products/[id]/page.tsx`) with `generateStaticParams()` for full static generation.

**Components split:** `components/lalan/` holds brand-specific page sections (nav, product catalog, glove finder, contact form, counters, reveal animations). `components/ui/` holds reusable primitives and the advanced visual effects (WebGL shaders, COBE globe, gradient backgrounds).

**Animation layers** — four systems work together:
1. **Framer Motion** — gradient cycling, motion div transitions
2. **Intersection Observer** — scroll-triggered reveal wrappers (`components/lalan/reveal.tsx`) and animated number counters (`components/lalan/counter.tsx`)
3. **Three.js / GLSL** — custom WebGL shaders for celestial bloom and aurora borealis effects (contained to specific sections)
4. **COBE** — interactive 3D globe with draggable controls and pulsing location markers (`lib/lalan-markers.ts`)

**Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`). Brand tokens are CSS custom properties defined in `app/globals.css`: primary navy `#002c62`, accent green `#72c26e`. Utility classes like `.glass-nav`, `.industrial-gradient`, `.product-card`, and `.lalan-input` are also defined there. shadcn/ui components use the `base-nova` style with neutral base color.

**State:** React hooks only — no Redux, Zustand, or Context. Filter state for the product catalog and glove-finder wizard lives locally in those components.

**Path alias:** `@/` maps to the project root (e.g., `@/lib/products`, `@/components/ui/button`).

**Images:** Next.js `<Image>` for the logo. Product images use regular `<img>` tags with `mixBlendMode: 'lighten'` to composite against dark backgrounds. Remote images from Unsplash are allowed via `next.config.ts`.

**Fonts:** Manrope (headlines, black weight) and Inter (body) loaded via Next.js font system in `app/layout.tsx`, exposed as CSS variables `--font-headline` and `--font-body`.

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

## Design Context

### Users
B2B satın alma / ithalat sorumluları: fabrika, hastane ve gıda tesislerinde tedarik kararı veren profesyoneller. Masaüstünden, mesai saatleri içinde, ürün spesifikasyonu/sertifika/teklif aramak amacıyla siteyi ziyaret ediyorlar. İkincil kitle: LALAN ürünlerini bölgelerinde satmak isteyen potansiyel distribütör/bayi adayları — şirketin büyüklüğünü ve güvenilirliğini değerlendiriyorlar.

### Brand Personality
Güvenilir, kurumsal, endüstriyel. Bu site LALAN Group'un kendisi değil, Türkiye & MENA bölgesi yetkili distribütörüne ait — içerik tonu "LALAN'ın distribütörü olarak..." perspektifinde, 1. çoğul sahiplik ifadeleri (plantasyonlarımız, sertifikamız) LALAN'a ait gibi kullanılmaz.

### Aesthetic Direction
Kurumsal/endüstriyel B2B ton, ama jenerik "yapay zeka yapmış" görünümden kaçınılmalı: gradyan metin, cam efektleri (glassmorphism), basmakalıp kart ızgaraları, hero-metric şablonları gibi AI slop işaretlerinden uzak durulmalı. Marka renkleri kilitli ve değiştirilmeyecek: navy `#002c62` (primary), green `#8ec63f`/`#72c26e` (accent). Tipografi: Manrope (başlık, black weight) + Inter (gövde) — mevcut sistem korunacak. Tema: koyu/lacivert ağırlıklı kurumsal site (mevcut yapı — her section kendi inline koyu arka planını taşıyor).

### Design Principles
1. Güven ve ölçek hissi öncelikli — büyük üretici (LALAN Group) + ciddi bölgesel distribütör konumu görsel olarak net olmalı.
2. Teknik doğruluk önemli: sertifikalar, ürün spesifikasyonları, piktogramlar net ve okunur olmalı (B2B alıcılar bunlara güvenerek karar veriyor).
3. Jenerik AI estetiğinden kaçın: gradyan metin yok, anlamsız cam efekti yok, tekrarlayan kart ızgaraları yok.
4. Kilitli marka renkleri ve mevcut tipografi sistemi değiştirilmeyecek — bunlar üzerine, anti-pattern temizliği ve cilalama yapılacak.
5. Masaüstü-öncelikli ama mobil deneyim ihmal edilmeyecek (B2B kullanıcılar bazen mobilden de sertifika/katalog kontrol ediyor).

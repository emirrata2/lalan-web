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

**Routing:** Next.js App Router with a locale segment — every page lives under `app/[lang]/`. The homepage (`app/[lang]/page.tsx`) is a single-page layout with anchor-linked sections. Product detail uses dynamic routes (`app/[lang]/products/[id]/page.tsx`) with `generateStaticParams()` for full static generation. `app/[lang]/layout.tsx` is the root layout (it owns `<html>`/`<body>`); `robots.ts`, `sitemap.ts`, `globals.css` and `global-error.tsx` stay at `app/` root.

**Internationalization (tr + en):** See `lib/i18n.ts` (locales, `localizePath`, `localizedAlternates`, `robotsFor`) and `lib/dictionaries.ts` (server-only JSON loader; `dictionaries/tr.json` is the reference schema — a missing key in `en.json` is a compile error).

- **Locale redirect lives in `proxy.ts`, NOT `middleware.ts`** — Next.js 16 renamed the convention; the exported function must be `proxy`. See `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md`.
- **Translation is staged.** `LOCALE_READY` in `lib/i18n.ts` gates each locale: a locale that is not ready is excluded from the sitemap and hreflang, and gets `noindex`. All page chrome AND page bodies are translated (nav, footer, 404, contact, home, catalog, glove-finder, tarihce, lalan-hakkinda, surdurulebilirlik, plantasyonlar, sunumlar, sertifikalar) via `dictionaries/{tr,en}.json`. Still Turkish: `lib/products.ts` product copy (desc/features/specs/tags — the user's technical domain) and product-data category labels that surface on product detail pages. **`en` is still `false`** pending the user's sign-off on the sertifikalar page's regulatory-claim translations (FDA Title 21 CFR, 510k, Health Canada, REACH — codes preserved verbatim, surrounding prose translated by Claude). Flip `en: true` after that review.
- **Translation pattern:** page strings live in `dictionaries/{tr,en}.json`, loaded server-side via `getDictionary(lang)`; client components read them through `useI18n()`. Data arrays with icons/colors/files keep those fields in the module and merge translated text by index or key (e.g. `SEGMENT_ICONS`, `MILESTONE_IMAGES`, `t.certs[name]`). SVG icon arrays need explicit `key` props.
- Arabic is deliberately out of scope: it needs RTL (57 direction-dependent styles, plus `app/[lang]/tarihce/page.tsx` uses `direction:rtl` as a layout trick that would break under real RTL).
- Internal links must be locale-prefixed: `lp('/products')` in server pages, `useLocalePath()` in client components.

**Components split:** `components/lalan/` holds brand-specific page sections (nav, product catalog, glove finder, counters, reveal animations). `components/ui/` holds reusable primitives and the advanced visual effects (WebGL shaders, COBE globe, gradient backgrounds).

**Animation layers** — four systems work together:
1. **Framer Motion** — gradient cycling, motion div transitions
2. **Intersection Observer** — scroll-triggered reveal wrappers (`components/lalan/reveal.tsx`) and animated number counters (`components/lalan/counter.tsx`)
3. **Three.js / GLSL** — custom WebGL shaders for celestial bloom and aurora borealis effects (contained to specific sections)
4. **COBE** — interactive 3D globe with draggable controls and pulsing location markers (`lib/lalan-markers.ts`)

**Styling:** Tailwind CSS 4 (via `@tailwindcss/postcss`). Brand tokens are CSS custom properties defined in `app/globals.css`: primary navy `#002c62`, accent green `#72c26e`. `.skip-link` (keyboard skip-to-content) is defined there. shadcn/ui components use the `base-nova` style with neutral base color.

**State:** React hooks only — no Redux or Zustand. Filter state for the product catalog and glove-finder wizard lives locally in those components. **One deliberate Context exception:** `components/lalan/i18n-provider.tsx` supplies `{lang, dict}` to client components (nav etc.), because threading the locale through 13 call sites would be repetitive and error-prone. Do not add Context for anything else.

**Contact data:** `lib/contact.ts` is the single source for phone/address/legal name, read by the contact page, homepage, footer and Organization JSON-LD. Empty fields render nothing anywhere — never fill them with placeholder values.

**Structured data:** exactly one `Organization` entity exists site-wide, in `app/[lang]/layout.tsx`, identified by `ORGANIZATION_ID`. Other pages reference it via `@id` (e.g. the contact page emits `ContactPage` → `mainEntity`). Do not emit a second `Organization` — two entities on one page make the real one ambiguous to Google.

**Path alias:** `@/` maps to the project root (e.g., `@/lib/products`, `@/components/ui/button`).

**Images:** Use Next.js `<Image>` — product and journey images were migrated to it (a 1075 KB PNG drops to ~108 KB). `mixBlendMode: 'lighten'` composites product shots against dark backgrounds and works fine on `<Image>`. The product-detail hero uses `priority`; grids use `fill` + `sizes`. A few small assets (logo, 70px pictograms, cert badges) are still raw `<img>` where optimization gains nothing. Remote images from Unsplash are allowed via `next.config.ts`.

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

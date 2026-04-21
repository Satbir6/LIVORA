# LIVORA: Tech Stack, File Structure, and Config Files

## 1) Tech Stack

### Core Framework

- **Next.js 16.2.4** (App Router)
- **React 19.2.4**
- **React DOM 19.2.4**

### Language

- **TypeScript 5**

### Styling and UI

- **Tailwind CSS 4**
- **PostCSS** with `@tailwindcss/postcss`
- **next/font/google** for typography:
  - Inter
  - Montserrat
  - Playfair Display
- **lucide-react** for icons

### Quality and Tooling

- **ESLint 9**
- **eslint-config-next 16.2.4** (`core-web-vitals` + `typescript` presets)

### Package Manager / Runtime Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run lint checks

---

## 2) Project File Structure

```text
LIVORA/
|- app/
|  |- book-consultation/
|  |  |- page.tsx
|  |- contact/
|  |  |- page.tsx
|  |- inquiry/
|  |  |- page.tsx
|  |- process/
|  |  |- page.tsx
|  |- projects/
|  |  |- page.tsx
|  |- the-brand/
|  |  |- page.tsx
|  |- favicon.ico
|  |- globals.css
|  |- layout.tsx
|  |- page.tsx
|- components/
|  |- SiteLayout.tsx
|- public/
|  |- images/
|  |  |- brand-hero.jpg
|  |  |- inquiry-hero.jpg
|  |  |- process-hero.jpg
|  |- file.svg
|  |- globe.svg
|  |- next.svg
|  |- vercel.svg
|  |- window.svg
|- images/
|  |- Hero.jpg
|  |- IMG_*.jpg (multiple project images)
|- LOGO/
|  |- Navbar-logo.png
|  |- Logo-footer.png
|  |- icon.svg
|  |- icon.png
|  |- Frame*.svg/.png
|- AGENTS.md
|- CONTEXT.md
|- Design.tsx
|- MVP.md
|- README.md
|- Tech-Stack.md
|- eslint.config.mjs
|- next-env.d.ts
|- next.config.ts
|- package-lock.json
|- package.json
|- postcss.config.mjs
|- tsconfig.json
```

### Routing Pattern

- Uses the **App Router** (`app/` directory).
- Every route segment has a `page.tsx` file.
- Shared root layout is defined in `app/layout.tsx`.
- Global styles are in `app/globals.css`.

---

## 3) Config Files

### `package.json`

Defines project metadata, scripts, dependencies, and devDependencies.

Key points:

- Next.js + React + TypeScript stack
- Tailwind 4 toolchain
- Lint/build/dev/start scripts

### `next.config.ts`

Next.js configuration entry point.

Current state:

- Uses default exported `NextConfig`
- No custom runtime/build behavior added yet

### `tsconfig.json`

TypeScript compiler configuration.

Important settings:

- `strict: true`
- `moduleResolution: "bundler"`
- `jsx: "react-jsx"`
- `noEmit: true`
- Path alias: `@/* -> ./*`
- Excludes: `node_modules`, `Design.tsx`

### `eslint.config.mjs`

ESLint flat config for Next.js + TypeScript.

Important settings:

- Extends Next Core Web Vitals rules
- Adds Next TypeScript rules
- Global ignores include:
  - `.next/**`
  - `out/**`
  - `build/**`
  - `next-env.d.ts`
  - `Design.tsx`

### `postcss.config.mjs`

PostCSS config using Tailwind 4 plugin.

Important settings:

- Plugin: `@tailwindcss/postcss`

### `next-env.d.ts`

Auto-generated Next.js type reference file.

Important notes:

- Includes Next and Next Image types
- Should not be edited manually

---

## 4) Styling and Design System Notes

From `app/globals.css` and `app/layout.tsx`:

- CSS variables define brand palette and semantic colors.
- Tailwind theme maps app colors and font tokens.
- Uses a warm neutral background with layered radial gradients.
- Typography is split by role:
  - Playfair Display for major headings
  - Montserrat for subheadings/navigation accents
  - Inter for body text

This gives the project a premium editorial interior-brand look while keeping utility-first styling through Tailwind.

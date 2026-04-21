# LIVORA Site - Tech Stack, Usage, Working, and Config

## Project Type

This project is a React + TypeScript single-page application built with Vite.

### Core runtime

- React 18: UI rendering with component-based architecture.
- React DOM 18: Browser rendering entry point.
- TypeScript 5: Static typing for components, props, and data.
- React Router DOM 6: Client-side routing for page navigation.

### Build, tooling, and quality

- Vite 5: Dev server, fast HMR, production bundling.
- @vitejs/plugin-react: React support in Vite.
- ESLint 9 (flat config): Linting setup for JS/TS/React hooks.
- typescript-eslint: TypeScript lint rules.

## How the Project Works (Runtime flow)

1. Browser loads index.html (root mounting container).
2. src/main.tsx creates the React root and wraps the app in:
   - StrictMode
   - BrowserRouter
3. src/App.tsx defines route mapping:
   - /
   - /about
   - /process
   - /contact
4. Shared chrome comes from src/components/SiteLayout.tsx:
   - Sticky header
   - Desktop/mobile navigation
   - Footer
   - Route transition animation wrapper
5. Individual page components render section-based layouts using Tailwind classes.
6. Content mostly comes from src/data/siteContent.ts (data-driven UI text, lists, and image references).
7. Contact page uses React Hook Form + Zod safeParse validation before accepting submission.

## Configuration Explained

### package.json

Scripts:

- npm run dev: Starts Vite development server.
- npm run build: Runs TypeScript project build check, then Vite production build.
- npm run lint: Runs ESLint across the project.
- npm run preview: Serves built dist output locally.

### vite.config.ts

- Uses defineConfig with plugin list containing react().
- No custom aliases or server options yet.

### tsconfig.json

- Root references file.
- Delegates to:
  - tsconfig.app.json for browser app code
  - tsconfig.node.json for Vite/node-side config typing

### tsconfig.app.json

- Target: ES2022
- JSX runtime: react-jsx
- Module resolution: bundler mode
- noEmit true (Vite handles emit/bundling)
- Includes only src
- Includes strict cleanliness checks like noUnusedLocals and noUnusedParameters

### tsconfig.node.json

- Node-focused typing for tooling files (vite.config.ts).
- Also uses bundler resolution + noEmit.

### tailwind.config.js

- Content scanning:
  - index.html
  - src/\*_/_.{js,ts,jsx,tsx}
- Theme extension includes:
  - livora color palette
  - custom font families (heading/subheading/body)
  - custom box shadows
  - custom keyframes and animations (reveal, float)

### postcss.config.js

- tailwindcss plugin enabled
- autoprefixer plugin enabled

### eslint.config.js

- ESLint flat config format
- Ignores dist
- Applies to ts/tsx files
- Extends:
  - @eslint/js recommended
  - typescript-eslint recommended
  - react-hooks recommended
  - react-refresh vite rules
- Browser globals included

### src/index.css

- Imports Google fonts
- Includes Tailwind layers: base, components, utilities
- Defines reusable component utility classes:
  - section-shell
  - surface-card
  - hero-panel
  - ornament-dot
  - reveal

## Current Structure and Responsibilities

- src/main.tsx: Application bootstrap.
- src/App.tsx: Route switch setup.
- src/components/SiteLayout.tsx: Shared layout and navigation/footer shell.
- src/pages/\*.tsx: Route-level page views.
- src/components/ui/Button.tsx: Reusable button abstraction.
- src/data/siteContent.ts: Centralized content and structured display data.
- public/images: Static local assets.
- LOGO: Logo assets used in header and footer.

## Build and Output

- Development: Vite dev server with hot module replacement.
- Production build output: dist directory.
- Preview mode: Serves dist for final local verification.

## Notes

- README.md is currently the default Vite template text and does not describe this LIVORA implementation yet.
- src/App.css exists but is not imported by current source files.

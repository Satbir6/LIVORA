| Layer              | Technology / Package              |                      Version | Notes                                                                                                                                                                          |
| ------------------ | --------------------------------- | ---------------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Core Framework** | **Next.js**                       |                       `16.x` | Current major release; App Router is the recommended routing model, with file-system routing, server components, and Turbopack as the default for new projects. ([Next.js][1]) |
|                    | React                             |                     `19.2.x` | Next.js 16 App Router uses the latest React canary track with stable React 19 features, and React 19.2 is the current stable React release on npm. ([Next.js][1])              |
|                    | React DOM                         |                     `19.2.x` | Keep aligned with the React version. Next.js manual install still expects `react` and `react-dom` to be declared in `package.json`. ([Next.js][2])                             |
| **Build Tool**     | **Built into Next.js**            |                            — | Remove Vite. Next.js handles dev/build tooling itself, and Turbopack is now the default bundler for new projects. ([Next.js][1])                                               |
| **TypeScript**     | TypeScript                        |                       `5.1+` | Next.js has built-in TypeScript support; the docs list `v5.1.0` as the minimum. Using a current 5.x release is fine. ([Next.js][2])                                            |
| **Routing**        | **Built into Next.js App Router** |                            — | Remove `react-router-dom`. Next.js uses file-based routing via the `app/` directory. ([Next.js][3])                                                                            |
| **Styling**        | Tailwind CSS                      |                        `4.x` | Tailwind v4 is the current major version and is a cleaner fit for a fresh Next.js setup than staying on v3.4 unless you need legacy compatibility. ([Tailwind CSS][4])         |
|                    | PostCSS                           |         usually not separate | With Tailwind v4, installation is simplified and no longer needs the old v3-style setup by default. ([Tailwind CSS][4])                                                        |
|                    | Autoprefixer                      |         usually not separate | Same as above; for a fresh Tailwind v4 setup, you typically don’t keep `autoprefixer` as a separate dependency the way you did with Tailwind v3. ([Tailwind CSS][4])           |
| **UI Libraries**   | Magic UI                          |                       `^2.x` | Still reasonable for a Next.js + Tailwind stack, but check the library’s current peer dependency notes before locking an exact version.                                        |
|                    | Aceternity UI                     |                       `^2.x` | Also still a sensible fit with Next.js + Tailwind.                                                                                                                             |
| **HTTP Client**    | Axios                             |                        `1.x` | Optional. In Next.js, many data-fetching cases can use the built-in `fetch`, especially in server components and route handlers.                                               |
| **State Mgmt**     | React Context + `useReducer`      |                            — | Still fine for many apps. In Next.js, keep state on the client only where needed; avoid over-centralising state that could stay on the server.                                 |
| **Form Handling**  | React Hook Form                   |                        `7.x` | Still a strong choice for client-side forms.                                                                                                                                   |
| **Icons**          | Lucide React                      |                        `0.x` | Still a good fit.                                                                                                                                                              |
| **Dev Tools**      | ESLint                            | current 8/9-compatible setup | Next.js 16 supports ESLint or Biome, and `next lint` is deprecated in favour of running ESLint directly via scripts. ([Next.js][2])                                            |
|                    | Prettier                          |                        `3.x` | Still fine for formatting.                                                                                                                                                     |

[1]: https://nextjs.org/blog/next-16 "Next.js 16 | Next.js"
[2]: https://nextjs.org/docs/app/getting-started/installation "Getting Started: Installation | Next.js"
[3]: https://nextjs.org/docs/app/getting-started/layouts-and-pages "Getting Started: Layouts and Pages | Next.js"
[4]: https://tailwindcss.com/blog/tailwindcss-v4 "Tailwind CSS v4.0 - Tailwind CSS"

Use this exact palette:

Primary (Luxury Brown): #B9926B
Secondary (Deep Blue): #1F3F5B
Neutral Light (Base): #F5F1EC
Neutral Dark (Text): #2B2B2B
Soft Beige: #E6D6C5
Muted Gold: #C8A97E
Warm Grey: #8A8A8A
Colour usage guidance
Use #F5F1EC as a main background for clean sections
Use #1F3F5B for major headings, navigation, and trust-building elements
Use #B9926B and #C8A97E for buttons, highlights, icons, accents, and hover states
Use #2B2B2B for body text
Use #E6D6C5 for cards or alternate section backgrounds
Use #8A8A8A for secondary text

Use these fonts:

Headings: Playfair Display
Subheadings / smaller headings: Montserrat SemiBold
Body text: Inter
Typography hierarchy
H1: Playfair Display Bold, 48–64px
H2: Playfair Display SemiBold, 32–40px
H3: Montserrat SemiBold, 20–24px
Body: Inter Regular, 16–18px
Small text: Inter 14px
Styling
Letter spacing for headings: slightly increased, around 1% to 2%
Heading line height: 1.2
Body line height: 1.6

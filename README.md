# Muhamad Tahir Wiguna — portfolio

A one-page portfolio for a (fictional) senior software engineer, styled as an instrument console: near-black glass, phosphor-green signal and an ice-blue secondary. Every section runs its own live field from [React Bits](https://reactbits.dev). Built with React 19, Vite 8 and Tailwind CSS 4.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production bundle in dist/
npm run lint
```

## Make it yours

| What | Where |
| --- | --- |
| Name, role, city, email, links, every line of copy | `src/content.ts` |
| Colours, type scale, spacing, radii, motion timing, grid pattern | `tokens.css` (single source of truth) |
| Résumé download | replace `public/resume.pdf` |
| Page title, description, social preview, JSON-LD | `index.html` |

All colours are OKLCH tokens. Tailwind's default palette is switched off in `src/index.css`. WebGL components receive the same tokens converted to hex at runtime (`src/hooks/usePalette.ts`).

## Type

| Role | Family | Why |
| --- | --- | --- |
| Display | Hubot Sans (variable `wdth` 75–125, `wght` 200–900) | GitHub's mechanical display face; the width axis gives expanded section titles and drives the footer's TextPressure wordmark |
| Body | Mona Sans (variable) | Hubot's text companion, built for long reading |
| Labels, data | Martian Mono (variable) | Wide engineering mono for HUD labels, dates and stack tags |

All three ship under the SIL Open Font License and are self-hosted through Fontsource.

## Sections and their live fields

| Section | Layout | React Bits |
| --- | --- | --- |
| Hero | HUD readout, full-width name, split-flap role, CTAs | GridScan (3D grid room), TechText (name), SplitFlapText, Magnet |
| Selected work | Pinned case-file deck | ScrollStack over DotField |
| Experience | Route timeline with waypoints | Topography contour map, StrokeText title |
| About | Radar scope beside the bio and a readout grid, plus a toolbox ticker | Radar, ScrollReveal, LogoLoop |
| Kind words | Centred transmission | Scanner interference bands, FadeContent |
| Contact | Centred beacon with glass form | MagicRings, Magnet |
| Footer | Velocity marquee and an interactive wordmark | ScrollVelocity, TextPressure |
| Whole page | Blueprint grid and moving film grain | Noise |

Heavy fields are lazy-loaded. `src/components/LiveField.tsx` mounts each one only while its section is near the viewport, so at most one or two WebGL contexts run at a time. Each field falls back to a static gradient for reduced motion, Save-Data or missing WebGL. The project deck stacks only on screens at least 1024 px wide and 800 px tall; smaller screens get a plain list, so no card content is ever unreachable.

`src/main.tsx` renders without `StrictMode`, because StrictMode's double effect run makes several React Bits fields destroy and then reuse the same WebGL canvas, which shows up as a blank white panel in development.

## Local changes to vendored React Bits code

These are the files in `src/components/bits/`:

- BlurText, ScrollReveal and TextPressure render semantic elements, so there is only one `h1` and no stray headings.
- DecryptedText's screen-reader text is no longer hidden from assistive tech, and ScrollReveal only kills its own ScrollTriggers.
- SplitFlapText uses the site's mono font. StrokeText scales by aspect ratio instead of a fixed pixel height. ScrollStackItem drops its built-in card skin. ScrollVelocity drops its hard-coded type sizes.
- TextPressure skips the remote font `@import` when no URL is given. VariableProximity seeds the pointer off-screen.

## Connect the contact form

`src/lib/sendMessage.ts` is a stub that waits briefly and then resolves, so the sending, success and error states can be demoed. To deliver real messages, replace the body with a request to your provider, for example Formspree:

```ts
const response = await fetch('https://formspree.io/f/<your-form-id>', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  body: JSON.stringify(message),
})
if (!response.ok) throw new Error('send failed')
```

## Accessibility

- Skip link, labelled landmarks, one `h1`, and a visible focus ring that appears instantly. Canvas text such as the hero name, stroke titles and the wordmark carries an `aria-label` or sits beside real text.
- Every animation has a reduced-motion path, and pointer-only effects are off on touch screens.
- The form has inline validation, `aria-invalid` and `aria-describedby`, moves focus to the first invalid field, and announces sending, success and failure.

Name, email and GitHub are real. Role, city, projects, experience and the quote are still placeholders in `src/content.ts`.

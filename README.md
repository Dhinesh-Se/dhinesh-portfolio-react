# Dhinesh Portfolio (React + Vite)

Cinematic developer portfolio built with React + Vite.

## Implemented Features

1. **3D Globe / World Map**
   - Interactive rotating globe visualization with Dubai and India pins plus animated route link.
2. **AI Chat Assistant (Ask Dhinesh)**
   - Floating chat bubble for recruiter-style questions (skills, WHI, project context).
3. **Cinematic Scroll Storytelling**
   - Scroll-driven story scene transitions with dynamic cinematic background movement.
4. **Live Code Playground**
   - In-browser JavaScript runner and Java preview mode.
5. **Movie Trailer Overlay**
   - Fullscreen trailer-style career storytelling modal.
6. **IMAX Mode**
   - Toggle cinematic letterbox bars for widescreen feel.
7. **Genre Selector**
   - Thriller / Sci-Fi / Action UI mood switching.
8. **Live Clock & Timezone**
   - Real-time Coimbatore (IST) clock.
9. **Binary/Hex Name Decoder**
   - Animated decode display for “DHINESH” from binary/hex style representation.

## Sections

- About
- Skills
- Experience
- Projects
- Achievements
- Cinema Lab
- Contact

## Component Structure

- `src/App.jsx` – primary page and feature composition.
- `src/components/TopNavigation.jsx` – desktop/mobile navigation + controls.
- `src/components/MovieTicker.jsx` – cinematic quote ticker.

## Run Locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```

## Suggested Next Features

1. **Project Case Study Pages**
   - Add dedicated detail pages per major project (problem, architecture, role, impact metrics, tech stack, screenshots).
2. **Resume + Contact Conversion Tracking**
   - Track key actions (resume download, contact clicks, chat usage) with lightweight analytics to understand recruiter behavior.
3. **Dark/Light Cinematic Themes**
   - Keep the current cinematic mode, but add accessible light mode and high-contrast option.
4. **Testimonials / Recommendations Section**
   - Include quotes from managers/clients with role and organization for social proof.
5. **Certifications Timeline**
   - Add badges/cards for relevant certifications and learning milestones.
6. **Interactive Architecture View**
   - For key projects, visualize service flow (UI → API → DB/payment gateway) with hoverable nodes.
7. **Performance + Accessibility Score Panel**
   - Show Lighthouse highlights and improvements to communicate engineering quality.
8. **Multi-language Support**
   - Add i18n structure (EN as default, plus optional regional language support).
9. **Blog / Engineering Notes**
   - Add short write-ups about real implementation challenges and solutions.
10. **CMS-backed Content Management**
   - Move experience/projects/achievements to a JSON or headless CMS source for easier maintenance.

# Kimialoka — Curiosity Studio

## Design direction

A bright science learning space with cobalt blue, sunny yellow, rounded molecular shapes, and clear steps. The persistent desktop sidebar groups exploration, learning, and personal tools. Phones use a compact header, a complete expandable menu, and four bottom shortcuts.

The home page provides a starting lesson, 3D molecule link, catalogue search, daily discoveries, and a learning path based on the selected level. Progress uses existing local lesson and laboratory records; no invented streaks or scores.

## Shared system

- `css/kimialoka.css`: visual tokens, responsive shell, home composition, shared cards, headers, reading layouts, laboratories, quizzes, print, and reduced motion.
- `css/explorer.css`: the encyclopedia layer — knowledge-map chain and domain cards, unified search results, nuclear notation and reaction equations, the chart of nuclides, ion cards, PDB figures and reference lists. Mobile-first with 44 px touch targets.
- The chart of nuclides and the half-life lab use one ordinal blue ramp for half-life bands (sub-second `#86b6ef` → stable `#0d366b`), with an outline for unknown half-lives, so colour is never the only cue. The half-life lab draws parent atoms as filled squares and decay products as orange outlines.
- Primary blue: `#2563eb`; strong blue: `#194dc5`; yellow: `#ffda66`; page: `#f7f9fd`; ink: `#192c4b`.
- Plus Jakarta Sans is served locally from `assets/fonts/` under the included SIL Open Font License. No font service is contacted by the app.
- Light mode is fixed in HTML, preferences, CSS, and the web manifest. Previous dark preferences are ignored. The theme switch is removed.
- Animations use opacity and transforms. Decorative motion stops after four seconds and is disabled for reduced-motion preferences.
- Chemistry-specific category and hazard colours retain their scientific meaning.

## Brand assets

Kimialoka uses a cobalt-blue tile with a white flask silhouette shaped like an A, yellow liquid, and a yellow particle. The flask connects the name to chemistry and transformation; its simple geometry stays legible at navigation and favicon sizes.

`assets/brand/mark.svg` is the editable vector source. `npm run icons` renders `logo.png`, the favicon, Apple/PWA icons, the maskable icon, and the sharing image from this one source. Header and footer use `logo.png`. The maskable version keeps the mark within the safe zone.

The public identity is **Kimialoka · Asadin Edu**, an interactive chemistry encyclopedia and learning platform from primary school to university, including teacher resources. Home copy covers elements, isotopes, ions, molecules, materials and reactions, with level-based lessons, quizzes and virtual labs. Indonesian and English describe the same scope.

## Maintenance and verification

Run `npm run icons` after updating `assets/brand/mark.svg`, then `npm run build` to refresh offline assets. `npm run build:site` assembles the deployable site. Both logo and local font are precached.

Regression coverage includes routing, stored preferences, catalogue searches, molecular views, periodic table, every virtual lab, quiz scoring, teacher worksheets, saved content, PWA installation/offline use, narrow-screen overflow, and automated WCAG 2.1 AA checks. Remote chemistry APIs are stubbed in the browser tests, so those tests verify app behaviour without asserting external API availability.

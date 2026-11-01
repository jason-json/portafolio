# Signal / Structure portfolio

React + TypeScript + Vite. Homepage and representative Scheduling Optimization case study.

## Development

```sh
npm install
npm run dev
```

## Checks and production

```sh
npm run check
npm test
npm run build
npm run preview
```

Publish the `dist` directory on a static host configured to rewrite application paths to `index.html` (including `/work/scheduling-optimization`). This implementation uses native URL navigation with a small pathname switch; adding a router is optional as the site grows.

## Content to complete

- No résumé supplied; omit the résumé link until one is available.
- Confirm role dates and public-sharing permission for project details.
- Add Scheduling Optimization's exact stack, personal ownership, architecture decisions, and substantiated results.
- Replace illustrative concepts with approved product imagery if available.

LinkedIn is derived from the public profile root in the supplied experience URLs. No project metrics, client testimonials, or specific project stack have been invented.

See DESIGN.md for typography, colors, spacing, motion, accessibility, and content rules.

## Previewing the entrance

The opening runs once per tab session. Open the homepage in a fresh browser tab to see it again; refresh intentionally skips it. Section links and direct project visits bypass the opening. Motion follows the system reduced-motion preference.

# Signal / Structure

## Intent

A dark, architectural portfolio for a senior full-stack developer and technical lead. Help hiring managers and clients understand the person's contribution quickly. Abstract graphics express structure within complexity.

## Visual rules

- Background #111310; raised surfaces #171a15; borders #34382e.
- Main text #eceee5; secondary text #a3a99c; accent #c5ed98.
- Lime identifies actions and meaningful points in diagrams. The contact section uses it as a clear final destination.
- DM Sans for text, Georgia italic for selective editorial emphasis, IBM Plex Mono for small labels. Google Fonts is optional; system fallbacks remain usable without a network connection.
- Headlines use tight tracking and short lines. Body text stays at a readable width with 1.7 line height.
- Desktop gutters 5%, mobile 6%; sections approximately 100px apart on desktop and 62px on mobile. Thin rules organize sections. Avoid decorative card containers.
- Desktop project grid is slightly asymmetric. Mobile stacks sections in reading order. No horizontal scrolling.

## Motion and imagery

- One canvas wire sculpture in the hero. No animation framework or WebGL dependency.
- Pointer interaction subtly changes its orientation. Motion pauses outside the viewport and in hidden tabs. A visible pause control is provided.
- Respect prefers-reduced-motion: render a static sculpture and disable smooth scrolling/transitions.
- Project visuals explain the work: a scheduling interface study and a data-convergence diagram. Both are explicitly illustrative, not original product screenshots.
- Never add imitation client logos, fabricated performance metrics, testimonials, or confidential screenshots.

## Content

- Introduction → professional work → capabilities → career → contact.
- Project detail: problem → personal contribution → technical decisions → outcome.
- Use supplied career facts; distinguish role dates from project dates.
- Identity: Jason Figueroa. Use “Email me” as the visible label for the mailto contact link. The address is still available in the HTML; this is not a privacy mechanism.
- No résumé link until a résumé is supplied.
- LinkedIn uses the public profile root from the user's supplied LinkedIn URLs.
- Keep incomplete technical decisions visibly labeled. Never fill missing project facts with plausible guesses.

## Accessibility and maintenance

- Semantic landmarks and headings, skip link, visible focus, native links and buttons.
- Decorative canvas is hidden from assistive technology; meaningful diagrams have accessible descriptions.
- Check both pages at narrow mobile and desktop sizes after changing layout.
- Content lives in src/main.tsx; reusable canvas in src/Signal.tsx; shared visual rules in src/style.css.
- New project pages should reuse Header, Footer, case layout, and these tokens.

## Motion choreography

- `MotionExperience` owns progressive animation enhancement independently of page content. Motion coordinates DOM reveals; `drawSculpture` shares geometry between the opening canvas and hero canvas.
- First entry at `/` without a fragment: a 2.2-second charcoal opening. Scattered lines assemble over 1.15 seconds and settle into the hero between 0.65 and 1.75 seconds. Masked headline lines begin at 1.05 seconds, 120ms apart; supporting copy, CTA, and navigation follow.
- Session key `signal-structure:intro-seen` prevents replay on refresh and return navigation. Direct case-study and fragment entries count as a visit and never show the full introduction. If session storage is unavailable, use the finished layout.
- Skip intro, Escape, scrolling, scroll keys, touch scrolling, or focus entering the page complete the opening immediately. No scroll lock, pinned sections, or navigation interception.
- Reveal content once per page visit with 20px vertical movement and 550ms duration; imagery uses a 12% clipping reveal and 1.025-to-1 scale over 700ms. Staggers are 55ms, capped at 110ms. Easing: cubic-bezier(0.22, 1, 0.36, 1).
- Already-visible homepage content stays visible. The case-study introduction uses the short reveal, never the full-screen opening. Native link navigation remains intact.
- Reduced motion bypasses entrance/reveals and renders a static sculpture. Focused content becomes visible immediately. Animation setup errors restore visible styles, and the intro has an independent 2.6-second completion watchdog.
- Canvas density: 30 rings on mobile, 46 on desktop, with device pixel ratio capped at 2. The ambient canvas cancels its frame loop offscreen, in hidden tabs, when paused, or with reduced motion.
- Arrow feedback uses a 3px translation over 250ms on hover and visible focus; reduced motion disables translation.

Run `npm test` for replay, interruption, reduced-motion, failure recovery, and timeout regression tests. Browser QA must also verify actual animation rendering and readable final states; mocked lifecycle tests do not establish visual correctness.

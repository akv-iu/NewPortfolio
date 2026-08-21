# Akshay Viswanath — Portfolio

Software engineer. Full-stack, with a bias toward the backend. One page,
dark, built with Next.js 16, Tailwind v4, and Motion.

[GitHub](https://github.com/akv-iu) · [LinkedIn](https://linkedin.com/in/akshay-viswanath-grad)

```bash
npm run dev     # http://localhost:3000
npm test        # the two bits of logic that could silently break
```

## What this is

Hero, experience, work, stack, contact — one page, no CMS. Every string, job,
project, and skill on the site comes from a single file, `lib/content.ts`; no
component hard-codes text. That was a constraint I kept on purpose: the copy
and the layout stay separable, so a content edit is never also a code review.

## Why it looks the way it does

**There is no accent color, on purpose.** Emerald-on-zinc is what every
AI-generated dev portfolio ships with, and a palette with no color in it cannot
be generic in that particular way. Interaction is signalled by contrast, rule
weight and motion instead.

The greys are warm rather than the cool zinc default: warm neutrals read as
print, cool neutrals read as dashboard. There is a fixed film-grain overlay at
3.5% because a perfectly flat digital surface is the thing that reads as cheap.

Type is Bricolage Grotesque for display, Instrument Sans for reading, JetBrains
Mono for dates and metadata. Deliberately not Geist, which ships with
`create-next-app` and signals "generated".

Almost nothing is a card. Cards should exist when elevation communicates real
hierarchy; here the media, a hairline and some space do the same job with a
tenth of the visual weight.

## Motion

**The hand in the hero masthead started as ten frames out of ChatGPT**, then
Google Flow (Veo) turned those frames into a six-second video for about 50
credits: 0-3s typing, 3-5s the hand lifts into a wave, 5-6s it comes back
down to the keyboard. `hero.tsx` doesn't just loop that clip — it scrubs it
with `requestAnimationFrame` based on scroll position, so the loop bounds
change under you: at the top of the page it replays the full six seconds, so
he's waving at you on arrival; scroll past the nav threshold and it holds to
just the 0-3s typing stretch, so he settles back to work instead of waving at
your scrollbar. A wave already in progress is allowed to finish and the hand
comes down before the loop shortens, so scrolling never cuts him off
mid-gesture, and scrolling back up seeks straight to the lift so he greets
you again instead of making you wait through a typing cycle first.

The rest of the page's motion is smaller by comparison. The hero entrance is
plain CSS (`app/globals.css`), so it starts painting before any JavaScript
loads and runs off the main thread. Scroll reveals use Motion. Photographs
wipe open from their bottom edge with `clip-path` rather than fading, because
nothing in the real world fades into existence.

Easing is two custom curves, not the CSS built-ins, which are too weak to read
as intentional. Never `ease-in` on interactive elements: it delays the first
frame, which is the frame the user is watching. Buttons scale to 0.97 on
`:active` so a press registers physically.

Everything collapses to static under `prefers-reduced-motion: reduce`,
including the about-section parallax and autoplaying project videos. That
took one non-obvious fix: `useReducedMotion()` returns `false` on the server
and the real value on the client, so deciding what to *render* from it
directly makes the two disagree and React blanks the subtree for exactly the
users who asked for less motion. `useMotionEnabled()`, in
`components/motion-primitives.tsx`, settles after mount instead.

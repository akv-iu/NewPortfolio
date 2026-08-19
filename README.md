# Portfolio

One page, anchor navigation, dark. Next.js + Tailwind v4 + Motion.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm test        # the two bits of logic that could silently break
```

## Where to change things

Almost everything lives in **one file**.

| I want to change | Go to |
| --- | --- |
| Any text, link, job, project, skill | `lib/content.ts` |
| Colors, type, grain, easing curves | the `@theme` block at the top of `app/globals.css` |
| My photos | `public/me/` (`ak.jpeg` is the hero, `candid.jpeg` is the about band) |
| My resume | replace `public/docs/resume.pdf` |
| Project screenshots and videos | `public/projects/` (see the README in there) |

No component hard-codes a string. If you find one, it is a bug.

## Adding a project screenshot or video

1. Drag the file into `public/projects/`.
2. In `lib/content.ts`, set that project's `media` to the file name.

```ts
media: "adeguard.png"   // image
media: "twinmind.mp4"   // video, autoplays muted and loops
media: ""               // empty slot that tells you where to put the file
```

Until you add one, each project shows a labelled drop zone at the exact size
the real media will be. That is the intended placeholder state, not a bug.

The first project in the `projects` array gets the big full-width slot. Reorder
the array to change which one that is. Any number of projects works: the grid
pairs them two per row and widens a leftover odd one so a row is never
half-empty.

## Sections

Hero, work, experience, about, stack, contact. Add or remove one in
`app/page.tsx`; add it to `nav` in `lib/content.ts` to give it a nav link. The
nav highlights whichever section you are looking at.

## Why it looks the way it does

**There is no accent color, on purpose.** Emerald-on-zinc is what every
AI-generated dev portfolio ships with, and a palette with no color in it cannot
be generic in that particular way. Interaction is signalled by contrast, rule
weight and motion instead. If you add an accent later, add exactly one and use
it on the whole page.

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

The hero entrance is plain CSS (`app/globals.css`), so it starts painting
before any JavaScript loads and runs off the main thread. Scroll reveals use
Motion. Photographs wipe open from their bottom edge with `clip-path` rather
than fading, because nothing in the real world fades into existence.

Easing is two custom curves, not the CSS built-ins, which are too weak to read
as intentional. Never `ease-in` on interactive elements: it delays the first
frame, which is the frame the user is watching. Buttons scale to 0.97 on
`:active` so a press registers physically.

Everything collapses to static under `prefers-reduced-motion: reduce`,
including the about-section parallax and autoplaying project videos.

One thing worth knowing if you add animation: do not decide what to *render*
from `useReducedMotion()` directly. It returns `false` on the server and the
real value on the client, so the two disagree and React blanks the subtree for
exactly the users who asked for less motion. Use `useMotionEnabled()` from
`components/motion-primitives.tsx` instead, which settles after mount.

## Deploying

Push to GitHub, import into Vercel, done. Then set `site.url` in
`lib/content.ts` so link previews resolve.

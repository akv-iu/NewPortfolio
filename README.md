# Akshay Viswanath — Portfolio

My personal portfolio, built to present my experience, selected projects, and the way I approach software engineering.

I kept the site intentionally simple: one page, clear typography, a warm monochrome palette, and no unnecessary sections or card-heavy layout. The goal was to make the work easy to read while still giving the site one detail that felt personal.

## The custom detail

The animated hand beside my name responds to the page scroll. At the top of the page, it looks up and waves. Once the visitor starts scrolling, it finishes the current wave, lowers its hand, and returns to typing. Scrolling back to the top triggers another greeting.

Creating it took a few different steps:

1. I generated ten source frames in ChatGPT.
2. I used Google Flow (Veo) to turn those frames into a six-second motion video.
3. I mapped the clip into three timed sections: typing, waving, and returning to the keyboard.
4. I positioned and scaled the video inside the hero text so it stays aligned across screen sizes.
5. I connected playback to the scroll position and added custom loop behavior so the hand is never cut off halfway through a wave.
6. I matched the video's background and line weight to the page with an SVG filter, then added a static fallback for visitors who prefer reduced motion.

It is a small interaction, but it gave the portfolio something recognizably mine without making the rest of the site complicated.

## What I built

- A responsive, single-page portfolio with sections for experience, projects, technical skills, and contact details
- A content-first structure where the site's copy and project data live in one file instead of being hard-coded across components
- Scroll-aware hero video behavior built with `requestAnimationFrame`
- Lightweight entrance and reveal animations, with reduced-motion support
- Image and video project previews with accessible interactions
- A production deployment with Vercel Analytics

## Built with

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, and Vercel Analytics.

This is the first personal site I designed, built, and deployed from start to finish.

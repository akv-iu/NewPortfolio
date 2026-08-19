"use client";

import { useEffect, useRef } from "react";

import { hero } from "@/lib/content";
import { Button, Container, Meta } from "@/components/ui";

const VIDEO_SRC = "/me/hero-wave.mp4";

/* Clip map, in seconds:
   0 - 3  typing
   3 - 5  lifts the hand and waves
   5 - 6  hand back down, typing again
   Both loops rewind to 0 — the opening seconds are part of the typing, so
   trimming them just throws away the settle before the wave. */
const TYPING_END = 3; // end of the head-down "still working" stretch
const WAVE_START = 3; // where the hand starts coming up
const CLIP_END = 6; // end of the full cycle

const SCROLL_THRESHOLD = 24; // matches nav.tsx's own scrolled threshold

/**
 * Two loops over one clip, picked by scroll position:
 *
 *   at the top   [0, CLIP_END]    the whole cycle, waving on repeat
 *   scrolled     [0, TYPING_END]  head down, just typing
 *
 * Scrolling away mid-wave doesn't cut to the typing loop — `windingDown`
 * holds the longer bound for one more pass so the 5-6s tail plays and the
 * hand comes down on camera first. Coming back up seeks straight to the
 * lift, so he greets you rather than making you wait out the typing.
 *
 * rAF rather than `timeupdate`: that event only fires ~4x/sec, which would
 * overshoot the typing loop point by enough to show the hand starting to
 * lift before it snaps back.
 */
function useWaveVideo(videoRef: React.RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let scrolled = window.scrollY > SCROLL_THRESHOLD;
    let windingDown = false; // playing out the hand-down tail after a scroll
    let raf = 0;

    const tick = () => {
      const stopAt = scrolled && !windingDown ? TYPING_END : CLIP_END;
      if (video.currentTime >= stopAt) {
        windingDown = false;
        video.currentTime = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const next = window.scrollY > SCROLL_THRESHOLD;
      if (next === scrolled) return;
      scrolled = next;

      if (scrolled) {
        // Mid-wave? Let it run to the end so the hand comes down first.
        windingDown = video.currentTime > TYPING_END;
      } else {
        windingDown = false;
        video.currentTime = WAVE_START; // back at the top: wave again
      }
      video.play().catch(() => {});
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    video.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [videoRef]);
}

/**
 * Editorial masthead. The name is the display type, the way a printed cover
 * works, with a small video set into the rag of the first line — it waves on
 * a loop while you're at the top and settles into typing once you scroll.
 */
export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  useWaveVideo(videoRef);

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pt-32 pb-14 lg:pb-14"
    >
      {/* Does two jobs at once, so the clip's own off-white never has to be
          measured: `amplitude` lifts anything above ~#d9d9d9 past 1.0 so the
          card stock clips flat to white regardless of which off-white the
          clip was rendered on, and `exponent` drags everything under ~0.75
          down toward black, restoring the pen weight lost to scaling the
          drawing down to ~130px. CSS contrast() cannot do the second part —
          its pivot is fixed at 0.5, so it lightens exactly the anti-aliased
          midtones that need to go darker.
          sRGB is not the default here, and the linearRGB default would undo
          the curve. */}
      <svg aria-hidden className="pointer-events-none absolute h-0 w-0">
        <filter id="hero-ink" colorInterpolationFilters="sRGB">
          <feComponentTransfer>
            <feFuncR type="gamma" amplitude="1.6" exponent="2.6" />
            <feFuncG type="gamma" amplitude="1.6" exponent="2.6" />
            <feFuncB type="gamma" amplitude="1.6" exponent="2.6" />
          </feComponentTransfer>
          {/* Now pull that clipped white down onto --color-bg (#f5f3ed).
              Per channel, because the page is warm and a single uniform
              brightness() can only reach neutral greys. Ink is untouched:
              zero times any slope is still zero. */}
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.961" />
            <feFuncG type="linear" slope="0.953" />
            <feFuncB type="linear" slope="0.929" />
          </feComponentTransfer>
        </filter>
      </svg>

      <Container className="relative">
        <div className="max-w-[62rem]">
          <h1 className="display text-[clamp(3.25rem,13vw,10.5rem)]">
            {hero.name.map((line, i) => (
              <span key={line} className="mask-line">
                <span style={{ animationDelay: `${0.1 + i * 0.08}s` }}>
                  {line}
                  {/* Nested into the rag the short first line leaves, sized in
                      `em` so it tracks the display type at every width, and
                      wiped up by the same mask as the name it sits on. */}
                  {i === 0 ? (
                    <span
                      aria-hidden
                      className="ml-[0.14em] inline-block h-[0.7em] w-[0.7em] select-none align-baseline"
                    >
                      <video
                        ref={videoRef}
                        src={VIDEO_SRC}
                        muted
                        playsInline
                        preload="auto"
                        className="h-full w-full object-cover object-center"
                        style={{ filter: "url(#hero-ink)" }}
                      />
                    </span>
                  ) : null}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mt-12 grid gap-10 border-t border-line pt-8 md:grid-cols-12 md:gap-8">
          <p
            className="rise-in max-w-[58ch] text-base leading-relaxed text-muted md:col-span-6 md:text-lg"
            style={{ animationDelay: "0.38s" }}
          >
            {hero.standfirst}
          </p>

          <dl
            className="rise-in flex flex-col gap-3 md:col-span-3"
            style={{ animationDelay: "0.46s" }}
          >
            {hero.meta.map((row) => (
              <div key={row.label}>
                <dt>
                  <Meta>{row.label}</Meta>
                </dt>
                <dd className="mt-0.5 text-sm text-fg">{row.value}</dd>
              </div>
            ))}
          </dl>

          <div
            className="rise-in flex flex-col items-start gap-5 md:col-span-3"
            style={{ animationDelay: "0.54s" }}
          >
            <p className="text-sm leading-relaxed text-fg">{hero.available}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={hero.primaryCta.href}>{hero.primaryCta.label}</Button>
              <Button href={hero.secondaryCta.href} variant="ghost" external>
                {hero.secondaryCta.label}
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

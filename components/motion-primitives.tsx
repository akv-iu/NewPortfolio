"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useInView } from "motion/react";

/** Shared easing. Matches the curves in globals.css. */
export const EASE = [0.23, 1, 0.32, 1] as const;
export const EASE_IN_OUT = [0.77, 0, 0.175, 1] as const;

/**
 * Is motion allowed?
 *
 * Deliberately NOT motion's useReducedMotion(): that reads the media query
 * during render, which is always false on the server. Any component that
 * changes its markup based on it then hydration-mismatches for exactly the
 * users who asked for less motion, and React blanks the subtree.
 *
 * This returns true on the first render (server and client agree), then
 * settles to the real preference in an effect.
 */
export function useMotionEnabled() {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  return enabled;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Travel distance in px. */
  y?: number;
  /** How much of the element must be visible before it fires. */
  amount?: number;
};

/** Fade + rise once, on scroll into view. The workhorse of the page. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  amount = 0.2,
}: RevealProps) {
  const motionOn = useMotionEnabled();

  if (!motionOn) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Sequences its children in. Children must be <StaggerItem> to inherit
 * the variant, otherwise they render static.
 */
export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.07,
  amount = 0.15,
}: RevealProps & { gap?: number }) {
  const motionOn = useMotionEnabled();

  if (!motionOn) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Wipes content open from its bottom edge on scroll instead of fading it in.
 * Used for photographs: nothing in the real world fades into existence, and a
 * wipe reads as the image arriving rather than the opacity changing.
 */
export function WipeIn({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const motionOn = useMotionEnabled();
  const ref = useRef<HTMLDivElement>(null);
  // The observed element cannot be the one that gets clipped: at
  // clip-path: inset(100%) it has zero rendered area, and this browser's
  // intersection ratio for a self-clipped element reports 0 regardless of
  // scroll position -- confirmed empirically via getBoundingClientRect
  // showing the element fully inside the viewport while intersectionRatio
  // stayed 0. whileInView watches the clipped element directly, so it
  // deadlocks: revealing requires being seen, and being clipped away is
  // indistinguishable from being offscreen. Watching this unclipped outer
  // wrapper and animating the clip on an inner child breaks the deadlock.
  const inView = useInView(ref, { once: true, amount: 0.15 });

  if (!motionOn) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full"
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={inView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 1, delay, ease: EASE_IN_OUT }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 22,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE } },
      }}
    >
      {children}
    </motion.div>
  );
}

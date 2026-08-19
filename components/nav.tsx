"use client";

import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import { nav, site } from "@/lib/content";
import { EASE, useMotionEnabled } from "@/components/motion-primitives";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const motionOn = useMotionEnabled();
  const { scrollY } = useScroll();

  // Threshold cross only. No per-frame React state.
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled((was) => {
      const now = y > 24;
      return was === now ? was : now;
    });
  });

  // Scroll spy. IntersectionObserver, not a scroll handler.
  useEffect(() => {
    const targets = nav
      .map(({ id }) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Lock the page behind the mobile menu.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-[var(--ease-out)] ${
          scrolled || open
            ? "border-b border-line-soft bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 w-full max-w-[82.5rem] items-center justify-between gap-6 px-6 md:px-12"
        >
          <a href="#top" className="font-mono text-sm tracking-tight text-fg">
            {site.initials}
          </a>

          <ul className="hidden items-center gap-8 md:flex">
            {nav.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className="relative block py-2 text-sm text-muted transition-colors duration-200 ease-[var(--ease-out)] hover:text-fg aria-[current]:text-fg"
                >
                  {label}
                  {active === id ? (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-px left-0 h-px w-full bg-fg"
                      transition={
                        motionOn
                          ? { type: "spring", duration: 0.5, bounce: 0.15 }
                          : { duration: 0 }
                      }
                    />
                  ) : null}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-5">
            <a
              href="#contact"
              className="hidden text-sm text-muted transition-colors duration-200 ease-[var(--ease-out)] hover:text-fg sm:inline"
            >
              Contact
            </a>

            {/* Two rules that rotate into an X rather than swapping icons. */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative h-9 w-9 md:hidden"
            >
              <span
                className={`absolute left-1/2 block h-px w-5 -translate-x-1/2 bg-fg transition-transform duration-300 ease-[var(--ease-in-out)] ${
                  open ? "top-1/2 rotate-45" : "top-[15px] rotate-0"
                }`}
              />
              <span
                className={`absolute left-1/2 block h-px w-5 -translate-x-1/2 bg-fg transition-transform duration-300 ease-[var(--ease-in-out)] ${
                  open ? "top-1/2 -rotate-45" : "top-[21px] rotate-0"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 top-16 z-40 bg-bg/97 backdrop-blur-xl md:hidden"
            initial={motionOn ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: EASE }}
          >
            <motion.ul
              className="flex flex-col px-6 pt-4"
              initial={motionOn ? "hidden" : false}
              animate="show"
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
              }}
            >
              {[...nav, { id: "contact", label: "Contact" }].map(({ id, label }) => (
                <motion.li
                  key={id}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
                  }}
                  className="border-b border-line-soft"
                >
                  <a
                    href={`#${id}`}
                    onClick={() => setOpen(false)}
                    className="display block py-6 text-4xl"
                  >
                    {label}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    /* 82.5rem, not 1320px: the root font size scales on wide screens (see
       globals.css) and the column has to grow with the type, not stay put. */
    <div className={`mx-auto w-full max-w-[82.5rem] px-6 md:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-24 py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

/**
 * Section header: a hairline, a mono index label, then the heading. The rule
 * does the work a card border used to do, at a tenth of the visual weight.
 */
export function SectionHeading({
  index,
  title,
}: {
  index: string;
  title: string;
}) {
  return (
    <div className="border-t border-line pt-6">
      <div className="flex items-baseline gap-6">
        <span className="tabular font-mono text-xs text-faint">{index}</span>
        <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">{title}</h2>
      </div>
    </div>
  );
}

/**
 * Buttons are the only rounded thing on the page. `:active` scales to 0.97 so
 * the press registers physically, and only `transform` and `background-color`
 * transition (never `all`).
 */
export function Button({
  href,
  children,
  variant = "primary",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full px-6 text-sm font-medium " +
    "transition-[transform,opacity,border-color] duration-200 ease-[var(--ease-out)] " +
    "active:scale-[0.97]";

  const styles =
    variant === "primary"
      ? "bg-fg text-bg hover:opacity-80"
      : "border border-line text-fg hover:border-muted";

  const isExternal = external || href.startsWith("mailto:") || href.startsWith("/docs/");

  if (isExternal) {
    return (
      <a
        href={href}
        target={href.startsWith("mailto:") ? undefined : "_blank"}
        rel="noopener noreferrer"
        className={`${base} ${styles}`}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={`${base} ${styles}`}>
      {children}
    </Link>
  );
}

/** Small monospace label for periods, locations and group names. */
export function Meta({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`tabular font-mono text-xs text-faint ${className}`}>
      {children}
    </span>
  );
}

/**
 * Link with a rule that grows from the left on hover. Gated behind
 * `hover:hover` so a tap on a touch device does not leave it stuck on.
 */
export function TextLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const isExternal = href.startsWith("http");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="inline-block text-sm text-fg underline underline-offset-4 transition-colors duration-200 ease-[var(--ease-out)] hover:text-muted"
    >
      {children}
      {isExternal ? <span aria-hidden> ↗</span> : null}
    </a>
  );
}

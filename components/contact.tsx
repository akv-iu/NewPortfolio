import { contact, site, socials } from "@/lib/content";
import { Container, Meta, Section, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion-primitives";

/**
 * The email address is the headline. A contact section that says "Let's build
 * something together" above a mailto is two sentences of nothing.
 */
export function Contact() {
  return (
    <Section id="contact" className="pb-20 md:pb-28">
      <Container>
        <Reveal>
          <div className="border-t border-line pt-6">
            <Meta>{contact.label}</Meta>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <a
            href={`mailto:${site.email}`}
            className="group mt-8 block w-fit max-w-full"
          >
            <span className="display block text-[clamp(1.75rem,6.2vw,5rem)] break-words transition-colors duration-300 ease-[var(--ease-out)] group-hover:text-muted">
              {site.email}
            </span>
            <span
              aria-hidden
              className="mt-3 block h-px w-full origin-left scale-x-100 bg-line transition-[transform,background-color] duration-500 ease-[var(--ease-out)] [@media(hover:hover)]:group-hover:bg-fg"
            />
          </a>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mt-10 max-w-[52ch] text-base leading-relaxed text-muted">
            {contact.body}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line-soft">
      <Container>
        <div className="flex flex-col gap-5 py-8 sm:flex-row sm:items-baseline sm:justify-between">
          <Meta>
            {site.name} <span className="text-line">/</span> {new Date().getFullYear()}
          </Meta>

          <nav aria-label="Elsewhere" className="flex flex-wrap gap-x-7 gap-y-2">
            {socials.map((social) => (
              <TextLink key={social.label} href={social.href}>
                {social.label}
              </TextLink>
            ))}
          </nav>
        </div>
      </Container>
    </footer>
  );
}

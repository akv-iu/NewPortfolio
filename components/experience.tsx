import { experience, headings } from "@/lib/content";
import { Container, Meta, Section, SectionHeading, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion-primitives";

/** Timeline rows. One hairline per entry, nothing boxed. */
export function Experience() {
  return (
    <Section id="experience">
      <Container>
        <Reveal>
          <SectionHeading index="01" title={headings.experience} />
        </Reveal>

        <div className="mt-16">
          {experience.map((job, i) => (
            <Reveal key={`${job.org}-${job.period}`} delay={i * 0.05}>
              <div className="grid gap-5 border-t border-line-soft py-10 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                  <Meta>{job.period}</Meta>
                </div>

                <div className="md:col-span-4">
                  <h3 className="text-xl leading-snug font-medium text-fg">{job.role}</h3>
                  <p className="mt-1 text-sm text-muted">{job.org}</p>
                </div>

                <div className="flex max-w-[62ch] flex-col gap-5 md:col-span-5">
                  <ul className="flex flex-col gap-3 text-sm leading-relaxed text-muted">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>

                  {/* Work that is still live gets a link. Nothing renders for
                      roles that have none. */}
                  {job.links ? (
                    <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
                      <span className="text-sm font-medium text-fg">My work:</span>
                      {job.links.map(({ label, href }) => (
                        <TextLink key={href} href={href}>
                          {label}
                        </TextLink>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}

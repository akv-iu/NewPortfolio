import { headings, projects, type Project } from "@/lib/content";
import { spansFullRow } from "@/lib/layout";
import { Container, Meta, Section, SectionHeading, TextLink } from "@/components/ui";
import { Reveal } from "@/components/motion-primitives";
import { ProjectMedia } from "@/components/project-media";

/**
 * Strict 2-up grid. If an odd project is left over it widens to fill the row
 * on its own, so the grid never ends on a gap no matter how many you add.
 *
 * No cards: media, a hairline, then the text. Elevation would be lying about
 * hierarchy that is not there.
 */
export function Work() {
  return (
    <Section id="work">
      <Container>
        <Reveal>
          <SectionHeading index="02" title={headings.work} />
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-24 md:grid-cols-6">
          {projects.map((project, i) => {
            const wide = spansFullRow(i, projects.length);

            return (
              <div key={project.slug} className={wide ? "md:col-span-6" : "md:col-span-3"}>
                <ProjectEntry project={project} featured={wide} priority={i === 0} />
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function ProjectEntry({
  project,
  featured = false,
  priority = false,
}: {
  project: Project;
  featured?: boolean;
  priority?: boolean;
}) {
  const { title, kind, period, stack, summary, highlights, media, poster, slug, links } =
    project;

  return (
    <article className="group">
      <ProjectMedia
        media={media}
        poster={poster}
        title={title}
        slug={slug}
        priority={priority}
        aspect="aspect-[16/9]"
        sizes={featured ? "(max-width: 768px) 100vw, 1240px" : "(max-width: 768px) 100vw, 620px"}
      />

      <div
        className={`mt-7 border-t border-line pt-6 ${
          featured ? "md:grid md:grid-cols-12 md:gap-8" : ""
        }`}
      >
        <div className={featured ? "md:col-span-4" : ""}>
          <div className="flex items-baseline justify-between gap-4">
            <h3 className="display text-2xl md:text-[2rem]">{title}</h3>
            <Meta>{period}</Meta>
          </div>
          <p className="mt-1.5 text-sm text-muted">{kind}</p>
        </div>

        <div className={`${featured ? "md:col-span-8" : "mt-6"} flex flex-col gap-6`}>
          <p className="max-w-[62ch] text-sm leading-relaxed text-muted">{summary}</p>

          {highlights.length > 0 ? (
            <ul className="flex flex-col gap-2 text-sm leading-relaxed text-muted">
              {highlights.slice(0, 3).map((point) => (
                <li key={point} className="grid grid-cols-[1rem_1fr] items-baseline">
                  <span aria-hidden className="h-px w-2.5 translate-y-[-0.3em] bg-faint" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          ) : null}

          <p className="font-mono text-xs leading-relaxed text-faint">
            {stack.join("  /  ")}
          </p>

          {links.length > 0 ? (
            <div className="flex flex-wrap gap-x-7 gap-y-2">
              {links.map((link) => (
                <TextLink key={link.href + link.label} href={link.href}>
                  {link.label}
                </TextLink>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}
